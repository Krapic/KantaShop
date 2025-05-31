import { Box, Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { Order } from "../../app/models/order";
import { currencyFormat, formatAddressString, formatPaymentString } from "../../lib/util";

export default function CheckoutSuccess() {
  const { state } = useLocation();
  const order = state.data as Order;

  if (!order) return <Typography>Problem s pristupom narudžbi</Typography>

  return (
    <Container maxWidth='md'>
      <>
        <Typography variant="h4" gutterBottom fontWeight='bold'>
          Hvala na lažnoj narudžbi!
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Vaša narudžba <strong>#{order.id}</strong> nikada neće biti obrađena jer je ovo lažna trgovina.
        </Typography>

        <Paper elevation={1} sx={{ p: 2, mb: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box display='flex' justifyContent='space-between'>
            <Typography variant='body2' color='textSecondary'>
              Datum narudžbe
            </Typography>
            <Typography variant='body2' fontWeight='bold'>
              {order.orderDate}
            </Typography>
          </Box>
          <Divider />
          <Box display='flex' justifyContent='space-between'>
            <Typography variant='body2' color='textSecondary'>
              Način plaćanja
            </Typography>
            <Typography variant='body2' fontWeight='bold'>
              {formatPaymentString(order.paymentSummary)}
            </Typography>
          </Box>
          <Divider />
          <Box display='flex' justifyContent='space-between'>
            <Typography variant='body2' color='textSecondary'>
              Adresa za dostavu
            </Typography>
            <Typography variant='body2' fontWeight='bold'>
              {formatAddressString(order.shippingAddress)}
            </Typography>
          </Box>
          <Divider />
          <Box display='flex' justifyContent='space-between'>
            <Typography variant='body2' color='textSecondary'>
              Iznos
            </Typography>
            <Typography variant='body2' fontWeight='bold'>
              {currencyFormat(order.total)}
            </Typography>
          </Box>
        </Paper>

        <Box display='flex' justifyContent='flex-start' gap={2}>
          <Button variant="contained" color="primary" component={Link} to={`/orders/${order.id}`}>
            Pregledajte svoju narudžbu
          </Button>
          <Button component={Link} to='/catalog' variant="outlined" color='primary'>
            Nastavite s kupovinom
          </Button>
        </Box>
      </>
    </Container>
  )
}