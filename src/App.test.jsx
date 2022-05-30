import { render, screen } from "@testing-library/react";

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import App from "./App";

describe("<App />", () => {
    const initialState = { output: 10 };
    const mockStore = configureStore();
    let store;

    it("should render the component", () => {
        store = mockStore(initialState);
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );
        const heading = screen.getByText(/PARKING SPACE ALLOCATION/i);
        expect(heading).toBeInTheDocument();
    });
});
