import { AddItemsAction, RemoveItemsAction } from "../actions/caraction";
import { ADD, REMOVE } from "../constants/constants";

export interface SingleCarProps {
    carnumber: string;
    bookingid: string;
    available: boolean;
    cartiming: string | Date;
}

export interface CarProps {
    cardata: SingleCarProps[];
}

const initialState: CarProps = {
    cardata: [
        { carnumber: "", bookingid: "01", available: true, cartiming: "" },
        { carnumber: "", bookingid: "02", available: true, cartiming: "" },
        { carnumber: "", bookingid: "03", available: true, cartiming: "" },
        { carnumber: "", bookingid: "04", available: true, cartiming: "" },
        { carnumber: "", bookingid: "05", available: true, cartiming: "" },
        { carnumber: "", bookingid: "06", available: true, cartiming: "" },
        { carnumber: "", bookingid: "07", available: true, cartiming: "" },
        { carnumber: "", bookingid: "08", available: true, cartiming: "" },
        { carnumber: "", bookingid: "09", available: true, cartiming: "" },
    ],
};

type Action = AddItemsAction | RemoveItemsAction;

const RegistrationReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case ADD:
            return {
                ...state,
                cardata: state.cardata.map((val) => {
                    if (val.bookingid === action.payload.bookingid) {
                        return action.payload;
                    } else {
                        return val;
                    }
                }),
            };
        case REMOVE:
            return {
                ...state,
                cardata: state.cardata.map((val) => {
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
                }),
            };
        default:
            return state;
    }
};

export default RegistrationReducer;
