import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import axiosInstance from "../../api/axios";

export default function DeleteAccountButton() {
  const { logout, loggedInUser } = useAuthContext();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);
    try {
      await axiosInstance.delete("/user/delete-account");
      await logout();
      navigate("/", { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong. Please try again.");
      setIsDeleting(false);
    }
  };

  return (
    <>
      {/* Subtle trigger */}
      <div className="flex justify-center pt-6 pb-10">
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="text-xs text-[#bbb] hover:text-red-400 transition-colors duration-200 underline underline-offset-2"
        >
          Delete account
        </button>
      </div>

      {/* Overlay modal — mirrors UnsaveConfirmModal pattern */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: "rgba(45, 40, 35, 0.45)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget && !isDeleting) setShowModal(false);
          }}
        >
          <div className="bg-white rounded-2xl border border-[#E8E2D9] p-7 max-w-sm w-full shadow-xl">

            {/* Header row — icon + close button */}
            <div className="flex items-start justify-between mb-5">
              <div className="w-10 h-10 bg-[#FBF0EC] border border-[#F0C4B4] rounded-xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C8572B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  <path d="M10 11v6M14 11v6" />
                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                </svg>
              </div>

              <button
                type="button"
                onClick={() => { if (!isDeleting) { setShowModal(false); setError(null); } }}
                className="text-[#bbb] hover:text-[#555] transition-colors duration-150 mt-0.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Title */}
            <h2 className="text-base font-bold text-[#1a1a1a] mb-2">
              Delete Account?
            </h2>

            {/* Description — username in bold, matches recipe modal pattern */}
            <p className="text-sm text-[#666] leading-relaxed mb-5">
              Are you sure you want to permanently delete{" "}
              <span className="font-semibold text-[#1a1a1a]">
                "{loggedInUser?.username}"
              </span>
              ? This will remove your account and all saved recipes and cannot be undone.
            </p>

            {/* Error */}
            {error && (
              <p className="text-xs text-red-500 mb-4">{error}</p>
            )}

            {/* Actions — side by side, matches Keep It / Yes Unsave pattern */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => { setShowModal(false); setError(null); }}
                disabled={isDeleting}
                className="flex-1 border border-[#E8E2D9] hover:border-[#c5bfb8] text-[#444] text-sm font-medium py-3 rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Keep It
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 bg-[#C8572B] hover:bg-[#b34d25] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold py-3 rounded-xl transition-colors duration-200"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}