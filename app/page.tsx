'use client';

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { useState } from "react";

export default function Home() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen w-full flex">
      <Sidebar appName="myApp" isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col flex-1">
        <Header userName="Ayush"/>
        <main className="flex-1 p-6 bg-gray-50">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          <p className="mt-4 text-gray-600">Welcome to your dashboard!</p>
          {/* Add your main content here */}
          </main>
      </div>
    </div>
  );
}
