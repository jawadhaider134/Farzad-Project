import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function SocialLoginButtons({ onLoginSuccess, setError, error }) {
  const [loading, setLoading] = useState(false);

  // ✅ Google login (same as before)
  const loginGoogle = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (response) => {
      setLoading(true);
      setError && setError("");
      try {
        const { code } = response;
        const backendRes = await axios.post(
          "https://tashya-mendez.onrender.com/auth/code-exchange",
          { code },
          { headers: { "Content-Type": "application/json" } }
        );
        const data = backendRes.data;
        localStorage.setItem("user", JSON.stringify(data));
        onLoginSuccess && onLoginSuccess(data);
      } catch (err) {
        console.error("❌ Google login failed:", err.response?.data || err.message);
        setError("Google login failed. See console for details.");
      } finally {
        setLoading(false);
      }
    },
    onError: (err) => {
      console.error("⚠️ Google login failed:", err);
      setError("Google login failed. See console for details.");
    },
  });

  // ✅ Facebook login via popup (like your friend)
  const FACEBOOK_APP_ID = "815620764762000"; // use your app id
  const REDIRECT_URI = window.location.origin; // current domain

  const loginFacebook = () => {
    setError && setError("");
    setLoading(true);

    const fbAuthUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=email,public_profile&response_type=code`;

    const width = 600;
    const height = 700;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const popup = window.open(
      fbAuthUrl,
      "Facebook Login",
      `width=${width},height=${height},top=${top},left=${left}`
    );

    const interval = setInterval(() => {
      try {
        if (!popup || popup.closed) {
          clearInterval(interval);
          setLoading(false);
          return;
        }

        if (popup.location.href.startsWith(REDIRECT_URI)) {
          const url = new URL(popup.location.href);
          const code = url.searchParams.get("code");

          if (code) {
            popup.close();
            clearInterval(interval);
            exchangeFacebookCode(code);
          }
        }
      } catch {
        // ignore cross-origin errors until redirected
      }
    }, 500);
  };

  const exchangeFacebookCode = async (code) => {
    try {
      const res = await axios.post(
        "https://tashya-mendez.onrender.com/auth/facebook/",
        { code },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("✅ Facebook backend response:", res.data);

      // Store user info and tokens
      localStorage.setItem("user", JSON.stringify(res.data));
      // localStorage.setItem("access", res.data.access);
      // localStorage.setItem("refresh", res.data.refresh);

      onLoginSuccess && onLoginSuccess(res.data);
    } catch (err) {
      console.error("❌ Facebook login failed:", err.response?.data || err.message);
      setError(err.response?.data?.detail || "Facebook login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3 mb-6 flex flex-col items-center">
      <button
        className={`w-80 border rounded-md py-3 flex items-center gap-12 px-5 hover:bg-gray-50 ${
          loading ? "cursor-not-allowed opacity-70" : ""
        }`}
        onClick={() => loginGoogle()}
        disabled={loading}
      >
        <FaGoogle size={25} />
        <span>{loading ? "Logging in..." : "Sign up with Google"}</span>
      </button>

      <button
        className={`w-80 border rounded-md py-3 flex items-center gap-12 px-5 hover:bg-gray-50 ${
          loading ? "cursor-not-allowed opacity-70" : ""
        }`}
        onClick={loginFacebook}
        disabled={loading}
      >
        <FaFacebook size={25} />
        <span>{loading ? "Connecting..." : "Sign up with Facebook"}</span>
      </button>

      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    </div>
  );
}
