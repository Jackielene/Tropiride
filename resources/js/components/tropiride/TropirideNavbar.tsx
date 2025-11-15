import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { FaCar, FaBars, FaTimes, FaUser, FaSignOutAlt, FaCog, FaComments } from "react-icons/fa"
import { Link, usePage } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ErrorBoundary from "@/components/ErrorBoundary"
import { SharedData } from "@/types"

interface TropirideNavbarProps {
  activeLink?: string;
}

export default function TropirideNavbar({ activeLink }: TropirideNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const { auth } = usePage<SharedData>().props
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  const isAuthenticated = auth.user && auth.user.id
  
  // Determine settings URL based on user role
  const isCustomer = auth.user?.role === 'customer'
  const settingsUrl = auth.user?.role === 'driver' 
    ? '/driver/settings/profile' 
    : '/settings/profile'
  const messagesUrl = '/tropiride/messages'

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const navLinks = [
    { href: "/", label: "Home", key: "home" },
    { href: "/tropiride/vehicles", label: "Book Now", key: "vehicles" },
    { href: "/tropiride/about", label: "About", key: "about" },
    { href: "/tropiride/contact", label: "Contact", key: "contact" },
    { href: "/tropiride/faq", label: "FAQ", key: "faq" },
  ]

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/50"
            >
              <FaCar className="text-white text-lg" />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Tropiride
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = activeLink === link.key;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-medium transition-colors relative group ${
                    isActive 
                      ? "text-cyan-600" 
                      : "text-gray-700 hover:text-cyan-600"
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                  <Button
                    variant="outline"
                    size="sm"
                      className="group gap-3 bg-white text-gray-800 border-2 border-gray-200 hover:!bg-gradient-to-r hover:!from-blue-50 hover:!to-cyan-50 hover:!border-cyan-400 hover:!shadow-[0_0_15px_rgba(34,211,238,0.5),0_0_30px_rgba(34,211,238,0.3)] hover:!text-gray-900 transition-all duration-300 cursor-pointer rounded-full px-4 py-2.5 h-auto"
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  >
                      <div className="relative">
                        <ErrorBoundary>
                          <Avatar className="w-8 h-8 border-2 border-gray-200 group-hover:border-cyan-400 transition-all duration-300 shadow-sm group-hover:shadow-md">
                            <AvatarImage 
                              src={auth.user.avatar_url || ''} 
                              alt={auth.user.name}
                              className="object-cover"
                            />
                            <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white text-xs font-bold shadow-sm">
                              {auth.user.name
                                ? auth.user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
                                : <FaUser className="w-4 h-4" />}
                            </AvatarFallback>
                          </Avatar>
                        </ErrorBoundary>
                        {/* Online status indicator */}
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full shadow-sm"></div>
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="font-semibold text-sm leading-tight group-hover:text-gray-900 transition-colors">
                          {auth.user.name?.split(" ")[0] || "User"}
                        </span>
                        <span className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors hidden sm:block">
                          View Profile
                        </span>
                      </div>
                      <motion.div
                        animate={{ rotate: isProfileDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-400 group-hover:text-cyan-600 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                  </Button>
                  </motion.div>
                  
                  {/* Dropdown Menu */}
                  {isProfileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                    >
                      {/* User Info Header */}
                      <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-br from-cyan-50 via-blue-50 to-cyan-50">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <ErrorBoundary>
                              <Avatar className="w-12 h-12 border-3 border-cyan-300 shadow-lg ring-2 ring-cyan-100">
                                <AvatarImage 
                                  src={auth.user.avatar_url || ''} 
                                  alt={auth.user.name}
                                  className="object-cover"
                                />
                                <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white text-base font-bold">
                                  {auth.user.name
                                    ? auth.user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
                                    : <FaUser className="w-6 h-6" />}
                                </AvatarFallback>
                              </Avatar>
                            </ErrorBoundary>
                            {/* Online status indicator */}
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full shadow-lg flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-base font-bold text-gray-900 truncate mb-0.5">{auth.user.name}</p>
                            <p className="text-xs text-gray-600 truncate mb-1">{auth.user.email}</p>
                            <div className="flex items-center gap-1">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              <span className="text-xs text-green-700 font-medium">Online</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Menu Items */}
                      <div className="py-2">
                      <Link
                        href="/tropiride/profile"
                          className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:text-cyan-700 transition-all duration-200 group/item"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                          <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center mr-3 group-hover/item:bg-cyan-200 transition-colors">
                            <FaUser className="w-4 h-4 text-cyan-600" />
                          </div>
                          <span className="font-medium">My Profile</span>
                      </Link>
                      {isCustomer && (
                        <Link
                          href={messagesUrl}
                          className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:text-cyan-700 transition-all duration-200 group/item"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3 group-hover/item:bg-cyan-200 transition-colors">
                            <FaComments className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="font-medium">Messages</span>
                        </Link>
                      )}
                      <Link
                        href={settingsUrl}
                          className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:text-cyan-700 transition-all duration-200 group/item"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center mr-3 group-hover/item:bg-cyan-200 transition-colors">
                            <FaCog className="w-4 h-4 text-gray-600 group-hover/item:text-cyan-600" />
                          </div>
                          <span className="font-medium">Settings</span>
                      </Link>
                        <hr className="my-2 border-gray-200" />
                      <Link
                        href="/logout"
                        method="post"
                          className="flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-700 transition-all duration-200 group/item"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                          <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center mr-3 group-hover/item:bg-red-200 transition-colors">
                            <FaSignOutAlt className="w-4 h-4 text-red-600" />
                          </div>
                          <span className="font-medium">Logout</span>
                      </Link>
                      </div>
                    </motion.div>
                  )}
                </div>
                
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" size="sm" className="gap-2 bg-cyan-50 hover:bg-cyan-50 border-cyan-200 text-cyan-600 hover:text-cyan-600 cursor-pointer">
                    <FaUser className="w-4 h-4" />
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-blue-600 gap-2 cursor-pointer">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <FaTimes className="w-6 h-6 text-gray-700" /> : <FaBars className="w-6 h-6 text-gray-700" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-gray-200 bg-white"
        >
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => {
              const isActive = activeLink === link.key;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-2 rounded-lg transition-colors font-medium ${
                    isActive
                      ? "text-cyan-600 bg-cyan-50"
                      : "text-gray-700 hover:bg-cyan-50 hover:text-cyan-600"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-3 space-y-2">
              {isAuthenticated ? (
                <>
                  {/* Mobile User Info */}
                  <div className="px-2 py-3 bg-gradient-to-r from-cyan-50/50 to-blue-50/50 rounded-lg mb-2">
                    <div className="flex items-center space-x-3">
                      <ErrorBoundary>
                        <Avatar className="w-10 h-10 border-2 border-cyan-200 shadow-sm">
                          <AvatarImage 
                            src={auth.user.avatar_url || ''} 
                            alt={auth.user.name}
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white text-sm font-semibold">
                            {auth.user.name
                              ? auth.user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
                              : <FaUser className="w-5 h-5" />}
                          </AvatarFallback>
                        </Avatar>
                      </ErrorBoundary>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{auth.user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{auth.user.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Link href="/tropiride/profile" className="block" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full gap-2 bg-white text-black border-gray-300 hover:bg-gray-50 hover:border-gray-400 cursor-pointer">
                      <FaUser className="w-4 h-4" />
                      Profile
                    </Button>
                  </Link>
                  {isCustomer && (
                    <Link href={messagesUrl} className="block" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full gap-2 bg-white text-black border-gray-300 hover:bg-gray-50 hover:border-gray-400 cursor-pointer">
                        <FaComments className="w-4 h-4" />
                        Messages
                      </Button>
                    </Link>
                  )}
                  <Link href={settingsUrl} className="block" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full gap-2 bg-transparent">
                      <FaCog className="w-4 h-4" />
                      Settings
                    </Button>
                  </Link>
                  <Link href="/logout" method="post" className="block" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full gap-2 bg-transparent text-red-600 border-red-200 hover:bg-red-50">
                      <FaSignOutAlt className="w-4 h-4" />
                      Logout
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login" className="block" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full gap-2 bg-cyan-50 hover:bg-cyan-50 border-cyan-200 text-cyan-600 hover:text-cyan-600 cursor-pointer">
                      <FaUser className="w-4 h-4" />
                      Login
                    </Button>
                  </Link>
                  <Link href="/register" className="block" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 cursor-pointer">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  )
}
