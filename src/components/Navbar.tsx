
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogIn, Wallet, Gift, User, LogOut, HelpCircle, Mail } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const { user, signOut, userMetadata } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const connectWallet = () => {
    // This would have the actual web3 wallet connection logic
    setIsConnected(true);
    toast({
      title: "Wallet connected",
      description: "Your wallet has been connected successfully",
    });
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const navigateToAuth = () => {
    navigate('/auth');
  };

  const getInitials = (email: string) => {
    // If no email, return placeholder
    if (!email) return "U";
    
    // Get first part of email before @ symbol
    const username = email.split('@')[0];
    
    // If username has dots, treat them as separators
    if (username.includes('.')) {
      return username
        .split('.')
        .map(part => part[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
    }
    
    // Otherwise, take first 2 characters of username
    return username.substring(0, 2).toUpperCase();
  };

  // Get user's display name from metadata or use email
  const getUserDisplayName = () => {
    if (userMetadata?.name) {
      return userMetadata.name;
    }
    return user?.email?.split('@')[0] || 'User';
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-card bg-theme-blue-900/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="w-10 h-10 rounded-full bg-theme-accent-400 flex items-center justify-center group-hover:bg-theme-accent-500 transition-colors duration-300">
                <Gift className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-white group-hover:text-theme-accent-300 transition-colors duration-300">Donata</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-300 hover:text-white hover:translate-y-[-2px] hover:scale-105 transition-all duration-300 px-3 py-2">
              Home
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-white hover:translate-y-[-2px] hover:scale-105 transition-all duration-300 px-3 py-2">
              About
            </Link>
            <Link to="/ngo-list" className="text-gray-300 hover:text-white hover:translate-y-[-2px] hover:scale-105 transition-all duration-300 px-3 py-2">
              Our NGOs
            </Link>
            <Link to="/tracker" className="text-gray-300 hover:text-white hover:translate-y-[-2px] hover:scale-105 transition-all duration-300 px-3 py-2">
              Track Donations
            </Link>
            <Button 
              variant="secondary" 
              className="ml-4 transition-all duration-300 hover:shadow-lg hover:bg-secondary/90 transform hover:scale-110 hover:translate-y-[-3px]"
              onClick={() => connectWallet()}
            >
              {isConnected ? (
                <div className="flex items-center">
                  <Wallet className="mr-2 h-4 w-4" />
                  <span>Connected</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <Wallet className="mr-2 h-4 w-4" />
                  <span>Connect Wallet</span>
                </div>
              )}
            </Button>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 flex gap-2 items-center px-2 rounded-full hover:bg-white/10">
                    <span className="text-sm font-medium text-white hidden sm:inline-block">
                      {getUserDisplayName()}
                    </span>
                    <Avatar className="h-9 w-9 transition-all duration-300 hover:ring-2 hover:ring-theme-accent-300">
                      <AvatarFallback className="bg-theme-accent-400 text-white">
                        {getInitials(user.email || "")}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 glass-card border-white/10" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-white">{getUserDisplayName()}</p>
                      <p className="text-xs leading-none text-white/70">{user.email}</p>
                      {userMetadata?.profession && (
                        <p className="text-xs leading-none text-white/70">{userMetadata.profession}</p>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem 
                    className="cursor-pointer hover:bg-white/10 transition-all duration-300"
                    onClick={() => navigate('/profile')}
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer hover:bg-white/10 transition-all duration-300"
                    onClick={() => navigate('/my-donations')}
                  >
                    <Gift className="mr-2 h-4 w-4" />
                    <span>My Donations</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer hover:bg-white/10 transition-all duration-300"
                    onClick={() => window.location.href = 'mailto:support@donata.org'}
                  >
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Contact Support</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem 
                    className="cursor-pointer text-red-400 hover:bg-red-400/10 transition-all duration-300"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="default" 
                className="bg-theme-accent-400 hover:bg-theme-accent-500 transition-all duration-300 transform hover:scale-110 hover:translate-y-[-3px]"
                onClick={navigateToAuth}
              >
                <LogIn className="mr-2 h-4 w-4" />
                <span>Sign Up / Login</span>
              </Button>
            )}
          </div>
          
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-300"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-theme-blue-800">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10 hover:scale-105 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 hover:scale-105 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/ngo-list"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 hover:scale-105 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Our NGOs
            </Link>
            <Link
              to="/tracker"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 hover:scale-105 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Track Donations
            </Link>
            <Button 
              variant="secondary" 
              className="w-full mt-2 transition-all duration-300 hover:shadow-lg hover:bg-secondary/90 hover:scale-105"
              onClick={() => connectWallet()}
            >
              {isConnected ? "Connected" : "Connect Wallet"}
            </Button>
            
            {user ? (
              <div className="mt-2 p-3 bg-white/5 rounded-md">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-theme-accent-400 text-white">
                      {getInitials(user.email || "")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-white">{user.email}</p>
                    <p className="text-xs text-white/70">Signed in account</p>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-white/10 hover:bg-white/10 hover:scale-105"
                    onClick={() => {
                      navigate('/profile');
                      setIsMenuOpen(false);
                    }}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-white/10 hover:bg-white/10 hover:scale-105"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2 border-white/10 hover:bg-white/10 hover:scale-105"
                  onClick={() => {
                    window.location.href = 'mailto:support@donata.org';
                    setIsMenuOpen(false);
                  }}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </div>
            ) : (
              <Button 
                variant="default" 
                className="w-full mt-2 bg-theme-accent-400 hover:bg-theme-accent-500 transition-all duration-300 hover:scale-105"
                onClick={() => {
                  navigateToAuth();
                  setIsMenuOpen(false);
                }}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Sign Up / Login
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
