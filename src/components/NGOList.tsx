
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Award, Shield, Users, Globe, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

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

const allNGOs: NGO[] = [
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
  },
  // Adding more NGOs
  {
    id: 9,
    name: "Teach For India",
    description: "Places college graduates and professionals in under-resourced schools to teach for two years.",
    category: ["Education", "Children", "Rural Development"],
    established: 2007,
    impact: "Reached over 40,000 children across 7 cities in India",
    location: "Mumbai, India",
    verified: true,
    featured: true
  },
  {
    id: 10,
    name: "WWF India",
    description: "Engaged in conservation and protection of wildlife and natural habitats in India.",
    category: ["Wildlife", "Conservation", "Environment"],
    established: 1969,
    impact: "Works in over a dozen Indian states protecting endangered species",
    location: "New Delhi, India",
    verified: true,
    featured: true
  },
  {
    id: 11,
    name: "SOS Children's Villages",
    description: "Provides family-based care for children who have lost parental care.",
    category: ["Children", "Orphans", "Education"],
    established: 1964,
    impact: "Supported over 25,000 children and young people across India",
    location: "Chennai, India",
    verified: true,
    featured: false
  },
  {
    id: 12,
    name: "Oxfam India",
    description: "Works to reduce inequality and empower the poor and marginalized.",
    category: ["Poverty", "Equality", "Humanitarian"],
    established: 1951,
    impact: "Reaches millions of people across 16 states in India",
    location: "New Delhi, India",
    verified: true,
    featured: true
  },
  {
    id: 13,
    name: "PETA India",
    description: "Dedicated to establishing and protecting the rights of all animals.",
    category: ["Animal Rights", "Animal Welfare"],
    established: 2000,
    impact: "Advocated for thousands of animals across India",
    location: "Mumbai, India",
    verified: true,
    featured: false
  },
  {
    id: 14,
    name: "The Akshaya Patra Foundation",
    description: "Runs the world's largest NGO-run school meal program.",
    category: ["Children", "Hunger", "Education"],
    established: 2000,
    impact: "Serves hot meals to over 1.8 million children daily",
    location: "Bengaluru, India",
    verified: true,
    featured: true
  },
  {
    id: 15,
    name: "UNICEF India",
    description: "Works for children's rights, survival, development and protection.",
    category: ["Children", "Health", "Education"],
    established: 1949,
    impact: "Reaches millions of children across all states in India",
    location: "New Delhi, India",
    verified: true,
    featured: true
  },
  {
    id: 16,
    name: "Samarthanam Trust for the Disabled",
    description: "Empowers visually impaired, disabled and underprivileged people through education and training.",
    category: ["Disability", "Education", "Livelihood"],
    established: 1997,
    impact: "Supported over 25,000 individuals with disabilities",
    location: "Bengaluru, India",
    verified: true,
    featured: false
  },
  {
    id: 17,
    name: "Animal Aid Unlimited",
    description: "Rescues and treats injured and ill street animals in Udaipur, Rajasthan.",
    category: ["Animal Welfare", "Animal Rescue"],
    established: 2002,
    impact: "Rescued and treated over 250,000 animals",
    location: "Udaipur, India",
    verified: true,
    featured: false
  },
  {
    id: 18,
    name: "Bhumi",
    description: "Youth volunteer organization fostering education and mentorship for underprivileged children.",
    category: ["Education", "Youth Development", "Children"],
    established: 2006,
    impact: "Engaged over 30,000 volunteers across 12 cities",
    location: "Chennai, India",
    verified: true,
    featured: false
  },
  {
    id: 19,
    name: "CII Foundation",
    description: "Works on development initiatives in education, healthcare, skill development, and disaster relief.",
    category: ["Education", "Health", "Skill Development"],
    established: 2011,
    impact: "Implemented over 30 projects across India",
    location: "New Delhi, India",
    verified: true,
    featured: false
  },
  {
    id: 20,
    name: "Give India Foundation",
    description: "Platform connecting donors to credible NGOs across India.",
    category: ["Poverty", "Education", "Health"],
    established: 2000,
    impact: "Connected donors to over 200 verified NGOs across India",
    location: "Mumbai, India",
    verified: true,
    featured: true
  },
  {
    id: 21,
    name: "Magic Bus",
    description: "Uses sports and activity-based learning to mentor children from poverty.",
    category: ["Children", "Education", "Sports"],
    established: 1999,
    impact: "Transformed lives of over 400,000 children across 22 states",
    location: "Mumbai, India",
    verified: true,
    featured: false
  },
  {
    id: 22,
    name: "Make-A-Wish India",
    description: "Grants wishes to children with life-threatening medical conditions.",
    category: ["Children", "Health", "Happiness"],
    established: 1996,
    impact: "Fulfilled wishes of over 60,000 children with critical illnesses",
    location: "Mumbai, India",
    verified: true,
    featured: false
  },
  {
    id: 23,
    name: "Parivaar Education Society",
    description: "Residential institution for orphans and extremely vulnerable children.",
    category: ["Children", "Education", "Orphans"],
    established: 2003,
    impact: "Provides complete care to over 2,000 children",
    location: "Kolkata, India",
    verified: true,
    featured: false
  }
];

const NGOList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNGOs, setFilteredNGOs] = useState<NGO[]>(allNGOs);
  const location = useLocation();

  // Extract search query from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get("search");
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [location.search]);

  // Filter NGOs based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredNGOs(allNGOs);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = allNGOs.filter((ngo) => {
      return (
        ngo.name.toLowerCase().includes(query) ||
        ngo.description.toLowerCase().includes(query) ||
        ngo.category.some((cat) => cat.toLowerCase().includes(query)) ||
        ngo.location.toLowerCase().includes(query)
      );
    });

    setFilteredNGOs(filtered);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

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
          <p className="max-w-3xl mx-auto text-lg text-gray-300 mb-8">
            We partner with trusted NGOs to ensure your donations make the maximum impact. 
            All our partners undergo a rigorous verification process to ensure transparency 
            and accountability.
          </p>
          
          {/* Search box */}
          <form onSubmit={handleSearch} className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search by cause, location, or NGO name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/10 border-white/20 text-white pl-10 pr-4 py-2 rounded-md"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </form>
          
          {filteredNGOs.length === 0 && (
            <div className="glass-card p-8 max-w-lg mx-auto mb-8">
              <p className="text-white text-lg">No NGOs found matching your search criteria.</p>
              <Button 
                onClick={() => setSearchQuery("")}
                className="mt-4 bg-theme-accent-400 hover:bg-theme-accent-500 transition-all duration-300"
              >
                View All NGOs
              </Button>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNGOs.map((ngo) => (
            <Card key={ngo.id} className="glass-card overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:translate-y-[-5px]">
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
                    <Badge key={index} variant="outline" className="text-xs hover:bg-white/10 transition-colors duration-300">
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
