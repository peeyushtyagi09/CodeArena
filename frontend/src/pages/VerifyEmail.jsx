import { useLocation } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";

export default function VerifyEmail() {
    const { state } = useLocation();
    const email = state?.email;
    const [otp, setotp] = useState("");
    const [msg, setMsg] = useState("");

    const submit = async e => {
        e.preventDefault();
        try {
            const r = await api.spot
        }
    }
}