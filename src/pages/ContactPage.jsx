
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Mail, MessageSquare, HelpCircle, Bug } from 'lucide-react';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message || !category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before submitting.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your feedback. We'll get back to you soon!",
      });

      // Reset form
      setName('');
      setEmail('');
      setMessage('');
      setCategory('');
      setLoading(false);
    }, 1000);
  };

  const faqs = [
    {
      question: "Is QuizEra AI free?",
      answer: "Yes, you get 4 free AI credits and up to 10 pages for free."
    },
    {
      question: "What file types can I upload?",
      answer: "You can upload PDFs, images (JPG/PNG), or type text manually."
    },
    {
      question: "How accurate are the generated questions?",
      answer: "Our AI uses advanced OCR and NLP technology to ensure high accuracy in question generation."
    },
    {
      question: "Can I generate content in Hindi?",
      answer: "Yes! QuizEra AI supports both Hindi and English content generation."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us - QuizEra AI</title>
        <meta name="description" content="Have questions, bugs, or feedback about QuizEra AI? Contact us through our support form or check our frequently asked questions." />
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
                We'd Love to Hear From You
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Have any questions, bugs, or feedback? Reach out below.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 w-full lg:max-w-6xl mx-auto px-0 md:px-4">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card className="glass-effect border-white/20 w-full mx-auto sm:w-full">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white flex items-center">
                      <Mail className="w-6 h-6 mr-2" />
                      Send us a Message
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col justify-between">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-white">Name</Label>
                        <Input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          placeholder="Your full name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          placeholder="your.email@example.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category" className="text-white">Category</Label>
                        <Select value={category} onValueChange={setCategory}>
                          <SelectTrigger className="bg-white/10 border-white/20 text-white">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Bug">Bug Report</SelectItem>
                            <SelectItem value="Feedback">Feedback</SelectItem>
                            <SelectItem value="Suggestion">Suggestion</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-white">Message</Label>
                        <Textarea
                          id="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[120px]"
                          placeholder="Tell us about your experience, report a bug, or share your suggestions..."
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Submit Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* FAQs */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Card className="glass-effect border-white/20 w-full mx-auto sm:w-full">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white flex items-center">
                      <HelpCircle className="w-6 h-6 mr-2" />
                      Frequently Asked Questions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {faqs.map((faq, index) => (
                      <div key={index} className="border-b border-white/10 pb-4 last:border-b-0">
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {faq.question}
                        </h3>
                        <p className="text-white/70">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Contact Info */}
                <Card className="glass-effect border-white/20 mt-8 w-full mx-auto sm:w-full">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Other Ways to Reach Us</h3>
                    <div className="space-y-3">
                      <div className="flex items-center text-white/80">
                        <Mail className="w-5 h-5 mr-3" />
                        <span>support@quizeraai.com</span>
                      </div>
                      <div className="flex items-center text-white/80">
                        <Bug className="w-5 h-5 mr-3" />
                        <span>Report bugs directly through our form</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
