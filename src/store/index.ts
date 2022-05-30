import { combineReducers } from "redux";
import RegistrationReducer, { CarProps } from "./reducers/cartReducer";

export interface CarRegisterProps {
    carregister: CarProps;
}

const rootReducer = combineReducers({
    carregister: RegistrationReducer,
});

export default rootReducer;
