import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setItems } from "../store/actions/caraction";

export default function Home() {
    const [space, setSpace] = useState("");
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const validate = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        e.preventDefault();
        dispatch(setItems(Number(space)));
        navigate("parkingspace", { state: space });
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
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
