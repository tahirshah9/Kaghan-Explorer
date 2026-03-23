import { Link, NavLink } from "react-router-dom";
import { Mountain, Menu, X, Phone } from "lucide-react";
import { useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Destinations", href: "/destinations" },
    { name: "Hotels", href: "/hotels" },
    { name: "Packages", href: "/packages" },
    { name: "Guide", href: "/guide" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-emerald-950/90 backdrop-blur-md border-b border-emerald-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <Mountain className="h-8 w-8 text-amber-400" />
            <span className="text-2xl font-bold text-white tracking-tight">
              Kaghan<span className="text-amber-400">Explorer</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) =>
                  cn(
                    "text-sm font-medium transition-colors hover:text-amber-400",
                    isActive ? "text-amber-400" : "text-emerald-100/80"
                  )
                }
              >
                {link.name}
              </NavLink>
            ))}
            <a
              href="https://wa.me/923000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-amber-400 text-emerald-950 px-4 py-2 rounded-full font-bold hover:bg-amber-300 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-emerald-100 hover:text-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-emerald-950 border-b border-emerald-900">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "block px-3 py-2 rounded-md text-base font-medium",
                    isActive
                      ? "bg-emerald-900 text-amber-400"
                      : "text-emerald-100 hover:bg-emerald-900/50 hover:text-amber-400"
                  )
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
