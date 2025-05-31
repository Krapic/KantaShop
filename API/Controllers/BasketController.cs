using System;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class BasketController(StoreContext context,
    DiscountService couponService, PaymentsService paymentsService) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
        var basket = await RetrieveBasket();

        if (basket == null) return NoContent();

        return basket.ToDto();
    }

    [HttpPost]
    public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
    {
        var basket = await RetrieveBasket();

        basket ??= CreateBasket();

        var product = await context.Products.FindAsync(productId);

        if (product == null) return BadRequest("Problem s dodavanjem predmeta u košaricu");

        basket.AddItem(product, quantity);

        var result = await context.SaveChangesAsync() > 0;

        if (result) return CreatedAtAction(nameof(GetBasket), basket.ToDto());

        return BadRequest("Problem s ažuriranjem košarice");
    }

    [HttpDelete]
    public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
    {
        var basket = await RetrieveBasket();

        if (basket == null) return BadRequest("Nemoguæe dohvaæanje košarice");

        basket.RemoveItem(productId, quantity);

        var result = await context.SaveChangesAsync() > 0;

        if (result) return Ok();

        return BadRequest("Problem s ažuriranjem košarice");
    }

    [HttpPost("{code}")]
    public async Task<ActionResult<BasketDto>> AddCouponCode(string code)
    {
        // get the basket
        var basket = await RetrieveBasket();
        if (basket == null || string.IsNullOrEmpty(basket.ClientSecret)) return BadRequest("Neuspjela primjena kupona");

        // get the coupon
        var coupon = await couponService.GetCouponFromPromoCode(code);
        if (coupon == null) return BadRequest("Neispravan kupon");

        // update the basket with the coupon
        basket.Coupon = coupon;

        // update the payment intent
        var intent = await paymentsService.CreateOrUpdatePaymentIntent(basket);
        if (intent == null) return BadRequest("Problem s primjenom kupona u košarici");

        // save changes and return BasketDto if successful
        var result = await context.SaveChangesAsync() > 0;

        if (result) return CreatedAtAction(nameof(GetBasket), basket.ToDto());

        return BadRequest("Problem s ažuriranjem košarice");
    }

    [HttpDelete("remove-coupon")]
    public async Task<ActionResult> RemoveCouponFromBasket()
    {
        // get the basket
        var basket = await RetrieveBasket();
        if (basket == null || basket.Coupon == null || string.IsNullOrEmpty(basket.ClientSecret))
            return BadRequest("Neuspjelo ažuriranje košarice s kuponom");

        var intent = await paymentsService.CreateOrUpdatePaymentIntent(basket, true);
        if (intent == null) return BadRequest("Problem s uklanjanjem kupona iz košarice");

        basket.Coupon = null;

        var result = await context.SaveChangesAsync() > 0;

        if (result) return Ok();

        return BadRequest("Problem s ažuriranjem košarice");
    }

    private Basket CreateBasket()
    {
        var basketId = Guid.NewGuid().ToString();
        var cookieOptions = new CookieOptions
        {
            IsEssential = true,
            Expires = DateTime.UtcNow.AddDays(30)
        };
        Response.Cookies.Append("basketId", basketId, cookieOptions);
        var basket = new Basket { BasketId = basketId };
        context.Baskets.Add(basket);
        return basket;
    }

    private async Task<Basket?> RetrieveBasket()
    {
        return await context.Baskets
            .Include(x => x.Items)
            .ThenInclude(x => x.Product)
            .FirstOrDefaultAsync(x => x.BasketId == Request.Cookies["basketId"]);
    }
}
