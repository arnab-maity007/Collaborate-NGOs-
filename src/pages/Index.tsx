
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-theme-blue-900 flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
