import { Typography, Container, Paper, Box, Link, Grid, TextField, Button, CircularProgress } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { toast } from "react-toastify";

const contactFormSchema = z.object({
  name: z.string().min(1, "Molimo unesite vaše ime"),
  email: z.string().email("Molimo unesite ispravnu email adresu"),
  subject: z.string().optional(),
  message: z.string().min(10, "Poruka mora sadržavati barem 10 znakova"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onTouched"
  });

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setIsSubmitting(true);
    console.log("Podaci iz forme:", data);

    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    toast.success(`Hvala na poruci, ${data.name}! Uspješno ste poslali poruku. Javit ćemo Vam se u najkraćem roku.`);
    reset();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
          Kontaktirajte Nas
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
              Naše Informacije
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
              <EmailIcon sx={{ mr: 1.5 }} color="primary" />
              <Typography variant="body1">
                <Link href="mailto:info@restore.com" underline="hover">info@kantashop.com</Link>
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
              <PhoneIcon sx={{ mr: 1.5 }} color="primary" />
              <Typography variant="body1">
                <Link href="tel:+38512345678" underline="hover">+385 12 345 678</Link>
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2.5 }}>
              <LocationOnIcon sx={{ mr: 1.5, mt: 0.5 }} color="primary" />
              <Typography variant="body1">
                Vukovarska ulica 58, <br />
                51000 Rijeka, Hrvatska
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
              Radno vrijeme: Pon - Pet, 09:00 - 17:00
            </Typography>
          </Grid>

          <Grid item xs={12} md={7}>
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
              Pošaljite Nam Poruku
            </Typography>
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <TextField
                {...register("name")}
                fullWidth
                label="Vaše Ime"
                variant="outlined"
                margin="normal"
                required
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <TextField
                {...register("email")}
                fullWidth
                label="Vaš Email"
                variant="outlined"
                margin="normal"
                type="email"
                required
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                {...register("subject")}
                fullWidth
                label="Naslov Poruke (Opcionalno)"
                variant="outlined"
                margin="normal"
                error={!!errors.subject}
                helperText={errors.subject?.message}
              />
              <TextField
                {...register("message")}
                fullWidth
                label="Vaša Poruka"
                variant="outlined"
                margin="normal"
                multiline
                rows={4}
                required
                error={!!errors.message}
                helperText={errors.message?.message}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 2 }}
                endIcon={!isSubmitting && <SendIcon />}
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Pošalji Poruku"}
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 5, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Radujemo se vašem javljanju!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Slobodno nam se obratite s bilo kakvim pitanjima, prijedlozima ili komentarima.
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}
