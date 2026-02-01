"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Menu, X, User, Bell, Compass, Film, TrendingUp, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home", icon: Compass },
    { href: "/browse", label: "Browse", icon: Sparkles },
    { href: "/movies", label: "Movies", icon: Film },
    { href: "/series", label: "Series", icon: TrendingUp },
    { href: "/popular", label: "Popular", icon: TrendingUp },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/browse?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#030014]/90 backdrop-blur-md py-3 shadow-2xl" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/" className="group flex items-center gap-2">
              <div className="relative">
                <span className="text-2xl font-black tracking-tighter text-white group-hover:text-purple-500 transition-colors">
                  KIRA
                </span>
                <span className="text-2xl font-light tracking-tighter text-gray-400 group-hover:text-white transition-colors">
                  ANIME
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-1 bg-purple-500 transition-all duration-300 group-hover:w-full" />
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-400 hover:text-white transition-all flex items-center gap-2 relative group"
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                  <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-purple-500 transition-all group-hover:w-full" />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden sm:block">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 lg:w-64 px-10 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:w-72 transition-all duration-300"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </form>
            </div>

            <button className="p-2 text-gray-400 hover:text-white transition-colors sm:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <Link
                href="/my-list"
                className="p-2 text-gray-400 hover:text-white transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full" />
              </Link>

              <Link
                href="/login"
                className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-full bg-white text-black text-sm font-bold hover:bg-purple-500 hover:text-white transition-all transform active:scale-95"
              >
                <User className="w-4 h-4" />
                Sign In
              </Link>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-white"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 p-4 bg-[#030014] border-b border-white/10 sm:hidden"
          >
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search anime..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-10 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                autoFocus
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#030014] z-50 p-8 shadow-2xl border-l border-white/10 md:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-black text-white">KiraAnime</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-4 text-xl font-medium text-gray-300 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <link.icon className="w-6 h-6 text-purple-500" />
                  {link.label}
                </Link>
              ))}
              <div className="pt-8 border-t border-white/10">
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-white text-black font-bold hover:bg-purple-500 hover:text-white transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  Sign In
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
