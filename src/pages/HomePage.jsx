
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import {
  UploadCloud,
  Cpu,
  FileText,
  ArrowRight,
  Brain,
  Languages,
  Zap,
  Star,
  Download,
  FileQuestion
} from 'lucide-react';

const HomePage = () => {
  const { user } = useAuth();
  const howItWorksSteps = [
    {
      icon: <UploadCloud className="w-12 h-12 text-violet-400" />,
      title: "Step 1: Upload Your Content",
      description: "Simply upload your study material in PDF, text, or image format. Our smart system can handle it all."
    },
    {
      icon: <Cpu className="w-12 h-12 text-violet-400" />,
      title: "Step 2: AI Works Its Magic",
      description: "Our advanced AI analyzes your content, identifies key concepts, and prepares to generate relevant questions."
    },
    {
      icon: <FileText className="w-12 h-12 text-violet-400" />,
      title: "Step 3: Generate & Customize",
      description: "Instantly generate your quiz! Choose question types, set difficulty, and get your test ready in seconds."
    }
  ];

  const features = [
    {
      icon: <Brain className="w-8 h-8 text-violet-400" />,
      title: "Advanced AI Engine",
      description: "Powered by cutting-edge OCR and NLP for unmatched accuracy."
    },
    {
      icon: <Languages className="w-8 h-8 text-violet-400" />,
      title: "Multi-Language Support",
      description: "Seamlessly generate quizzes in both Hindi and English."
    },
    {
      icon: <Zap className="w-8 h-8 text-violet-400" />,
      title: "Instant Generation",
      description: "From document to downloadable quiz in a matter of seconds."
    },
    {
      icon: <Star className="w-8 h-8 text-violet-400" />,
      title: "Question Variety",
      description: "Generates MCQs, True/False, and Fill-in-the-Blanks."
    },
    {
      icon: <Download className="w-8 h-8 text-violet-400" />,
      title: "Multiple Formats",
      description: "Export your quizzes as PDFs or plain text files."
    },
     {
      icon: <FileQuestion className="w-8 h-8 text-violet-400" />,
      title: "Custom Difficulty",
      description: "Tailor question difficulty from easy to hard."
    }
  ];

  return (
    <>
      <Helmet>
        <title>QuizEra AI - AI-Powered Quiz & Test Generator</title>
        <meta name="description" content="Turn any text, PDF, or image into a quiz instantly. AI-powered quiz and test generator for students and educators. Supports Hindi and English." />
      </Helmet>

      <div className="min-h-screen bg-pattern text-white overflow-x-hidden">
        <main>
          {/* Hero Section */}
          <section className="pt-24 pb-16 md:pt-40 md:pb-24 px-4 relative min-h-screen flex items-center">
            <div className="container mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-full sm:max-w-4xl mx-auto"
              >
                <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                  <span className="inline-block whitespace-nowrap">Generate Questions</span> <span className="gradient-text">In Your Language</span>
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-10 max-w-full sm:max-w-2xl mx-auto leading-relaxed">
                  Upload any educational content and generate quiz questions in Hindi, English, or any language of your choice. Perfect for exam preparation.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {user ? (
                    <Link to="/dashboard">
                      <Button size="lg" className="bg-violet-600 text-white hover:bg-violet-700 text-lg px-8 py-6 h-auto rounded-full font-bold shadow-lg shadow-violet-500/30 transform hover:scale-105 transition-transform duration-300 button-shine w-full sm:w-auto">
                        Dashboard <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/signup">
                      <Button size="lg" className="bg-violet-600 text-white hover:bg-violet-700 text-lg px-8 py-6 h-auto rounded-full font-bold shadow-lg shadow-violet-500/30 transform hover:scale-105 transition-transform duration-300 button-shine w-full sm:w-auto">
                        Get Started for Free <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  )}
                </div>
                

              </motion.div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-20">
            <div className="container mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16 px-4"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">The Smartest Way to Study</h2>
                <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                  QuizEra is more than just a quiz generator. It's a powerful learning companion packed with features to supercharge your preparation.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-0 sm:px-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="glass-effect border-white/10 card-hover h-full w-full p-6 text-left bg-gray-900/30 rounded-2xl">
                        <CardContent className="p-0">
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                            <p className="text-gray-300">{feature.description}</p>
                        </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section id="how-it-works" className="py-20 bg-black/20">
            <div className="container mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16 px-4"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
                <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                  Create quizzes in just three simple steps. It's fast, easy, and incredibly effective.
                </p>
              </motion.div>

              <div className="relative">
                {/* Adjusted line to fit within the container of cards */}
                <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[calc(100%-theme(spacing.8))] h-0.5 bg-gray-700/50"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative px-0 md:px-4">
                  {howItWorksSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      className="text-center"
                    >
                      <Card className="glass-effect border-white/10 card-hover h-full w-full p-8 bg-gray-900/30 rounded-2xl">
                        <CardContent className="p-0 flex flex-col items-center">
                          <div className="mb-6 flex items-center justify-center w-24 h-24 rounded-full bg-violet-900/50 border-2 border-violet-500/50">
                            {step.icon}
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                          <p className="text-gray-300">{step.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20">
            <div className="container mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8 }}
              >
                <div className="glass-effect border-violet-500/30 rounded-3xl w-full p-10 md:p-16 text-center bg-gradient-to-br from-violet-600/20 to-transparent px-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                      Ready to Ace Your Exams?
                    </h2>
                    <p className="text-lg text-gray-300 mb-8 w-full sm:max-w-2xl mx-auto">
                      Join thousands of learners transforming their study habits. Sign up now and get 4 free credits to start creating quizzes instantly.
                    </p>
                    <Link to="/signup">
                      <Button size="lg" className="bg-white text-violet-600 hover:bg-gray-200 text-lg px-8 py-6 h-auto rounded-full font-bold shadow-lg transform hover:scale-105 transition-transform duration-300">
                        Claim Your Free Credits
                      </Button>
                    </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default HomePage;
