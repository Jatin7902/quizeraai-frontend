import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQPage = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqs = [
    {
      question: "What is QuizEra AI?",
      answer: "QuizEra AI is an intelligent quiz generation platform that creates custom questions from your uploaded PDFs or text content. It supports multiple languages and difficulty levels to help you prepare for exams effectively."
    },
    {
      question: "How do I generate quizzes from PDFs?",
      answer: "Simply upload a PDF file on the Dashboard page, select your preferred language and difficulty level, then click 'Generate Quiz'. Our AI will extract text from your PDF and create relevant questions based on the content."
    },
    {
      question: "Which languages are supported?",
      answer: "QuizEra AI currently supports English and Hindi languages. We're working on adding more languages in the future to serve a global audience."
    },
    {
      question: "What difficulty levels are available?",
      answer: "We offer three difficulty levels: Easy (basic recall questions), Medium (conceptual understanding), and Hard (analytical and application-based questions)."
    },
    {
      question: "How many questions can I generate?",
      answer: "Currently, you can generate up to 10 questions per quiz. This limit ensures high-quality questions and optimal performance."
    },
    {
      question: "Is there a limit on PDF file size?",
      answer: "Yes, we recommend PDF files under 10MB for optimal processing. Larger files may take longer to process or may not be supported."
    },
    {
      question: "How do I create an account?",
      answer: "Click on 'Sign Up' in the navigation bar, enter your email address, and verify it with the OTP sent to your email. Then complete your profile setup."
    },
    {
      question: "What if I don't receive the OTP?",
      answer: "Check your spam folder first. If you still don't receive it, wait a few minutes and try again. Make sure you've entered the correct email address."
    },
    {
      question: "Can I download the generated quizzes?",
      answer: "Yes! After generating a quiz, you can view it on the platform and download it for offline use. The download feature is available in the quiz results modal."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely! We use industry-standard encryption and security measures to protect your data. Your uploaded files and generated content are stored securely and are not shared with third parties."
    },
    {
      question: "Do you offer customer support?",
      answer: "Yes! You can reach our support team at support@quizera.ai or use the contact form on our Contact page. We typically respond within 24 hours."
    },
    {
      question: "Can I use QuizEra AI for commercial purposes?",
      answer: "Please contact us at support@quizera.ai to discuss commercial usage and licensing options. We offer different plans for educational institutions and businesses."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <HelpCircle className="w-12 h-12 text-blue-400 mr-3" />
              <h1 className="text-4xl font-bold text-white">Frequently Asked Questions</h1>
            </div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Find answers to common questions about QuizEra AI. Can't find what you're looking for? 
              <a href="/contact" className="text-blue-400 hover:text-blue-300 underline ml-1">Contact us</a>
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <span className="text-white font-semibold text-lg">{faq.question}</span>
                  {openItems[index] ? (
                    <ChevronUp className="w-6 h-6 text-blue-400" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-blue-400" />
                  )}
                </button>
                {openItems[index] && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-12 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Still have questions?</h3>
              <p className="text-gray-300 mb-6">
                Our support team is here to help you get the most out of QuizEra AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Contact Support
                </a>
                <a
                  href="mailto:support@quizera.ai"
                  className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
