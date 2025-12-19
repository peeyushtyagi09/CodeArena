import api from "../api/axios";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export default function Dashboard() {
  const { logout } = useContext(AuthContext);

  const logoutEverywhere = async () => {
    try {
      await api.post("/logout-everywhere");
      logout();
    } catch {
      logout();
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 space-y-4">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <p>You are authenticated.</p>

      <button
        className="btn bg-red-600"
        onClick={logoutEverywhere}
      >
        Logout Everywhere
      </button>
    </div>
  );
}
