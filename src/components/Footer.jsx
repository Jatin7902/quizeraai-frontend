import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Instagram, Mail, Phone } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Footer = () => {
  const { toast } = useToast();

  const handleLinkClick = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      description: "This link's functionality will be added here.",
    });
  };

  return (
    <footer className="bg-pattern text-white py-12 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-700 pb-8 mb-8">
          {/* Column 1: Logo and Description */}
          <div>
            <div className="flex items-center mb-4">
              <img src="https://horizons-cdn.hostinger.com/22dd6545-a1fa-4e83-a53d-f36be02507f2/47b33f12fe3462dbe60b5a7b49b8e1d7.png" alt="QuizEra AI Logo" className="h-12 w-auto object-contain" />
              <span className="text-2xl font-bold text-white ml-2">QuizEra AI</span>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Generate custom questions in your language for better exam preparation.
            </p>
            <div className="flex space-x-4">
              <a href="https://x.com/QuizeraAi?t=If8KWppIfFUKrg3zy0zveg&s=09" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 hover:bg-gray-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/quizera_ai?igsh=MTc0Z2tjdWt1a3FmMQ==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 hover:bg-gray-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Product */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link to="#" onClick={handleLinkClick} className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Column 3: Company & Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3 mb-6">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="#" onClick={handleLinkClick} className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <Mail className="w-5 h-5 mr-2" />
                <span>support@quizera.ai</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="w-5 h-5 mr-2" />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
          <span>© 2025 QuizEra AI. All rights reserved.</span>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" onClick={handleLinkClick} className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="#" onClick={handleLinkClick} className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;