import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Mail, Github, MessageCircle, AlertCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | KiraAnime",
  description: "Get in touch with the KiraAnime team. We're here to help with any questions or concerns.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#030014]">
      <Navbar />
      
      <div className="relative pt-24 pb-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px]" />
          <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-gray-400">
              Have questions or feedback? We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <a
              href="mailto:kirastreams@proton.me"
              className="group bg-white/5 border border-white/10 rounded-xl p-8 hover:bg-white/10 hover:border-purple-500/30 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">Email Support</h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Send us an email and we'll get back to you as soon as possible.
                  </p>
                  <p className="text-purple-400 font-medium">
                    kirastreams@proton.me
                  </p>
                </div>
              </div>
            </a>

            <a
              href="https://github.com/amalxloop/kiraanime"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/5 border border-white/10 rounded-xl p-8 hover:bg-white/10 hover:border-purple-500/30 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Github className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">GitHub</h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Report bugs, request features, or contribute to the project.
                  </p>
                  <p className="text-cyan-400 font-medium">
                    github.com/amalxloop/kiraanime
                  </p>
                </div>
              </div>
            </a>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-8 mb-8">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Before You Contact Us</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Please check our FAQ page first - your question might already be answered there. This helps us respond faster to issues that need individual attention.
                </p>
                <a
                  href="/faq"
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
                >
                  Visit FAQ Page
                  <span className="text-lg">→</span>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">What Can We Help You With?</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                <h4 className="text-white font-semibold mb-2">Technical Issues</h4>
                <p className="text-gray-400 text-sm">
                  Video playback problems, loading errors, or site functionality issues.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                <h4 className="text-white font-semibold mb-2">Content Requests</h4>
                <p className="text-gray-400 text-sm">
                  Missing anime, incorrect information, or subtitle issues.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                <h4 className="text-white font-semibold mb-2">Account Support</h4>
                <p className="text-gray-400 text-sm">
                  Login problems, account management, or watch history issues.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                <h4 className="text-white font-semibold mb-2">General Inquiries</h4>
                <p className="text-gray-400 text-sm">
                  Partnerships, legal matters, or general questions about our service.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/20 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Response Time
            </h2>
            <p className="text-gray-300 mb-2">
              We typically respond to all inquiries within 24-48 hours.
            </p>
            <p className="text-gray-400 text-sm">
              Please note that response times may be longer during weekends and holidays.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
