
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DonationTracker from "@/components/DonationTracker";

const TrackerPage = () => {
  return (
    <div className="min-h-screen bg-theme-blue-900 flex flex-col">
      <Navbar />
      <div className="pt-16">
        <DonationTracker />
      </div>
      <Footer />
    </div>
  );
};

export default TrackerPage;
