import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import axiosInstance from "../../api/axios";
import ProfileFormInput from "./ProfileFormInput";

export default function SecuritySection({ data, onChange }) {
  const { loggedInUser } = useAuthContext();

  const [resetStatus, setResetStatus] = useState("idle"); // "idle" | "sending" | "sent" | "error"

  const handleForgotPassword = async () => {
    if (!loggedInUser?.email) return;
    setResetStatus("sending");
    try {
      await axiosInstance.post("/user/forgot-password", { email: loggedInUser.email });
      setResetStatus("sent");
    } catch {
      setResetStatus("error");
    }
  };

  return (
    <section className="bg-white rounded-2xl border border-[#DDD9CF] overflow-hidden">
      {/* Section Header */}
      <div className="flex items-center gap-4 px-6 py-4">
        <div className="flex-1 h-px bg-[#DDD9CF]" />
        <h2 className="font-serif italic text-lg text-[#4A5244] whitespace-nowrap">
          Security &amp; Password
        </h2>
        <div className="flex-1 h-px bg-[#DDD9CF]" />
      </div>

      {/* Fields */}
      <div className="px-6 pb-6 space-y-5">

        {/* Current Password + forgot link */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-semibold tracking-widest text-[#8A9183] uppercase">
              Current Password
            </label>

            {/* Forgot password — fires reset email to logged-in user's email */}
            {resetStatus === "idle" && (
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-xs text-[#8A9183] hover:text-[#2C3A2A] transition-colors duration-200"
              >
                Forgot?
              </button>
            )}
            {resetStatus === "sending" && (
              <span className="text-xs text-[#8A9183]">Sending...</span>
            )}
            {resetStatus === "sent" && (
              <span className="text-xs text-green-600 font-medium">Reset link sent ✓</span>
            )}
            {resetStatus === "error" && (
              <span className="text-xs text-red-500">Failed — try again</span>
            )}
          </div>

          <input
            id="currentPassword"
            type="password"
            placeholder="••••••••"
            value={data.currentPassword}
            onChange={(e) => onChange("currentPassword", e.target.value)}
            className="w-full bg-[#F9F7F3] border border-[#DDD9CF] rounded-xl px-4 py-3.5 text-sm text-[#2C3A2A] placeholder-[#B5B0A6] focus:outline-none focus:ring-2 focus:ring-[#3B5036]/30 focus:border-[#3B5036] transition-all duration-200"
          />
        </div>

        {/* New + Confirm side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ProfileFormInput
            label="New Password"
            type="password"
            id="newPassword"
            placeholder="Enter new"
            value={data.newPassword}
            onChange={(e) => onChange("newPassword", e.target.value)}
          />
          <ProfileFormInput
            label="Confirm New"
            type="password"
            id="confirmNew"
            placeholder="Confirm new"
            value={data.confirmNew}
            onChange={(e) => onChange("confirmNew", e.target.value)}
          />
        </div>

      </div>
    </section>
  );
}