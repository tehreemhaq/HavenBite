import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import axiosInstance from "../../api/axios.js";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ newPassword: "", confirmPassword: "" });
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.newPassword || !formData.confirmPassword) {
      setError("Please fill in both fields.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await axiosInstance.post(`/user/reset-password/${token}`, formData);
      setSuccess(true);
    } catch (err) {
      const serverError = err?.response?.data;
      if (serverError?.details?.length) {
        setError(serverError.details);
      } else {
        setError(serverError?.message || "Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Success state ────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="min-h-screen w-full bg-[#FAF9F3] flex flex-col items-center justify-center px-4 py-12">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">Password Reset</h1>
        <p className="text-sm text-[#888] mb-8 text-center max-w-sm leading-relaxed">
          Your password has been updated successfully. You can now log in with your new password.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="w-full max-w-md flex items-center justify-center bg-[#2D5016] hover:bg-[#3a6b1e] text-white text-sm font-semibold py-3 rounded-lg transition-colors duration-200"
        >
          Go to Login
        </button>
      </div>
    );
  }

  // ── Form state ───────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen w-full bg-[#FAF9F3] flex flex-col items-center justify-center px-4 py-12">

      {/* Lock icon */}
      <div className="w-12 h-12 bg-[#E8E2D9] rounded-xl flex items-center justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2D5016" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>

      <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">Set New Password</h1>
      <p className="text-sm text-[#888] mb-8 text-center max-w-sm">
        Choose a strong password for your HavenBite account.
      </p>

      {/* Error banner */}
      {error && (
        <div className="w-full max-w-md flex items-start gap-2.5 bg-[#FFF8F5] border border-[#C8572B]/30 rounded-xl px-5 py-3 mb-4">
          <AlertCircle size={16} strokeWidth={2} color="#C8572B" className="shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            {Array.isArray(error)
              ? error.map((msg, i) => <p key={i} className="text-sm text-[#C8572B] font-medium">{msg}</p>)
              : <p className="text-sm text-[#C8572B] font-medium">{error}</p>
            }
          </div>
        </div>
      )}

      {/* Form card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-[#E8E2D9] px-8 py-8 flex flex-col gap-5">

        {/* New Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold tracking-widest uppercase text-[#555]">
            New Password
          </label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="••••••••"
              disabled={isSubmitting}
              className="w-full border border-[#E0DAD0] rounded-lg px-4 pr-11 py-2.5 text-sm text-[#333] placeholder-[#bbb] bg-[#FAFAF8] focus:outline-none focus:ring-2 focus:ring-[#2D5016]/30 focus:border-[#2D5016] transition-all duration-200 disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowNew((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aaa] hover:text-[#2D5016] transition-colors duration-200"
            >
              {showNew ? <EyeOff size={16} strokeWidth={1.8} /> : <Eye size={16} strokeWidth={1.8} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold tracking-widest uppercase text-[#555]">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              disabled={isSubmitting}
              className="w-full border border-[#E0DAD0] rounded-lg px-4 pr-11 py-2.5 text-sm text-[#333] placeholder-[#bbb] bg-[#FAFAF8] focus:outline-none focus:ring-2 focus:ring-[#2D5016]/30 focus:border-[#2D5016] transition-all duration-200 disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aaa] hover:text-[#2D5016] transition-colors duration-200"
            >
              {showConfirm ? <EyeOff size={16} strokeWidth={1.8} /> : <Eye size={16} strokeWidth={1.8} />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 bg-[#2D5016] hover:bg-[#3a6b1e] text-white text-sm font-semibold py-3 rounded-lg transition-colors duration-200 mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
              Resetting...
            </>
          ) : (
            "Reset Password"
          )}
        </button>

        <p className="text-center text-sm text-[#888]">
          Remembered it?{" "}
          <Link to="/login" className="text-[#1a1a1a] font-semibold hover:text-[#2D5016] transition-colors duration-200">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}