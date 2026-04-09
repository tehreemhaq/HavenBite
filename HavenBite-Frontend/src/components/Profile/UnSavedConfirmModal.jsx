import { Trash2, X } from "lucide-react";

export default function UnsaveConfirmModal({ recipeName, onConfirm, onCancel, isDeleting }) {
  return (
    // Backdrop
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-[#1a1a1a]/40 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl border border-[#E8E2D9] w-full max-w-sm px-6 py-6 flex flex-col gap-4 z-10">

        {/* Close */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-[#bbb] hover:text-[#555] transition-colors"
        >
          <X size={16} strokeWidth={2} />
        </button>

        {/* Icon */}
        <div className="w-10 h-10 rounded-full bg-[#FFF8F5] border border-[#C8572B]/20 flex items-center justify-center">
          <Trash2 size={16} strokeWidth={2} color="#C8572B" />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-bold text-[#1a1a1a]">Unsave Recipe?</h3>
          <p className="text-xs text-[#888] leading-relaxed">
            Are you sure you want to unsave{" "}
            <span className="font-semibold text-[#1a1a1a]">"{recipeName}"</span>?
            This will permanently delete it from your saved recipes and cannot be undone.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-1">
          <button
            onClick={onCancel}
            className="flex-1 border border-[#E8E2D9] text-[#555] text-xs font-semibold py-2.5 rounded-lg hover:border-[#ccc] transition-colors"
          >
            Keep It
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 bg-[#C8572B] hover:bg-[#a0431f] text-white text-xs font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-60"
          >
            {isDeleting ? "Removing..." : "Yes, Unsave"}
          </button>
        </div>

      </div>
    </div>
  );
}