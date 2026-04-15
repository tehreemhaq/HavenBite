import { CheckCircle, Mail } from "lucide-react";

export default function VerificationOverlay({ message, onContinue }) {
  return (
    // Full screen backdrop
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(26,26,26,0.5)", backdropFilter: "blur(4px)" }}
    >
      <div className="bg-white rounded-2xl border border-[#E8E2D9] shadow-xl w-full max-w-sm px-8 py-8 flex flex-col items-center gap-5 text-center">

        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-[#F0F7EA] border border-[#2D5016]/20 flex items-center justify-center">
          <Mail size={28} strokeWidth={1.8} color="#2D5016" />
        </div>

        {/* Title */}
        <div className="flex flex-col gap-1.5">
          <h2 className="text-lg font-bold text-[#1a1a1a]"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Check your inbox
          </h2>
          {/* Message from backend */}
          <p className="text-sm text-[#666] leading-relaxed">{message}</p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#E8E2D9]" />

        {/* Info note */}
        <div className="flex items-start gap-2.5 bg-[#FFF8F5] border border-[#C8572B]/20 rounded-xl px-4 py-3 w-full text-left">
          <CheckCircle size={14} strokeWidth={2} color="#C8572B" className="shrink-0 mt-0.5" />
          <p className="text-xs text-[#C8572B] leading-relaxed">
            The verification link expires in <strong>24 hours</strong>. Check your spam folder if you don't see it.
          </p>
        </div>

        {/* CTA */}
        {/* <button
          onClick={onContinue}
          className="w-full bg-[#2D5016] hover:bg-[#3a6b1e] text-white text-sm font-semibold py-3 rounded-lg transition-colors duration-200"
        >
          Go to Login
        </button> */}

      </div>
    </div>
  );
}