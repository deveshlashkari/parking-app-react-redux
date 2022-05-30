import configureStore from "redux-mock-store";
import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { BrowserRouter, Router } from "react-router-dom";

import ParkingSpace from "../ParkingSpace";
import { MockState } from "./Home.test";
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";

const MocakParkingSpace = () => {
    const initialState = MockState;
    const mockStore = configureStore();
    let store;

    store = mockStore(initialState);

    const history = createMemoryHistory();
    history.push("/parkingspace", 2);
    return (
        <Provider store={store}>
            <Router location={history.location} navigator={history}>
                <ParkingSpace />
            </Router>
        </Provider>
    )
};

describe("<ParkingSpace />", () => {
    it("should render the Component", () => {
        render(<MocakParkingSpace />);
        const heading = screen.getByText(/Available Parking Slots/i);
        expect(heading).toBeInTheDocument();
    });

    it("should display the total spaces and available spaces", () => {
        render(<MocakParkingSpace />);
        const available = screen.getByText(`Total Available Spaces : ${MockState.carregister.cardata.length}`);
        const total = screen.getByText(`Total Spaces : ${MockState.carregister.cardata.length}`);
        expect(total).toBeInTheDocument();
        expect(available).toBeInTheDocument();
    });

    it("should book the parking space", async () => {
        render(<MocakParkingSpace />);
        const heading = screen.getByText(/Available Parking Slots/i);
        expect(heading).toBeInTheDocument();
        const button = screen.getByText(/Book your Space/i);
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        const textBox = screen.getByRole("textbox", { name: /Car Number/i })
        expect(textBox).toBeInTheDocument();
        fireEvent.change(textBox, { target: { value: "WB-001" } });
        const submitButton = screen.getByRole("button", { name: /Submit/i });
        expect(submitButton).toBeInTheDocument();
        fireEvent.click(submitButton);

        await waitForElementToBeRemoved(submitButton).then(() => {
            const toast = screen.getByText(/Successfuly Registerd./i);
            expect(toast).toBeInTheDocument();
        })

    });
});
