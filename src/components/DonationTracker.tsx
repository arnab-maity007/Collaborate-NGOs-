import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { getDonationByTransactionId } from "@/services/donationService";
import { Donation } from "@/types/supabase";
import { formatDistanceToNow } from "date-fns";
import { PackageCheck, InfoIcon, Send, Search, Loader2 } from "lucide-react";

const DonationTracker = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  const [transactionId, setTransactionId] = useState(searchParams.get("txid") || "");
  const [searchResults, setSearchResults] = useState<Donation[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [initialFetchDone, setInitialFetchDone] = useState(false);

  useEffect(() => {
    const initialTxId = searchParams.get("txid");
    if (initialTxId) {
      setTransactionId(initialTxId);
      handleTrackDonation(initialTxId);
    } else {
      setInitialFetchDone(true);
    }
  }, []);

  const handleTrackDonation = async (txId: string = transactionId) => {
    if (!txId) {
      toast({
        title: "Missing transaction ID",
        description: "Please enter a transaction ID to track your donation",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    const initialTxId = searchParams.get("txid");

    try {
      const donation = await getDonationByTransactionId(txId);
      
      if (donation) {
        const typedDonation = {
          ...donation,
          status: donation.status as "pending" | "processing" | "completed"
        };
        
        setSearchResults([typedDonation]);
        
        if (initialTxId !== txId) {
          setSearchParams({ txid: txId });
        }
      } else {
        setSearchResults([]);
        toast({
          title: "Donation not found",
          description: "We couldn't find a donation with that transaction ID",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error tracking donation:", error);
      toast({
        title: "Error tracking donation",
        description: "There was an error tracking your donation",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
      setInitialFetchDone(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionId(e.target.value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-500";
      case "processing":
        return "text-yellow-500";
      default:
        return "text-blue-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <PackageCheck className="h-5 w-5 text-green-500" />;
      case "processing":
        return <Send className="h-5 w-5 text-yellow-500" />;
      default:
        return <InfoIcon className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-theme-blue-900">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gradient">Track Your Donation</h2>
          <p className="text-gray-300">
            Enter your transaction ID to track the status of your donation and see the impact it's making.
          </p>
        </div>
        
        <Card className="glass-card p-6 md:p-8">
          <div className="mb-6">
            <div className="relative">
              <Input
                type="text"
                value={transactionId}
                onChange={handleInputChange}
                placeholder="Enter transaction ID"
                className="pr-24"
              />
              <Button 
                className="absolute right-1 top-1 bottom-1 bg-theme-accent-400 hover:bg-theme-accent-500"
                onClick={() => handleTrackDonation()}
                disabled={isSearching}
              >
                {isSearching ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Track
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {initialFetchDone && (
            <div>
              {searchResults.length > 0 ? (
                <div className="space-y-6">
                  {searchResults.map((donation) => (
                    <div key={donation.id} className="space-y-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(donation.status)}
                        <h3 className="text-xl font-semibold">
                          Donation Status: <span className={getStatusColor(donation.status)}>
                            {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                          </span>
                        </h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-400 text-sm">Transaction ID</p>
                          <p className="text-white">{donation.transaction_id}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Date</p>
                          <p className="text-white">
                            {new Date(donation.created_at).toLocaleDateString()} 
                            <span className="text-gray-400 text-xs ml-2">
                              ({formatDistanceToNow(new Date(donation.created_at), { addSuffix: true })})
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Type</p>
                          <p className="text-white">{donation.donation_type}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Category</p>
                          <p className="text-white">
                            {donation.category}
                            {donation.subcategory && ` (${donation.subcategory})`}
                          </p>
                        </div>
                        {donation.amount && (
                          <div>
                            <p className="text-gray-400 text-sm">Amount</p>
                            <p className="text-white">₹{donation.amount}</p>
                          </div>
                        )}
                        {donation.ngos && (
                          <div>
                            <p className="text-gray-400 text-sm">Organization</p>
                            <p className="text-white">{donation.ngos.name}</p>
                          </div>
                        )}
                        {donation.donation_mode && (
                          <div>
                            <p className="text-gray-400 text-sm">Donation Mode</p>
                            <p className="text-white">{donation.donation_mode}</p>
                          </div>
                        )}
                        {donation.delivery_address && (
                          <div className="md:col-span-2">
                            <p className="text-gray-400 text-sm">Delivery Address</p>
                            <p className="text-white">{donation.delivery_address}</p>
                          </div>
                        )}
                        {donation.other_details && (
                          <div className="md:col-span-2">
                            <p className="text-gray-400 text-sm">Additional Details</p>
                            <p className="text-white">{donation.other_details}</p>
                          </div>
                        )}
                      </div>
                      
                      {donation.status === "completed" && donation.impact_report && (
                        <div className="mt-6 p-4 bg-theme-blue-800 rounded-lg">
                          <h4 className="text-theme-accent-300 font-semibold mb-2">Impact Report</h4>
                          <p className="text-white">{donation.impact_report}</p>
                        </div>
                      )}
                      
                      {donation.status === "pending" && (
                        <div className="mt-6 p-4 glass-card">
                          <h4 className="text-theme-accent-300 font-semibold mb-2">What Happens Next?</h4>
                          <p className="text-gray-300">
                            Your donation is being processed. You'll receive updates as it moves through our system
                            and makes its way to the intended recipients. Thank you for your generosity!
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-400">
                    Enter a transaction ID to track your donation
                  </p>
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};

export default DonationTracker;
