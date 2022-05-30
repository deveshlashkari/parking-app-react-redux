import {
    AddItemsAction,
    RemoveItemsAction,
    SetItemsAction,
} from "../actions/caraction";
import { ADD, REMOVE, SET } from "../constants/constants";

export interface SingleCarProps {
    carnumber: string;
    bookingid: string;
    available: boolean;
    cartiming: string | Date;
}

export interface CarProps {
    cardata: SingleCarProps[];
}

const getCarData = (TOTAL_SPACES: number): CarProps["cardata"] => {
    const cardata: CarProps["cardata"] = Array(TOTAL_SPACES)
        .fill(0)
        .map((_, index) =>
            Object({
                carnumber: "",
                bookingid: index,
                available: true,
                cartiming: "",
            })
        );
    return cardata;
};

const initialState: CarProps = {
    cardata: getCarData(0),
};

type Action = AddItemsAction | RemoveItemsAction | SetItemsAction;

const RegistrationReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case SET:
            return {
                ...state,
                cardata: getCarData(action.payload as number),
            };
        case ADD:
            return {
                ...state,
                cardata: state.cardata.map((val) => {
                    if (typeof action.payload !== "number") {
                        if (val.bookingid === action.payload.bookingid) {
                            return action.payload;
                        } else {
                            return val;
                        }
                    }
                }),
            };
        case REMOVE:
            return {
                ...state,
                cardata: state.cardata.map((val) => {
                    if (typeof action.payload !== "number") {
                        if (val.bookingid === action.payload.bookingid) {
                            return {
                                carnumber: "",
                                bookingid: action.payload.bookingid,
                                available: true,
                                cartiming: "",
                            };
                        } else {
                            return val;
                        }
                    }
                }),
            };
        default:
            return state;
    }
};

export default RegistrationReducer;
