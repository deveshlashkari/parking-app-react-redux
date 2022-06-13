import { useContext, useEffect, useState } from "react";
import Header from "../components/common/Header";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import PaymentModal from "../components/PaymentModal";
import Cards from "../components/Cards";
import DetailsModal from "../components/DetailsModal";
import { Box, Typography } from "@mui/material";
import { makePayment } from "../util";
import SlotContext, { Slot } from "../context/SlotContext";


export default function ParkingSpace() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
    const [singleitem, setSingleitem] = useState<Slot>(
        { carnumber: "", bookingid: 1, available: true, cartiming: "" }
    );
    const [loder, setLoder] = useState(false);
    const context = useContext(SlotContext);

    // toggle car registration modal
    const handleClickOpen = () => {
        setOpen(prev => !prev);
    };

    // toggle payment modal
    const handlePaymentModal = () => {
        setPaymentModalOpen(prev => !prev);
    }

    // handle payment
    const payment = async () => {
        setLoder(true);

        const res = await makePayment(singleitem);
        if (res) {
            context.removeFromSlot(singleitem.bookingid);
            toast.success("Payment Successful");
        } else {
            toast.error("Payment Failed");
        }

        setLoder(false);
        handlePaymentModal();
    };

    // Check if user enters parking space or not
    useEffect(() => {
        if (!context.totalSlots) {
            toast.error(`Plese enter parking space first.`);
            return navigate("/");
        }
    }, [navigate, context.totalSlots]);

    return (
        <Box>
            {loder ? (
                <Box className="loderbox">
                    <Box className="loder">
                        <CircularProgress data-testid="loader" />
                    </Box>
                </Box>
            ) : (
                <>
                    <Header />
                    <Box className="parkingspace">
                        <Typography variant="h1">Available Parking Slots</Typography>
                        <Box className="tophead">
                            <Button
                                data-testid="button1"
                                className="dash"
                                variant="contained"
                                color="success"
                                onClick={handleClickOpen}
                                disabled={context.freeSlots === 0}
                            >
                                Book Your Space +
                            </Button>
                            <Button
                                className="dash"
                                variant="contained"
                                color="success"
                            >
                                Total Available Spaces : {context.freeSlots}
                            </Button>

                            <Button
                                className="dash"
                                variant="contained"
                                color="success"
                            >
                                Total Spaces :
                                {context.totalSlots}
                            </Button>

                            {open &&
                                <DetailsModal isOpen={open} onClose={handleClickOpen} />
                            }

                            {isPaymentModalOpen && (
                                <PaymentModal
                                    isOpen={isPaymentModalOpen}
                                    toggleModal={handlePaymentModal}
                                    car={singleitem}
                                    payment={payment}
                                />
                            )}
                        </Box>
                        <Cards
                            cardata={context.slots}
                            handlePaymentModal={handlePaymentModal}
                            setSingleitem={setSingleitem}
                        />
                    </Box>
                </>
            )}
            <ToastContainer />
        </Box>
    );
}
