import { useState } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, Mail } from "lucide-react";
import axiosInstance from "../../api/axios.js";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await axiosInstance.post("/user/forgot-password", { email });
      setSent(true);
    } catch (err) {
      const serverError = err?.response?.data;
      if (serverError?.details?.length) {
        setError(serverError.details[0]);
      } else {
        setError(serverError?.message || "Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF9F3] flex flex-col items-center justify-center px-4 py-12">

      {/* Back link */}
      <Link
        to="/login"
        className="flex items-center gap-1.5 text-sm text-[#666] hover:text-[#2D5016] transition-colors duration-200 mb-8 self-start sm:self-auto sm:absolute sm:top-6 sm:left-8"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Back to Login
      </Link>

      {/* Icon */}
      <div className="w-12 h-12 bg-[#E8E2D9] rounded-xl flex items-center justify-center mb-6">
        <Mail size={22} color="#2D5016" strokeWidth={1.8} />
      </div>

      {!sent ? (
        <>
          <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">Forgot Password?</h1>
          <p className="text-sm text-[#888] mb-8 text-center max-w-sm">
            Enter the email address linked to your account and we'll send you a reset link.
          </p>

          {/* Error banner */}
          {error && (
            <div className="w-full max-w-md flex items-start gap-2.5 bg-[#FFF8F5] border border-[#C8572B]/30 rounded-xl px-5 py-3 mb-4">
              <AlertCircle size={16} strokeWidth={2} color="#C8572B" className="shrink-0 mt-0.5" />
              <p className="text-sm text-[#C8572B] font-medium">{error}</p>
            </div>
          )}

          {/* Form card */}
          <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-[#E8E2D9] px-8 py-8 flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold tracking-widest uppercase text-[#555]">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter your registered email"
                disabled={isSubmitting}
                className="w-full border border-[#E0DAD0] rounded-lg px-4 py-2.5 text-sm text-[#333] placeholder-[#bbb] bg-[#FAFAF8] focus:outline-none focus:ring-2 focus:ring-[#2D5016]/30 focus:border-[#2D5016] transition-all duration-200 disabled:opacity-50"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-[#2D5016] hover:bg-[#3a6b1e] text-white text-sm font-semibold py-3 rounded-lg transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>

            <p className="text-center text-sm text-[#888]">
              Remembered it?{" "}
              <Link to="/login" className="text-[#1a1a1a] font-semibold hover:text-[#2D5016] transition-colors duration-200">
                Log in
              </Link>
            </p>
          </div>
        </>
      ) : (
        /* ── Sent confirmation — in-place state swap ── */
        <>
          <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">Check your inbox</h1>
          <p className="text-sm text-[#888] mb-8 text-center max-w-sm leading-relaxed">
            If an account is linked to <span className="font-semibold text-[#333]">{email}</span>, a password reset link has been sent. It expires in 1 hour.
          </p>

          <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-[#E8E2D9] px-8 py-8 flex flex-col gap-4 text-center">
            {/* Checkmark */}
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <p className="text-sm text-[#666] leading-relaxed">
              Didn't receive it? Check your spam folder or{" "}
              <button
                onClick={() => { setSent(false); }}
                className="text-[#2D5016] font-semibold hover:underline"
              >
                try again
              </button>
              .
            </p>

            <Link
              to="/login"
              className="w-full flex items-center justify-center bg-[#2D5016] hover:bg-[#3a6b1e] text-white text-sm font-semibold py-3 rounded-lg transition-colors duration-200"
            >
              Back to Login
            </Link>
          </div>
        </>
      )}
    </div>
  );
}