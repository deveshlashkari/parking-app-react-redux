import { ADD, REMOVE } from "../constants/constants";

const initialState = {
    cardata: [
        { carnumber: "", bookingid: '01', available: true, cartiming: "" },
        { carnumber: "", bookingid: '02', available: true, cartiming: "" },
        { carnumber: "", bookingid: '03', available: true, cartiming: "" },
        { carnumber: "", bookingid: '04', available: true, cartiming: "" },
        { carnumber: "", bookingid: '05', available: true, cartiming: "" },
        { carnumber: "", bookingid: '06', available: true, cartiming: "" },
        { carnumber: "", bookingid: '07', available: true, cartiming: "" },
        { carnumber: "", bookingid: '08', available: true, cartiming: "" },
        { carnumber: "", bookingid: '09', available: true, cartiming: "" }
    ]
};

const RegistrationReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD:
            return {
                ...state,
                cardata: state.cardata.map(val => {
                    if (val.bookingid == action.payload.bookingid) {
                        return action.payload
                    } else {
                        return val
                    }
                })
            };
        case REMOVE:
            return {
                ...state,
                cardata: state.cardata.map(val => {
                    if (val.bookingid == action.payload.bookingid) {
                        return { carnumber: "", bookingid: action.payload.bookingid, available: true, cartiming: "" }
                    } else {
                        return val
                    }
                })
            };
        default:
            return state;
    }
};

export default RegistrationReducer;