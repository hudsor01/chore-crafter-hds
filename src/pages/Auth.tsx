
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Lock, Mail, User, ArrowRight } from 'lucide-react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isResetMode, setIsResetMode] = useState(false);
  const { signIn, signUp, resetPassword, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Check if we're in password reset mode
    const mode = searchParams.get('mode');
    if (mode === 'reset') {
      setIsResetMode(true);
    }

    // Handle password reset from email link
    const handlePasswordReset = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session && mode === 'reset') {
        setIsResetMode(true);
      }
    };

    handlePasswordReset();
  }, [searchParams]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (error: any) {
      // Error is already handled in the AuthContext
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(email, password, fullName);
      toast({
        title: "Account created",
        description: "Please check your email for verification link."
      });
    } catch (error: any) {
      // Error is already handled in the AuthContext
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resetPassword(email);
    } catch (error: any) {
      // Error is already handled in the AuthContext
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Your password has been updated.",
      });
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (isResetMode) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Update Password
            </h1>
            <p className="text-slate-600">
              Enter your new password to secure your account
            </p>
          </div>
          
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <form onSubmit={handleUpdatePassword} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="new-password" className="text-slate-700 font-medium">New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <Input 
                      id="new-password" 
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      minLength={6}
                      className="pl-10 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Enter new password"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-slate-700 font-medium">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <Input 
                      id="confirm-password" 
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      minLength={6}
                      className="pl-10 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200" 
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update Password"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Welcome to ChoreChart
          </h1>
          <p className="text-slate-600">
            Sign in to manage your family's chore charts
          </p>
        </div>
        
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-slate-100 p-1 rounded-lg">
                <TabsTrigger value="signin" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Sign In</TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Sign Up</TabsTrigger>
                <TabsTrigger value="reset" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Reset</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin" className="mt-6">
                <form onSubmit={handleSignIn} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-700 font-medium">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pl-10 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-slate-700 font-medium">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                      <Input 
                        id="password" 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pl-10 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup" className="mt-6">
                <form onSubmit={handleSignUp} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="full-name" className="text-slate-700 font-medium">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                      <Input 
                        id="full-name" 
                        type="text" 
                        placeholder="Your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="pl-10 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-signup" className="text-slate-700 font-medium">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                      <Input 
                        id="email-signup" 
                        type="email" 
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pl-10 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-signup" className="text-slate-700 font-medium">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                      <Input 
                        id="password-signup" 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        className="pl-10 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Create a password"
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="reset" className="mt-6">
                <form onSubmit={handleResetPassword} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email-reset" className="text-slate-700 font-medium">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                      <Input 
                        id="email-reset" 
                        type="email" 
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pl-10 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send Reset Link"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="px-8 pb-8">
            <p className="text-sm text-center text-slate-500">
              By signing in, you agree to our 
              <a href="#" className="text-indigo-600 hover:text-indigo-700 transition-colors duration-200"> Terms of Service</a> and 
              <a href="#" className="text-indigo-600 hover:text-indigo-700 transition-colors duration-200"> Privacy Policy</a>.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
