import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "https://tashya-mendez.onrender.com/auth/password/reset/confirm/";
// Example:
// https://aboutyou-api.up.railway.app/auth/password/reset/confirm/

export default function ResetPassword() {
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (newPassword1 !== newPassword2) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(API_URL, {
        uid,
        token,
        new_password1: newPassword1,
        new_password2: newPassword2,
      });

      setMessage("Password has been reset successfully.");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      if (err.response?.data) {
        setError(JSON.stringify(err.response.data));
      } else {
        setError("Something went wrong.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center mb-2">
          Reset Password
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Enter your new password.
        </p>

        {message && (
          <div className="mb-4 rounded bg-green-100 text-green-700 p-3">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 rounded bg-red-100 text-red-700 p-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              New Password
            </label>

            <input
              type="password"
              className="w-full border rounded-lg p-3"
              value={newPassword1}
              onChange={(e) => setNewPassword1(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium">
              Confirm Password
            </label>

            <input
              type="password"
              className="w-full border rounded-lg p-3"
              value={newPassword2}
              onChange={(e) => setNewPassword2(e.target.value)}
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-3 font-semibold"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

        </form>
      </div>
    </div>
  );
}