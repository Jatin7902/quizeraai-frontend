
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  User,
  Code,
  Globe,
  Users,
  Trophy,
  Rocket,
  Brain,
  Heart
} from 'lucide-react';

const AboutPage = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Tesseract OCR",
      description: "Advanced optical character recognition for accurate text extraction"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "spaCy NLP",
      description: "Natural language processing for intelligent question generation"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Python Flask",
      description: "Robust backend framework powering our AI engine"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Multilingual Support",
      description: "Supporting both English and Hindi languages"
    }
  ];

  const achievements = [
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Hackathon Top 3 Winner",
      description: "Recognized for innovation in educational technology"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Rural Focus",
      description: "Special emphasis on helping rural and local learners"
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Beta Launch",
      description: "Coming soon with exciting new features"
    }
  ];

  return (
    <>
      <Helmet>
        <title>About QuizEra AI - Transforming Education with AI</title>
        <meta name="description" content="Learn about QuizEra AI, founded by Jatin Agrawal. An AI-powered platform helping students generate quizzes and test papers from textbooks using OCR and NLP technology." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:bg-pattern">
        <div className="pt-32 pb-20">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16 px-4"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                About QuizEra AI
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                Transforming education through AI-powered content generation, making learning accessible and engaging for everyone.
              </p>
            </motion.div>

            {/* Mission Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-20 px-4"
            >
              <Card className="glass-effect border-white/20 w-full mx-auto sm:max-w-4xl">
                <CardContent className="p-8 sm:p-12 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
                  <p className="text-lg text-white/80 leading-relaxed">
                    QuizEra AI is an AI-powered platform where students can generate quizzes, test papers, and important questions from textbooks using just a PDF, photo, or text. We believe in making quality education accessible to everyone, especially focusing on rural and local learners who need innovative tools to enhance their learning experience.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Founder Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-20 px-4"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Meet the Founder</h2>
              </div>

              <Card className="glass-effect border-white/20 w-full mx-auto sm:max-w-2xl">
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Jatin Agrawal</h3>
                  <p className="text-white/80 leading-relaxed">
                    Passionate about leveraging technology to solve real-world educational challenges. Jatin founded QuizEra AI with a vision to democratize access to quality educational content generation tools, making learning more efficient and engaging for students worldwide.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Technology Stack */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-20"
            >
              <div className="text-center mb-12 px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Built Using</h2>
                <p className="text-xl text-white/80">Cutting-edge technology stack for reliable performance</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-0 sm:px-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  >
                    <Card className="glass-effect border-white/20 card-hover h-full w-full mx-auto sm:w-full">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4 text-white">
                          {feature.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                        <p className="text-white/70">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="mb-20"
            >
              <div className="text-center mb-12 px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Achievements</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full sm:max-w-4xl mx-auto px-0 sm:px-4">
                {achievements.map((achievement, index) => (
                  <Card key={index} className="glass-effect border-white/20 card-hover w-full mx-auto sm:w-full">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4 text-white">
                        {achievement.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{achievement.title}</h3>
                      <p className="text-white/70 text-sm">{achievement.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Vision Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="px-4"
            >
              <Card className="glass-effect border-white/20 w-full mx-auto sm:max-w-4xl">
                <CardContent className="p-8 sm:p-12 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Rocket className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-6">Looking Forward</h2>
                  <p className="text-lg text-white/80 leading-relaxed mb-6">
                    We're constantly working to improve QuizEra AI and add new features that will make learning even more effective and enjoyable. Our beta launch is coming soon with exciting new capabilities.
                  </p>
                  <div className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-full px-6 py-3 text-white font-semibold">
                    <Rocket className="w-5 h-5 mr-2" />
                    Beta Launch Coming Soon
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
