
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ExternalLink, Clock, Check, Calendar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { getDonationByTransactionId } from "@/services/donationService";
import { Donation } from "@/types/supabase";

const DonationTracker = () => {
  const [searchParams] = useSearchParams();
  const initialTxId = searchParams.get("txid") || "";
  
  const [transactionId, setTransactionId] = useState(initialTxId);
  const [searchResults, setSearchResults] = useState<Donation[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (initialTxId) {
      handleSearch();
    }
  }, [initialTxId]);

  const handleSearch = async () => {
    if (!transactionId.trim()) return;
    
    setIsSearching(true);
    
    try {
      const donation = await getDonationByTransactionId(transactionId);
      
      if (donation) {
        setSearchResults([donation]);
        
        // Update URL with transaction ID for easy sharing
        if (initialTxId !== transactionId) {
          navigate(`/tracker?txid=${transactionId}`);
        }
      } else {
        setSearchResults([]);
        toast({
          title: "No donation found",
          description: "No donation with this transaction ID was found. Please check and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error searching for donation:", error);
      toast({
        title: "Error occurred",
        description: "There was a problem tracking your donation. Please try again later.",
        variant: "destructive",
      });
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "processing":
        return <Clock className="h-5 w-5 text-blue-500" />;
      case "completed":
        return <Check className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case "pending":
        return "Pending";
      case "processing":
        return "Processing";
      case "completed":
        return "Completed";
      default:
        return "";
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-theme-blue-700">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gradient">Track Your Donation</h2>
          <p className="text-gray-300 mb-8">
            Enter your transaction ID to see how your donation is being used and the impact it's making.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 max-w-xl mx-auto mb-8">
            <Input
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="Enter transaction ID"
              className="flex-grow"
            />
            <Button 
              onClick={handleSearch} 
              disabled={isSearching || !transactionId.trim()}
              className="bg-theme-accent-400 hover:bg-theme-accent-500"
            >
              {isSearching ? (
                <div className="flex items-center">
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Searching...
                </div>
              ) : (
                <div className="flex items-center">
                  <Search className="mr-2 h-4 w-4" />
                  Track Donation
                </div>
              )}
            </Button>
          </div>
        </div>
        
        {searchResults.length > 0 ? (
          <div className="space-y-6">
            {searchResults.map((donation) => (
              <Card key={donation.id} className="glass-card p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gradient-blue">
                      {donation.category} Donation
                      {donation.subcategory ? ` (${donation.subcategory})` : ''}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm">
                      {getStatusIcon(donation.status)}
                      <span className="text-gray-300">{getStatusText(donation.status)}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Transaction ID</p>
                      <div className="flex items-center">
                        <p className="text-white text-sm truncate">{donation.transaction_id}</p>
                        <Button variant="ghost" size="sm" className="ml-2 h-6 w-6 p-0">
                          <ExternalLink className="h-3 w-3" />
                          <span className="sr-only">View on Explorer</span>
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-400">Date</p>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        <p className="text-white">{new Date(donation.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-400">Amount</p>
                      <p className="text-white">
                        {donation.amount ? `₹${donation.amount}` : 'Non-monetary donation'}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-400">Donation Type</p>
                      <p className="text-white capitalize">{donation.donation_type}</p>
                    </div>
                  </div>
                  
                  <Tabs defaultValue="details">
                    <TabsList className="grid w-full grid-cols-2 bg-theme-blue-800">
                      <TabsTrigger value="details">Donation Details</TabsTrigger>
                      <TabsTrigger value="usage">Usage & Impact</TabsTrigger>
                    </TabsList>
                    <TabsContent value="details" className="p-4 mt-2 neo-blur">
                      <div className="space-y-2">
                        <p className="text-sm text-gray-400">Donation Mode</p>
                        <p className="text-sm text-white capitalize">{donation.donation_mode || "Online"}</p>
                        
                        {donation.delivery_address && (
                          <>
                            <p className="text-sm text-gray-400 mt-3">Delivery Address</p>
                            <p className="text-sm text-white">{donation.delivery_address}</p>
                          </>
                        )}
                        
                        {donation.other_details && (
                          <>
                            <p className="text-sm text-gray-400 mt-3">Additional Details</p>
                            <p className="text-sm text-white">{donation.other_details}</p>
                          </>
                        )}
                        
                        <div className="pt-2">
                          <p className="text-sm text-gray-400">Verification</p>
                          <div className="flex items-center mt-1">
                            <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                            <p className="text-sm text-green-400">Verified on Blockchain</p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="usage" className="p-4 mt-2 neo-blur">
                      {donation.status === "completed" && donation.impact_report ? (
                        <div>
                          <p className="text-sm text-gray-300">{donation.impact_report}</p>
                          <div className="mt-4 text-sm text-theme-accent-300">
                            Impact report has been verified and published to the blockchain
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-300">
                          {donation.status === "pending" 
                            ? "Donation is pending confirmation on the blockchain."
                            : "Donation is being processed. Usage details will be available once completed."}
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
              </Card>
            ))}
          </div>
        ) : transactionId && !isSearching ? (
          <Card className="glass-card p-6 text-center">
            <p className="text-gray-300">No donations found with this transaction ID. Please check and try again.</p>
          </Card>
        ) : null}
        
        <div className="mt-12 glass-card p-6">
          <h3 className="text-xl font-semibold mb-4 text-gradient">How Donation Tracking Works</h3>
          <div className="space-y-4">
            <p className="text-gray-300">
              Our blockchain-powered donation tracking system provides complete transparency from the moment you donate until your contribution makes an impact:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>Your donation is recorded on the blockchain with a unique transaction ID</li>
              <li>The funds are transferred directly to the verified NGO</li>
              <li>The NGO records how the funds are used on the blockchain</li>
              <li>You can track your donation anytime using your transaction ID</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationTracker;
