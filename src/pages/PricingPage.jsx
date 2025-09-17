
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Check, Zap, Crown, Rocket } from 'lucide-react';

const PricingPage = () => {
  const { toast } = useToast();

  const plans = [
    {
      name: "Free Plan",
      price: "₹0",
      period: "month",
      icon: <Zap className="w-8 h-8" />,
      features: [
        "10 Pages Limit",
        "4 AI Credits",
        "Limited Output",
        "Basic Support"
      ],
      buttonText: "Get Started",
      popular: false,
      gradient: "from-gray-500 to-gray-600"
    },
    {
      name: "Basic Plan",
      price: "₹49",
      period: "month",
      icon: <Crown className="w-8 h-8" />,
      features: [
        "Up to 50 Pages",
        "Unlimited AI Credits",
        "All Output Types",
        "Email Support",
        "Priority Processing"
      ],
      buttonText: "Get Started",
      popular: true,
      gradient: "from-blue-500 to-purple-600"
    },
    {
      name: "Pro Plan",
      price: "₹99",
      period: "month",
      icon: <Rocket className="w-8 h-8" />,
      features: [
        "200+ Pages",
        "Unlimited AI Credits",
        "Advanced Features",
        "Priority Support",
        "Custom Templates",
        "Bulk Processing",
        "API Access"
      ],
      buttonText: "Get Started",
      popular: false,
      gradient: "from-purple-500 to-pink-600"
    }
  ];

  const handleGetStarted = (planName) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      description: `${planName} subscription would be activated here.`,
    });
  };

  return (
    <>
      <Helmet>
        <title>Pricing Plans - QuizEra AI</title>
        <meta name="description" content="Choose the perfect plan for your learning needs. Free plan with 4 AI credits, Basic plan for ₹49/month, or Pro plan for ₹99/month with advanced features." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-900 dark:via-blue-900 dark:to-indigo-900">
        <div className="pt-32 pb-20">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16 px-4"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Plans that Suit Your Learning
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Choose the perfect plan for your educational content generation needs
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full lg:max-w-6xl mx-auto px-0 md:px-4">
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative px-4 sm:px-0"
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                        Most Popular
                      </div>
                    </div>
                  )}

                  <Card className={`glass-effect border-white/20 card-hover h-full w-full mx-auto relative overflow-hidden ${
                    plan.popular ? 'ring-2 ring-yellow-400/50' : ''
                  }`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-10`}></div>

                    <CardHeader className="text-center relative z-10">
                      <div className={`w-16 h-16 bg-gradient-to-r ${plan.gradient} rounded-lg flex items-center justify-center mx-auto mb-4 text-white`}>
                        {plan.icon}
                      </div>
                      <CardTitle className="text-2xl font-bold text-white mb-2">
                        {plan.name}
                      </CardTitle>
                      <div className="text-4xl font-bold text-white mb-2">
                        {plan.price}
                        <span className="text-lg text-white/60 font-normal">/{plan.period}</span>
                      </div>
                    </CardHeader>

                    <CardContent className="relative z-10">
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-white/80">
                            <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <Button
                        onClick={() => handleGetStarted(plan.name)}
                        className={`w-full bg-gradient-to-r ${plan.gradient} hover:opacity-90 text-white font-semibold py-3 h-auto`}
                      >
                        {plan.buttonText}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center mt-16 px-4"
            >
              <Card className="glass-effect border-white/20 w-full mx-auto sm:max-w-4xl">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Why Choose QuizEra AI?
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">Instant Generation</h3>
                      <p className="text-white/70">Get your quizzes and test papers in seconds, not hours</p>
                    </div>
                    <div>
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Check className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">High Quality</h3>
                      <p className="text-white/70">AI-powered content that's accurate and educational</p>
                    </div>
                    <div>
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Crown className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">Flexible Plans</h3>
                      <p className="text-white/70">Choose the plan that fits your learning needs</p>
                    </div>
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

export default PricingPage;
