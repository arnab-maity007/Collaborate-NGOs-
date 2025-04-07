
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import DonationFlow from "@/components/DonationFlow";
import Footer from "@/components/Footer";
// import Auth from "@/components/Auth"; // Uncomment when implementing authentication modal

const Index = () => {
  return (
    <div className="min-h-screen bg-theme-blue-900 flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <DonationFlow />
        {/* <Auth /> */} {/* Uncomment when implementing authentication modal */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
