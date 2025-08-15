import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FiHome, FiHeart, FiCalendar, FiUser, FiSearch, FiMenu, FiX, FiBookmark } from 'react-icons/fi'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Navbar */}
      <header className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-gradient-to-r from-purple-800 to-blue-700 shadow-2xl' : 'bg-gradient-to-r from-purple-900 to-blue-800'}`}>
        <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group"
            onClick={() => setOpen(false)}
          >
            <div className="relative">
              <div className={`absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-500 ${scrolled ? 'opacity-50' : 'opacity-75'}`}></div>
              <img 
                src="/images/logo.png" 
                alt="Ghar.com" 
                className="relative w-10 h-10 transition-all duration-300"
              />
            </div>
            <span className={`text-2xl font-bold tracking-tight transition-colors duration-300 text-white`}>
              Ghar<span className="text-yellow-400">.com</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all duration-300 ${isActive ? 
                  'bg-white/20 text-white font-medium shadow-lg' : 
                  'text-white/90 hover:text-white hover:bg-white/10'}`
              }
            >
              <FiHome className="text-lg" />
              <span>Home</span>
            </NavLink>
            <NavLink 
              to="/listings" 
              className={({ isActive }) => 
                `px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all duration-300 ${isActive ? 
                  'bg-white/20 text-white font-medium shadow-lg' : 
                  'text-white/90 hover:text-white hover:bg-white/10'}`
              }
            >
              <FiSearch className="text-lg" />
              <span>Properties</span>
            </NavLink>
            <NavLink 
              to="/favourites" 
              className={({ isActive }) => 
                `px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all duration-300 ${isActive ? 
                  'bg-white/20 text-white font-medium shadow-lg' : 
                  'text-white/90 hover:text-white hover:bg-white/10'}`
              }
            >
              <FiBookmark className="text-lg" />
              <span>Favourites</span>
            </NavLink>
            <NavLink 
              to="/history" 
              className={({ isActive }) => 
                `px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all duration-300 ${isActive ? 
                  'bg-white/20 text-white font-medium shadow-lg' : 
                  'text-white/90 hover:text-white hover:bg-white/10'}`
              }
            >
              <FiCalendar className="text-lg" />
              <span>Bookings</span>
            </NavLink>
            <NavLink 
              to="/profile" 
              className={({ isActive }) => 
                `px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all duration-300 ${isActive ? 
                  'bg-white/20 text-white font-medium shadow-lg' : 
                  'text-white/90 hover:text-white hover:bg-white/10'}`
              }
            >
              <FiUser className="text-lg" />
              <span>Profile</span>
            </NavLink>
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => navigate('/listings')} 
              className="px-5 py-2.5 rounded-lg font-medium bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 shadow-lg hover:shadow-xl hover:opacity-90 transition-all duration-300 flex items-center gap-2"
            >
              <FiSearch />
              <span>Find a Home</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setOpen(!open)} 
            className={`md:hidden p-2.5 rounded-lg transition-all duration-300 bg-white/10 text-white hover:bg-white/20`}
          >
            <span className="sr-only">Toggle Menu</span>
            {open ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-500 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div 
            className={`absolute top-0 right-0 h-full w-80 bg-gradient-to-b from-purple-900 to-blue-800 shadow-2xl transform transition-transform duration-500 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <Link 
                  to="/" 
                  className="flex items-center gap-2"
                  onClick={() => setOpen(false)}
                >
                  <img src="/images/logo.png" alt="Ghar.com" className="w-10 h-10" />
                  <span className="text-2xl font-bold text-white">
                    Ghar<span className="text-yellow-400">.com</span>
                  </span>
                </Link>
                <button 
                  onClick={() => setOpen(false)} 
                  className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20"
                >
                  <FiX size={24} />
                </button>
              </div>

              <nav className="flex-1 flex flex-col gap-2">
                <NavLink 
                  to="/" 
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => 
                    `px-4 py-3 rounded-lg flex items-center gap-3 text-white transition-all ${isActive ? 'bg-white/20 font-medium' : 'hover:bg-white/10'}`
                  }
                >
                  <FiHome className="text-xl" />
                  <span>Home</span>
                </NavLink>
                <NavLink 
                  to="/listings" 
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => 
                    `px-4 py-3 rounded-lg flex items-center gap-3 text-white transition-all ${isActive ? 'bg-white/20 font-medium' : 'hover:bg-white/10'}`
                  }
                >
                  <FiSearch className="text-xl" />
                  <span>Properties</span>
                </NavLink>
                <NavLink 
                  to="/favourites" 
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => 
                    `px-4 py-3 rounded-lg flex items-center gap-3 text-white transition-all ${isActive ? 'bg-white/20 font-medium' : 'hover:bg-white/10'}`
                  }
                >
                  <FiBookmark className="text-xl" />
                  <span>Favourites</span>
                </NavLink>
                <NavLink 
                  to="/history" 
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => 
                    `px-4 py-3 rounded-lg flex items-center gap-3 text-white transition-all ${isActive ? 'bg-white/20 font-medium' : 'hover:bg-white/10'}`
                  }
                >
                  <FiCalendar className="text-xl" />
                  <span>Bookings</span>
                </NavLink>
                <NavLink 
                  to="/profile" 
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => 
                    `px-4 py-3 rounded-lg flex items-center gap-3 text-white transition-all ${isActive ? 'bg-white/20 font-medium' : 'hover:bg-white/10'}`
                  }
                >
                  <FiUser className="text-xl" />
                  <span>Profile</span>
                </NavLink>
              </nav>

              <div className="mt-auto pt-6 border-t border-white/20">
                <button 
                  onClick={() => {
                    navigate('/listings')
                    setOpen(false)
                  }} 
                  className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <FiSearch />
                  <span>Find a Home</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from being hidden behind fixed navbar */}
      <div className="h-20"></div>
    </>
  )
}