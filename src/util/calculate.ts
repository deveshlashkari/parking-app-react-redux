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

export const calculateTime = (singleitem: SingleCarProps) => {
    const date1 = new Date(singleitem!.cartiming);
    const date2 = new Date();

    var diff = date2.getTime() - date1.getTime();

    var msec = diff;
    var hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    var mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;

    if (mm < 1 && hh < 1) {
        return "Your total time spend is less than 1 minute.";
    }
    if(mm >= 1 && hh < 1) {
        return `Your total time spend is ${mm} minutes.`;
    }
    if (hh === 0 && mm > 0) {
        return "You total time spend is " + mm + " minutes.";
    }
    if (mm === 0 && hh > 0) {
        return "You total time spend is " + hh + " hours.";
    }
    return "You total time spend is " + hh + " hours and " + mm + " minutes.";
};
