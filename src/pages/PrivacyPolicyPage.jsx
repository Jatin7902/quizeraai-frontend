import React from 'react';
import { Shield, Mail, Lock, Eye, Database, Users } from 'lucide-react';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Shield className="w-16 h-16 text-blue-400 mr-4" />
              <h1 className="text-5xl font-bold text-white">Privacy Policy</h1>
            </div>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
            <p className="text-gray-400 text-sm mt-4">
              Last updated: January 2025
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-8 space-y-8">
            
            {/* Information We Collect */}
            <section>
              <div className="flex items-center mb-4">
                <Database className="w-6 h-6 text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">Information We Collect</h2>
              </div>
              <p className="text-gray-300 mb-4">
                We collect information you provide to us directly, such as when you create an account, take tests, or contact us for support.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Personal information (name, email, phone number)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Educational information (exam preferences, performance data)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Usage data (test results, study patterns, time spent)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Device and technical information</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Uploaded files (PDFs, images) for quiz generation</span>
                </li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section>
              <div className="flex items-center mb-4">
                <Eye className="w-6 h-6 text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">How We Use Your Information</h2>
              </div>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Provide personalized learning experiences</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Generate AI-powered feedback and recommendations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Track your progress and performance analytics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Communicate with you about your account and services</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Improve our platform and develop new features</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Process quiz generation requests using AI technology</span>
                </li>
              </ul>
            </section>

            {/* Data Security */}
            <section>
              <div className="flex items-center mb-4">
                <Lock className="w-6 h-6 text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">Data Security</h2>
              </div>
              <p className="text-gray-300 mb-4">
                We implement industry-standard security measures to protect your personal information, including encryption, secure servers, and regular security audits.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>End-to-end encryption for all data transmission</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Secure cloud storage with regular backups</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Regular security audits and vulnerability assessments</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Access controls and authentication protocols</span>
                </li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section>
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">Information Sharing</h2>
              </div>
              <p className="text-gray-300 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>With your explicit consent</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>To comply with legal obligations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>To protect our rights and prevent fraud</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>With trusted service providers who assist in our operations</span>
                </li>
              </ul>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
              <p className="text-gray-300 mb-4">
                You have the right to access, update, or delete your personal information. You can also opt out of certain communications.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Access your personal data</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Correct inaccurate information</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Delete your account and data</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Opt out of marketing communications</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Data portability</span>
                </li>
              </ul>
            </section>

            {/* Cookies and Tracking */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Cookies and Tracking</h2>
              <p className="text-gray-300 mb-4">
                We use cookies and similar technologies to enhance your experience, analyze usage patterns, and provide personalized content.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Essential cookies for platform functionality</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Analytics cookies to improve our services</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Preference cookies to remember your settings</span>
                </li>
              </ul>
            </section>

            {/* Changes to Privacy Policy */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-300">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            {/* Contact Us */}
            <section className="border-t border-white/20 pt-8">
              <div className="flex items-center mb-4">
                <Mail className="w-6 h-6 text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">Contact Us</h2>
              </div>
              <p className="text-gray-300 mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-white">
                  <strong>Email:</strong> 
                  <a href="mailto:support@quizera.ai" className="text-blue-400 hover:text-blue-300 underline ml-2">
                    support@quizera.ai
                  </a>
                </p>
                <p className="text-white mt-2">
                  <strong>Response Time:</strong> We typically respond within 24 hours
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
