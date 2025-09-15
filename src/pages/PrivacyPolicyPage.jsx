import React from 'react';
import { Shield, Mail, Lock, Eye, Database, Users } from 'lucide-react';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-800">
      {/* Header */}
      <div className="bg-gray-800/30 backdrop-blur-sm border-b border-gray-700/30 pt-20">
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
      <div className="container mx-auto px-4 py-12 mt-8">
        <div className="max-w-5xl mx-auto space-y-6">
            
          {/* Information We Collect */}
          <div className="bg-gray-700/40 backdrop-blur-sm rounded-xl border border-gray-600/40 p-8 shadow-xl">
            <div className="flex items-center mb-6">
              <Database className="w-8 h-8 text-blue-400 mr-4" />
              <h2 className="text-3xl font-bold text-white">Information We Collect</h2>
            </div>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              We collect information you provide to us directly, such as when you create an account, take tests, or contact us for support.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-lg">•</span>
                <span className="text-lg">Personal information (name, email, phone number)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-lg">•</span>
                <span className="text-lg">Educational information (exam preferences, performance data)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-lg">•</span>
                <span className="text-lg">Usage data (test results, study patterns, time spent)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-lg">•</span>
                <span className="text-lg">Device and technical information</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-lg">•</span>
                <span className="text-lg">Uploaded files (PDFs, images) for quiz generation</span>
              </li>
            </ul>
          </div>

          {/* How We Use Your Information */}
          <div className="bg-gray-700/40 backdrop-blur-sm rounded-xl border border-gray-600/40 p-8 shadow-xl">
            <div className="flex items-center mb-6">
              <Eye className="w-8 h-8 text-blue-400 mr-4" />
              <h2 className="text-3xl font-bold text-white">How We Use Your Information</h2>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-lg">•</span>
                <span className="text-lg">Provide personalized learning experiences</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-lg">•</span>
                <span className="text-lg">Generate AI-powered feedback and recommendations</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-lg">•</span>
                <span className="text-lg">Track your progress and performance analytics</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-lg">•</span>
                <span className="text-lg">Communicate with you about your account and services</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-lg">•</span>
                <span className="text-lg">Improve our platform and develop new features</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-lg">•</span>
                <span className="text-lg">Process quiz generation requests using AI technology</span>
              </li>
            </ul>
          </div>

          {/* Data Security */}
          <div className="bg-gray-700/40 backdrop-blur-sm rounded-xl border border-gray-600/40 p-8 shadow-xl">
            <div className="flex items-center mb-6">
              <Lock className="w-8 h-8 text-blue-400 mr-4" />
              <h2 className="text-3xl font-bold text-white">Data Security</h2>
            </div>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              We implement industry-standard security measures to protect your personal information, including encryption, secure servers, and regular security audits.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-lg">•</span>
                <span className="text-lg">End-to-end encryption for all data transmission</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-lg">•</span>
                <span className="text-lg">Secure cloud storage with regular backups</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-lg">•</span>
                <span className="text-lg">Regular security audits and vulnerability assessments</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-lg">•</span>
                <span className="text-lg">Access controls and authentication protocols</span>
              </li>
            </ul>
          </div>

          {/* Information Sharing */}
          <div className="bg-gray-700/40 backdrop-blur-sm rounded-xl border border-gray-600/40 p-8 shadow-xl">
            <div className="flex items-center mb-6">
              <Users className="w-8 h-8 text-blue-400 mr-4" />
              <h2 className="text-3xl font-bold text-white">Information Sharing</h2>
            </div>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-lg">•</span>
                <span className="text-lg">With your explicit consent</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-lg">•</span>
                <span className="text-lg">To comply with legal obligations</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-lg">•</span>
                <span className="text-lg">To protect our rights and prevent fraud</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-lg">•</span>
                <span className="text-lg">With trusted service providers who assist in our operations</span>
              </li>
            </ul>
          </div>

          {/* Your Rights */}
          <div className="bg-gray-700/40 backdrop-blur-sm rounded-xl border border-gray-600/40 p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-white mb-6">Your Rights</h2>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              You have the right to access, update, or delete your personal information. You can also opt out of certain communications.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-lg">•</span>
                <span className="text-lg">Access your personal data</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-lg">•</span>
                <span className="text-lg">Correct inaccurate information</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-lg">•</span>
                <span className="text-lg">Delete your account and data</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-lg">•</span>
                <span className="text-lg">Opt out of marketing communications</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-lg">•</span>
                <span className="text-lg">Data portability</span>
              </li>
            </ul>
          </div>

          {/* Cookies and Tracking */}
          <div className="bg-gray-700/40 backdrop-blur-sm rounded-xl border border-gray-600/40 p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-white mb-6">Cookies and Tracking</h2>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              We use cookies and similar technologies to enhance your experience, analyze usage patterns, and provide personalized content.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-lg">•</span>
                <span className="text-lg">Essential cookies for platform functionality</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-lg">•</span>
                <span className="text-lg">Analytics cookies to improve our services</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-lg">•</span>
                <span className="text-lg">Preference cookies to remember your settings</span>
              </li>
            </ul>
          </div>

          {/* Changes to Privacy Policy */}
          <div className="bg-gray-700/40 backdrop-blur-sm rounded-xl border border-gray-600/40 p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-white mb-6">Changes to This Privacy Policy</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </div>

          {/* Contact Us */}
          <div className="bg-gray-700/40 backdrop-blur-sm rounded-xl border border-gray-600/40 p-8 shadow-xl">
            <div className="flex items-center mb-6">
              <Mail className="w-8 h-8 text-blue-400 mr-4" />
              <h2 className="text-3xl font-bold text-white">Contact Us</h2>
            </div>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="bg-gray-600/30 rounded-lg p-6">
              <p className="text-white text-lg mb-3">
                <strong>Email:</strong> 
                <a href="mailto:support@quizera.ai" className="text-blue-400 hover:text-blue-300 underline ml-2">
                  support@quizera.ai
                </a>
              </p>
              <p className="text-white text-lg">
                <strong>Response Time:</strong> We typically respond within 24 hours
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
