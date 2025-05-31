using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace API.Services;

public class ImageService
{
    private readonly IWebHostEnvironment _env;
    public ImageService(IWebHostEnvironment env)
    {
        _env = env;
    }

    public async Task<string?> AddImageAsync(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return null;
        }

        var imagePath = Path.Combine(_env.WebRootPath, "images", "products");
        if (!Directory.Exists(imagePath))
        {
            Directory.CreateDirectory(imagePath);
        }

        var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
        var filePath = Path.Combine(imagePath, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        return $"/images/products/{fileName}";
    }

    public Task<bool> DeleteImageAsync(string imagePath)
    {
        if (string.IsNullOrEmpty(imagePath))
        {
            return Task.FromResult(false);
        }

        var fullPath = Path.Combine(_env.WebRootPath, imagePath.TrimStart('/'));

        if (File.Exists(fullPath))
        {
            try
            {
                File.Delete(fullPath);
                return Task.FromResult(true);
            }
            catch (Exception)
            {
                return Task.FromResult(false);
            }
        }

        return Task.FromResult(true);
    }
}
