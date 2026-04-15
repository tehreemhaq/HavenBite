import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { CheckCircle, XCircle, Loader } from "lucide-react"
import { useAuthContext } from "../context/AuthContext"

const REDIRECT_DELAY = 10000 // ms before auto redirect to login

export default function EmailVerification() {
  const { token } = useParams()
  const { verifyEmail } = useAuthContext()
  const navigate = useNavigate()

  const [status, setStatus] = useState("loading") // "loading" | "success" | "error"
  const [message, setMessage] = useState("")
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    const verify = async () => {
      try {
        const data = await verifyEmail(token)
        setMessage(data?.message || "Email verified successfully.")
        setStatus("success")
      } catch (err) {
        setMessage(
          err.response?.data?.message || "This link is invalid or has expired."
        )
        setStatus("error")
      }
    }

    verify()
  }, [token])

  // Start countdown and redirect once status resolves
  useEffect(() => {
    if (status === "loading") return

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          navigate("/login")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [status, navigate])

  return (
    <div className="min-h-screen w-full bg-[#FAF9F3] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-[#E8E2D9] shadow-md w-full max-w-sm px-8 py-10 flex flex-col items-center gap-6 text-center">

        {/* Loading state */}
        {status === "loading" && (
          <>
            <div className="w-16 h-16 rounded-full bg-[#F5F2EC] border border-[#E8E2D9] flex items-center justify-center">
              <Loader size={28} strokeWidth={1.8} color="#2D5016" className="animate-spin" />
            </div>
            <div className="flex flex-col gap-1.5">
              <h2 className="text-lg font-bold text-[#1a1a1a]" style={{ fontFamily: "'Georgia', serif" }}>
                Verifying your email...
              </h2>
              <p className="text-sm text-[#888]">Please wait a moment.</p>
            </div>
          </>
        )}

        {/* Success state */}
        {status === "success" && (
          <>
            <div className="w-16 h-16 rounded-full bg-[#F0F7EA] border border-[#2D5016]/20 flex items-center justify-center">
              <CheckCircle size={28} strokeWidth={1.8} color="#2D5016" />
            </div>
            <div className="flex flex-col gap-1.5">
              <h2 className="text-lg font-bold text-[#1a1a1a]" style={{ fontFamily: "'Georgia', serif" }}>
                Email Verified!
              </h2>
              <p className="text-sm text-[#666] leading-relaxed">{message}</p>
            </div>
            <div className="w-full h-px bg-[#E8E2D9]" />
            <p className="text-xs text-[#999]">
              Redirecting to login in <span className="font-semibold text-[#2D5016]">{countdown}s</span>...
            </p>
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-[#2D5016] hover:bg-[#3a6b1e] text-white text-sm font-semibold py-3 rounded-lg transition-colors duration-200"
            >
              Go to Login Now
            </button>
          </>
        )}

        {/* Error state */}
        {status === "error" && (
          <>
            <div className="w-16 h-16 rounded-full bg-[#FFF8F5] border border-[#C8572B]/20 flex items-center justify-center">
              <XCircle size={28} strokeWidth={1.8} color="#C8572B" />
            </div>
            <div className="flex flex-col gap-1.5">
              <h2 className="text-lg font-bold text-[#1a1a1a]" style={{ fontFamily: "'Georgia', serif" }}>
                Verification Failed
              </h2>
              <p className="text-sm text-[#666] leading-relaxed">{message}</p>
            </div>
            <div className="w-full h-px bg-[#E8E2D9]" />
            <p className="text-xs text-[#999]">
              Redirecting to login in <span className="font-semibold text-[#C8572B]">{countdown}s</span>...
            </p>
            <button
              onClick={() => navigate("/login")}
              className="w-full border border-[#E8E2D9] hover:border-[#2D5016] text-[#555] hover:text-[#2D5016] text-sm font-semibold py-3 rounded-lg transition-colors duration-200"
            >
              Go to Login
            </button>
          </>
        )}

      </div>
    </div>
  )
}