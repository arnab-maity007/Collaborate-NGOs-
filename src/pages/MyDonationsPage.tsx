
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getUserDonations } from "@/services/donationService";
import { Donation } from "@/types/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar, Clock, Check, ExternalLink, Filter, SearchX } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const MyDonationsPage = () => {
  const [donations, setDonations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "processing" | "completed">("all");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const fetchDonations = async () => {
      setIsLoading(true);
      const data = await getUserDonations();
      setDonations(data);
      setIsLoading(false);
    };

    fetchDonations();
  }, [user, navigate]);

  const filteredDonations = filter === "all" 
    ? donations 
    : donations.filter(donation => donation.status === filter);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-theme-blue-900 flex flex-col">
      <Navbar />
      <div className="pt-16 flex-grow">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold mb-4 text-gradient">My Donations</h1>
              <p className="text-gray-300">
                Track all your donations and see the impact you're making in the world.
              </p>
            </div>

            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center">
                <Filter className="mr-2 h-5 w-5 text-gray-400" />
                <span className="text-gray-300 mr-3">Filter:</span>
                <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
                  <SelectTrigger className="w-[180px] bg-theme-blue-800 border-gray-700">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Donations</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={() => navigate("/donate")}
                className="bg-theme-accent-400 hover:bg-theme-accent-500"
              >
                Make a New Donation
              </Button>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4"></div>
                <p className="text-gray-300">Loading your donation history...</p>
              </div>
            ) : filteredDonations.length > 0 ? (
              <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-gray-700">
                        <TableHead className="text-gray-300">Date</TableHead>
                        <TableHead className="text-gray-300">Category</TableHead>
                        <TableHead className="text-gray-300">Type</TableHead>
                        <TableHead className="text-gray-300">Amount</TableHead>
                        <TableHead className="text-gray-300">Status</TableHead>
                        <TableHead className="text-gray-300">Transaction ID</TableHead>
                        <TableHead className="text-gray-300 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDonations.map((donation) => (
                        <TableRow 
                          key={donation.id} 
                          className="border-b border-gray-700 hover:bg-theme-blue-800/50"
                        >
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                              {formatDate(donation.created_at)}
                            </div>
                          </TableCell>
                          <TableCell>
                            {donation.category}
                            {donation.subcategory && ` (${donation.subcategory})`}
                          </TableCell>
                          <TableCell>{donation.donation_type}</TableCell>
                          <TableCell>
                            {donation.amount ? `₹${donation.amount}` : 'N/A'}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(donation.status)}
                              <span>{getStatusText(donation.status)}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-[150px] truncate">
                              {donation.transaction_id}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => navigate(`/tracker?txid=${donation.transaction_id}`)}
                            >
                              <ExternalLink className="h-4 w-4" />
                              <span className="sr-only">View Details</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ) : (
              <Card className="glass-card p-12 text-center">
                <SearchX className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No donations found</h3>
                <p className="text-gray-300 mb-6">
                  {filter !== "all" 
                    ? `You don't have any ${filter} donations yet.`
                    : "You haven't made any donations yet."}
                </p>
                <Button 
                  onClick={() => navigate("/donate")}
                  className="bg-theme-accent-400 hover:bg-theme-accent-500"
                >
                  Make Your First Donation
                </Button>
              </Card>
            )}

            <div className="mt-12 glass-card p-6">
              <h3 className="text-xl font-semibold mb-4 text-gradient">Understanding Your Impact</h3>
              <p className="text-gray-300 mb-4">
                Your donations are securely recorded on the blockchain, providing complete transparency and traceability 
                of how your contribution is being used.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="p-4 neo-blur">
                  <h4 className="font-semibold text-white mb-2">Pending</h4>
                  <p className="text-sm text-gray-300">
                    Donation is being processed on the blockchain and waiting for confirmation.
                  </p>
                </div>
                <div className="p-4 neo-blur">
                  <h4 className="font-semibold text-white mb-2">Processing</h4>
                  <p className="text-sm text-gray-300">
                    NGO has received your donation and is in the process of allocating resources.
                  </p>
                </div>
                <div className="p-4 neo-blur">
                  <h4 className="font-semibold text-white mb-2">Completed</h4>
                  <p className="text-sm text-gray-300">
                    Your donation has been fully utilized and an impact report will be available.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default MyDonationsPage;
