import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Home from "../Home";

describe("<Home />", () => {
    it("should render the Home Component", () => {
        render(<Home />, { wrapper: BrowserRouter });
        const heading = screen.getByText(/Enter your required space/i);
        expect(heading).toBeInTheDocument();
    });

    it("should render the submit button disabled", () => {
        render(<Home />, { wrapper: BrowserRouter });
        const button = screen.getByText(/Submit/i);
        expect(button).toBeInTheDocument();
        expect(button).toBeDisabled();
    });

    it("should render the submit button enabled", () => {
        render(<Home />, { wrapper: BrowserRouter });
        const input = screen.getByPlaceholderText(
            /Enter your required parking space/i
        );
        fireEvent.change(input, { target: { value: "1" } });
        const button = screen.getByText(/Submit/i);
        expect(button).toBeInTheDocument();
        expect(button).not.toBeDisabled();
    });

    it("should the submit button clickable", () => {
        render(<Home />, { wrapper: BrowserRouter });
        const input = screen.getByPlaceholderText(
            /Enter your required parking space/i
        );
        fireEvent.change(input, { target: { value: "1" } });
        const button = screen.getByText(/Submit/i);
        fireEvent.click(button);
    });

    it("should render the toast message", async () => {
        // if entered number is less than 1, should displayed the toast message
        render(<Home />, { wrapper: BrowserRouter });
        const input = screen.getByPlaceholderText(
            /Enter your required parking space/i
        );
        fireEvent.change(input, { target: { value: "0" } });
        const button = screen.getByText(/Submit/i);
        fireEvent.click(button);
        const toast = await screen.findByText(/Minimum number is /i);
        expect(toast).toBeInTheDocument();
    });
});
