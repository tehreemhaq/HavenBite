import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import axiosInstance from "../../api/axios";
import AccountIdentitySection from "./AccountIdentitySection";
import SecuritySection from "./SecuritySection";
import FormError from "./FormError";

export default function EditProfileForm({ loggedInUser, onBack }) {
  const { updateLoggedInUser } = useAuthContext();

  const [accountData, setAccountData] = useState({
    username: loggedInUser?.username || "",
    email: loggedInUser?.email || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNew: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [emailPending, setEmailPending] = useState(false)  // email change pending verification
  const [isLoading, setIsLoading] = useState(false);

  const handleAccountChange = (field, value) => {
    setError(null);
    setSuccess(false);
    setEmailPending(false);
    setAccountData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field, value) => {
    setError(null);
    setSuccess(false);
    setPasswordData((prev) => ({ ...prev, [field]: value }));
  };

  const buildPayload = () => {
    const payload = {};

    if (accountData.username !== loggedInUser?.username) {
      payload.username = accountData.username;
    }
    if (accountData.email !== loggedInUser?.email) {
      payload.email = accountData.email;
    }
    if (passwordData.currentPassword) {
      payload.currentPassword = passwordData.currentPassword;
      payload.newPassword = passwordData.newPassword;
      payload.confirmNew = passwordData.confirmNew;
    }

    return payload;
  };

  const handleSubmit = async () => {
    const payload = buildPayload();
    console.log(payload)

    if (Object.keys(payload).length === 0) {
      setError("No changes detected.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);
    setEmailPending(false);

    try {
      const response = await axiosInstance.put("/user/update-profile", payload);
      const { user, emailVerificationPending } = response.data.data

      // Sync context with updated user (username may have changed)
      updateLoggedInUser(user);

      if (emailVerificationPending) {
        // Email change needs verification — show info banner, reset email field back
        setEmailPending(true)
        setAccountData((prev) => ({ ...prev, email: loggedInUser?.email }))
      } else {
        setSuccess(true);
      }

      setPasswordData({ currentPassword: "", newPassword: "", confirmNew: "" });

    } catch (err) {
      const serverError = err?.response?.data;
      console.log("error in updating profile", serverError);

      if (serverError?.details?.length) {
        // Validation errors — array of strings in details
        setError(serverError.details);
      } else {
        // Single message errors (wrong password, duplicate username, etc.)
        setError(serverError?.message || "Something went wrong.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* Error Banner */}
      {error && <FormError message={error} />}

      {/* Success Banner */}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3 text-center">
          Changes saved successfully.
        </div>
      )}

      {/* Email Pending Verification Banner */}
      {emailPending && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded-xl px-4 py-3 text-center leading-relaxed">
          A verification link has been sent to your new email address.
          <br />
          Your email will update once you confirm it.
        </div>
      )}

      <AccountIdentitySection
        data={accountData}
        onChange={handleAccountChange}
      />

      <SecuritySection
        data={passwordData}
        onChange={handlePasswordChange}
      />

      <div className="flex flex-col items-center gap-4 pt-4">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full sm:w-64 bg-[#2D5016] hover:bg-[#3a6b1e] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium tracking-wide py-4 rounded-xl transition-colors duration-200"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>

        <button
          onClick={onBack}
          className="text-[#6B7264] hover:text-[#2C3A2A] text-sm flex items-center gap-1.5 transition-colors duration-200"
        >
          <span>←</span>
          <span>Back to Profile</span>
        </button>
      </div>
    </div>
  );
}