
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { 
  Users, Heart, Baby, Shield, Lightbulb, Utensils, Banknote, 
  Package, ChevronRight, ChevronLeft, Send, Calendar, MapPin 
} from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type DonationCategory = "human" | "animals" | "children" | "army" | "research";
type HumanSubcategory = "men" | "women" | "family" | "all";
type DonationType = "money" | "food" | "other";

const DonatePage = () => {
  const { toast } = useToast();
  
  // Personal information
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  
  // Donation information
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
    setStep(selected === "human" ? 3 : 4);
  };

  const handleHumanSubcategorySelect = (selected: HumanSubcategory) => {
    setHumanSubcategory(selected);
    setStep(4);
  };

  const handleDonationTypeSelect = (selected: DonationType) => {
    setDonationType(selected);
    setStep(5);
  };

  const handleSubmitDonation = () => {
    if (!name || !email || !date) {
      toast({
        title: "Missing personal information",
        description: "Please complete all required personal fields",
        variant: "destructive",
      });
      return;
    }

    if (!category || !donationType || (category === "human" && !humanSubcategory)) {
      toast({
        title: "Missing donation information",
        description: "Please complete all required donation fields",
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

  const renderPersonalInformation = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gradient">Your Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name*</Label>
          <Input 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address*</Label>
          <Input 
            id="email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your email address"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input 
            id="phone" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            placeholder="Enter your phone number"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dob">Date of Birth*</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <Calendar className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Select your date of birth</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input 
            id="address" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
            placeholder="Enter your street address"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input 
            id="city" 
            value={city} 
            onChange={(e) => setCity(e.target.value)} 
            placeholder="Enter your city"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Select value={state} onValueChange={setState}>
            <SelectTrigger>
              <SelectValue placeholder="Select your state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="andhra">Andhra Pradesh</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
              <SelectItem value="karnataka">Karnataka</SelectItem>
              <SelectItem value="kerala">Kerala</SelectItem>
              <SelectItem value="maharashtra">Maharashtra</SelectItem>
              <SelectItem value="tamil">Tamil Nadu</SelectItem>
              <SelectItem value="telangana">Telangana</SelectItem>
              <SelectItem value="up">Uttar Pradesh</SelectItem>
              <SelectItem value="wb">West Bengal</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="pincode">PIN Code</Label>
          <Input 
            id="pincode" 
            value={pincode} 
            onChange={(e) => setPincode(e.target.value)} 
            placeholder="Enter your PIN code"
          />
        </div>
      </div>
    </div>
  );

  const renderCategorySelection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gradient">Who would you like to help?</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        <CategoryCard 
          icon={<Users />} 
          label="Humans" 
          onClick={() => handleCategorySelect("human")} 
          selected={category === "human"}
        />
        <CategoryCard 
          icon={<Heart />} 
          label="Animals" 
          onClick={() => handleCategorySelect("animals")} 
          selected={category === "animals"}
        />
        <CategoryCard 
          icon={<Baby />} 
          label="Children" 
          onClick={() => handleCategorySelect("children")} 
          selected={category === "children"}
        />
        <CategoryCard 
          icon={<Shield />} 
          label="Army" 
          onClick={() => handleCategorySelect("army")} 
          selected={category === "army"}
        />
        <CategoryCard 
          icon={<Lightbulb />} 
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
          icon={<Users className="h-5 w-5" />} 
          label="Men" 
          onClick={() => handleHumanSubcategorySelect("men")} 
          selected={humanSubcategory === "men"}
        />
        <CategoryCard 
          icon={<Users className="h-5 w-5" />} 
          label="Women" 
          onClick={() => handleHumanSubcategorySelect("women")} 
          selected={humanSubcategory === "women"}
        />
        <CategoryCard 
          icon={<Users className="h-5 w-5" />} 
          label="Families" 
          onClick={() => handleHumanSubcategorySelect("family")} 
          selected={humanSubcategory === "family"}
        />
        <CategoryCard 
          icon={<Users className="h-5 w-5" />} 
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
          icon={<Banknote />} 
          label="Money" 
          onClick={() => handleDonationTypeSelect("money")} 
          selected={donationType === "money"}
        />
        <CategoryCard 
          icon={<Utensils />} 
          label="Food" 
          onClick={() => handleDonationTypeSelect("food")} 
          selected={donationType === "food"}
        />
        <CategoryCard 
          icon={<Package />} 
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
      
      <div className="p-4 glass-card space-y-2">
        <h4 className="text-theme-accent-300 font-semibold">Donation Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <p className="text-gray-300">Name: <span className="text-white">{name}</span></p>
          <p className="text-gray-300">Email: <span className="text-white">{email}</span></p>
          <p className="text-gray-300">Category: <span className="text-white">{category} {category === "human" ? `(${humanSubcategory})` : ""}</span></p>
          <p className="text-gray-300">Donation Type: <span className="text-white">{donationType}</span></p>
          {donationType === "money" && amount && <p className="text-gray-300">Amount: <span className="text-white">₹{amount}</span></p>}
          {date && <p className="text-gray-300">Date of Birth: <span className="text-white">{format(date, "PPP")}</span></p>}
          {city && state && <p className="text-gray-300">Location: <span className="text-white">{city}, {state}</span></p>}
        </div>
        {otherDetails && (
          <div className="mt-2">
            <p className="text-gray-300 text-sm">Additional Details:</p>
            <p className="text-white text-sm mt-1">{otherDetails}</p>
          </div>
        )}
      </div>
      
      <Button
        onClick={handleSubmitDonation}
        disabled={processingDonation}
        className="w-full bg-theme-accent-400 hover:bg-theme-accent-500"
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
    <div className="min-h-screen bg-theme-blue-900 flex flex-col">
      <Navbar />
      <div className="pt-16 relative">
        <div className="absolute inset-0 opacity-5 bg-cover bg-center" 
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070')" }}></div>
        
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold mb-4 text-gradient">Make a Donation</h1>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Your donation can make a real difference. Fill in your details and choose 
                who you want to help and how you want to contribute.
              </p>
            </div>
            
            <Card className="glass-card p-6 md:p-8">
              <div className="mb-8">
                <div className="flex justify-between items-center">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div 
                      key={i}
                      className={`flex flex-col items-center ${i < 5 ? "flex-1" : ""}`}
                    >
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 
                        ${step >= i ? "bg-theme-accent-400" : "bg-gray-700"}`}
                      >
                        {i}
                      </div>
                      {i < 5 && (
                        <div 
                          className={`h-1 w-full ${step > i ? "bg-theme-accent-400" : "bg-gray-700"}`} 
                          aria-hidden="true"
                        ></div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-400">
                  <span>Personal Info</span>
                  <span>Category</span>
                  <span>{category === "human" ? "Subcategory" : "Type"}</span>
                  <span>{category === "human" ? "Type" : "Details"}</span>
                  <span>{category === "human" ? "Details" : ""}</span>
                </div>
              </div>
              
              <div className="min-h-[400px]">
                {step === 1 && renderPersonalInformation()}
                {step === 2 && renderCategorySelection()}
                {step === 3 && renderHumanSubcategorySelection()}
                {step === 4 && renderDonationTypeSelection()}
                {step === 5 && renderDonationDetails()}
              </div>
              
              <div className="mt-6 flex justify-between">
                <Button
                  variant="outline"
                  className="border-white/20 hover:bg-white/5"
                  onClick={() => setStep(Math.max(1, step - 1))}
                  disabled={step === 1}
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Back
                </Button>
                
                {step < 5 && (
                  <Button
                    onClick={() => {
                      if (step === 1) {
                        if (!name || !email || !date) {
                          toast({
                            title: "Required fields missing",
                            description: "Please fill in all required fields marked with *",
                            variant: "destructive",
                          });
                          return;
                        }
                        setStep(2);
                      } else if (
                        (step === 2 && category) ||
                        (step === 3 && humanSubcategory) ||
                        (step === 4 && donationType)
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
            </Card>
          </div>
        </section>
      </div>
      <Footer />
    </div>
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
        ${selected ? "bg-theme-accent-400/20 border-theme-accent-400" : "hover:bg-white/5"}`}
    >
      <div className={`${selected ? "text-theme-accent-300" : "text-gray-300"}`}>
        {icon}
      </div>
      <span className={`font-medium ${selected ? "text-white" : "text-gray-300"}`}>{label}</span>
    </button>
  );
};

export default DonatePage;
