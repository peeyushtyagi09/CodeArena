import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [msg, setMsg] = useState("");
    const nav = useNavigate();

    const submit = async e => {
        e.preventDefault();
        try{
            await api.post("/register", { email, password });
            nav("/verify", { state: {email } });
        }catch (e) {
            setMsg(e.response?.data?.error);
        }
    };

    return (
        <from onSubmit={submit} className="max-w-sm mx-auto mt-20 space-y-4">
            <h1 className="text-xl font-semibold">Register</h1>
            <input className="input" placeholder="Email" onChnage={e => setEmail(e.target.value)} />
            <input  className="input" placeholder="password" onChnage={e => setpassword(e.target.value)}/>
            <button className="btn" > Create account</button>
            {msg && <p className="text-red-500">{msg}</p>}
        </from>
    )
}