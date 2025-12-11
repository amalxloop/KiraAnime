"use client";

import Link from "next/link";
import { Github, Twitter, Instagram, Youtube } from "lucide-react";

export function Footer() {
  const footerLinks = {
    browse: [
      { label: "Trending", href: "/browse?filter=trending" },
      { label: "Popular", href: "/browse?filter=popular" },
      { label: "New Releases", href: "/browse?filter=new" },
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
    help: [
      { label: "FAQ", href: "/faq" },
      { label: "Contact Us", href: "/contact" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
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
    <footer className="border-t border-purple-500/20 bg-[#030014]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                KIRA
              </span>
              <span className="text-2xl font-light text-white">ANIME</span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Your ultimate destination for streaming anime. Watch thousands of titles in HD quality.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 rounded-full bg-white/5 hover:bg-purple-500/20 text-gray-400 hover:text-purple-400 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Browse</h3>
            <ul className="space-y-2">
              {footerLinks.browse.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-purple-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Genres</h3>
            <ul className="space-y-2">
              {footerLinks.genres.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-purple-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Help</h3>
            <ul className="space-y-2">
              {footerLinks.help.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-purple-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-purple-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            {new Date().getFullYear()} KiraAnime. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            This site does not store any files on its server. All contents are provided by non-affiliated third parties.
          </p>
        </div>
      </div>
    </footer>
  );
}
