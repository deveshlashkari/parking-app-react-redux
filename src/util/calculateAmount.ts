import { SingleCarProps } from "../store/reducers/cartReducer";

// return the total amount based on total hours
export const calculateAmount = (singleitem: SingleCarProps) => {
    const date1 = new Date(singleitem!.cartiming);
    const date2 = new Date();

    var diff = date2.getTime() - date1.getTime();

    var msec = diff;
    var hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    var mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    if (hh >= 2 && mm !== 0) {
        return 20 + (hh - 2) * 10;
    }
    return 10;
};
