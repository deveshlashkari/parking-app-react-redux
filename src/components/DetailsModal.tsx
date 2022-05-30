import { FC, useEffect, useState } from "react";
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
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { CarRegisterProps } from "../store";
import { useDispatch } from "react-redux";
import { addItems } from "../store/actions/caraction";

interface BDTProps {
    children: React.ReactNode;
    onClose: () => void;
    id?: string;
}

interface DMProps {
    isOpen: boolean;
    onClose: () => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

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

const DetailsModal: FC<DMProps> = ({ isOpen, onClose, }) => {
    const [time, setTime] = useState(new Date());
    const [carnumber, setCarNumber] = useState("");
    const state = useSelector((state) => state) as CarRegisterProps;
    const dispatch = useDispatch();

    const handleClose = () => {
        setCarNumber("");
        onClose();
    }

    const regsubmit = () => {
        if (carnumber !== "") {
            bookslot();
        } else {
            toast.error("Please enter car number.");
        }
    };

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

    const bookslot = () => {
        var isMatch = state.carregister.cardata.some((car) => {
            return car.carnumber === carnumber;
        });

        if (isMatch) {
            toast.error("Already Registerd.");
            return;
        }

        let carDetails = {
            carnumber: carnumber,
            bookingid: getFreeSpaceId(),
            available: false,
            cartiming: time,
        };
        dispatch(addItems(carDetails));
        toast.success("Successfuly Registerd.");
        handleClose();
    };

    return <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
    >
        <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
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
                id="parking-drawing-registration-input"
                label="Car Number"
                onChange={(e) =>
                    setCarNumber(e.target.value)
                }
            />
        </DialogContent>
        <DialogActions>
            <Button
                autoFocus
                onClick={regsubmit}
                id="parking-drawing-add-car-button"
            >
                Submit
            </Button>
        </DialogActions>
    </BootstrapDialog>
}

export default DetailsModal;