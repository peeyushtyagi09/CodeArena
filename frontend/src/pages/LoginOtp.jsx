import React, { useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../auth/AuthContext";

export default function LoginOtp() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const request = async () => {
    await api.post("/login/otp/request", { email });
    setStep(2);
  };

  const verify = async () => {
    const r = await api.post("/login/otp/verify", { email, otp });
    login(r.data.accessToken, r.data.refreshToken);
  };

  return (
    <div className="max-w-sm mx-auto mt-20 space-y-4">
      {step === 1 && (
        <>
          <input className="input" placeholder="Email"
            onChange={e => setEmail(e.target.value)} />
          <button className="btn" onClick={request}>Send OTP</button>
        </>
      )}
      {step === 2 && (
        <>
          <input className="input" placeholder="OTP"
            onChange={e => setOtp(e.target.value)} />
          <button className="btn" onClick={verify}>Verify</button>
        </>
      )}
    </div>
  );
}
