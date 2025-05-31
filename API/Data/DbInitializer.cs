using System;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DbInitializer
{
    public static async Task InitDb(WebApplication app)
    {
        using var scope = app.Services.CreateScope();

        var context = scope.ServiceProvider.GetRequiredService<StoreContext>()
            ?? throw new InvalidOperationException("Dohva�anje konteksta trgovine nije uspjelo");
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>()
            ?? throw new InvalidOperationException("Nije uspjelo dohva�anje upravitelja korisnika");

        await SeedData(context, userManager);
    }

    private static async Task SeedData(StoreContext context, UserManager<User> userManager)
    {
        context.Database.Migrate();

        if (!userManager.Users.Any())
        {
            var user = new User
            {
                UserName = "bob@test.com",
                Email = "bob@test.com"
            };

            await userManager.CreateAsync(user, "Pa$$w0rd");
            await userManager.AddToRoleAsync(user, "Member");

            var admin = new User
            {
                UserName = "admin@test.com",
                Email = "admin@test.com"
            };

            await userManager.CreateAsync(admin, "Pa$$w0rd");
            await userManager.AddToRolesAsync(admin, ["Member", "Admin"]);
        }

var products = new List<Product>
{
    new() {
        Name = "Pljesnjiva pizza",
        Description = "Autenti�no iskustvo studentskog fri�idera � kri�ka pizze s dodatkom prirodne plijesni. Ekolo�ki fermentirana i apsolutno nejestiva.",
        Price = 20000,
        PictureUrl = "/images/products/pljesnjivapizza.png",
        Brand = "McSirovo",
        Type = "Hrana",
        QuantityInStock = 100
    },
    new() {
        Name = "Hr�ava limenka",
        Description = "Samo za istinske kolekcionare oksidacije. Idealna za dekoraciju radionica ili kao poklon biv�em �efu.",
        Price = 15000,
        PictureUrl = "/images/products/hrdjavalimenka.png",
        Brand = "PolaPola",
        Type = "Pi�e",
        QuantityInStock = 100
    },
    new() {
        Name = "Prazna tuba",
        Description = "Sje�anje na dane dentalne higijene. Prazna, zgu�vana i potpuno beskorisna � ali zato savr�ena za tebe.",
        Price = 18000,
        PictureUrl = "/images/products/pasta.png",
        Brand = "CrniZubi",
        Type = "Higijena",
        QuantityInStock = 100
    },
    new() {
        Name = "Iskori�tena vre�a",
        Description = "Elegantna, prozirna i savr�eno umrljana. Bila je na avanturi � od du�ana do kontejnera. Sada je spremna za tvoju kolekciju.",
        Price = 30000,
        PictureUrl = "/images/products/vreca.png",
        Brand = "KD Ne�isto�a",
        Type = "Alat",
        QuantityInStock = 100
    },
    new() {
        Name = "Boca sa zrakom",
        Description = "Nekad puna, sad prazna � ali s du�om. I dalje sadr�i nepoznat uzorak atmosfere iz 2022. godine.",
        Price = 25000,
        PictureUrl = "/images/products/boca.png",
        Brand = "Ja(D)na",
        Type = "Pi�e",
        QuantityInStock = 100
    },
    new() {
        Name = "Smrdljiva vre�ica",
        Description = "U�asnuta, izgu�vana i pre�ivjela nekoliko sezona ki�e. Simbol otpornosti, plastike i sramote za okoli�.",
        Price = 12000,
        PictureUrl = "/images/products/vrecica.png",
        Brand = "KD Ne�isto�a",
        Type = "Alat",
        QuantityInStock = 100
    },
    new() {
        Name = "Prljavi kist",
        Description = "Legenda me�u alatom. Na njemu je vi�e slojeva boje nego zidova. �etka koja je pre�ivjela i rat i mir.",
        Price = 1000,
        PictureUrl = "/images/products/prljavikist.png",
        Brand = "BauBaraka",
        Type = "Alat",
        QuantityInStock = 100
    },
    new() {
        Name = "Zgu�vana limenka",
        Description = "Dizajnerski komad industrijskog otpada. Zgu�vana do savr�enstva � prava ikona modernog dizajna otpada.",
        Price = 8000,
        PictureUrl = "/images/products/zguzvanalimenka.png",
        Brand = "McSirovo",
        Type = "Pi�e",
        QuantityInStock = 100
    },
    new() {
        Name = "Fungus Pizza",
        Description = "Kri�ka s du�om � i gljivicama. Originalno nije bila vegetarijanska, ali priroda je to sredila.",
        Price = 1500,
        PictureUrl = "/images/products/fungipizza.png",
        Brand = "McSirovo",
        Type = "Hrana",
        QuantityInStock = 100
    },
    new() {
        Name = "Sirovburger",
        Description = "Ni pe�en ni sirov � jednostavno sumnjiv. Kombinacija plastike i nostalgije sumnjivih fast food izbora.",
        Price = 1800,
        PictureUrl = "/images/products/sirovburger.png",
        Brand = "McSirovo",
        Type = "Hrana",
        QuantityInStock = 100
    },
    new() {
        Name = "Bio jednom hamburger",
        Description = "Sad je vi�e umjetnost nego obrok. Raj�ica kao relikt pro�losti, salata u povla�enju i meso... mo�da.",
        Price = 1500,
        PictureUrl = "/images/products/biojednomburger.png",
        Brand = "McSirovo",
        Type = "Hrana",
        QuantityInStock = 100
    },
    new() {
        Name = "Razmazane lazanje",
        Description = "Apstraktna predstava talijanske kuhinje. Ra�trkane, izgubljene i sumnjive teksture � ali zato 100% konceptualna hrana.",
        Price = 1600,
        PictureUrl = "/images/products/lazanje.png",
        Brand = "McSirovo",
        Type = "Hrana",
        QuantityInStock = 100
    }
};


        foreach (var product in products)
        {
            var existing = await context.Products
                .FirstOrDefaultAsync(p => p.Name == product.Name);

            if (existing == null)
            {
                context.Products.Add(product);
            }
            else
            {
                existing.Description = product.Description;
                existing.Price = product.Price;
                existing.PictureUrl = product.PictureUrl;
                existing.Brand = product.Brand;
                existing.Type = product.Type;
                existing.QuantityInStock = product.QuantityInStock;
            }
        }

        await context.SaveChangesAsync();
    }
}
