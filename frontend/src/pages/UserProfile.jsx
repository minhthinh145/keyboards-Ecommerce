import { useState, useEffect } from "react";
import { useUserProfile } from "../hooks/userProfile.js";
import { SideBar } from "../components/UserProfile/SideBar.jsx";
import React from "react";

export const UserProfile = () => {
  const { user, loading, error } = useUserProfile();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="min-h-screen *:flex items-center justify-center bg-indigo-50 px-16 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl w-full bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Side Bar*/}
        <SideBar />
      </div>
    </div>
  );
};
