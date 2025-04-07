
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface StatProps {
  title: string;
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

const StatCounter = ({ title, value, suffix = "", prefix = "", duration = 2000 }: StatProps) => {
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
    <Card className="glass-card p-6 text-center">
      <h3 className="text-theme-accent-300 font-medium mb-2">{title}</h3>
      <p className="text-gradient text-4xl font-bold">
        {prefix}{count.toLocaleString()}{suffix}
      </p>
    </Card>
  );
};

const Stats = () => {
  return (
    <section id="stats" className="py-20 px-4 sm:px-6 lg:px-8 bg-theme-blue-800">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gradient">Our Impact</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCounter title="NGOs Connected" value={125} />
          <StatCounter title="Donations Made" value={43250} />
          <StatCounter title="Amount Raised" value={5420000} prefix="₹" />
          <StatCounter title="Active Donors" value={18700} suffix="+" />
        </div>
      </div>
    </section>
  );
};

export default Stats;
