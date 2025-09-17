import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff, ArrowLeft, Mail, Clock } from 'lucide-react';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { signup, sendOTP, verifyOTP } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Countdown timer for OTP resend
  React.useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSendOTP = async () => {
    // Validation is already done in handleSubmit, so we can proceed directly

    setSendingOtp(true);
    try {
      const result = await sendOTP(name, email, password);
      if (result.success) {
        setOtpSent(true);
        setCountdown(60); // 60 seconds countdown
        toast({
          title: "OTP Sent!",
          description: "Please check your email for the verification code.",
        });
      } else {
        toast({
          title: "Failed to send OTP",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      toast({
        title: "OTP required",
        description: "Please enter the OTP sent to your email.",
        variant: "destructive",
      });
      return;
    }

    setVerifyingOtp(true);
    try {
      const result = await verifyOTP(email, otp);
      if (result.success) {
        setOtpVerified(true);
        toast({
          title: "Welcome to QuizEra AI!",
          description: "Your account has been created and verified successfully. You have 4 free AI credits!",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "OTP Verification Failed",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Debug logging
    console.log('Form submission values:', { name, email, password });
    
    // This form is now just for validation before sending OTP
    // The actual signup happens in the verifyOTP step
    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      console.log('Validation failed - missing fields:', { 
        name: !name?.trim(), 
        email: !email?.trim(), 
        password: !password?.trim()
      });
      toast({
        title: "All fields required",
        description: "Please fill in all the required fields.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    // Send OTP instead of submitting form
    await handleSendOTP();
  };

  return (
    <>
      <Helmet>
        <title>Create Your Free Account - QuizEra AI</title>
        <meta name="description" content="Create your free QuizEra AI account and get 4 free AI credits to start generating quizzes, test papers, and important questions instantly." />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-900 dark:via-blue-900 dark:to-indigo-900">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center text-white/80 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>

          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200 dark:border-white/20 w-full mx-auto sm:w-full shadow-xl">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">Q</span>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                Create Your Free Account
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    placeholder="Enter your name"
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
                    placeholder="Enter your email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pr-10"
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>


                <Button 
                  type="submit" 
                  className="w-full bg-white text-purple-600 hover:bg-white/90"
                  disabled={loading || sendingOtp}
                >
                  {loading ? "Creating Account..." : sendingOtp ? "Sending OTP..." : "Create Account"}
                </Button>

                {otpSent && (
                  <div className="space-y-2">
                    <Label htmlFor="otp" className="text-white flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Verification OTP
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="otp"
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 flex-1"
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                      />
                      <Button
                        type="button"
                        onClick={handleVerifyOTP}
                        disabled={verifyingOtp || !otp || otp.length !== 6}
                        className={`px-4 ${
                          otpVerified 
                            ? "bg-green-600 hover:bg-green-700 text-white" 
                            : "bg-purple-600 hover:bg-purple-700 text-white"
                        }`}
                      >
                        {verifyingOtp ? "Verifying..." : otpVerified ? "✓ Verified" : "Verify OTP"}
                      </Button>
                    </div>
                    {otpVerified && (
                      <p className="text-green-400 text-sm flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Email verified successfully!
                      </p>
                    )}
                  </div>
                )}
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600/50"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gray-800 text-gray-400">OR CONTINUE WITH</span>
                </div>
              </div>

              <Button 
                type="button"
                className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700 h-12 rounded-lg font-semibold text-lg shadow-lg flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign in with Google
              </Button>

              <div className="mt-6 text-center">
                <span className="text-gray-400">Already have an account? </span>
                <Link to="/login" className="text-violet-400 hover:text-violet-300 font-medium">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default SignupPage;