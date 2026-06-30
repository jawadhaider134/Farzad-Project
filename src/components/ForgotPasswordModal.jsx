import { useState } from "react";
import axios from "axios";
import { AiOutlineClose, AiOutlineArrowLeft } from "react-icons/ai";

export default function ForgotPasswordModal({ open, onClose, onBack }) {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSending(true);
    setSuccess("");
    setError("");

    try {
      await axios.post(
        "https://your-backend.onrender.com/auth/password/reset/",
        {
          email,
        }
      );

      setSuccess(
        "Password reset link has been sent to your email."
      );

      setEmail("");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "Failed to send reset link. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-[400px] rounded-lg shadow-lg relative">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <button onClick={onBack}>
            <AiOutlineArrowLeft size={20} />
          </button>

          <h2 className="text-lg font-semibold">
            Forgot your password?
          </h2>

          <button onClick={onClose}>
            <AiOutlineClose size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="px-6 py-6 flex flex-col gap-4"
        >
          <p className="text-sm text-gray-600 text-center">
            Please enter an email address and we will send you a
            link to reset your password.
          </p>

          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            disabled={sending}
            className="w-full bg-black text-white py-2 rounded-md font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? "Sending..." : "Reset Password"}
          </button>

          {success && (
            <p className="text-green-600 text-sm text-center">
              {success}
            </p>
          )}

          {error && (
            <p className="text-red-600 text-sm text-center">
              {error}
            </p>
          )}
        </form>

        <div className="border-t px-6 py-4 text-center text-sm">
          No account yet?{" "}
          <button className="text-black font-medium hover:underline">
            Register now
          </button>
        </div>
      </div>
    </div>
  );
}