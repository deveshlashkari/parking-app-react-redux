import { ADD, REMOVE } from "../constants/constants";

export const addItems = data => ({
    type: ADD,
    payload:data
});

export const removeItems = data => ({
    type: REMOVE,
    payload:data
});