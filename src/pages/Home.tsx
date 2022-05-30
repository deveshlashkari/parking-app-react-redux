import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setItems } from "../store/actions/caraction";
import { Box, Typography } from "@mui/material";

export default function Home() {
    const [space, setSpace] = useState("");
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const validate = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        e.preventDefault();
        if (Number(space) < 1) {
            toast.error("Minimum number is 1");
            return;
        }
        
        dispatch(setItems(Number(space)));
        navigate("parkingspace", { state: space });
    };

    return (
        <Box>
            <Header />
            <Box className="main">
                <Box className="form">
                    <Typography variant="h5" fontWeight={600}>Enter your required space</Typography>
                    <Box component="form">
                        <input
                            type="number"
                            name="space"
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
                    </Box>
                </Box>
            </Box>
            <ToastContainer />
        </Box>
    );
}
