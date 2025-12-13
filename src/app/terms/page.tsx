import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FileText, Shield, AlertTriangle, Scale } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | KiraAnime",
  description: "Read our terms of service and user agreement for using KiraAnime streaming platform.",
};

export default function TermsPage() {
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
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-400">
              Last updated: December 13, 2025
            </p>
          </div>

          <div className="prose prose-invert prose-purple max-w-none">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Agreement to Terms</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    By accessing and using KiraAnime, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                </div>
              </div>
            </div>

            <section className="mb-8 bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500">
                  <Scale className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white m-0">1. Use License</h2>
              </div>
              <div className="text-gray-300 space-y-4">
                <p>
                  Permission is granted to temporarily access the materials (information or software) on KiraAnime for personal, non-commercial transitory viewing only.
                </p>
                <p>This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on KiraAnime</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                  <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                </ul>
              </div>
            </section>

            <section className="mb-8 bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white m-0">2. Content Disclaimer</h2>
              </div>
              <div className="text-gray-300 space-y-4">
                <p>
                  KiraAnime does not host any files on its servers. All content is provided by third-party services. We have no control over the nature, content, and availability of those sites.
                </p>
                <p>
                  The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them. All streaming content, including videos, images, and subtitles, are copyright of their respective owners.
                </p>
              </div>
            </section>

            <section className="mb-8 bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white m-0">3. User Conduct</h2>
              </div>
              <div className="text-gray-300 space-y-4">
                <p>You agree not to use KiraAnime to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Violate any local, state, national, or international law</li>
                  <li>Infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>Harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>Submit false or misleading information</li>
                  <li>Upload or transmit viruses or any other type of malicious code</li>
                  <li>Spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                  <li>Interfere with or circumvent the security features of the service</li>
                </ul>
              </div>
            </section>

            <section className="mb-8 bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white m-0">4. Limitation of Liability</h2>
              </div>
              <div className="text-gray-300 space-y-4">
                <p>
                  In no event shall KiraAnime or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on KiraAnime, even if KiraAnime or a KiraAnime authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>
              </div>
            </section>

            <section className="mb-8 bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white m-0">5. Account Terms</h2>
              </div>
              <div className="text-gray-300 space-y-4">
                <p>When you create an account with us, you must provide accurate, complete, and current information at all times. Failure to do so constitutes a breach of the Terms.</p>
                <p>You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password.</p>
                <p>You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>
              </div>
            </section>

            <section className="mb-8 bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500">
                  <Scale className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white m-0">6. Copyright Policy</h2>
              </div>
              <div className="text-gray-300 space-y-4">
                <p>
                  We respect the intellectual property rights of others. It is our policy to respond to any claim that content posted on the service infringes on the copyright or other intellectual property rights of any person or entity.
                </p>
                <p>
                  If you are a copyright owner, or authorized on behalf of one, and you believe that the copyrighted work has been copied in a way that constitutes copyright infringement, please submit your claim via our DMCA page with the subject line "Copyright Infringement."
                </p>
              </div>
            </section>

            <section className="mb-8 bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white m-0">7. Changes to Terms</h2>
              </div>
              <div className="text-gray-300 space-y-4">
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
                </p>
                <p>
                  By continuing to access or use our service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use KiraAnime.
                </p>
              </div>
            </section>

            <section className="mb-8 bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-teal-500 to-green-500">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white m-0">8. Termination</h2>
              </div>
              <div className="text-gray-300 space-y-4">
                <p>
                  We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
                </p>
                <p>
                  If you wish to terminate your account, you may simply discontinue using the service or contact us to request account deletion.
                </p>
              </div>
            </section>

            <section className="mb-8 bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500">
                  <Scale className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white m-0">9. Governing Law</h2>
              </div>
              <div className="text-gray-300 space-y-4">
                <p>
                  These Terms shall be governed and construed in accordance with applicable international laws, without regard to its conflict of law provisions.
                </p>
                <p>
                  Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                </p>
              </div>
            </section>

            <section className="mb-8 bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white m-0">10. Contact Information</h2>
              </div>
              <div className="text-gray-300 space-y-4">
                <p>
                  If you have any questions about these Terms, please contact us through:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Our GitHub repository: <a href="https://github.com/amalxloop/kiraanime" className="text-purple-400 hover:text-purple-300">github.com/amalxloop/kiraanime</a></li>
                  <li>Email: support@kiraanime.com</li>
                  <li>Contact form on our website</li>
                </ul>
              </div>
            </section>
          </div>

          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/20 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Questions About Our Terms?
            </h2>
            <p className="text-gray-300 mb-6">
              If you have any questions or concerns about our Terms of Service, we&apos;re here to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/faq"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium transition-all neon-glow"
              >
                <FileText className="w-4 h-4" />
                Read FAQ
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
