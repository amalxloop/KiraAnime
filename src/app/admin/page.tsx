"use client";

import { useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { allAnime } from "@/lib/animeData";
import {
  LayoutDashboard,
  Film,
  Users,
  MessageSquare,
  Settings,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  Star,
  BarChart3,
  Upload,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Film, label: "Content", href: "/admin/content" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: MessageSquare, label: "Comments", href: "/admin/comments" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

const stats = [
  { label: "Total Anime", value: "2,456", change: "+12%", icon: Film, color: "purple" },
  { label: "Active Users", value: "45.2K", change: "+8%", icon: Users, color: "blue" },
  { label: "Total Views", value: "1.2M", change: "+23%", icon: Eye, color: "cyan" },
  { label: "Reviews", value: "8,932", change: "+5%", icon: MessageSquare, color: "pink" },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredAnime = allAnime.filter((anime) =>
    anime.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#030014]">
      <Navbar />

      <div className="flex pt-16">
        <aside className="fixed left-0 top-16 bottom-0 w-64 bg-[#0f0a1e] border-r border-purple-500/20 p-4 hidden lg:block">
          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveTab(item.label.toLowerCase())}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  activeTab === item.label.toLowerCase()
                    ? "bg-purple-600/20 text-purple-400"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/20">
              <p className="text-white font-medium mb-1">Need Help?</p>
              <p className="text-gray-400 text-sm mb-3">
                Check our documentation for guides
              </p>
              <button className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors">
                View Docs
              </button>
            </div>
          </div>
        </aside>

        <main className="flex-1 lg:ml-64 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-gray-400">Manage your anime content and users</p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium transition-all neon-glow"
              >
                <Plus className="w-5 h-5" />
                Add Content
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-xl bg-white/5 border border-purple-500/20"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl bg-${stat.color}-500/20`}
                      style={{
                        backgroundColor:
                          stat.color === "purple"
                            ? "rgba(168, 85, 247, 0.2)"
                            : stat.color === "blue"
                            ? "rgba(59, 130, 246, 0.2)"
                            : stat.color === "cyan"
                            ? "rgba(6, 182, 212, 0.2)"
                            : "rgba(236, 72, 153, 0.2)",
                      }}
                    >
                      <stat.icon
                        className="w-6 h-6"
                        style={{
                          color:
                            stat.color === "purple"
                              ? "#a855f7"
                              : stat.color === "blue"
                              ? "#3b82f6"
                              : stat.color === "cyan"
                              ? "#06b6d4"
                              : "#ec4899",
                        }}
                      />
                    </div>
                    <span className="flex items-center gap-1 text-green-400 text-sm">
                      <TrendingUp className="w-4 h-4" />
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2 p-6 rounded-xl bg-white/5 border border-purple-500/20">
                <h2 className="text-lg font-semibold text-white mb-4">
                  Views Overview
                </h2>
                <div className="h-64 flex items-end justify-between gap-2">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 80].map(
                    (height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-purple-600/50 to-blue-600/50 rounded-t-lg transition-all hover:from-purple-500/60 hover:to-blue-500/60"
                        style={{ height: `${height}%` }}
                      />
                    )
                  )}
                </div>
                <div className="flex justify-between mt-4 text-gray-400 text-xs">
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
                    (month) => (
                      <span key={month}>{month}</span>
                    )
                  )}
                </div>
              </div>

              <div className="p-6 rounded-xl bg-white/5 border border-purple-500/20">
                <h2 className="text-lg font-semibold text-white mb-4">
                  Top Genres
                </h2>
                <div className="space-y-4">
                  {[
                    { name: "Action", percent: 85, color: "purple" },
                    { name: "Romance", percent: 72, color: "pink" },
                    { name: "Fantasy", percent: 68, color: "blue" },
                    { name: "Comedy", percent: 55, color: "yellow" },
                    { name: "Horror", percent: 42, color: "red" },
                  ].map((genre) => (
                    <div key={genre.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-300 text-sm">{genre.name}</span>
                        <span className="text-gray-400 text-sm">{genre.percent}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${genre.percent}%`,
                            backgroundColor:
                              genre.color === "purple"
                                ? "#a855f7"
                                : genre.color === "pink"
                                ? "#ec4899"
                                : genre.color === "blue"
                                ? "#3b82f6"
                                : genre.color === "yellow"
                                ? "#eab308"
                                : "#ef4444",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-purple-500/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">Content Library</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-purple-500/20 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-purple-500/20">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">
                        Title
                      </th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">
                        Type
                      </th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">
                        Rating
                      </th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">
                        Year
                      </th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAnime.slice(0, 8).map((anime) => (
                      <tr
                        key={anime.id}
                        className="border-b border-purple-500/10 hover:bg-white/5 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-16 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={anime.image}
                                alt={anime.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-white font-medium text-sm line-clamp-1">
                                {anime.title}
                              </p>
                              <p className="text-gray-400 text-xs">
                                {anime.genres.slice(0, 2).join(", ")}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              anime.type === "series"
                                ? "bg-purple-500/20 text-purple-300"
                                : "bg-blue-500/20 text-blue-300"
                            }`}
                          >
                            {anime.type}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-white text-sm">{anime.rating}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-gray-300 text-sm">{anime.year}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg p-6 rounded-2xl bg-[#0f0a1e] border border-purple-500/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Add New Content</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Title</label>
                  <input
                    type="text"
                    placeholder="Enter anime title"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Type</label>
                    <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-white focus:outline-none focus:border-purple-500 transition-colors">
                      <option value="series">Series</option>
                      <option value="movie">Movie</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Year</label>
                    <input
                      type="number"
                      placeholder="2024"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Description</label>
                  <textarea
                    placeholder="Enter description"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    Cover Image
                  </label>
                  <div className="border-2 border-dashed border-purple-500/30 rounded-xl p-8 text-center hover:border-purple-500/50 transition-colors cursor-pointer">
                    <Upload className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                    <p className="text-gray-400 text-sm">
                      Drag and drop or click to upload
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium transition-all"
                  >
                    Add Content
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}