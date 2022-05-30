import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Header from "../Header";


describe("<Header />", () => {
    it("should render the Home button", () => {
        render(
            <Header />, { wrapper: BrowserRouter }
        );
        const HomeButton = screen.getByRole("button", { name: /Home/i });
        expect(HomeButton).toBeInTheDocument();
    });
    it("should button functionality works", () => {
        render(
            <Header />, { wrapper: BrowserRouter }
        );
        const HomeButton = screen.getByRole("button", { name: /Home/i });
        fireEvent.click(HomeButton);
        expect(window.location.pathname).toEqual("/");
    })
});
