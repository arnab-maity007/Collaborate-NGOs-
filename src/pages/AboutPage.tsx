
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Stats from "@/components/Stats";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-theme-blue-900 flex flex-col">
      <Navbar />
      <div className="pt-16">
        <About />
        <Stats />
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
