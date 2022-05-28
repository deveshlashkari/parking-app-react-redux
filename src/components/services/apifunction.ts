import axios from "axios";
import { BASE_URL } from "./constant";

export const GetRequest = async (url: string, params: string) => {
    let headers = {
        "Content-Type": "application/json",
    };
    const responce = await axios.get(`${BASE_URL}${url}`, { params, headers });
    return responce.data;
};
