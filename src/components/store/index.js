import { combineReducers } from 'redux';
import RegistrationReducer from './reducers/cartReducer';

const rootReducer = combineReducers({
    carregister: RegistrationReducer
});

export default rootReducer;