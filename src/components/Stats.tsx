
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";

interface StatProps {
  title: string;
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  fixed?: number;
}

const StatCounter = ({ title, value, suffix = "", prefix = "", duration = 2000, fixed = 0 }: StatProps) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = value;
    const incrementTime = duration / end;
    let timer: NodeJS.Timeout;
    
    const updateCount = () => {
      start += 1;
      setCount(start);
      if (start === end) {
        clearInterval(timer);
      }
    };
    
    timer = setInterval(updateCount, incrementTime);
    
    return () => {
      clearInterval(timer);
    };
  }, [value, duration]);
  
  return (
    <Card className="glass-card p-6 text-center transition-all duration-300 hover:shadow-lg hover:translate-y-[-8px] hover:bg-white/10">
      <h3 className="text-theme-accent-300 font-medium mb-2">{title}</h3>
      <p className="text-gradient text-4xl font-bold">
        {prefix}{count.toLocaleString(undefined, { minimumFractionDigits: fixed, maximumFractionDigits: fixed })}{suffix}
      </p>
    </Card>
  );
};

const Stats = () => {
  return (
    <section id="stats" className="py-20 px-4 sm:px-6 lg:px-8 bg-theme-blue-800 relative">
      <div className="absolute inset-0 opacity-10 bg-cover bg-center" 
           style={{ backgroundImage: "url('https://images.unsplash.com/photo-1469571486292-b53601020a8f?q=80&w=2070')" }}></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-3xl font-bold text-center mb-12 text-gradient">Our Impact</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCounter title="NGOs Connected" value={20} suffix="+" />
          <StatCounter title="Donations Made" value={1000} suffix="+" />
          <StatCounter title="Amount Raised" value={1000000} prefix="₹" fixed={0} suffix="+" />
          <StatCounter title="Active Donors" value={100} suffix="+" />
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/ngo-list">
            <Button 
              variant="outline" 
              className="border-theme-accent-300 text-theme-accent-300 hover:bg-theme-accent-300/10 transition-all duration-300 transform hover:scale-110 hover:shadow-md group"
            >
              View Our Partner NGOs <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Stats;
