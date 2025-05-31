import { Box, Typography, Divider, Button, TextField, Paper } from "@mui/material";
import { currencyFormat } from "../../../lib/util";
import { Link, useLocation } from "react-router-dom";
import { useBasket } from "../../../lib/hooks/useBasket";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useAddCouponMutation, useRemoveCouponMutation } from "../../../features/basket/basketApi";
import { Delete } from "@mui/icons-material";

export default function OrderSummary() {
    const { subtotal, deliveryFee, discount, basket, total } = useBasket();
    const location = useLocation();
    const { register, handleSubmit, formState: { isSubmitting } } = useForm();
    const [addCoupon] = useAddCouponMutation();
    const [removeCoupon, { isLoading }] = useRemoveCouponMutation();

    const onSubmit = async (data: FieldValues) => {
        await addCoupon(data.code);
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="center" maxWidth="lg" mx="auto">
            <Paper sx={{ mb: 2, p: 3, width: '100%', borderRadius: 3 }}>

                <Typography variant="h6" component="p" fontWeight="bold">
                    Sažetak narudžbe
                </Typography>
                <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                    Narudžbe iznad 100€ ispunjavaju uvjete za besplatnu dostavu!
                </Typography>
                <Box mt={2}>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography color="textSecondary">Djelomični iznos</Typography>
                        <Typography>
                            {currencyFormat(subtotal)}
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography color="textSecondary">Popust</Typography>
                        <Typography color="success">
                            -{currencyFormat(discount)}
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography color="textSecondary">Dostava</Typography>
                        <Typography>
                            {currencyFormat(deliveryFee)}
                        </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography color="textSecondary">Ukupno</Typography>
                        <Typography>
                            {currencyFormat(total)}
                        </Typography>
                    </Box>
                </Box>

                <Box mt={2}>
                    {!location.pathname.includes('checkout') &&
                        <Button
                            component={Link}
                            to='/checkout'
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mb: 1 }}
                        >
                            Plaćanje
                        </Button>}
                    <Button
                        component={Link}
                        to='/catalog'
                        fullWidth
                    >
                        Nastavi s kupnjom
                    </Button>
                </Box>
            </Paper>

            {/* Coupon Code Section */}
            {location.pathname.includes('checkout') &&
                <Paper sx={{ width: '100%', borderRadius: 3, p: 3 }}>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Typography variant="subtitle1" component="label">
                            Imate li vaučer kod?
                        </Typography>

                        {basket?.coupon &&
                            <Box display='flex' justifyContent='space-between' alignItems='center'>
                                <Typography fontWeight='bold' variant='body2'>{basket.coupon.name} primijenjen</Typography>
                                <LoadingButton loading={isLoading} onClick={() => removeCoupon()}>
                                    <Delete color="error" />
                                </LoadingButton>
                            </Box>}


                        <TextField
                            label="Vaučer kod"
                            variant="outlined"
                            fullWidth
                            disabled={!!basket?.coupon}
                            {...register('code', { required: 'Vaučer kod nedostaje' })}
                            sx={{ my: 2 }}
                        />

                        <LoadingButton
                            loading={isSubmitting}
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={!!basket?.coupon}
                        >
                            Primijeni kod
                        </LoadingButton>
                    </form>
                </Paper>}
        </Box>
    )
}