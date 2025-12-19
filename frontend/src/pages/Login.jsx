import React, { useContext, useState } from "react";
import api from "../api/api";
import { AuthContext } from "../auth/AuthContext";

export default function Login() {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(" ");
    const [msg, setMsg] = useState("");

    const submit = async e => {
        e.preventDefault();
        try {
            const r = await api.post("/login", { email, password });
            login(r.data.accessToken, r.data.refreshToken);
        }catch(e) {
            setMsg(e.response?.data.error)
        }
    };

    return (
        <form onSubmit={submit} className="max-w-sm mx-auto mt-20 space-y-4">
      <h1 className="text-xl font-semibold">Login</h1>
      <input className="input" placeholder="Email"
        onChange={e => setEmail(e.target.value)} />
      <input className="input" type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)} />
      <button className="btn">Login</button>
      {msg && <p className="text-red-500">{msg}</p>}
    </form>
    )
}