import { ADD, REMOVE, SET } from "../constants/constants";
import { SingleCarProps } from "../reducers/cartReducer";

export interface SetItemsAction {
    type: string;
    payload: number;
}

export interface AddItemsAction {
    type: string;
    payload: SingleCarProps;
}

export interface RemoveItemsAction {
    type: string;
    payload: SingleCarProps;
}

export const setItems = (data: number): SetItemsAction => ({
    type: SET,
    payload: data,
});

export const addItems = (data: SingleCarProps): AddItemsAction => ({
    type: ADD,
    payload: data,
});

export const removeItems = (data: SingleCarProps): RemoveItemsAction => ({
    type: REMOVE,
    payload: data,
});
