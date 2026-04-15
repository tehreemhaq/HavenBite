import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";

export default function VerifyNewEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading"); // "loading" | "success" | "error"
  const [message, setMessage] = useState("");

  useEffect(() => {
    const confirmNewEmail = async () => {
      try {
        const response = await axiosInstance.get(`/user/verify-new-email/${token}`);
        setStatus("success");
        setMessage(response.data.message || "Email address updated successfully.");
      } catch (err) {
        setStatus("error");
        setMessage(
          err?.response?.data?.message || "This link is invalid or has expired."
        );
      }
    };

    if (token) {
      confirmNewEmail();
    } else {
      setStatus("error");
      setMessage("Verification token is missing.");
    }
  }, [token]);

  return (
    <main className="min-h-screen w-full bg-[#F5F2EB] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-[#DDD9CF] p-10 max-w-md w-full text-center space-y-5">

        {status === "loading" && (
          <>
            <div className="w-10 h-10 border-2 border-[#3B5036] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-[#6B7264] text-sm">Confirming your new email...</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="font-serif italic text-2xl text-[#2C3A2A]">Email Updated</h1>
            <p className="text-[#6B7264] text-sm leading-relaxed">{message}</p>
            <p className="text-[#6B7264] text-xs">
              Please log in again for the changes to take effect.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-[#3B5036] hover:bg-[#2C3A2A] text-white text-sm font-medium py-3 rounded-xl transition-colors duration-200"
            >
              Go to Login
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="font-serif italic text-2xl text-[#2C3A2A]">Link Expired</h1>
            <p className="text-[#6B7264] text-sm leading-relaxed">{message}</p>
            <button
              onClick={() => navigate("/profile/edit")}
              className="w-full bg-[#3B5036] hover:bg-[#2C3A2A] text-white text-sm font-medium py-3 rounded-xl transition-colors duration-200"
            >
              Back to Edit Profile
            </button>
          </>
        )}

      </div>
    </main>
  );
}