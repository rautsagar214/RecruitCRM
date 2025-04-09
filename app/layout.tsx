"use client";

import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "./components/Sidebar"; // Adjust path if needed
import Header from "./components/Header"; // Adjust path if needed
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Add sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex h-screen">
          <Sidebar 
            appName="Recruit Pro" 
            isOpen={sidebarOpen} 
            toggleSidebar={toggleSidebar} 
          />
          <div className="flex flex-col flex-1">
            <Header userName="Ayush" />
            <main className="flex-1 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}