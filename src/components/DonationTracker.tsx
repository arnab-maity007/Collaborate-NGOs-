
import React, { useState } from "react";
import { getDonationByTransactionId } from "@/services/donationService";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Search, Check, Clock, AlertTriangle } from "lucide-react";
import { Donation } from "@/types/supabase";

const DonationTracker = () => {
  const [transactionId, setTransactionId] = useState("");
  const [donation, setDonation] = useState<Donation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const trackDonation = async () => {
    if (!transactionId.trim()) {
      setError("Please enter a transaction ID");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const result = await getDonationByTransactionId(transactionId.trim());
      
      if (!result) {
        setError("No donation found with this transaction ID");
        setDonation(null);
      } else {
        // Cast the result to Donation since we've updated our type to handle potential errors
        setDonation(result as Donation);
      }
    } catch (err) {
      console.error("Error tracking donation:", err);
      setError("An error occurred while tracking your donation");
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <Check className="h-5 w-5 text-green-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "processing":
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
    }
  };

  const renderNGOInfo = () => {
    if (!donation?.ngos) return "Not specified";
    
    // Handle error case
    if ('error' in donation.ngos) {
      return "NGO information unavailable";
    }
    
    return donation.ngos?.name || "Not specified";
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Enter transaction ID"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          className="flex-1"
        />
        <Button 
          onClick={trackDonation} 
          disabled={loading}
          className="bg-theme-accent-400 hover:bg-theme-accent-500"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Tracking...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Track Donation
            </>
          )}
        </Button>
      </div>

      {error && (
        <Card className="p-6 mb-6 border-red-400 bg-red-500/10">
          <p className="text-red-400 flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5" />
            {error}
          </p>
        </Card>
      )}

      {donation && (
        <Card className="p-6 glass-card">
          <h2 className="text-xl font-bold mb-4 text-gradient">Donation Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm text-white/60 mb-1">Transaction ID</h3>
              <p className="text-white font-medium">{donation.transaction_id}</p>
            </div>
            
            <div>
              <h3 className="text-sm text-white/60 mb-1">Status</h3>
              <p className="text-white font-medium flex items-center">
                {getStatusIcon(donation.status)}
                <span className="ml-2 capitalize">{donation.status}</span>
              </p>
            </div>
            
            <div>
              <h3 className="text-sm text-white/60 mb-1">Amount</h3>
              <p className="text-white font-medium">
                {donation.amount ? `$${donation.amount.toFixed(2)}` : "In-kind donation"}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm text-white/60 mb-1">Date</h3>
              <p className="text-white font-medium">
                {new Date(donation.created_at).toLocaleDateString()}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm text-white/60 mb-1">Donation Type</h3>
              <p className="text-white font-medium capitalize">{donation.donation_type}</p>
            </div>
            
            <div>
              <h3 className="text-sm text-white/60 mb-1">Category</h3>
              <p className="text-white font-medium capitalize">{donation.category}</p>
            </div>
            
            <div>
              <h3 className="text-sm text-white/60 mb-1">NGO</h3>
              <p className="text-white font-medium">{renderNGOInfo()}</p>
            </div>
            
            {donation.delivery_address && (
              <div>
                <h3 className="text-sm text-white/60 mb-1">Delivery Address</h3>
                <p className="text-white font-medium">{donation.delivery_address}</p>
              </div>
            )}
          </div>
          
          {donation.impact_report && (
            <div className="mt-6">
              <h3 className="text-sm text-white/60 mb-1">Impact Report</h3>
              <div className="p-4 bg-white/5 rounded-md text-white">
                {donation.impact_report}
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default DonationTracker;
