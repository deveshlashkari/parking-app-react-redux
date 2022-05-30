import { ADD, REMOVE } from "../constants/constants";
import { SingleCarProps } from "../reducers/cartReducer";

export interface AddItemsAction {
    type: string;
    payload: SingleCarProps;
}

export interface RemoveItemsAction {
    type: string;
    payload: SingleCarProps;
}

export const addItems = (data: SingleCarProps): AddItemsAction => ({
    type: ADD,
    payload: data,
});

export const removeItems = (data: SingleCarProps): RemoveItemsAction => ({
    type: REMOVE,
    payload: data,
});
