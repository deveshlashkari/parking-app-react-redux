import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

// should render the whole component
test("should render the whole component", () => {
    render(<App />, { wrapper: MemoryRouter });
    expect(screen.getByTestId("app")).toBeInTheDocument();
});
