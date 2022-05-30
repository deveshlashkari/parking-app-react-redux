import { FC, useEffect, useState } from "react";
import Header from "../components/common/Header";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useDispatch, useSelector } from "react-redux";
import { addItems, removeItems } from "../store/actions/caraction";
import { ToastContainer, toast } from "react-toastify";
import DialogContentText from "@mui/material/DialogContentText";
import CircularProgress from "@mui/material/CircularProgress";
import { CarRegisterProps } from "../store";
import { SingleCarProps } from "../store/reducers/cartReducer";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentModal from "../components/PaymentModal";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

interface BDTProps {
    children: React.ReactNode;
    onClose: () => void;
    id?: string;
}

const BootstrapDialogTitle: FC<BDTProps> = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

export default function ParkingSpace() {
    const navigate = useNavigate();
    const [newreg, setnewreg] = useState(true);
    const [open, setOpen] = useState(false);
    const [time, setTime] = useState(new Date());
    const state = useSelector((state) => state) as CarRegisterProps;
    const dispatch = useDispatch();
    const [carnumber, setCarNumber] = useState("");
    const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
    const [singleitem, setSingleitem] = useState<SingleCarProps>(
        { carnumber: "", bookingid: "01", available: true, cartiming: "" }
    );
    const [loder, setLoder] = useState(false);

    const handleClickOpen = () => {
        setnewreg(!newreg);
        setOpen(true);
    };

    const handlePaymentModal = () => {
        setPaymentModalOpen(!isPaymentModalOpen);
    }

    // Return total free spaces
    const getFreeSpaces = () => {
        return state.carregister.cardata.length -
            state.carregister.cardata.filter(
                (val) => val.available === false
            ).length;
    }

    const getRandomId = () => Math.floor(Math.random() * getFreeSpaces());

    const getFreeSpaceId = () => {
        const freeSpace = state.carregister.cardata.filter(
            (val) => val.available === true
        );
        return freeSpace[getRandomId()].bookingid;
    }

    const regsubmit = () => {
        if (carnumber !== "") {
            bookslot();
            setOpen(!open);
        } else {
            toast.error("Please enter car number.");
        }
    };

    const bookslot = () => {
        let bookedspace = state.carregister.cardata.filter(
            (val) => val.available === false
        ).length;

        if (bookedspace === state.carregister.cardata.length) {
            toast.error("All spaces are booked. Please wait for some time.");
        } else {
            let items = state.carregister.cardata;
            let matches = false;
            for (let i = 0; i < items.length; i++) {
                if (items[i].carnumber === carnumber) {
                    matches = true;
                    break;
                }
            }
            if (matches === false) {
                let carDetails = {
                    carnumber: carnumber,
                    bookingid: getFreeSpaceId(),
                    available: false,
                    cartiming: time,
                };
                dispatch(addItems(carDetails));
                toast.success("Successfuly Registerd.");
            } else {
                toast.error("Already Registerd.");
            }
        }
    };

    const payment = async () => {
        setLoder(true);
        let data = {
            "car-registration": singleitem.carnumber,
            charge: getAmount(),
        };

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
            toast.error("Payment Failed");
        }
        setLoder(false);
        handlePaymentModal();
    };

    const getAmount = () => {
        const date1 = new Date(singleitem!.cartiming).valueOf();
        const date2 = new Date().valueOf();
        const diffTime: number = Math.abs(date2 - date1);
        const diffHrs = Math.ceil(diffTime / (1000 * 60 * 60));
        if (!isNaN(diffHrs)) {
            return 10;
        } else {
            return diffHrs * 10;
        }
    };

    // Check if user enters parking space or not
    useEffect(() => {
        if (!state.carregister.cardata.length) {
            toast.error(`Plese enter parking space first.`);
            return navigate("/")
        }
    }, [navigate, state.carregister.cardata.length]);

    return (
        <div>
            {loder ? (
                <div className="loderbox">
                    <div className="loder">
                        <CircularProgress />
                    </div>
                </div>
            ) : (
                <>
                    <Header />
                    <div className="parkingspace">
                        <h1>Available Parking Slots.</h1>
                        <div className="tophead">
                            <Button
                                data-testid="button1"
                                className="dash"
                                variant={
                                    newreg === true ? "contained" : "outlined"
                                }
                                color="success"
                                onClick={handleClickOpen}
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
                            <BootstrapDialog
                                onClose={() => setOpen(!open)}
                                aria-labelledby="customized-dialog-title"
                                open={open}
                            >
                                <BootstrapDialogTitle
                                    id="customized-dialog-title"
                                    onClose={() => setOpen(!open)}
                                >
                                    New Car Registration
                                </BootstrapDialogTitle>
                                <DialogContent dividers>
                                    <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                    >
                                        <DateTimePicker
                                            renderInput={(props) => (
                                                <TextField {...props} />
                                            )}
                                            label="Car Arrival Time"
                                            value={time}
                                            onChange={(newValue) => {
                                                setTime(newValue as Date);
                                            }}
                                        />
                                    </LocalizationProvider>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Car Number"
                                        onChange={(e) =>
                                            setCarNumber(e.target.value)
                                        }
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        autoFocus
                                        onClick={() => regsubmit()}
                                    >
                                        Submit
                                    </Button>
                                </DialogActions>
                            </BootstrapDialog>

                            <PaymentModal
                                isOpen={isPaymentModalOpen}
                                toggleModal={handlePaymentModal}
                                car={singleitem}
                                payment={payment}
                                amount={getAmount()}
                            />
                        </div>
                        <div className="cards">
                            {state.carregister.cardata.map(
                                (items, index: number) => {
                                    if (items.available === true) {
                                        return (
                                            <div key={index} className="card">
                                                <h3>PSB - {items.bookingid}</h3>
                                                <span>
                                                    Currently Available.
                                                </span>
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <div
                                                onClick={() => {
                                                    setSingleitem(items);
                                                    handlePaymentModal();
                                                }}
                                                key={index}
                                                className="cardul"
                                            >
                                                <h3>PSB - {items.bookingid}</h3>
                                                <span>Booked.</span>
                                            </div>
                                        );
                                    }
                                }
                            )}
                        </div>
                    </div>
                </>
            )}
            <ToastContainer />
        </div>
    );
}
