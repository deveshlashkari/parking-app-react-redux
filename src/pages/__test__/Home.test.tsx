import configureStore from "redux-mock-store";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import Home from "../Home";

export const MockState = {
    carregister: {
        cardata: [
            {
                carnumber: "",
                bookingid: "01",
                available: true,
                cartiming: "",
            },
            {
                carnumber: "",
                bookingid: "02",
                available: true,
                cartiming: "",
            },
            {
                carnumber: "",
                bookingid: "03",
                available: true,
                cartiming: "",
            },
        ],
    },
};

const MocakHome = () => {
    const initialState = MockState;
    const mockStore = configureStore();
    let store;

    store = mockStore(initialState);
    return (
        <Provider store={store}>
            <Home />
        </Provider>
    );
};

describe("<Home />", () => {
    it("should render the Home Component", () => {
        render(<MocakHome />, { wrapper: BrowserRouter });
        const heading = screen.getByText(/Enter your required space/i);
        expect(heading).toBeInTheDocument();
    });

    it("should render the submit button disabled", () => {
        render(<MocakHome />, { wrapper: BrowserRouter });
        const button = screen.getByText(/Submit/i);
        expect(button).toBeInTheDocument();
        expect(button).toBeDisabled();
    });

    it("should render the submit button enabled", () => {
        render(<MocakHome />, { wrapper: BrowserRouter });
        const input = screen.getByPlaceholderText(
            /Enter your required parking space/i
        );
        fireEvent.change(input, { target: { value: "1" } });
        const button = screen.getByText(/Submit/i);
        expect(button).toBeInTheDocument();
        expect(button).not.toBeDisabled();
    });

    it("should the submit button clickable", () => {
        render(<MocakHome />, { wrapper: BrowserRouter });
        const input = screen.getByPlaceholderText(
            /Enter your required parking space/i
        );
        fireEvent.change(input, { target: { value: "1" } });
        const button = screen.getByText(/Submit/i);
        fireEvent.click(button);
    });

    it("should render the toast message", () => {
        // if entered spaces exceed the number of avaliable spaces then, it should show the toast message
        render(<MocakHome />, { wrapper: BrowserRouter });
        const input = screen.getByPlaceholderText(
            /Enter your required parking space/i
        );
        fireEvent.change(input, { target: { value: "10" } });
        const button = screen.getByText(/Submit/i);
        fireEvent.click(button);
    });
});
