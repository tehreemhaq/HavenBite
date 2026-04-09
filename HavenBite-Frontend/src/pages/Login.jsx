import { useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAuthContext } from '../context/AuthContext';

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const { loginUser } = useAuthContext()
  const navigate = useNavigate()
  const location = useLocation()

  const redirectMessage = location.state?.message
  const from = location.state?.from ?? "/"

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError(null) // clear error as user types
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!formData.username.trim() || !formData.password.trim()) {
      setError("Please fill in all fields.")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      await loginUser(formData)
      navigate(from, { replace: true })
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

      {/* Back to home */}
      <Link
        to="/"
        className="flex items-center gap-1.5 text-sm text-[#666] hover:text-[#2D5016] transition-colors duration-200 mb-8 self-start sm:self-auto sm:absolute sm:top-6 sm:left-8"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Back to Home
      </Link>

      {/* Lock icon */}
      <div className="w-12 h-12 bg-[#E8E2D9] rounded-xl flex items-center justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2D5016" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>

      <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">Welcome Back</h1>
      <p className="text-sm text-[#888] mb-4">Log in to your HavenBite account</p>

      {/* Redirect message — from protected action e.g. save recipe */}
      {redirectMessage && !error && (
        <div className="w-full max-w-md bg-[#FFF8F5] border border-[#C8572B]/30 rounded-xl px-5 py-3 mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8572B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
          </svg>
          <p className="text-sm text-[#C8572B] font-medium">{redirectMessage}</p>
        </div>
      )}

      {/* Error banner — handles both string and array */}
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

      {/* Form card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-[#E8E2D9] px-8 py-8 flex flex-col gap-5">

        {/* Username */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold tracking-widest uppercase text-[#555]">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            disabled={isSubmitting}
            className="w-full border border-[#E0DAD0] rounded-lg px-4 py-2.5 text-sm text-[#333] placeholder-[#bbb] bg-[#FAFAF8] focus:outline-none focus:ring-2 focus:ring-[#2D5016]/30 focus:border-[#2D5016] transition-all duration-200 disabled:opacity-50"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold tracking-widest uppercase text-[#555]">
              Password
            </label>
            <a href="/forgot-password" className="text-xs text-[#888] hover:text-[#2D5016] transition-colors duration-200">
              Forgot?
            </a>
          </div>
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

        {/* Submit */}
        <button
          onClick={loginHandler}
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 bg-[#2D5016] hover:bg-[#3a6b1e] text-white text-sm font-semibold py-3 rounded-lg transition-colors duration-200 mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
              Logging In...
            </>
          ) : (
            "Log In"
          )}
        </button>

        <p className="text-center text-sm text-[#888]">
          Don't have an account?{" "}
          <a href="/register" className="text-[#1a1a1a] font-semibold hover:text-[#2D5016] transition-colors duration-200">
            Register here
          </a>
        </p>

      </div>
    </div>
  );
}