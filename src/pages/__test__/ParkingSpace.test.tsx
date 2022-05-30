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

    it("should book the parking space", async () => {
        render(<MocakParkingSpace />);
        const heading = screen.getByText(/Available Parking Slots/i);
        expect(heading).toBeInTheDocument();
        const button = screen.getByText(/Book your Space/i);
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        const textBox = screen.getByRole("textbox", { name: /Car Number/i });
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

    it("should pay the amount", async () => {
        render(<MocakParkingSpace />);
        const bookedCard = screen.getByText(/Booked/i);
        expect(bookedCard).toBeInTheDocument();
        fireEvent.click(bookedCard);
        const paymentButton = screen.getByRole("button", { name: /Pay/i });
        expect(paymentButton).toBeInTheDocument();
        fireEvent.click(paymentButton);

        await waitFor(() => {
            const loader = screen.getByTestId("loader");
            expect(loader).toBeInTheDocument();
        });

        await waitFor(() => {
            const toast = screen.getByText(/Payment Successful/i);
            expect(toast).toBeInTheDocument();
        }, { timeout: 4000 })
    });

    it("should redirect to / page if no parking space is allocated", async () => {
        const initialState = {
            carregister: {
                cardata: []
            }
        };
        const mockStore = configureStore();
        let store;

        store = mockStore(initialState);

        const history = createMemoryHistory();
        history.push("/parkingspace");
        render(
            <Provider store={store}>
                <Router location={history.location} navigator={history}>
                    <ParkingSpace />
                </Router>
            </Provider>
        )

        await waitFor(() => {
            const toastMsg = screen.getByText(/Plese enter parking space first./i);
            expect(toastMsg).toBeInTheDocument();
        });
    });
});
