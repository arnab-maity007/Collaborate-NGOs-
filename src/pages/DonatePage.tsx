import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { useAuth } from "@/contexts/AuthContext";
import { submitDonation, getNGOs } from "@/services/donationService";
import { 
  Users, Heart, Shield, Lightbulb, Utensils, Banknote, Book,
  Package, ChevronRight, ChevronLeft, Send, Calendar, MapPin,
  Shirt, MessageSquare, Leaf, Brain, Home, Dog, Cat
} from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { NGO } from "@/types/supabase";

type DonationCategory = "people" | "animals" | "army" | "research" | "rural" | "forestation" | "mental";
type AnimalSubcategory = "dogs" | "cats" | "wildlife" | "birds" | "marine" | "all";
type DonationType = "money" | "food" | "clothes" | "books" | "teaching" | "other";
type DonationMode = "online" | "offline";

const DonatePage = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  
  const [ngos, setNgos] = useState<NGO[]>([]);
  const [selectedNgo, setSelectedNgo] = useState<string | null>(null);
  
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState<DonationCategory | null>(null);
  const [animalSubcategory, setAnimalSubcategory] = useState<AnimalSubcategory | null>(null);
  const [donationType, setDonationType] = useState<DonationType | null>(null);
  const [donationMode, setDonationMode] = useState<DonationMode | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [otherDetails, setOtherDetails] = useState<string>("");
  const [processingDonation, setProcessingDonation] = useState(false);

  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
    }
    
    const fetchNGOs = async () => {
      const ngoData = await getNGOs();
      setNgos(ngoData);
      
      if (ngoData.length > 0) {
        setSelectedNgo(ngoData[0].id);
      }
    };
    
    fetchNGOs();
  }, [user]);

  const handleCategorySelect = (selected: DonationCategory) => {
    setCategory(selected);
    if (selected !== "animals") {
      setAnimalSubcategory(null);
    }
    setStep(selected === "animals" ? 3 : 4);
  };

  const handleAnimalSubcategorySelect = (selected: AnimalSubcategory) => {
    setAnimalSubcategory(selected);
    setStep(4);
  };

  const handleDonationTypeSelect = (selected: DonationType) => {
    setDonationType(selected);
    if (selected === "money") {
      setDonationMode("online");
      setStep(6);
    } else {
      setStep(5);
    }
  };

  const handleDonationModeSelect = (selected: DonationMode) => {
    setDonationMode(selected);
    setStep(6);
  };

  const handleSubmitDonation = async () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login or create an account to make a donation",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    if (!name || !email || !date) {
      toast({
        title: "Missing personal information",
        description: "Please complete all required personal fields",
        variant: "destructive",
      });
      return;
    }

    if (!category || !donationType || (category === "animals" && !animalSubcategory) || !selectedNgo) {
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

    const donationData = {
      category: category,
      subcategory: category === "animals" ? animalSubcategory : null,
      donation_type: donationType,
      donation_mode: donationMode,
      amount: donationType === "money" ? parseFloat(amount) : null,
      other_details: otherDetails || null,
      delivery_address: donationMode === "offline" ? `${address}, ${city}, ${state}, ${pincode}` : null,
      ngo_id: selectedNgo
    };

    const { success, donation, error } = await submitDonation(donationData);
    
    setProcessingDonation(false);

    if (success && donation) {
      toast({
        title: "Donation successful!",
        description: "Your donation has been recorded. Thank you for your generosity!",
      });
      
      navigate(`/tracker?txid=${donation.transaction_id}`);
    } else {
      toast({
        title: "Donation failed",
        description: error?.message || "There was an error processing your donation. Please try again.",
        variant: "destructive",
      });
    }
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
            disabled={!!user}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number*</Label>
          <Input 
            id="phone" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            placeholder="Enter your phone number"
            required
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
          <Label htmlFor="address">Address*</Label>
          <Input 
            id="address" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
            placeholder="Enter your street address"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">City*</Label>
          <Input 
            id="city" 
            value={city} 
            onChange={(e) => setCity(e.target.value)} 
            placeholder="Enter your city"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State*</Label>
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
          <Label htmlFor="pincode">PIN Code*</Label>
          <Input 
            id="pincode" 
            value={pincode} 
            onChange={(e) => setPincode(e.target.value)} 
            placeholder="Enter your PIN code"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderCategorySelection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gradient">Who would you like to help?</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <CategoryCard 
          icon={<Users className="text-[#6E59A5]" />} 
          label="Needy People" 
          onClick={() => handleCategorySelect("people")} 
          selected={category === "people"}
        />
        <CategoryCard 
          icon={<Heart className="text-[#6E59A5]" />} 
          label="Animals" 
          onClick={() => handleCategorySelect("animals")} 
          selected={category === "animals"}
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
        <CategoryCard 
          icon={<Home className="text-[#6E59A5]" />} 
          label="Rural Development" 
          onClick={() => handleCategorySelect("rural")} 
          selected={category === "rural"}
        />
        <CategoryCard 
          icon={<Leaf className="text-[#6E59A5]" />} 
          label="Forestation" 
          onClick={() => handleCategorySelect("forestation")} 
          selected={category === "forestation"}
        />
        <CategoryCard 
          icon={<Brain className="text-[#6E59A5]" />} 
          label="Mental Health" 
          onClick={() => handleCategorySelect("mental")} 
          selected={category === "mental"}
        />
      </div>
    </div>
  );

  const renderAnimalSubcategorySelection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gradient">Which animals would you like to help?</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <CategoryCard 
          icon={<Dog className="h-5 w-5 text-[#6E59A5]" />} 
          label="Dogs" 
          onClick={() => handleAnimalSubcategorySelect("dogs")} 
          selected={animalSubcategory === "dogs"}
        />
        <CategoryCard 
          icon={<Cat className="h-5 w-5 text-[#6E59A5]" />} 
          label="Cats" 
          onClick={() => handleAnimalSubcategorySelect("cats")} 
          selected={animalSubcategory === "cats"}
        />
        <CategoryCard 
          icon={<Heart className="h-5 w-5 text-[#6E59A5]" />} 
          label="Wildlife" 
          onClick={() => handleAnimalSubcategorySelect("wildlife")} 
          selected={animalSubcategory === "wildlife"}
        />
        <CategoryCard 
          icon={<Heart className="h-5 w-5 text-[#6E59A5]" />} 
          label="Birds" 
          onClick={() => handleAnimalSubcategorySelect("birds")} 
          selected={animalSubcategory === "birds"}
        />
        <CategoryCard 
          icon={<Heart className="h-5 w-5 text-[#6E59A5]" />} 
          label="Marine Life" 
          onClick={() => handleAnimalSubcategorySelect("marine")} 
          selected={animalSubcategory === "marine"}
        />
        <CategoryCard 
          icon={<Heart className="h-5 w-5 text-[#6E59A5]" />} 
          label="All Animals" 
          onClick={() => handleAnimalSubcategorySelect("all")} 
          selected={animalSubcategory === "all"}
        />
      </div>
    </div>
  );

  const renderDonationTypeSelection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gradient">How would you like to help?</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
          icon={<Shirt className="text-[#6E59A5]" />} 
          label="Clothes" 
          onClick={() => handleDonationTypeSelect("clothes")} 
          selected={donationType === "clothes"}
        />
        <CategoryCard 
          icon={<Book className="text-[#6E59A5]" />} 
          label="Books" 
          onClick={() => handleDonationTypeSelect("books")} 
          selected={donationType === "books"}
        />
        <CategoryCard 
          icon={<MessageSquare className="text-[#6E59A5]" />} 
          label="Teaching" 
          onClick={() => handleDonationTypeSelect("teaching")} 
          selected={donationType === "teaching"}
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

  const renderDonationModeSelection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gradient">How would you like to donate?</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <CategoryCard 
          icon={<MapPin className="h-6 w-6 text-[#6E59A5]" />} 
          label="Offline" 
          description="Visit an NGO in person to donate"
          onClick={() => handleDonationModeSelect("offline")} 
          selected={donationMode === "offline"}
        />
        <CategoryCard 
          icon={<Send className="h-6 w-6 text-[#6E59A5]" />} 
          label="Online" 
          description="Donate directly through our platform"
          onClick={() => handleDonationModeSelect("online")} 
          selected={donationMode === "online"}
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
          
          <div className="space-y-2">
            <Label htmlFor="ngo">Select NGO to donate to</Label>
            <Select value={selectedNgo || ""} onValueChange={setSelectedNgo}>
              <SelectTrigger className="bg-theme-blue-800 border-gray-700 text-white">
                <SelectValue placeholder="Select an NGO" />
              </SelectTrigger>
              <SelectContent className="bg-theme-blue-700 border-gray-700">
                {ngos.map(ngo => (
                  <SelectItem key={ngo.id} value={ngo.id} className="text-white hover:bg-theme-blue-600 focus:bg-theme-blue-600 focus:text-white">
                    {ngo.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
      
      {donationType !== "money" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ngo">Select NGO to donate to</Label>
            <Select value={selectedNgo || ""} onValueChange={setSelectedNgo}>
              <SelectTrigger className="bg-theme-blue-800 border-gray-700 text-white">
                <SelectValue placeholder="Select an NGO" />
              </SelectTrigger>
              <SelectContent className="bg-theme-blue-700 border-gray-700">
                {ngos.map(ngo => (
                  <SelectItem key={ngo.id} value={ngo.id} className="text-white hover:bg-theme-blue-600 focus:bg-theme-blue-600 focus:text-white">
                    {ngo.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="donationDetails">
              {donationMode === "offline" ? "Your donation details (what you'd like to donate)" : "Details for online donation"}
            </Label>
            <Textarea
              id="donationDetails"
              value={otherDetails}
              onChange={(e) => setOtherDetails(e.target.value)}
              placeholder={donationMode === "offline" 
                ? `Please describe what ${donationType} items you'd like to donate and any relevant details`
                : `Please provide details about your ${donationType} donation`
              }
              className="min-h-[100px]"
            />
          </div>
        </div>
      )}
      
      {donationMode === "offline" && (
        <div className="p-4 glass-card mt-4">
          <h4 className="text-theme-accent-300 font-semibold mb-2">What happens next?</h4>
          <p className="text-sm text-gray-300">
            After submitting your details, one of our partner NGOs will contact you soon to arrange 
            the collection or drop-off of your donation. You'll receive an email confirmation with 
            contact details.
          </p>
        </div>
      )}
      
      <div className="p-4 bg-[#6E59A5]/20 rounded-md border border-[#9b87f5] space-y-2">
        <h4 className="text-[#D6BCFA] font-semibold">Donation Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <p className="text-gray-300">Name: <span className="text-white">{name}</span></p>
          <p className="text-gray-300">Email: <span className="text-white">{email}</span></p>
          <p className="text-gray-300">Phone: <span className="text-white">{phone}</span></p>
          <p className="text-gray-300">Location: <span className="text-white">{city}, {state}</span></p>
          <p className="text-gray-300">
            Category: <span className="text-white">
              {category === "people" ? "Needy People" : 
               category === "animals" ? `Animals (${animalSubcategory})` : 
               category === "rural" ? "Rural Development" : 
               category === "forestation" ? "Forestation" : 
               category === "mental" ? "Mental Health" : 
               category}
            </span>
          </p>
          <p className="text-gray-300">Donation Type: <span className="text-white">{donationType}</span></p>
          <p className="text-gray-300">Donation Mode: <span className="text-white">{donationMode}</span></p>
          {donationType === "money" && amount && <p className="text-gray-300">Amount: <span className="text-white">₹{amount}</span></p>}
          <p className="text-gray-300">NGO: <span className="text-white">{ngos.find(ngo => ngo.id === selectedNgo)?.name || "Not selected"}</span></p>
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

  const getStepTitle = (stepNumber: number): string => {
    switch(stepNumber) {
      case 1: return "Personal Info";
      case 2: return "Category";
      case 3: return category === "animals" ? "Animal Type" : "Subcategory";
      case 4: return "Donation Type";
      case 5: return "Donation Mode";
      case 6: return "Details";
      default: return "";
    }
  };

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
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div 
                      key={i}
                      className={`flex flex-col items-center ${i < 6 ? "flex-1" : ""}`}
                    >
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 
                        ${step >= i ? "bg-theme-accent-400" : "bg-gray-700"}`}
                      >
                        {i}
                      </div>
                      {i < 6 && (
                        <div 
                          className={`h-1 w-full ${step > i ? "bg-theme-accent-400" : "bg-gray-700"}`} 
                          aria-hidden="true"
                        ></div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-400">
                  <span>{getStepTitle(1)}</span>
                  <span>{getStepTitle(2)}</span>
                  <span>{getStepTitle(3)}</span>
                  <span>{getStepTitle(4)}</span>
                  <span>{getStepTitle(5)}</span>
                  <span>{getStepTitle(6)}</span>
                </div>
              </div>
              
              <div className="min-h-[400px]">
                {step === 1 && renderPersonalInformation()}
                {step === 2 && renderCategorySelection()}
                {step === 3 && renderAnimalSubcategorySelection()}
                {step === 4 && renderDonationTypeSelection()}
                {step === 5 && renderDonationModeSelection()}
                {step === 6 && renderDonationDetails()}
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
                
                {step < 6 && (
                  <Button
                    onClick={() => {
                      if (step === 1) {
                        if (!name || !email || !phone || !date || !address || !city || !state || !pincode) {
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
                        (step === 3 && animalSubcategory) ||
                        (step === 4 && donationType) ||
                        (step === 5 && donationMode)
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
  description,
  onClick, 
  selected 
}: { 
  icon: React.ReactNode; 
  label: string; 
  description?: string;
  onClick: () => void; 
  selected: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className={`glass-card p-4 flex flex-col items-center justify-center space-y-3 transition-all ${description ? "h-auto py-6" : "h-28"}
        ${selected ? "bg-[#6E59A5]/30 border-[#9b87f5]" : "hover:bg-white/5"}`}
    >
      <div className={`${selected ? "text-[#D6BCFA]" : "text-gray-300"}`}>
        {icon}
      </div>
      <span className={`font-medium ${selected ? "text-white" : "text-gray-300"}`}>{label}</span>
      {description && (
        <p className="text-xs text-gray-400 text-center mt-1">{description}</p>
      )}
    </button>
  );
};

export default DonatePage;
