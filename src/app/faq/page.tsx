import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChevronDown, Heart, Code, Zap, Shield, Globe, Star } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions | KiraAnime",
  description: "Find answers to commonly asked questions about KiraAnime. Learn about our ad-free experience, open source nature, and streaming features.",
};

const faqs = [
  {
    question: "Is KiraAnime really ad-free?",
    answer: "Yes! KiraAnime is 100% ad-free. We believe in providing a clean, uninterrupted viewing experience without any annoying advertisements, pop-ups, or redirects. You can enjoy your favorite anime without any distractions.",
    icon: Heart,
    color: "from-pink-500 to-rose-500",
  },
  {
    question: "Is KiraAnime open source?",
    answer: "Absolutely! KiraAnime is fully open source and available on GitHub. This means anyone can view our code, contribute to the project, suggest improvements, or even host their own instance. We believe in transparency and community-driven development.",
    icon: Code,
    color: "from-purple-500 to-blue-500",
  },
  {
    question: "Do I need to create an account to watch anime?",
    answer: "No account is required to browse and watch anime on KiraAnime. However, creating a free account allows you to save your watch history, create custom lists, and receive personalized recommendations.",
    icon: Globe,
    color: "from-cyan-500 to-blue-500",
  },
  {
    question: "What video quality options are available?",
    answer: "We offer multiple quality options ranging from 360p to 1080p HD. The available qualities depend on the source availability. We automatically select the best quality based on your internet speed, but you can manually change it anytime during playback.",
    icon: Star,
    color: "from-yellow-500 to-orange-500",
  },
  {
    question: "Are subtitles and dubs available?",
    answer: "Yes! Most anime on KiraAnime are available with English subtitles. Many popular titles also offer English dubbed versions. You can easily switch between sub and dub versions on the anime details page.",
    icon: Zap,
    color: "from-green-500 to-emerald-500",
  },
  {
    question: "Is KiraAnime safe to use?",
    answer: "Yes, KiraAnime is safe to use. Being ad-free and open source means there are no malicious ads or tracking scripts. We prioritize user privacy and security. However, we always recommend using a secure internet connection.",
    icon: Shield,
    color: "from-indigo-500 to-purple-500",
  },
  {
    question: "How often is new content added?",
    answer: "New episodes are added shortly after they air in Japan, usually within a few hours. We continuously update our library with the latest anime series, movies, and OVAs. Check the 'Latest Episodes' section on the homepage for the newest additions.",
    icon: Zap,
    color: "from-orange-500 to-red-500",
  },
  {
    question: "Can I download anime for offline viewing?",
    answer: "Currently, we only support online streaming. Offline downloads are not available at this time. However, this is a feature we're considering for future updates.",
    icon: Globe,
    color: "from-teal-500 to-cyan-500",
  },
  {
    question: "How can I contribute to KiraAnime?",
    answer: "Since KiraAnime is open source, you can contribute in many ways! Report bugs, suggest features, improve documentation, or submit code contributions on our GitHub repository. Every contribution helps make KiraAnime better for everyone.",
    icon: Heart,
    color: "from-rose-500 to-pink-500",
  },
  {
    question: "What devices are supported?",
    answer: "KiraAnime works on any device with a modern web browser - desktop computers, laptops, tablets, and smartphones. We've optimized the experience for all screen sizes, so you can watch anime anywhere, anytime.",
    icon: Star,
    color: "from-violet-500 to-purple-500",
  },
  {
    question: "Does KiraAnime cost anything?",
    answer: "No! KiraAnime is completely free to use. There are no subscription fees, no premium tiers, and no hidden costs. Our mission is to provide free, accessible anime streaming to everyone.",
    icon: Heart,
    color: "from-green-500 to-teal-500",
  },
  {
    question: "How do I report an issue or request an anime?",
    answer: "You can report issues or request anime through our GitHub repository or contact form. We review all requests and do our best to add requested content. Please note that availability depends on third-party sources.",
    icon: Shield,
    color: "from-blue-500 to-cyan-500",
  },
];

export default function FAQPage() {
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
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-400">
              Everything you need to know about KiraAnime
            </p>
          </div>

          <div className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 border border-purple-500/20">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">100% Ad-Free</div>
                  <div className="text-gray-400 text-sm">No interruptions</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">Open Source</div>
                  <div className="text-gray-400 text-sm">Transparent & community-driven</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${faq.color}`}>
                      <faq.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-300 leading-relaxed pl-14">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/20 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Still have questions?
            </h2>
            <p className="text-gray-300 mb-6">
              Can&apos;t find the answer you&apos;re looking for? We&apos;re here to help!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://github.com/kiraanime"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium transition-all neon-glow"
              >
                <Code className="w-4 h-4" />
                Visit GitHub
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 text-white font-medium transition-all"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}