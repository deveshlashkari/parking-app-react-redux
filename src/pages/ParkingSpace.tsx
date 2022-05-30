import { useEffect, useState } from "react";
import Header from "../components/common/Header";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { removeItems } from "../store/actions/caraction";
import { ToastContainer, toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { CarRegisterProps } from "../store";
import { SingleCarProps } from "../store/reducers/cartReducer";
import { useNavigate } from "react-router-dom";
import PaymentModal from "../components/PaymentModal";
import Cards from "../components/Cards";
import DetailsModal from "../components/DetailsModal";
import { Box, Typography } from "@mui/material";
import { makePayment, calculateAmount } from "../util";
import { calculateTime } from "../util/calculate";


export default function ParkingSpace() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const state = useSelector((state) => state) as CarRegisterProps;
    const dispatch = useDispatch();
    const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
    const [singleitem, setSingleitem] = useState<SingleCarProps>(
        { carnumber: "", bookingid: "01", available: true, cartiming: "" }
    );
    const [loder, setLoder] = useState(false);

    // toggle car registration modal
    const handleClickOpen = () => {
        setOpen(prev => !prev);
    };

    // toggle payment modal
    const handlePaymentModal = () => {
        setPaymentModalOpen(prev => !prev);
    }

    // Return total free spaces
    const getFreeSpaces = () => {
        return state.carregister.cardata.length -
            state.carregister.cardata.filter(
                (val) => val.available === false
            ).length;
    }

    // handle payment
    const payment = async () => {
        setLoder(true);

        const res = await makePayment(singleitem);
        if (res) {
            dispatch(removeItems(singleitem));
            toast.success("Payment Successful");
        } else {
            toast.error("Payment Failed");
        }

        setLoder(false);
        handlePaymentModal();
    };

    // Check if user enters parking space or not
    useEffect(() => {
        if (!state.carregister.cardata.length) {
            toast.error(`Plese enter parking space first.`);
            return navigate("/")
        }
    }, [navigate, state.carregister.cardata.length]);

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
                                disabled={getFreeSpaces() === 0}
                            >
                                Book Your Space +
                            </Button>
                            <Button
                                className="dash"
                                variant="contained"
                                color="success"
                            >
                                Total Available Spaces : {getFreeSpaces()}
                            </Button>

                            <Button
                                className="dash"
                                variant="contained"
                                color="success"
                            >
                                Total Spaces :{" "}
                                {state.carregister.cardata.length}
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
                            cardata={state.carregister.cardata}
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
