import { FC } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material";

import { SingleCarProps } from "../store/reducers/cartReducer";
import { calculateTime, calculateAmount } from "../util/calculate";

interface PayProps {
    isOpen: boolean;
    toggleModal: () => void;
    car: SingleCarProps;
    payment: () => void;
}

const PaymentModal: FC<PayProps> = (
    { isOpen, toggleModal, car, payment }
) => {

    return (
        <Dialog open={isOpen} onClose={toggleModal}>
            <DialogTitle>Payment</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    For parking exit please pay below
                    mention amount for car number <b id='deregister-car-registration'>{car.carnumber}</b>.
                </DialogContentText>
                <Typography gutterBottom id="deregister-time-spent">
                    {calculateTime(car)}
                </Typography>
                <TextField
                    id="deregister-charge"
                    label="Amount"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{ readOnly: true }}
                    variant="standard"
                    value={calculateAmount(car) + " $"}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={toggleModal}
                    variant="outlined"
                    color="error"
                    id="deregister-back-button"
                >
                    Back
                </Button>
                <Button
                    onClick={payment}
                    variant="contained"
                    color="success"
                    id="deregister-payment-button"
                >
                    Pay
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default PaymentModal;