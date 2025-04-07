
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X, LogIn, Wallet } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const connectWallet = () => {
    // This would have the actual web3 wallet connection logic
    setIsConnected(true);
    console.log("Connecting wallet...");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-card bg-theme-blue-900/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-theme-accent-400 flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="ml-2 text-xl font-bold text-white">DonorChain</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-300 hover:text-white px-3 py-2">
              Home
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-white px-3 py-2">
              About
            </Link>
            <Link to="/tracker" className="text-gray-300 hover:text-white px-3 py-2">
              Track Donations
            </Link>
            <Button 
              variant="secondary" 
              className="ml-4"
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
            <Button variant="default" className="bg-theme-accent-400 hover:bg-theme-accent-500">
              <LogIn className="mr-2 h-4 w-4" />
              <span>Sign Up / Login</span>
            </Button>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
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
              className="block px-3 py-2 rounded-md text-base font-medium text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/tracker"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Track Donations
            </Link>
            <Button 
              variant="secondary" 
              className="w-full mt-2"
              onClick={() => connectWallet()}
            >
              {isConnected ? "Connected" : "Connect Wallet"}
            </Button>
            <Button 
              variant="default" 
              className="w-full mt-2 bg-theme-accent-400 hover:bg-theme-accent-500"
            >
              Sign Up / Login
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
