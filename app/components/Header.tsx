import { useState } from 'react';
import { Bell, Search, MessageSquare, ChevronDown, User, Settings } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  userName: string;
  userRole?: string;
  userImage?: string;
  unreadNotifications?: number;
  unreadMessages?: number;
}

const Header: React.FC<HeaderProps> = ({
  userName,
  userRole = "Recruiter",
  userImage,
  unreadNotifications = 0,
  unreadMessages = 0
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 lg:px-6 sticky top-0 z-20 shadow-sm">
      {/* Left section - Page title */}
      <div className="flex-1 flex items-center">
        <h2 className="text-lg font-semibold text-gray-800 hidden md:block">Dashboard</h2>
        
        {/* Search bar */}
        <div className={`ml-4 relative ${showSearchInput ? 'flex-1 md:max-w-md' : 'w-auto'}`}>
          <div className="relative flex items-center">
            <button 
              onClick={toggleSearchInput}
              className={`text-gray-500 hover:text-indigo-600 transition-colors ${showSearchInput ? 'hidden' : 'block'} md:hidden`}
              title="Toggle search input"
            >
              <Search size={20} />
            </button>
            <div className={`relative ${showSearchInput ? 'block w-full' : 'hidden md:block md:w-64'}`}>
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Right section - Actions and profile */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
          <button 
            className="p-1 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-gray-100 transition-colors"
            title="View notifications"
          >
            <Bell size={20} />
            {unreadNotifications > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                {unreadNotifications > 9 ? '9+' : unreadNotifications}
              </span>
            )}
          </button>
          
          <button 
            className="p-1 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-gray-100 transition-colors"
            title="View messages"
          >
            <MessageSquare size={20} />
            {unreadMessages > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                {unreadMessages > 9 ? '9+' : unreadMessages}
              </span>
            )}
          </button>
                

        {/* User profile */}
        <div className="relative">
          <button 
            className="flex items-center space-x-2 focus:outline-none"
            onClick={toggleProfileMenu}
          >
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium overflow-hidden">
              {userImage ? (
                <img src={userImage} alt={userName} className="w-full h-full object-cover" />
              ) : (
                userName.charAt(0)
              )}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-700">{userName}</p>
              <p className="text-xs text-gray-500">{userRole}</p>
            </div>
            <ChevronDown size={16} className="text-gray-500" />
          </button>

          {/* Profile dropdown menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
              <Link href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <User size={16} className="mr-2" />
                Your Profile
              </Link>
              <Link href="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <Settings size={16} className="mr-2" />
                Settings
              </Link>
              <div className="border-t border-gray-200 my-1"></div>
              <Link href="/logout" className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;