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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "All fields required",
        description: "Please fill in all the required fields first.",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match. Please try again.",
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
    
    // This form is now just for validation before sending OTP
    // The actual signup happens in the verifyOTP step
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "All fields required",
        description: "Please fill in all the required fields.",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match. Please try again.",
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

      <div className="min-h-screen flex items-center justify-center px-4 bg-pattern pt-20">
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

          <Card className="glass-effect border-white/20 w-full mx-auto sm:w-full">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">Q</span>
              </div>
              <CardTitle className="text-2xl font-bold text-white">
                Create Your Free Account
              </CardTitle>
            </CardHeader>
            <CardContent>
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
                    placeholder="Enter your full name"
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

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pr-10"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-white text-purple-600 hover:bg-white/90"
                  disabled={loading || sendingOtp}
                >
                  {loading ? "Creating Account..." : sendingOtp ? "Sending OTP..." : "Send OTP & Create Account"}
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

              <div className="mt-6 text-center">
                <span className="text-white/70">Already have an account? </span>
                <Link to="/login" className="text-white hover:underline font-medium">
                  Login
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