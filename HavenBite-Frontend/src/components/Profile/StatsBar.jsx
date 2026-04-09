import { useAuthContext } from "../../context/AuthContext";

export default function StatsBar({ totalSaved }) {
  const { loggedInUser } = useAuthContext();

  return (
    <div className="bg-white border border-[#E8E2D9] rounded-2xl px-6 py-5 flex items-center justify-between mb-8 shadow-sm">
      <div className="flex flex-col gap-0.5">
        <p className="text-[10px] font-bold tracking-widest uppercase text-[#2D5016]">
          Community Activity
        </p>
        <p className="text-sm font-bold text-[#1a1a1a]">Total Saved Recipes</p>
        <p className="text-xs text-[#999]">@{loggedInUser?.username}</p>
      </div>

      {/* Count badge */}
      <div className="w-12 h-12 rounded-xl bg-[#E8F0E0] border border-[#c5d9b0] flex items-center justify-center">
        <span className="text-lg font-bold text-[#2D5016]">{totalSaved}</span>
      </div>
    </div>
  );
}