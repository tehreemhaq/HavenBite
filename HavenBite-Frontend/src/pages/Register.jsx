import React from 'react'
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext';
import VerificationOverlay from "../components/Register/VerificationSentOverlay"  // 👈 import

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [overlayMessage, setOverlayMessage] = useState(null) // 👈 replaces success boolean

  const { registerUser } = useAuthContext()
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError(null)
  };

  const registerHandler = async (e) => {
    e.preventDefault();

    if (!formData.username.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError("Please fill in all fields.")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await registerUser(formData)
      // Show overlay with the exact message from backend
      setOverlayMessage(response?.data?.message || "User registered successfully. Please check your inbox for email verification.")
    } catch (err) {
      const responseData = err.response?.data
      if (responseData?.details?.length > 0) {
        setError(responseData.details)
      } else {
        setError(responseData?.message || "Something went wrong. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF9F3] flex flex-col items-center justify-center px-4 py-12">

      {/* Overlay — mounts on top when registration succeeds */}
      {overlayMessage && (
        <VerificationOverlay
          message={overlayMessage}
          onContinue={() => navigate('/login')}
        />
      )}

      <Link
        to="/"
        className="flex items-center gap-1.5 text-sm text-[#666] hover:text-[#2D5016] transition-colors duration-200 mb-8 self-start sm:self-auto sm:absolute sm:top-6 sm:left-8"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Back to Home
      </Link>

      <div className="w-12 h-12 bg-[#2D5016] rounded-xl flex items-center justify-center mb-6">
        <svg width="22" height="22" viewBox="0 0 18 18" fill="none">
          <path d="M4 2v5c0 1.1.9 2 2 2v7h2v-7c1.1 0 2-.9 2-2V2H8v4H6V2H4z" fill="white" />
          <path d="M13 2c-1.66 0-3 1.34-3 3v4h2v5h2V2h-1z" fill="white" />
        </svg>
      </div>

      <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">Create your account</h1>
      <p className="text-sm text-[#888] mb-6">Sign up to save and revisit your generated Halal recipes anytime.</p>

      {/* Error banner */}
      {error && (
        <div className="w-full max-w-md flex items-start gap-2.5 bg-[#FFF8F5] border border-[#C8572B]/30 rounded-xl px-5 py-3 mb-4">
          <AlertCircle size={16} strokeWidth={2} color="#C8572B" className="shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            {Array.isArray(error)
              ? error.map((msg, i) => (
                  <p key={i} className="text-sm text-[#C8572B] font-medium">{msg}</p>
                ))
              : <p className="text-sm text-[#C8572B] font-medium">{error}</p>
            }
          </div>
        </div>
      )}

      <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-[#E8E2D9] px-8 py-8 flex flex-col gap-5">

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#333]">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="johndoe"
            disabled={isSubmitting}
            className="w-full border border-[#E0DAD0] rounded-lg px-4 py-2.5 text-sm text-[#333] placeholder-[#bbb] bg-[#FAFAF8] focus:outline-none focus:ring-2 focus:ring-[#2D5016]/30 focus:border-[#2D5016] transition-all duration-200 disabled:opacity-50"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#333]">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@example.com"
            disabled={isSubmitting}
            className="w-full border border-[#E0DAD0] rounded-lg px-4 py-2.5 text-sm text-[#333] placeholder-[#bbb] bg-[#FAFAF8] focus:outline-none focus:ring-2 focus:ring-[#2D5016]/30 focus:border-[#2D5016] transition-all duration-200 disabled:opacity-50"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#333]">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              disabled={isSubmitting}
              className="w-full border border-[#E0DAD0] rounded-lg px-4 pr-11 py-2.5 text-sm text-[#333] placeholder-[#bbb] bg-[#FAFAF8] focus:outline-none focus:ring-2 focus:ring-[#2D5016]/30 focus:border-[#2D5016] transition-all duration-200 disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aaa] hover:text-[#2D5016] transition-colors duration-200"
            >
              {showPassword ? <EyeOff size={16} strokeWidth={1.8} /> : <Eye size={16} strokeWidth={1.8} />}
            </button>
          </div>
        </div>

        <button
          onClick={registerHandler}
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 bg-[#2D5016] hover:bg-[#3a6b1e] text-white text-sm font-semibold py-3 rounded-lg transition-colors duration-200 mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
              Creating Account...
            </>
          ) : (
            <>
              Create Account
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>

        <p className="text-center text-sm text-[#888]">
          Already have an account?{" "}
          <a href="/login" className="text-[#1a1a1a] font-semibold hover:text-[#2D5016] transition-colors duration-200">
            Log In
          </a>
        </p>

      </div>
    </div>
  );
}

export default Register