import { FC } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";

import { SingleCarProps } from "../store/reducers/cartReducer";

interface PayProps {
    isOpen: boolean;
    toggleModal: () => void;
    car: SingleCarProps;
    amount: number;
    payment: () => void;
}

const PaymentModal: FC<PayProps> = ({ isOpen, toggleModal, car, amount, payment }) => {

    return (
        <Dialog open={isOpen} onClose={toggleModal}>
            <DialogTitle>Payment</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    For parking exit please pay below
                    mention amount for car number <b>{car.carnumber}</b>.
                </DialogContentText>
                <TextField
                    id="standard-number"
                    label="Amount"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{ readOnly: true }}
                    variant="standard"
                    value={amount + " $"}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={toggleModal}
                    variant="outlined"
                    color="error"
                >
                    Cancel
                </Button>
                <Button
                    onClick={payment}
                    variant="contained"
                    color="success"
                >
                    Pay
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default PaymentModal;