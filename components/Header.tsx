"use client";
//@ts-nocheck
import { useContext, useState } from "react";
import { Search, BookOpen, LogOut, LogIn } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppContext } from "@/context/AppContext";
import { logout } from "@/service/session";
import { useRouter } from "next/navigation";
export default function Header() {
  
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router =  useRouter()
  const [showPopover, setShowPopover] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useContext(AppContext);
  const isAuthRoute =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  if (isAuthRoute) {
    return null;
  }

  const handleLogin = () => {
    setIsLoggedIn(true);
    router.push("/sign-in")
  };

  const handleLogout = async() => {
    setIsLoggedIn(false);
    const res = await logout()
    if(res){
        router.push("/sign-in")
    }
    
    setShowPopover(false);
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const handleSubmit = (e) => {
    e.preventDefault()
    router.push(`/?query=${searchQuery}`)
    
  };

  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  const BlogLogo = () => (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="w-10 h-10"
    >
      <defs>
        <linearGradient id="blogGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#3b82f6" }} />
          <stop offset="100%" style={{ stopColor: "#8b5cf6" }} />
        </linearGradient>
      </defs>
      <rect
        x="25"
        y="15"
        width="50"
        height="70"
        rx="5"
        fill="url(#blogGradient)"
        stroke="white"
        strokeWidth="2"
      />
      <rect x="30" y="25" width="20" height="3" rx="1.5" fill="white" />
      <rect
        x="30"
        y="32"
        width="35"
        height="2"
        rx="1"
        fill="white"
        opacity="0.9"
      />
      <rect
        x="30"
        y="38"
        width="30"
        height="2"
        rx="1"
        fill="white"
        opacity="0.9"
      />
      <rect
        x="30"
        y="44"
        width="35"
        height="2"
        rx="1"
        fill="white"
        opacity="0.9"
      />
      <rect
        x="30"
        y="50"
        width="25"
        height="2"
        rx="1"
        fill="white"
        opacity="0.9"
      />
      <circle cx="15" cy="30" r="3" fill="#3b82f6" opacity="0.7" />
      <circle cx="85" cy="45" r="2" fill="#8b5cf6" opacity="0.7" />
      <circle cx="20" cy="70" r="2" fill="#3b82f6" opacity="0.5" />
    </svg>
  );

  return (
    <div className="bg-black">
      <header className="bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50 px-4 lg:px-8 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo Section */}
          <Link href="/"
          
            className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform duration-200"
          >
            <BlogLogo />
            <h1 className="hidden md:block text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              BlogY
            </h1>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-4 lg:mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <form onSubmit={handleSubmit}>
                <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-gray-800 transition-all duration-300 focus:shadow-lg focus:shadow-blue-500/20"
                placeholder="Search blogs title..."
              />
              </form>
            </div>
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {user?.name !== "" ? (
              <div className="relative">
                <div
                  className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer hover:scale-110 transition-transform duration-200 hover:shadow-lg hover:shadow-purple-500/30"
                  onClick={togglePopover}
                >
                  <p>{user?.name[0]}</p>
                </div>

                {/* Popover */}
                {showPopover && (
                  <div className="absolute top-12 right-0 w-48 bg-gray-800 border border-gray-600 rounded-lg shadow-xl py-2 transform transition-all duration-200">
                    <div className="absolute -top-2 right-5 w-4 h-4 bg-gray-800 border-l border-t border-gray-600 transform rotate-45"></div>
                    <p className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors duration-200 flex items-center gap-3">{user?.email}</p>
                    <Link
                      href="/myblogs"
                      className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors duration-200 flex items-center gap-3"
                    >
                      <BookOpen className="w-4 h-4" />
                      My Blogs
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors duration-200 flex items-center gap-3"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
              >
               <Link className="flex flex-row gap-2 items-center" href="/sign-in"> <LogIn className="w-4 h-4" />
                Login
                </Link>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Click outside to close popover */}
      {showPopover && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowPopover(false)}
        ></div>
      )}
    </div>
  );
}
