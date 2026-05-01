import { Link, useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { CarFront, LogOut, LayoutDashboard, PlusCircle, ScanLine, Menu, X, FolderOpen } from "lucide-react"

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Check for token instead of user
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)
  }, [location.pathname])

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    navigate("/")
  }

  const navLinks = [
    { name: "Dashboard", path: "/home", icon: <LayoutDashboard size={18} /> },
    { name: "Register Vehicle", path: "/form", icon: <PlusCircle size={18} /> },
    { name: "Scan QR", path: "/scan", icon: <ScanLine size={18} /> },
    { name: "Parking Status", path: "/parking-status", icon: <CarFront size={18} /> },
    { name: "Directory", path: "/directory", icon: <FolderOpen size={18} /> },
  ]

  return (
    <nav className="bg-slate-900 border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => navigate(isLoggedIn ? "/home" : "/")}>
            <CarFront className="text-indigo-500" size={28} />
            <span className="text-white font-bold text-xl tracking-tight">ParkMatrix</span>
          </div>

          {/* Desktop Navigation */}
          {isLoggedIn ? (
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? "bg-indigo-500/10 text-indigo-400"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.icon}
                  <span className="hidden xl:inline">{link.name}</span>
                </Link>
              ))}
              
              <div className="w-px h-6 bg-white/10 mx-2"></div>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors ml-2"
              >
                <LogOut size={18} />
                <span className="hidden xl:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="hidden lg:flex items-center">
              <Link
                to="/"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-indigo-500/20"
              >
                Sign In / Register
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-300 hover:text-white p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-800 border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isLoggedIn ? (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium ${
                      location.pathname === link.path
                        ? "bg-indigo-500/20 text-indigo-400"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-red-400 hover:bg-red-500/10 w-full text-left mt-4"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center px-3 py-3 rounded-md text-base font-medium bg-indigo-600 text-white"
              >
                Sign In / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar