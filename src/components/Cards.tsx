import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { CarProps, SingleCarProps } from "../store/reducers/cartReducer";

interface CardsProps {
    cardata: CarProps["cardata"];
    setSingleitem: (car: SingleCarProps) => void;
    handlePaymentModal: () => void;
}

interface CardProps {
    car: SingleCarProps;
    setSingleitem: (car: SingleCarProps) => void;
    handlePaymentModal: () => void;
}

export const Card: FC<CardProps> = (
    { car, setSingleitem, handlePaymentModal }
) => {
    const isAvailable = car.available;
    return (
        <Box className={`${isAvailable ? "card" : "cardul"}`} onClick={() => {
            if (!isAvailable) {
                setSingleitem(car);
                handlePaymentModal();
            }
        }}>
            <Typography variant="h4" gutterBottom>PSB - {car.bookingid}</Typography>
            <Typography variant="body1" component="span">
                {isAvailable ? " Currently Available." : "Booked"}
            </Typography>
        </Box>
    );
}

const Cards: FC<CardsProps> = (
    { cardata, setSingleitem, handlePaymentModal }
) => {
    return (
        <Box className="cards">
            {cardata.map(
                (car) => (
                    <Card
                        key={car.bookingid}
                        car={car}
                        handlePaymentModal={handlePaymentModal}
                        setSingleitem={setSingleitem}
                    />
                )
            )}
        </Box>
    )
}

export default Cards;