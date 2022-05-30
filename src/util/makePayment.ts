import { SingleCarProps } from "../store/reducers/cartReducer";
import { calculateAmount } from ".";

export const makePayment = async (singleitem: SingleCarProps) => {
    let data = {
        "car-registration": singleitem.carnumber,
        charge: calculateAmount(singleitem),
    };

    try {
        const res = await fetch("https://httpstat.us/200", {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        });

        if (res.status === 200) {
            return true;
        } else {
            throw new Error("Payment Failed");
        }
    } catch (err: any) {
        return false;
    }
};
