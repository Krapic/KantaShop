using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController(StoreContext context, IMapper mapper,
        ImageService imageService) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts(
            [FromQuery] ProductParams productParams)
        {
            var query = context.Products
                .Sort(productParams.OrderBy)
                .Search(productParams.SearchTerm)
                .Filter(productParams.Brands, productParams.Types)
                .AsQueryable();

            var products = await PagedList<Product>.ToPagedList(query,
                productParams.PageNumber, productParams.PageSize);

            Response.AddPaginationHeader(products.Metadata);

            return products;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await context.Products.FindAsync(id);

            if (product == null) return NotFound();

            return product;
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await context.Products.Select(x => x.Brand).Distinct().ToListAsync();
            var types = await context.Products.Select(x => x.Type).Distinct().ToListAsync();

            return Ok(new { brands, types });
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct([FromForm] CreateProductDto productDto)
        {
            var product = mapper.Map<Product>(productDto);

            if (productDto.File != null)
            {
                var imagePath = await imageService.AddImageAsync(productDto.File);

                if (string.IsNullOrEmpty(imagePath))
                {
                    return BadRequest("Problem sa spremanjem slike");
                }

                product.PictureUrl = imagePath;
            }

            context.Products.Add(product);

            var result = await context.SaveChangesAsync() > 0;

            if (result) return CreatedAtAction(nameof(GetProduct), new { Id = product.Id }, product);

            return BadRequest("Problem sa stvaranjem novog proizvoda");
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await context.Products.FindAsync(id);
            if (product == null) return NotFound();

            context.Products.Remove(product);
            var result = await context.SaveChangesAsync() > 0;

            if (!result) return BadRequest("Problem s brisanjem proizvoda");

            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult<Product>> UpdateProduct(int id, [FromForm] UpdateProductDto productDto)
        {
            var product = await context.Products.FindAsync(id);
            if (product == null) return NotFound();

            if (productDto.File != null)
            {
                if (!string.IsNullOrEmpty(product.PictureUrl))
                {
                    await imageService.DeleteImageAsync(product.PictureUrl);
                }

                var newImagePath = await imageService.AddImageAsync(productDto.File);
                if (string.IsNullOrEmpty(newImagePath))
                    return BadRequest("Problem uploading image");

                product.PictureUrl = newImagePath;
            }

            product.Name = productDto.Name;
            product.Description = productDto.Description;
            product.Price = productDto.Price;
            product.Type = productDto.Type;
            product.Brand = productDto.Brand;
            product.QuantityInStock = productDto.QuantityInStock;

            var result = await context.SaveChangesAsync() > 0;
            if (result) return Ok(product);

            return BadRequest("Problem updating product");
        }

    }
}

       
