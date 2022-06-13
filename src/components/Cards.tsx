import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { Slot } from "../context/SlotContext";

interface CardsProps {
    cardata: Slot[];
    setSingleitem: (car: Slot) => void;
    handlePaymentModal: () => void;
}

interface CardProps {
    car: Slot;
    setSingleitem: (car: Slot) => void;
    handlePaymentModal: () => void;
}

export const Card: FC<CardProps> = (
    { car, setSingleitem, handlePaymentModal }
) => {
    const isAvailable = car.available;
    return (
        <Box
            className={`${isAvailable ? "card" : "cardul"}`}
            id={`${isAvailable ?
                `parking-drawing-space-${car.bookingid}` :
                `parking-drawing-registered-${car.bookingid}`}`
            }
            onClick={() => {
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
                    <Box
                        id={`parking-drawing-space-number-${car.bookingid}`}
                        key={car.bookingid}
                    >
                        <Card
                            car={car}
                            handlePaymentModal={handlePaymentModal}
                            setSingleitem={setSingleitem}
                        />
                    </Box>
                )
            )}
        </Box>
    )
}

export default Cards;