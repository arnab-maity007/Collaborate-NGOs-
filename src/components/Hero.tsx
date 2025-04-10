
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchNGOs from "./SearchNGOs";

interface Quote {
  text: string;
  author: string;
}

const quotes: Quote[] = [
  {
    text: "We make a living by what we get, but we make a life by what we give.",
    author: "Winston Churchill"
  },
  {
    text: "No one has ever become poor by giving.",
    author: "Anne Frank"
  },
  {
    text: "The greatest good you can do for another is not just share your riches, but reveal to them their own.",
    author: "Benjamin Disraeli"
  },
  {
    text: "Giving is not just about making a donation. It's about making a difference.",
    author: "Kathy Calvin"
  },
  {
    text: "Alone we can do so little; together we can do so much.",
    author: "Helen Keller"
  }
];

const Hero = () => {
  const navigate = useNavigate();
  const [currentQuote, setCurrentQuote] = useState<Quote>(quotes[0]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-theme-blue-900 to-theme-blue-700 py-20 px-4 sm:px-6 lg:px-8">
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15" 
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070')" }}></div>
        <div className="absolute inset-0 bg-theme-blue-900/60"></div>
      </div>
      
      <div className="relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-6">
          Transparent Donations Through Blockchain
        </h1>
        <div className="max-w-3xl mx-auto glass-card p-8 mb-10 min-h-[150px] flex items-center justify-center">
          <div className="animate-fade-in">
            <blockquote className="text-xl md:text-2xl italic text-white">
              "{currentQuote.text}"
            </blockquote>
            <p className="mt-4 text-theme-accent-300 font-semibold">— {currentQuote.author}</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
          <Button 
            size="lg" 
            className="text-lg px-10 py-6 bg-theme-accent-400 text-white hover:bg-theme-accent-500 
                     transition-all duration-300 transform hover:scale-110 hover:translate-y-[-5px] hover:shadow-xl
                     animate-pulse-slow relative after:absolute after:inset-0 after:rounded-md after:shadow-[0_0_15px_5px_rgba(18,130,162,0.6)] 
                     after:animate-pulse-glow after:z-[-1]"
            onClick={() => navigate('/donate')}
          >
            Donate Now
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-lg px-8 border-white/20 hover:bg-white/10 transition-all duration-300 transform hover:scale-110 hover:translate-y-[-4px] hover:shadow-lg"
            onClick={() => scrollToSection("about")}
          >
            Learn More
          </Button>
        </div>
        
        <div className="mt-8 w-full max-w-xl mx-auto">
          <SearchNGOs />
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-pulse-light">
        <button 
          onClick={() => scrollToSection("stats")} 
          className="text-white transition-transform duration-300 hover:scale-110"
          aria-label="Scroll down"
        >
          <ArrowDown className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
