import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Shield, Eye, Lock, Database, Cookie, FileText, AlertTriangle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | KiraAnime",
  description: "Read our privacy policy to understand how we collect, use, and protect your data on KiraAnime streaming platform.",
};

export default function PrivacyPage() {
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
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-400">
              Last updated: December 13, 2025
            </p>
          </div>

          <div className="prose prose-invert prose-purple max-w-none">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex-shrink-0">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Your Privacy Matters</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    At KiraAnime, we are committed to protecting your privacy and ensuring transparency about how we handle your data. This policy explains what information we collect and how we use it.
                  </p>
                </div>
              </div>
            </div>

            <section className="mb-8 bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white m-0">1. Information We Collect</h2>
              </div>
              <div className="text-gray-300 space-y-4">
                <p>We collect different types of information to provide and improve our service:</p>
                
                <div className="ml-4 space-y-3">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Account Information</h4>
                    <p>When you create an account, we collect:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Email address</li>
                      <li>Username (if provided)</li>
                      <li>Password (encrypted)</li>
                      <li>Account creation date</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">Usage Data</h4>
                    <p>We automatically collect information about how you interact with our service:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Watch history and viewing preferences</li>
                      <li>Anime added to your list</li>
                      <li>Search queries</li>
                      <li>Device information and IP address</li>
                      <li>Browser type and version</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">Cookies and Local Storage</h4>
                    <p>We use browser storage to enhance your experience:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Authentication tokens</li>
                      <li>User preferences and settings</li>
                      <li>Watch history (stored locally)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8 bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white m-0">2. How We Use Your Information</h2>
              </div>
              <div className="text-gray-300 space-y-4">
                <p>We use the collected information for the following purposes:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>To provide, maintain, and improve our streaming service</li>
                  <li>To personalize your experience and provide recommendations</li>
                  <li>To maintain your watch history and anime list</li>
                  <li>To communicate with you about service updates or issues</li>
                  <li>To ensure the security and integrity of our platform</li>
                  <li>To analyze usage patterns and improve our content offerings</li>
                  <li>To comply with legal obligations and prevent fraud</li>
                </ul>
              </div>
            </section>

            <section className="mb-8 bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white m-0">3. Data Security</h2>
              </div>
              <div className="text-gray-300 space-y-4">
                <p>
                  We take data security seriously and implement industry-standard measures to protect your information:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>All passwords are encrypted using secure hashing algorithms</li>
                  <li>Data transmission is secured using HTTPS/SSL encryption</li>
                  <li>We use secure authentication provided by Supabase</li>
                  <li>Access to user data is restricted to authorized personnel only</li>
                  <li>Regular security audits and updates to our infrastructure</li>
                </ul>
                <p className="text-sm">
                  However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
                </p>
              </div>
            </section>

            <section className="mb-8 bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500">
                  <Cookie className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white m-0">4. Cookies and Tracking</h2>
              </div>
              <div className="text-gray-300 space-y-4">
                <p>
                  We use cookies and similar tracking technologies to provide functionality and analyze usage:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Essential Cookies:</strong> Required for authentication and core functionality</li>
                  <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                  <li><strong>Analytics:</strong> Help us understand how users interact with our service</li>
                </ul>
                <p>
                  You can control cookie settings through your browser preferences. However, disabling certain cookies may limit your ability to use some features of our service.
                </p>
              </div>
            </section>

            <section className="mb-8 bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white m-0">5. Third-Party Services</h2>
              </div>
              <div className="text-gray-300 space-y-4">
                <p>
                  KiraAnime integrates with third-party services to provide content and functionality:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Content Providers:</strong> We aggregate anime content from external streaming sources. We do not host content ourselves.</li>
                  <li><strong>Supabase:</strong> Our authentication and database provider. See their <a href="https://supabase.com/privacy" className="text-purple-400 hover:text-purple-300">privacy policy</a>.</li>
                  <li><strong>Vercel:</strong> Our hosting platform. See their <a href="https://vercel.com/legal/privacy-policy" className="text-purple-400 hover:text-purple-300">privacy policy</a>.</li>
                </ul>
                <p className="text-sm">
                  These third-party services have their own privacy policies. We encourage you to review their policies as we are not responsible for their practices.
                </p>
              </div>
            </section>

            <section className="mb-8 bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white m-0">6. Your Rights</h2>
              </div>
              <div className="text-gray-300 space-y-4">
                <p>You have the following rights regarding your personal data:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Access:</strong> Request a copy of the data we hold about you</li>
                  <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your account and associated data</li>
                  <li><strong>Export:</strong> Receive your data in a portable format</li>
                  <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                </ul>
                <p>
                  To exercise these rights, please contact us at <a href="mailto:kirastreams@proton.me" className="text-purple-400 hover:text-purple-300">kirastreams@proton.me</a> or through our <a href="/contact" className="text-purple-400 hover:text-purple-300">contact form</a>.
                </p>
              </div>
            </section>

            <section className="mb-8 bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white m-0">7. Data Retention</h2>
              </div>
              <div className="text-gray-300 space-y-4">
                <p>
                  We retain your personal information for as long as necessary to provide our services and comply with legal obligations:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Account data is retained while your account is active</li>
                  <li>Watch history is stored to provide personalized recommendations</li>
                  <li>Deleted accounts and their data are permanently removed within 30 days</li>
                  <li>Some data may be retained for legal or security purposes as required by law</li>
                </ul>
              </div>
            </section>

            <section className="mb-8 bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-teal-500 to-green-500">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white m-0">8. Children's Privacy</h2>
              </div>
              <div className="text-gray-300 space-y-4">
                <p>
                  Our service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13.
                </p>
                <p>
                  If you are a parent or guardian and believe your child has provided us with personal information, please contact us at <a href="mailto:kirastreams@proton.me" className="text-purple-400 hover:text-purple-300">kirastreams@proton.me</a>, and we will take steps to remove that information.
                </p>
              </div>
            </section>

            <section className="mb-8 bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white m-0">9. Changes to This Policy</h2>
              </div>
              <div className="text-gray-300 space-y-4">
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Posting the updated policy on this page</li>
                  <li>Updating the "Last updated" date at the top</li>
                  <li>Sending an email notification for significant changes (if you have an account)</li>
                </ul>
                <p>
                  We encourage you to review this Privacy Policy periodically. Your continued use of our service after changes are posted constitutes acceptance of the updated policy.
                </p>
              </div>
            </section>

            <section className="mb-8 bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white m-0">10. Contact Us</h2>
              </div>
              <div className="text-gray-300 space-y-4">
                <p>
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Email: <a href="mailto:kirastreams@proton.me" className="text-purple-400 hover:text-purple-300">kirastreams@proton.me</a></li>
                  <li>GitHub: <a href="https://github.com/amalxloop/kiraanime" className="text-purple-400 hover:text-purple-300">github.com/amalxloop/kiraanime</a></li>
                  <li>Contact form: <a href="/contact" className="text-purple-400 hover:text-purple-300">kiraanime.vercel.app/contact</a></li>
                </ul>
                <p className="text-sm">
                  We aim to respond to all inquiries within 48 hours.
                </p>
              </div>
            </section>
          </div>

          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/20 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Questions About Your Privacy?
            </h2>
            <p className="text-gray-300 mb-6">
              We&apos;re committed to protecting your data and being transparent about our practices.
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
