import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import { ToastContainer, toast } from "react-toastify";
import { CarRegisterProps } from "../store";
import { Typography } from "@mui/material";

export default function Home() {
    const [space, setSpace] = useState("");
    const state = useSelector((state) => state) as CarRegisterProps;
    let navigate = useNavigate();

    // Return total free spaces
    const getFreeSpaces = () => {
        return state.carregister.cardata.length -
            state.carregister.cardata.filter(
                (val) => val.available === false
            ).length;
    }

    const validate = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        e.preventDefault();
        if (Number(space) > state.carregister.cardata.length) {
            toast.error(
                `Toatal parking spaces ${getFreeSpaces()}. Please enter the valid space.`
            );
        } else {
            navigate("parkingspace", { state: space });
        }
    };

    return (
        <div>
            <Header />
            <div className="main">
                <div className="form">
                    <h2>Enter your required space.</h2>
                    <form>
                        <input
                            type="number"
                            name="space"
                            min={1}
                            value={space}
                            onChange={(e) => setSpace(e.target.value)}
                            placeholder="Enter your required parking space."
                        />
                        <br />
                        <input
                            type="submit"
                            value="Submit"
                            onClick={(e) => validate(e)}
                            disabled={!space}
                        />
                    </form>
                    <Typography component="p">Total Space Avaliable - {getFreeSpaces()}</Typography>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
