import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GeneratedRecipeResult from "./pages/Recipe";
import Profile from "./pages/Profile";
import EmailVerification from "./pages/VerifyEmail";
import EditProfilePage from "./pages/EditProfile";
import VerifyNewEmail from "./pages/VerifyNewEmail";
import ForgotPassword from "./components/EditProfile/ForgotPassword";
import ResetPassword from "./components/EditProfile/ResetPassword";
import NotFound from "./components/ErrorPages/NotFound";
import ServerError from "./components/ErrorPages/ServerError";

// Reads the reason passed via navigation state so RecipeContext
// can distinguish between a generic server error and an AI service error
function ServerErrorWrapper() {
  const location = useLocation();
  const reason = location.state?.reason || "server";
  return <ServerError reason={reason} />;
}

const App = () => {
  return (
    <Routes>
      {/* Pages WITH navbar + footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/recipe" element={<GeneratedRecipeResult />} />
      </Route>

      {/* Pages WITHOUT navbar + footer */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user/verify-email/:token" element={<EmailVerification />} />
        <Route path="/profile/edit" element={<EditProfilePage />} />
        <Route path="/user/verify-new-email/:token" element={<VerifyNewEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

       
        <Route path="/error" element={<ServerErrorWrapper />} />

        {/* 404 — must be the very last route, catches all unmatched URLs */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;