
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const SearchNGOs = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = () => {
    if (!query.trim()) {
      toast({
        title: "Please enter a search query",
        description: "Enter what type of donation you're interested in",
        variant: "destructive",
      });
      return;
    }
    
    // Navigate to NGO list page with search query
    navigate(`/ngo-list?search=${encodeURIComponent(query)}`);
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-8 glass-card p-6 hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-5px]">
      <div className="flex flex-col space-y-3">
        <label htmlFor="ngo-search" className="text-white text-base font-medium">
          Search for donation opportunities:
        </label>
        <div className="flex space-x-2">
          <Input
            id="ngo-search"
            placeholder="e.g., education, wildlife, children..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-2 focus:ring-theme-accent-300/50 transition-all duration-300 py-6 text-lg"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button 
            onClick={handleSearch}
            className="bg-theme-accent-400 hover:bg-theme-accent-500 transition-all duration-300 transform hover:scale-110 hover:shadow-md hover:translate-y-[-3px] py-6 px-6"
          >
            <Search className="h-5 w-5 mr-2" />
            Search
          </Button>
        </div>
        <p className="text-white/70 text-sm">
          Tell us what cause you're passionate about, and we'll suggest NGOs for you
        </p>
      </div>
    </div>
  );
};

export default SearchNGOs;
