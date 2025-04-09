// components/Sidebar.tsx

import Link from 'next/link';
import { Menu, X, LayoutDashboard, Users, FileText, Calendar, BarChart2, Settings, HelpCircle } from 'lucide-react';

// Define the structure for navigation items
interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

// Props interface
interface SidebarProps {
  appName: string;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ appName, isOpen, toggleSidebar }) => {
  // Main menu items
  const mainNavItems: NavItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Applicants', href: '/applicants', icon: <Users size={20} /> },
    { name: 'Job Listings', href: '/jobListing', icon: <FileText size={20} /> },
    { name: 'Calendar', href: '/calendar', icon: <Calendar size={20} /> },
    { name: 'Analytics', href: '/analytics', icon: <BarChart2 size={20} /> },
  ];

  // Support menu items
  const supportNavItems: NavItem[] = [
    { name: 'Settings', href: '/settings', icon: <Settings size={20} /> },
    { name: 'Help', href: '/help', icon: <HelpCircle size={20} /> },
  ];

  return (
    <>
      {/* Overlay when sidebar is open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static z-30 h-full bg-white shadow-lg transition-all duration-300 ease-in-out overflow-y-auto flex flex-col ${
          isOpen ? 'w-64 left-0' : 'w-0 -left-64 md:w-64 md:left-0'
        }`}
      >
        {/* App logo/name and toggle button container */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h1 className="text-indigo-600 font-bold text-2xl">
            {appName}
          </h1>
          <button
            className="text-gray-500 hover:text-indigo-600 transition-colors p-1 rounded-full hover:bg-gray-100 lg:hidden"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation sections */}
        <nav className="flex-1">
          {/* Main menu section */}
          <div className="py-6">
            <p className="px-6 text-xs uppercase font-semibold text-gray-400 mb-4 tracking-wider">
              MAIN MENU
            </p>
            <ul className="space-y-1">
              {mainNavItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center py-3 px-6 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md mx-2 transition-all duration-200 group"
                  >
                    <span className="text-gray-500 group-hover:text-indigo-600 transition-colors">{item.icon}</span>
                    <span className="ml-3 font-medium">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support section */}
          <div className="py-6">
            <p className="px-6 text-xs uppercase font-semibold text-gray-400 mb-4 tracking-wider">
              SUPPORT
            </p>
            <ul className="space-y-1">
              {supportNavItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center py-3 px-6 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md mx-2 transition-all duration-200 group"
                  >
                    <span className="text-gray-500 group-hover:text-indigo-600 transition-colors">{item.icon}</span>
                    <span className="ml-3 font-medium">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* User profile */}
        <div className="mt-auto p-6 border-t border-gray-100">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium shadow-sm mr-3">
              JD
            </div>
            <div>
              <p className="font-medium text-gray-800">John Doe</p>
              <p className="text-sm text-gray-500">john.doe@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hamburger menu button - only visible when sidebar is closed */}
      {!isOpen && (
        <button
          className="fixed top-4 left-4 z-40 p-2 rounded-full bg-white text-indigo-600 hover:bg-indigo-50 transition-colors lg:hidden"
          onClick={toggleSidebar}
          aria-label="Open sidebar"
        >
          <Menu size={24} />
        </button>
      )}
    </>
  );
};

export default Sidebar;