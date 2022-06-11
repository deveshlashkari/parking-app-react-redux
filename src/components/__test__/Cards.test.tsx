import { fireEvent, render, screen } from "@testing-library/react";
import Cards, { Card } from "../Cards";

const MockData1 = {
    carnumber: "Raj-101",
    bookingid: 1,
    available: true,
    cartiming: "10:30",
}

const MockData2 = {
    carnumber: "Meta-102",
    bookingid: 2,
    available: false,
    cartiming: "11:30",
}

describe("<Card />", () => {
    it("should render the Card Component", () => {
        render(
            <Card
                car={MockData1}
                handlePaymentModal={() => { }}
                setSingleitem={() => { }} />
        );
    });

    it("should not be clickable if the car is not available", () => {
        render(
            <Card
                car={MockData1}
                handlePaymentModal={() => { }}
                setSingleitem={() => { }} />
        );
        const card = screen.getByText(/Currently Available/i);
        expect(card).toBeInTheDocument();
        // expect(card).toBeDisabled();
    });

    it("should be clickable if the car is available", () => {
        render(
            <Card
                car={MockData2}
                handlePaymentModal={() => { }}
                setSingleitem={() => { }} />
        );
        const card = screen.getByText(/Booked/i);
        expect(card).toBeInTheDocument();
        fireEvent.click(card);
    });
});

describe('<Cards />', () => {
    it("should render the cards", () => {
        render(
            <Cards
                cardata={[MockData1, MockData2]}
                setSingleitem={() => { }}
                handlePaymentModal={() => { }}
            />
        );
    })
})
