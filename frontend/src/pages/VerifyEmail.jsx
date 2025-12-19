import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import api from "../api/api";

export default function VerifyEmail() {
    const { state } = useLocation();
    const email = state?.email;
    const [otp, setOtp] = useState("");
    const [msg, setMsg] = useState("");

    const submit = async e => {
        e.preventDefault();
        try {
            const r = await api.post("/verify/confirm", {email, otp});
            localStorage.setItem("accessToken", r.data.accessToken);
            localStorage.setItem("refreshToken", r.data.refreshToken);
            setMsg("Verified. You can login now. ");
        }catch (e) {
            setMsg(e.response?.data?.error);
        }
    };

    return (
       <form onSubmit={submit} className="max-w-sm mx-auto mt-20 space-y-4">
        <h1 className="text-xl font-semibold">Verify Email</h1>
        <input className="input"
                type="text"
                inputMode="numeric"
                pattern="[0-0]"
                value={otp}
                placeholder="OTP"
                onChange={e => {
                    const val = e.target.value;
                    if(val === '' || /^[0-9\b]+$/.test(val)){
                        setOtp(val);
                    }
                }} />
        <button className="btn"> Verify </button>
        {msg && <p>{msg}</p>}
       </form>
    )
}