
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NGOList from "@/components/NGOList";

const NGOListPage = () => {
  return (
    <div className="min-h-screen bg-theme-blue-900 flex flex-col">
      <Navbar />
      <div className="pt-16">
        <NGOList />
      </div>
      <Footer />
    </div>
  );
};

export default NGOListPage;
