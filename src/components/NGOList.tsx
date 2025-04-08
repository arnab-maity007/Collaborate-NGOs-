
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Award, Shield, Users, Globe } from "lucide-react";

interface NGO {
  id: number;
  name: string;
  description: string;
  category: string[];
  established: number;
  impact: string;
  location: string;
  verified: boolean;
  featured: boolean;
}

const topNGOs: NGO[] = [
  {
    id: 1,
    name: "Care India",
    description: "Focuses on empowering women and girls from poor and marginalized communities.",
    category: ["Poverty", "Education", "Women Empowerment"],
    established: 1950,
    impact: "Reached over 50 million people across 14 states in India",
    location: "New Delhi, India",
    verified: true,
    featured: true
  },
  {
    id: 2,
    name: "Pratham",
    description: "Works to provide quality education to underprivileged children in India.",
    category: ["Education", "Children"],
    established: 1995,
    impact: "Reached over 75 million children across India",
    location: "Mumbai, India",
    verified: true,
    featured: true
  },
  {
    id: 3,
    name: "Goonj",
    description: "Uses urban discard as a resource for rural development and disaster relief.",
    category: ["Disaster Relief", "Rural Development"],
    established: 1999,
    impact: "Works across 25+ states in India",
    location: "New Delhi, India",
    verified: true,
    featured: false
  },
  {
    id: 4,
    name: "Akshaya Patra Foundation",
    description: "Implements the Mid-Day Meal Scheme in government schools across India.",
    category: ["Hunger", "Education", "Children"],
    established: 2000,
    impact: "Serves over 1.8 million children across 19,039 schools",
    location: "Bengaluru, India",
    verified: true,
    featured: true
  },
  {
    id: 5,
    name: "Smile Foundation",
    description: "Works for the welfare of children, their families, and communities.",
    category: ["Education", "Health", "Livelihood"],
    established: 2002,
    impact: "Benefitted over 1.5 million children and families",
    location: "New Delhi, India",
    verified: true,
    featured: false
  },
  {
    id: 6,
    name: "CRY (Child Rights and You)",
    description: "Ensures children's rights to survival, development, protection, and participation.",
    category: ["Children", "Education", "Health"],
    established: 1979,
    impact: "Reached over 3 million children across 19 states",
    location: "Mumbai, India",
    verified: true,
    featured: false
  },
  {
    id: 7,
    name: "Wildlife SOS",
    description: "Conserves wildlife and protects habitats, especially focusing on elephants and bears.",
    category: ["Wildlife", "Conservation"],
    established: 1995,
    impact: "Rescued and rehabilitated hundreds of wildlife animals",
    location: "New Delhi, India",
    verified: true,
    featured: true
  },
  {
    id: 8,
    name: "Helpage India",
    description: "Works for the cause and care of disadvantaged older persons in India.",
    category: ["Elderly Care", "Health"],
    established: 1978,
    impact: "Supports over 25 million elderly people in India",
    location: "New Delhi, India",
    verified: true,
    featured: false
  }
];

const NGOList = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-theme-blue-900 relative">
      <div className="absolute inset-0 opacity-5 bg-cover bg-center" 
           style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560252719-59e13c2d1ec1?q=80&w=2070')" }}></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-theme-accent-300 border-theme-accent-300">
            Verified Partners
          </Badge>
          <h1 className="text-4xl font-bold text-gradient mb-6">Our NGO Partners</h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-300">
            We partner with trusted NGOs to ensure your donations make the maximum impact. 
            All our partners undergo a rigorous verification process to ensure transparency 
            and accountability.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topNGOs.map((ngo) => (
            <Card key={ngo.id} className="glass-card overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{ngo.name}</h3>
                  {ngo.featured && (
                    <Badge className="bg-theme-accent-400 text-white">
                      <Award className="h-3 w-3 mr-1" /> Featured
                    </Badge>
                  )}
                </div>
                
                <p className="text-gray-300 mb-4">{ngo.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {ngo.category.map((cat, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {cat}
                    </Badge>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-theme-accent-300" />
                    <span>Est. {ngo.established}</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-2 text-theme-accent-300" />
                    <span>{ngo.location}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-start">
                    <Users className="h-4 w-4 mr-2 text-theme-accent-300 mt-1" />
                    <span className="text-sm text-gray-300">{ngo.impact}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NGOList;
