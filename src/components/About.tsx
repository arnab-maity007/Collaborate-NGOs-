
import { Button } from "@/components/ui/button";
import { Heart, Shield, Repeat, BarChart } from "lucide-react";

const AboutCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string 
}) => {
  return (
    <div className="glass-card p-6 flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-full bg-theme-accent-400/30 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-theme-blue-700">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-gradient">About DonorChain</h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-300">
            DonorChain is revolutionizing charitable giving by leveraging blockchain technology 
            to create transparent, traceable donations. Our platform directly connects donors 
            with verified NGOs, ensuring your contribution makes the maximum impact.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <AboutCard 
            icon={<Heart className="h-6 w-6 text-theme-accent-300" />}
            title="Direct Impact"
            description="Your donations go directly to the causes you care about, with minimal overhead and maximum impact."
          />
          <AboutCard 
            icon={<Shield className="h-6 w-6 text-theme-accent-300" />}
            title="Verified NGOs"
            description="We verify all partner NGOs to ensure they meet our standards for accountability and effectiveness."
          />
          <AboutCard 
            icon={<Repeat className="h-6 w-6 text-theme-accent-300" />}
            title="Blockchain Transparency"
            description="Every transaction is recorded on the blockchain, providing complete transparency and traceability."
          />
          <AboutCard 
            icon={<BarChart className="h-6 w-6 text-theme-accent-300" />}
            title="Impact Tracking"
            description="Track how your donation is used and the difference it makes through our donation tracker."
          />
        </div>
        
        <div className="glass-card p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gradient">Our Mission</h3>
              <p className="text-gray-300 mb-6">
                At DonorChain, we believe in the power of transparent giving. We're building a future where 
                every charitable donation can be tracked from donor to beneficiary, ensuring trust and 
                maximizing impact.
              </p>
              <p className="text-gray-300 mb-6">
                By combining blockchain technology with secure identity verification, we're creating 
                a new standard for charitable giving that benefits both donors and organizations.
              </p>
              <Button className="bg-theme-accent-400 hover:bg-theme-accent-500">
                Join Our Mission
              </Button>
            </div>
            <div className="aspect-video glass-card overflow-hidden flex items-center justify-center bg-theme-blue-900/50">
              <div className="text-center p-8">
                <p className="text-theme-accent-300 text-xl mb-2">Coming Soon</p>
                <p className="text-white font-semibold">Mission Video</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
