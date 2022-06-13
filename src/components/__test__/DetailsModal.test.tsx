import { fireEvent, render, screen } from "@testing-library/react";
import DetailsModal from "../DetailsModal";
import SlotContext from "../../context/SlotContext";

export const MockState = {
    slots: [
        {
            carnumber: "WB-101",
            bookingid: 1,
            available: false,
            cartiming: "",
        },
        {
            carnumber: "",
            bookingid: 2,
            available: true,
            cartiming: "",
        },
        {
            carnumber: "",
            bookingid: 3,
            available: true,
            cartiming: "",
        },
    ],
};

const MockDetailsModal = () => {
    return (
        <SlotContext.Provider value={{
            addToSlot: jest.fn(),
            removeFromSlot: jest.fn(),
            slots: MockState.slots,
            createSlots: jest.fn(),
            totalSlots: 4,
            freeSlots: 4
        }}>
            <DetailsModal isOpen={true} onClose={() => { }} />
        </SlotContext.Provider>
    );
};

describe('<DetailsModal />', () => {
    it("should render the DetailsModal Component", () => {
        render(<MockDetailsModal />)
    });

    it("should give error if car number is not entered", () => {
        render(<MockDetailsModal />);
        fireEvent.click(screen.getByRole("button", { name: /Submit/i }));
        expect(screen.queryByText(/Please enter car number./i))
    });

    it("should give error if car number is already registered", () => {
        render(<MockDetailsModal />);
        fireEvent.change(screen.getByLabelText(/Car Number/i), { target: { value: "WB-101" } });
        fireEvent.click(screen.getByRole("button", { name: /Submit/i }));
        expect(screen.queryByText(/Already Registerd./i))
    });

    it("should book a slot if car number is not registered", () => {
        render(<MockDetailsModal />);
        fireEvent.change(screen.getByLabelText(/Car Number/i), { target: { value: "WB-102" } });
        fireEvent.click(screen.getByRole("button", { name: /Submit/i }));
        expect(screen.queryByText(/Booked./i))
    });
})