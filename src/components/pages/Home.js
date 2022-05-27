import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import { ToastContainer, toast } from 'react-toastify';

export default function Home() {
    const [space, setSpace] = useState("");
    const state = useSelector(state => state);
    let navigate = useNavigate();

    const validate = (e) => {
        console.log("Hello")
        e.preventDefault();
        if (space == ""){
            toast.error(`Plese enter parking space.`);
        } else if (space > state.carregister.cardata.length){
            toast.error(`Toatal parking spaces ${state.carregister.cardata.length}. Please enter the valid space.`);
        } else {
            navigate("parkingspace")
        }
    };

    return (
        <div>
            <Header />
            <div className='main'>
                <div className='form'>
                    <h2>Enter your required space.</h2>
                    <form>
                        <input type="number" name="space" min={1} value={space} onChange={(e) => setSpace(e.target.value)} placeholder="Enter your required parking space." /><br />
                        <input type="submit" value="Submit" onClick={(e) => validate(e)} />
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
