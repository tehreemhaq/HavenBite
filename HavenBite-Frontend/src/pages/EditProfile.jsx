import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditProfileForm from "../components/EditProfile/EditProfileForm";
import { useAuthContext } from "../context/AuthContext";


export default function EditProfilePage() {
  const navigate = useNavigate();
  const { loggedInUser, isAuthLoading } = useAuthContext();

  if (isAuthLoading) {
    return (
      <main className="min-h-screen  bg-[#F5F2EB] flex items-center justify-center">
        <p className="text-[#6B7264] text-sm">Loading...</p>
      </main>
    );
  }

  if (!loggedInUser) {
    navigate("/login");
    return null;
  }

  return (
    <main className="min-h-screen w-full bg-[#F5F2EB] px-4 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="font-serif italic text-5xl text-[#2D5016] mb-3">
            Edit Profile
          </h1>
          <p className="text-[#6B7264] text-base leading-relaxed">
            Update your HavenBite account details and
            <br className="hidden sm:block" /> security settings below.
          </p>
        </div>

        {/* Form — receives current user data as initial values */}
        <EditProfileForm
          loggedInUser={loggedInUser}
          onBack={() => navigate("/profile")}
        />
      </div>
    </main>
  );
}