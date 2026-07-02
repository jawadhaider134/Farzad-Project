import { useState } from "react";
import axios from "axios";

export default function ForgotPasswordForm({ switchTab }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async () => {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      await axios.post(
        "https://tashya-mendez.onrender.com/auth/password/reset",
        {
          email,
        }
      );

      setMessage("Password reset email sent successfully. Please check your inbox.");
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Failed to send reset email. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full text-center space-y-6">
      <p className="text-gray-700 text-sm max-w-sm">
        Enter your email address and we’ll send you a link to reset your password.
      </p>

      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-80 border border-gray-400 rounded-md px-3 py-3 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
      />

      <button
        type="button"
        onClick={handleReset}
        disabled={loading}
        className="w-80 bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-900 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </button>

      {message && (
        <p className="w-80 text-green-600 text-sm">{message}</p>
      )}

      {error && (
        <p className="w-80 text-red-600 text-sm">{error}</p>
      )}

      <p className="text-sm text-gray-600">
        No account?{" "}
        <button
          type="button"
          onClick={() => switchTab("register")}
          className="underline text-black font-medium"
        >
          Register now
        </button>
      </p>
    </div>
  );
}