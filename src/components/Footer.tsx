"use client";

import Link from "next/link";
import { Github, Twitter, Instagram, Youtube, Heart, Sparkles } from "lucide-react";

export function Footer() {
  const footerLinks = {
    browse: [
      { label: "Trending", href: "/browse?filter=trending" },
      { label: "Popular", href: "/browse?filter=popular" },
      { label: "New Added", href: "/browse?filter=new" },
      { label: "Movies", href: "/movies" },
      { label: "Series", href: "/series" },
    ],
    genres: [
      { label: "Action", href: "/browse?genre=action" },
      { label: "Romance", href: "/browse?genre=romance" },
      { label: "Comedy", href: "/browse?genre=comedy" },
      { label: "Fantasy", href: "/browse?genre=fantasy" },
      { label: "Horror", href: "/browse?genre=horror" },
    ],
    community: [
      { label: "Discord", href: "#" },
      { label: "Reddit", href: "#" },
      { label: "Twitter", href: "#" },
      { label: "Support", href: "/contact" },
    ],
    legal: [
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
      { label: "DMCA", href: "/dmca" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "Youtube" },
    { icon: Github, href: "#", label: "Github" },
  ];

  return (
    <footer className="relative bg-[#030014] border-t border-white/5 pt-24 pb-12 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="group inline-flex items-center gap-2 mb-8">
              <span className="text-3xl font-black tracking-tighter text-white group-hover:text-purple-500 transition-colors">
                KIRA
              </span>
              <span className="text-3xl font-light tracking-tighter text-gray-400 group-hover:text-white transition-colors">
                ANIME
              </span>
            </Link>
            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-sm">
              The ultimate destination for anime enthusiasts. Experience seamless streaming in stunning high definition.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-600 hover:border-purple-500 transition-all group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-black tracking-wider uppercase text-xs mb-8 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-500" />
              Browse
            </h3>
            <ul className="space-y-4">
              {footerLinks.browse.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-white transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-black tracking-wider uppercase text-xs mb-8 flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500" />
              Community
            </h3>
            <ul className="space-y-4">
              {footerLinks.community.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-white transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-black tracking-wider uppercase text-xs mb-8 flex items-center gap-2">
              Legal
            </h3>
            <ul className="space-y-4">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-white transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
            <span>© {new Date().getFullYear()}</span>
            <span className="text-white font-bold tracking-tighter">KIRAANIME</span>
            <span>• Built with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            <span>for fans</span>
          </div>
          
          <p className="text-gray-600 text-[10px] max-w-md text-center md:text-right uppercase tracking-widest font-bold leading-loose">
            KiraAnime does not store any files on its server. All contents are provided by non-affiliated third parties.
          </p>
        </div>
      </div>
    </footer>
  );
}
