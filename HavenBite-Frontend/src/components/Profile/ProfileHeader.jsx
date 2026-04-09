import { Mail, Pencil, LogOut } from "lucide-react";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProfileHeader() {
  const { loggedInUser, logout } = useAuthContext();
  const navigate = useNavigate();

  const getInitial = (username) => username?.charAt(0).toUpperCase() ?? "?";

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log("logout failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 py-10">

      {/* Avatar */}
      <div className="w-20 h-20 rounded-full bg-[#2D5016] flex items-center justify-center shadow-md">
        <span className="text-3xl font-bold text-white" style={{ fontFamily: "'Georgia', serif" }}>
          {getInitial(loggedInUser?.username)}
        </span>
      </div>

      {/* Name + email */}
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-3xl font-bold text-[#1a1a1a] capitalize" style={{ fontFamily: "'Georgia', serif" }}>
          {loggedInUser?.username}
        </h1>
        <div className="flex items-center gap-1.5 text-[#888] text-sm">
          <Mail size={13} strokeWidth={1.8} />
          <span>{loggedInUser?.email}</span>
        </div>
      </div>

      {/* Action buttons — Edit Profile + Logout side by side */}
      <div className="flex items-center gap-3">
        {/* <button className="inline-flex items-center gap-2 bg-[#2D5016] hover:bg-[#3a6b1e] text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors duration-200">
          <Pencil size={12} strokeWidth={2.5} />
          Edit Profile
        </button> */}

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 bg-white border border-[#E8E2D9] hover:border-[#C8572B] text-[#C8572B] text-xs font-semibold px-5 py-2.5 rounded-full transition-colors duration-200"
        >
          <LogOut size={12} strokeWidth={2.5} />
          Log Out
        </button>
      </div>

    </div>
  );
}