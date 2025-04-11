import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { 
  Users, Heart, Baby, Shield, Lightbulb, Utensils, Banknote, 
  Package, ChevronRight, ChevronLeft, Send 
} from "lucide-react";

type DonationCategory = "human" | "animals" | "children" | "army" | "research";
type HumanSubcategory = "men" | "women" | "family" | "all";
type DonationType = "money" | "food" | "other";

const DonationFlow = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState<DonationCategory | null>(null);
  const [humanSubcategory, setHumanSubcategory] = useState<HumanSubcategory | null>(null);
  const [donationType, setDonationType] = useState<DonationType | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [otherDetails, setOtherDetails] = useState<string>("");
  const [processingDonation, setProcessingDonation] = useState(false);

  const handleCategorySelect = (selected: DonationCategory) => {
    setCategory(selected);
    if (selected !== "human") {
      setHumanSubcategory(null);
    }
    setStep(selected === "human" ? 2 : 3);
  };

  const handleHumanSubcategorySelect = (selected: HumanSubcategory) => {
    setHumanSubcategory(selected);
    setStep(3);
  };

  const handleDonationTypeSelect = (selected: DonationType) => {
    setDonationType(selected);
    setStep(4);
  };

  const handleSubmitDonation = () => {
    if (!category || !donationType || (category === "human" && !humanSubcategory)) {
      toast({
        title: "Missing information",
        description: "Please complete all required fields",
        variant: "destructive",
      });
      return;
    }

    if (donationType === "money" && (!amount || parseFloat(amount) <= 0)) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid donation amount",
        variant: "destructive",
      });
      return;
    }

    setProcessingDonation(true);

    // Simulate blockchain transaction
    setTimeout(() => {
      toast({
        title: "Donation successful!",
        description: "Your donation has been recorded on the blockchain. Thank you for your generosity!",
      });
      
      // Reset form
      setCategory(null);
      setHumanSubcategory(null);
      setDonationType(null);
      setAmount("");
      setOtherDetails("");
      setStep(1);
      setProcessingDonation(false);
    }, 3000);
  };

  const renderCategorySelection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gradient">Who would you like to help?</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        <CategoryCard 
          icon={<Users className="text-[#6E59A5]" />} 
          label="Humans" 
          onClick={() => handleCategorySelect("human")} 
          selected={category === "human"}
        />
        <CategoryCard 
          icon={<Heart className="text-[#6E59A5]" />} 
          label="Animals" 
          onClick={() => handleCategorySelect("animals")} 
          selected={category === "animals"}
        />
        <CategoryCard 
          icon={<Baby className="text-[#6E59A5]" />} 
          label="Children" 
          onClick={() => handleCategorySelect("children")} 
          selected={category === "children"}
        />
        <CategoryCard 
          icon={<Shield className="text-[#6E59A5]" />} 
          label="Army" 
          onClick={() => handleCategorySelect("army")} 
          selected={category === "army"}
        />
        <CategoryCard 
          icon={<Lightbulb className="text-[#6E59A5]" />} 
          label="Research" 
          onClick={() => handleCategorySelect("research")} 
          selected={category === "research"}
        />
      </div>
    </div>
  );

  const renderHumanSubcategorySelection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gradient">Which humans would you like to help?</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <CategoryCard 
          icon={<Users className="h-5 w-5 text-[#6E59A5]" />} 
          label="Men" 
          onClick={() => handleHumanSubcategorySelect("men")} 
          selected={humanSubcategory === "men"}
        />
        <CategoryCard 
          icon={<Users className="h-5 w-5 text-[#6E59A5]" />} 
          label="Women" 
          onClick={() => handleHumanSubcategorySelect("women")} 
          selected={humanSubcategory === "women"}
        />
        <CategoryCard 
          icon={<Users className="h-5 w-5 text-[#6E59A5]" />} 
          label="Families" 
          onClick={() => handleHumanSubcategorySelect("family")} 
          selected={humanSubcategory === "family"}
        />
        <CategoryCard 
          icon={<Users className="h-5 w-5 text-[#6E59A5]" />} 
          label="All" 
          onClick={() => handleHumanSubcategorySelect("all")} 
          selected={humanSubcategory === "all"}
        />
      </div>
    </div>
  );

  const renderDonationTypeSelection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gradient">What would you like to donate?</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CategoryCard 
          icon={<Banknote className="text-[#6E59A5]" />} 
          label="Money" 
          onClick={() => handleDonationTypeSelect("money")} 
          selected={donationType === "money"}
        />
        <CategoryCard 
          icon={<Utensils className="text-[#6E59A5]" />} 
          label="Food" 
          onClick={() => handleDonationTypeSelect("food")} 
          selected={donationType === "food"}
        />
        <CategoryCard 
          icon={<Package className="text-[#6E59A5]" />} 
          label="Other" 
          onClick={() => handleDonationTypeSelect("other")} 
          selected={donationType === "other"}
        />
      </div>
    </div>
  );

  const renderDonationDetails = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gradient">Donation Details</h3>
      
      {donationType === "money" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (in your local currency)</Label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">₹</span>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8"
                placeholder="Enter donation amount"
              />
            </div>
          </div>
        </div>
      )}
      
      {donationType === "food" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="foodDetails">Food Details</Label>
            <Textarea
              id="foodDetails"
              value={otherDetails}
              onChange={(e) => setOtherDetails(e.target.value)}
              placeholder="Please describe what food items you'd like to donate"
              className="min-h-[100px]"
            />
          </div>
        </div>
      )}
      
      {donationType === "other" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="otherDetails">Details</Label>
            <Textarea
              id="otherDetails"
              value={otherDetails}
              onChange={(e) => setOtherDetails(e.target.value)}
              placeholder="Please describe what you'd like to donate"
              className="min-h-[100px]"
            />
          </div>
        </div>
      )}
      
      <div className="p-4 bg-[#6E59A5]/20 rounded-md border border-[#9b87f5] space-y-2">
        <h4 className="text-[#D6BCFA] font-semibold">Donation Summary</h4>
        <p className="text-sm text-gray-300">Category: {category} {category === "human" ? `(${humanSubcategory})` : ""}</p>
        <p className="text-sm text-gray-300">Donation Type: {donationType}</p>
        {donationType === "money" && amount && <p className="text-sm text-gray-300">Amount: ₹{amount}</p>}
        {otherDetails && <p className="text-sm text-gray-300">Additional Details: {otherDetails}</p>}
      </div>
      
      <Button
        onClick={handleSubmitDonation}
        disabled={processingDonation}
        className="w-full bg-[#7E69AB] hover:bg-[#6E59A5]"
      >
        {processingDonation ? (
          <div className="flex items-center">
            <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
            Processing...
          </div>
        ) : (
          <div className="flex items-center">
            <Send className="mr-2 h-4 w-4" />
            Complete Donation
          </div>
        )}
      </Button>
    </div>
  );

  return (
    <section id="donate" className="py-20 px-4 sm:px-6 lg:px-8 bg-theme-blue-900">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gradient">Make a Donation</h2>
          <p className="text-gray-300">
            Your donation can make a real difference. Choose who you want to help and how you want to contribute.
          </p>
        </div>
        
        <Card className="glass-card p-6 md:p-8">
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i}
                  className={`flex flex-col items-center ${i < 4 ? "flex-1" : ""}`}
                >
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 
                    ${step >= i ? "bg-theme-accent-400" : "bg-gray-700"}`}
                  >
                    {i}
                  </div>
                  {i < 4 && (
                    <div 
                      className={`h-1 w-full ${step > i ? "bg-theme-accent-400" : "bg-gray-700"}`} 
                      aria-hidden="true"
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="min-h-[300px]">
            {step === 1 && renderCategorySelection()}
            {step === 2 && renderHumanSubcategorySelection()}
            {step === 3 && renderDonationTypeSelection()}
            {step === 4 && renderDonationDetails()}
          </div>
          
          {step > 1 && (
            <div className="mt-6 flex justify-between">
              <Button
                variant="outline"
                className="border-white/20 hover:bg-white/5"
                onClick={() => setStep(step - 1)}
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back
              </Button>
              
              {step < 4 && (
                <Button
                  onClick={() => {
                    if (
                      (step === 1 && category) ||
                      (step === 2 && humanSubcategory) ||
                      (step === 3 && donationType)
                    ) {
                      setStep(step + 1);
                    } else {
                      toast({
                        title: "Selection required",
                        description: "Please make a selection to continue",
                        variant: "destructive",
                      });
                    }
                  }}
                  className="bg-theme-accent-400 hover:bg-theme-accent-500"
                >
                  Next
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};

const CategoryCard = ({ 
  icon, 
  label, 
  onClick, 
  selected 
}: { 
  icon: React.ReactNode; 
  label: string; 
  onClick: () => void; 
  selected: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className={`glass-card p-4 flex flex-col items-center justify-center space-y-3 transition-all h-28
        ${selected ? "bg-[#6E59A5]/30 border-[#9b87f5]" : "hover:bg-white/5"}`}
    >
      <div className={`${selected ? "text-[#D6BCFA]" : "text-gray-300"}`}>
        {icon}
      </div>
      <span className={`font-medium ${selected ? "text-white" : "text-gray-300"}`}>{label}</span>
    </button>
  );
};

export default DonationFlow;
