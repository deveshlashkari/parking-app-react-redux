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

const Card: FC<CardProps> = (
    { car, setSingleitem, handlePaymentModal }
) => {
    const isAvailable = car.available;
    return (
        <div className={`${isAvailable ? "card" : "cardul"}`} onClick={() => {
            if (!isAvailable) {
                setSingleitem(car);
                handlePaymentModal();
            }
        }}>
            <h3>PSB - {car.bookingid}</h3>
            <span>
                {isAvailable ? " Currently Available." : "Booked"}
            </span>
        </div>
    );
}

const Cards: FC<CardsProps> = (
    { cardata, setSingleitem, handlePaymentModal }
) => {
    return <div className="cards">
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
    </div>
}

export default Cards;