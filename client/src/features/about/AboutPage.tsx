import { Container, Typography, Box, List, ListItem, Link, Divider } from "@mui/material";

export default function AboutPage() {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {/* Naslov stranice */}
      <Typography variant="h3" component="h1" gutterBottom sx={{ textAlign: "center", fontWeight: "bold" }}>
        O nama
      </Typography>

      {/* Kratak opis projekta */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" paragraph>
          Dobrodošli na <strong>KantaShop</strong> – vašu omiljenu destinaciju za kupovinu online!
          KantaShop je nastao kao studentski projekt s ciljem da omogući jednostavno, brzo i sigurno naručivanje
          proizvoda iz udobnosti vlastitog doma.
        </Typography>
        <Typography variant="body1" paragraph>
          Naša misija je pružiti korisnicima:
        </Typography>
        <List>
          <ListItem>Brzu i preglednu navigaciju kroz širok asortiman proizvoda</ListItem>
          <ListItem>Sigurnu i pouzdanu naplatu putem integriranih platnih rješenja</ListItem>
          <ListItem>Transparentne informacije o dostavi i stanju narudžbi</ListItem>
          <ListItem>Podršku korisnicima 7 dana u tjednu</ListItem>
        </List>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Sekcija o tehnologijama */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Tehnologije koje koristimo
        </Typography>
        <List>
          <ListItem>
            <strong>Frontend:</strong> React (Vite), TypeScript, Material-UI, Redux Toolkit (RTK), React Router
          </ListItem>
          <ListItem>
            <strong>Backend:</strong> ASP.NET Core (C#), Entity Framework Core, SQL Server
          </ListItem>
          <ListItem>
            <strong>API:</strong> RESTful servisi, JWT autentikacija, implementacija Cloudinary (za upload slika)
          </ListItem>
          <ListItem>
            <strong>Baza podataka:</strong> SQL Server Express (lokalno), migracije preko Entity Framework
          </ListItem>
          <ListItem>
            <strong>Autentikacija:</strong> ASP.NET Identity, JWT cookie-based autentikacija
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Sekcija tim i kontakti */}
      <Box>
        <Typography variant="h5" gutterBottom>
          Tim i kontakti
        </Typography>
        <Typography variant="body1" paragraph>
          KantaShop razvija student Računarstva na Tehničkom fakultetu u Rijeci:
        </Typography>
        <List>
          <ListItem>Frane Krapić – voditelj projekta i jedini developer</ListItem>
        </List>
        <Typography variant="body1" paragraph>
          Imate pitanja, prijedloge ili želite surađivati s nama? Javite nam se na:
        </Typography>
        <List>
          <ListItem>
            E-mail:{" "}
            <Link href="mailto:info@kantashop.com" underline="hover">
              info@kantashop.com
            </Link>
          </ListItem>
          <ListItem>
            Telefon:{" "}
            <Link href="tel:+38512345678" underline="hover">
              +385 12 345 678
            </Link>
          </ListItem>
        </List>
      </Box>
    </Container>
  );
}
