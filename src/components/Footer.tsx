
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-theme-blue-900 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-theme-accent-400 flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="ml-2 text-xl font-bold text-white">DonorChain</span>
            </Link>
            <p className="text-gray-300 text-sm">
              Blockchain-powered platform connecting donors and NGOs with complete transparency and accountability.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/tracker" className="text-gray-300 hover:text-white">
                  Donation Tracker
                </Link>
              </li>
              <li>
                <Link to="#donate" className="text-gray-300 hover:text-white">
                  Donate Now
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">For NGOs</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="text-gray-300 hover:text-white">
                  Join as NGO
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white">
                  NGO Dashboard
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white">
                  Verification Process
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="text-gray-300 hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} DonorChain. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <p className="text-gray-400 text-sm flex items-center">
              Made with <Heart className="mx-1 h-3 w-3 text-red-500" /> on the Blockchain
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
