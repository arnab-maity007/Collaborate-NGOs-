
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useState, useEffect } from "react";

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
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAwIDEwMGM1MC41MDggMCA5MS45MTItNDEuNDAzIDkxLjkxMi05MS45MTIgMC0xLjAxMy0uMDE3LTIuMDIxLS4wNS0zLjAyNEMxOTMuNDM3IDE0LjY3MyAxOTMuODYgMjQuMzI0IDE5My44OSAzNC4wMWMuMTIxIDQwLjU2My0zMi41MTIgNzMuNjI0LTczLjA3IDczLjYyNC00MC41NTkgMC03My4xOS0zMy4wNjItNzMuMDctNzMuNjI0LjAzLTkuNjg2LjQ1My0xOS4zMzcgMi4wMjctMjguOTQ1LS4wMzMgMS4wMDMtLjA1IDIuMDExLS4wNSAzLjAyNEMxMC4yIDU4LjkxMiA1MS42MDMgMTEwIDEwMCAxMTB6IiBmaWxsPSIjMDAxRjU0IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] opacity-10"></div>
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
            className="bg-theme-accent-400 hover:bg-theme-accent-500 text-lg px-8"
            onClick={() => scrollToSection("donate")}
          >
            Donate Now
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-lg px-8 border-white/20 hover:bg-white/5"
            onClick={() => scrollToSection("about")}
          >
            Learn More
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-pulse-light">
        <button 
          onClick={() => scrollToSection("stats")} 
          className="text-white"
          aria-label="Scroll down"
        >
          <ArrowDown className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
