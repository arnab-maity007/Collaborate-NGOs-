
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { LogIn, UserPlus, Fingerprint, Mail, X, Globe, ArrowLeft, KeyRound, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AuthPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [useDigilocker, setUseDigilocker] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [otp, setOtp] = useState("");

  const handleAuthentication = (type: "login" | "register") => {
    // Validate inputs
    if (type === "login") {
      if (!email || !password) {
        toast({
          title: "Missing information",
          description: "Please enter your email and password.",
          variant: "destructive",
        });
        return;
      }
    } else {
      if (!email || !password || !name || !confirmPassword) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }
      
      if (password !== confirmPassword) {
        toast({
          title: "Passwords don't match",
          description: "Please ensure your passwords match.",
          variant: "destructive",
        });
        return;
      }
      
      if (!agreeToTerms) {
        toast({
          title: "Terms of Service",
          description: "Please agree to the Terms of Service to continue.",
          variant: "destructive",
        });
        return;
      }
    }
    
    // Start OTP verification
    setIsLoading(true);
    
    // Simulate OTP sending
    setTimeout(() => {
      setIsLoading(false);
      setShowOtpVerification(true);
      
      toast({
        title: "OTP Sent",
        description: `A verification code has been sent to ${email}. Please check your inbox.`,
      });
    }, 1500);
  };

  const verifyOtp = () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      
      // Store user data in localStorage
      const userData = {
        name: name || email.split('@')[0],
        email,
        isLoggedIn: true,
        avatar: null
      };
      
      localStorage.setItem('userData', JSON.stringify(userData));
      
      toast({
        title: "Authentication Successful",
        description: "You have been successfully authenticated.",
      });
      
      navigate('/');
    }, 1500);
  };

  const handleGoogleAuth = () => {
    setIsLoading(true);
    
    // Simulate Google authentication
    setTimeout(() => {
      setIsLoading(false);
      
      // Store user data in localStorage with a more realistic name
      const userData = {
        name: name || "John Doe", // Use entered name if available or default
        email: email || "user@gmail.com",
        isLoggedIn: true,
        avatar: null
      };
      
      localStorage.setItem('userData', JSON.stringify(userData));
      
      toast({
        title: "Google Authentication Successful",
        description: "You are now logged in using your Google account.",
      });
      
      navigate('/');
    }, 1500);
  };

  const handleDigiLockerAuth = () => {
    setIsLoading(true);
    
    // Simulate DigiLocker authentication
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "DigiLocker Verification Successful",
        description: "Your identity has been verified using DigiLocker.",
      });
    }, 2000);
  };

  if (showOtpVerification) {
    return (
      <div className="min-h-screen bg-theme-blue-900 flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6">
          <Card className="glass-card w-full max-w-md p-6 space-y-6">
            <div className="text-center">
              <KeyRound className="h-12 w-12 mx-auto text-theme-accent-300 mb-2" />
              <h2 className="text-2xl font-bold text-gradient">Verify Your Email</h2>
              <p className="text-white/70 mt-2">We've sent a verification code to {email}</p>
            </div>
            
            <div className="space-y-4">
              <Label htmlFor="otp" className="text-center block">Enter the 6-digit verification code</Label>
              <div className="flex justify-center">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="bg-white/10 border-white/20 text-white" />
                    <InputOTPSlot index={1} className="bg-white/10 border-white/20 text-white" />
                    <InputOTPSlot index={2} className="bg-white/10 border-white/20 text-white" />
                    <InputOTPSlot index={3} className="bg-white/10 border-white/20 text-white" />
                    <InputOTPSlot index={4} className="bg-white/10 border-white/20 text-white" />
                    <InputOTPSlot index={5} className="bg-white/10 border-white/20 text-white" />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              
              <div className="pt-4 space-y-4">
                <Button
                  className="w-full bg-theme-accent-400 hover:bg-theme-accent-500 transition-all duration-300"
                  disabled={isLoading || otp.length !== 6}
                  onClick={verifyOtp}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Verifying...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Check className="mr-2 h-4 w-4" />
                      Verify and Continue
                    </div>
                  )}
                </Button>
                
                <div className="text-center">
                  <Button 
                    variant="ghost" 
                    className="text-white/70 hover:text-white"
                    onClick={() => setShowOtpVerification(false)}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to login
                  </Button>
                </div>
              </div>
              
              <p className="text-sm text-white/50 text-center">
                Didn't receive a code? <button className="text-theme-accent-300 hover:underline">Resend code</button>
              </p>
            </div>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-blue-900 flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-6">
        <Card className="glass-card w-full max-w-md relative transform transition-all duration-300 hover:shadow-2xl">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" className="transition-colors duration-300">Login</TabsTrigger>
              <TabsTrigger value="register" className="transition-colors duration-300">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="p-6 space-y-4">
              <div className="text-center mb-6">
                <LogIn className="h-10 w-10 mx-auto text-theme-accent-300 mb-2" />
                <h2 className="text-xl font-bold text-gradient">Login to Your Account</h2>
              </div>
              
              <div className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full border-white/20 flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:translate-y-[-2px]"
                  onClick={handleGoogleAuth}
                  disabled={isLoading}
                >
                  <Globe className="mr-2 h-4 w-4 text-blue-500" />
                  Continue with Google
                </Button>
                
                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-white/10"></div>
                  <span className="flex-shrink mx-3 text-white/50 text-sm">or</span>
                  <div className="flex-grow border-t border-white/10"></div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="login-name">Your Name</Label>
                  <Input 
                    id="login-name" 
                    type="text" 
                    placeholder="Enter your name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input 
                    id="login-email" 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input 
                    id="login-password" 
                    type="password" 
                    placeholder="Enter your password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="login-digilocker" 
                    checked={useDigilocker} 
                    onCheckedChange={(checked) => setUseDigilocker(!!checked)} 
                  />
                  <Label 
                    htmlFor="login-digilocker" 
                    className="text-sm flex items-center cursor-pointer"
                  >
                    Use DigiLocker / Aadhaar for verification
                    <Fingerprint className="h-4 w-4 ml-1 text-theme-accent-300" />
                  </Label>
                </div>
                
                {useDigilocker && (
                  <div className="py-3 px-4 neo-blur space-y-3">
                    <div className="flex items-center">
                      <Fingerprint className="h-5 w-5 mr-2 text-theme-accent-300" />
                      <p className="text-sm text-white font-medium">DigiLocker / Aadhaar Verification</p>
                    </div>
                    <p className="text-xs text-gray-300">
                      Secure identity verification using government-approved digital locker. 
                      This helps us comply with KYC requirements.
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-xs border-theme-accent-400 text-theme-accent-300 hover:bg-theme-accent-400/20 transition-colors duration-300"
                      onClick={handleDigiLockerAuth}
                    >
                      <Fingerprint className="h-3 w-3 mr-1" />
                      Verify with DigiLocker
                    </Button>
                  </div>
                )}
                
                <Button
                  className="w-full bg-theme-accent-400 hover:bg-theme-accent-500 transition-all duration-300 transform hover:scale-110 hover:translate-y-[-3px] hover:shadow-lg"
                  disabled={isLoading}
                  onClick={() => handleAuthentication("login")}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Logging in...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <LogIn className="mr-2 h-4 w-4" />
                      Login
                    </div>
                  )}
                </Button>
                
                <div className="text-center">
                  <a href="#" className="text-sm text-theme-accent-300 hover:underline transition-colors duration-300">
                    Forgot password?
                  </a>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="register" className="p-6 space-y-4">
              <div className="text-center mb-6">
                <UserPlus className="h-10 w-10 mx-auto text-theme-accent-300 mb-2" />
                <h2 className="text-xl font-bold text-gradient">Create an Account</h2>
              </div>
              
              <div className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full border-white/20 flex items-center justify-center hover:bg-white/10 transition-all duration-300"
                  onClick={handleGoogleAuth}
                  disabled={isLoading}
                >
                  <Globe className="mr-2 h-4 w-4 text-blue-500" />
                  Sign up with Google
                </Button>
                
                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-white/10"></div>
                  <span className="flex-shrink mx-3 text-white/50 text-sm">or</span>
                  <div className="flex-grow border-t border-white/10"></div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-name">Full Name</Label>
                  <Input 
                    id="register-name" 
                    type="text" 
                    placeholder="Enter your full name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input 
                    id="register-email" 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input 
                    id="register-password" 
                    type="password" 
                    placeholder="Create a password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-confirm-password">Confirm Password</Label>
                  <Input 
                    id="register-confirm-password" 
                    type="password" 
                    placeholder="Confirm your password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="register-digilocker" 
                    checked={useDigilocker} 
                    onCheckedChange={(checked) => setUseDigilocker(!!checked)} 
                  />
                  <Label 
                    htmlFor="register-digilocker" 
                    className="text-sm flex items-center cursor-pointer"
                  >
                    Verify identity with DigiLocker / Aadhaar
                    <Fingerprint className="h-4 w-4 ml-1 text-theme-accent-300" />
                  </Label>
                </div>
                
                {useDigilocker && (
                  <div className="py-3 px-4 neo-blur space-y-3">
                    <div className="flex items-center">
                      <Fingerprint className="h-5 w-5 mr-2 text-theme-accent-300" />
                      <p className="text-sm text-white font-medium">DigiLocker / Aadhaar Verification</p>
                    </div>
                    <p className="text-xs text-gray-300">
                      Secure identity verification using government-approved digital locker. 
                      This helps us comply with KYC requirements.
                    </p>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs flex-1 border-theme-accent-400 text-theme-accent-300 hover:bg-theme-accent-400/20 transition-colors duration-300"
                        onClick={handleDigiLockerAuth}
                      >
                        <Fingerprint className="h-3 w-3 mr-1" />
                        Connect DigiLocker
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs flex-1 border-theme-accent-400 text-theme-accent-300 hover:bg-theme-accent-400/20 transition-colors duration-300"
                      >
                        <Mail className="h-3 w-3 mr-1" />
                        Verify with OTP
                      </Button>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="register-terms" 
                    checked={agreeToTerms}
                    onCheckedChange={(checked) => setAgreeToTerms(!!checked)}
                  />
                  <Label 
                    htmlFor="register-terms" 
                    className="text-sm"
                  >
                    I agree to the <a href="#" className="text-theme-accent-300 hover:underline transition-colors duration-300">Terms of Service</a> and <a href="#" className="text-theme-accent-300 hover:underline transition-colors duration-300">Privacy Policy</a>
                  </Label>
                </div>
                
                <Button
                  className="w-full bg-theme-accent-400 hover:bg-theme-accent-500 transition-all duration-300 transform hover:scale-105"
                  disabled={isLoading}
                  onClick={() => handleAuthentication("register")}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Creating account...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Create Account
                    </div>
                  )}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default AuthPage;
