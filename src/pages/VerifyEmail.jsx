import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// ✅ correct endpoint (NO /accounts, NO register)
const API_URL = "https://tashya-mendez.onrender.com/auth/registration/verify-email/";

export default function VerifyEmail() {
  const { key } = useParams(); // ✅ only key, not uid/token
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await axios.post(API_URL, {
          key,
        });

        setStatus("success");
        setMessage("✅ Your email has been verified successfully!");

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (err) {
        setStatus("error");

        setMessage(
          err.response?.data?.detail ||
          "Verification link is invalid or has expired."
        );
      }
    };

    if (key) {
      verifyEmail();
    }
  }, [key, navigate]);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f5f5f5",
    }}>
      <div style={{
        background: "#fff",
        padding: "40px",
        borderRadius: "10px",
        boxShadow: "0 5px 15px rgba(0,0,0,.1)",
        textAlign: "center",
        maxWidth: "450px",
        width: "100%",
      }}>
        <h2>Email Verification</h2>

        {status === "loading" && <p>⏳ {message}</p>}

        {status === "success" && (
          <>
            <p style={{ color: "green" }}>{message}</p>
            <p>Redirecting to login...</p>
          </>
        )}

        {status === "error" && (
          <>
            <p style={{ color: "red" }}>{message}</p>
            <button onClick={() => navigate("/login")}>
              Go to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}