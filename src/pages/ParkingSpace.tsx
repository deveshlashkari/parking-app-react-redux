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
        let data = {
            "car-registration": singleitem.carnumber,
            charge: getAmount(),
        };

        try {
            const res = await fetch("https://httpstat.us/200", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
                body: JSON.stringify(data),
            });

            if (res.status === 200) {
                dispatch(removeItems(singleitem));
                toast.success("Payment Successful");
            } else {
                throw new Error("Payment Failed");
            }
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setLoder(false);
            handlePaymentModal();
        }
    };

    // return the total amount based on total hours
    const getAmount = () => {
        const date1 = new Date(singleitem!.cartiming);
        const date2 = new Date();

        var diff = date2.getTime() - date1.getTime();

        var msec = diff;
        var hh = Math.floor(msec / 1000 / 60 / 60);
        msec -= hh * 1000 * 60 * 60;
        var mm = Math.floor(msec / 1000 / 60);
        msec -= mm * 1000 * 60;
        if (hh >= 2 && mm !== 0) {
            return 20 + ((hh - 2) * 10);
        }
        return 10;
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
                        <CircularProgress />
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

                            <DetailsModal isOpen={open} onClose={handleClickOpen} />

                            <PaymentModal
                                isOpen={isPaymentModalOpen}
                                toggleModal={handlePaymentModal}
                                car={singleitem}
                                payment={payment}
                                amount={getAmount()}
                            />
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
