import { render } from "@testing-library/react";
import PaymentModal from "../PaymentModal";

const MockData = {
    carnumber: "Raj-101",
    bookingid: 1,
    available: true,
    cartiming: "10:30",
}

describe("<PaymentModal />", () => {
    it("should render the PaymentModal Component", () => {
        render(<PaymentModal isOpen={true} toggleModal={jest.fn} car={MockData} payment={jest.fn} />);
    });
});