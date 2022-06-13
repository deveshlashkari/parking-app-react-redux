import configureStore from "redux-mock-store";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MockState } from "../../../pages/__test__/Home.test";
import DetailsModal from "../../DetailsModal";
import { Provider } from "react-redux";
import { SlotProvider } from "../../../context/SlotContext";

const MockDetailsModal = () => {
    return (
        <SlotProvider>
            <DetailsModal isOpen={true} onClose={() => { }} />
        </SlotProvider>
    );
};

describe('<DetailsModal />', () => {
    it("should render the DetailsModal Component", () => {
        render(<MockDetailsModal />)
    });

    // it("should give error if car number is not entered", () => {
    //     render(<MockDetailsModal />);
    //     fireEvent.click(screen.getByRole("button", { name: /Submit/i }));
    //     expect(screen.queryByText(/Please enter car number./i))
    // });

    // it("should give error if car number is already registered", () => {
    //     render(<MockDetailsModal />);
    //     fireEvent.change(screen.getByLabelText(/Car Number/i), { target: { value: "WB-101" } });
    //     fireEvent.click(screen.getByRole("button", { name: /Submit/i }));
    //     fireEvent.change(screen.getByLabelText(/Car Number/i), { target: { value: "WB-101" } });
    //     fireEvent.click(screen.getByRole("button", { name: /Submit/i }));
    //     expect(screen.queryByText(/Already Registerd./i))
    // });
})