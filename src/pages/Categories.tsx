
import Navbar from "@/components/Navbar";
import Categories from "@/components/Categories";
import Footer from "@/components/Footer";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const CategoriesPage = () => {
  const location = useLocation();
  const [filter, setFilter] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  
  useEffect(() => {
    // Get filter and searchTerm from location state if they exist
    if (location.state) {
      if (location.state.filter) {
        setFilter(location.state.filter);
      }
      if (location.state.searchTerm) {
        setSearchTerm(location.state.searchTerm);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-pehnawa-cream">
      <Navbar />
      <div className="pt-8">
        <Categories initialFilter={filter} searchTerm={searchTerm} />
      </div>
      <Footer />
    </div>
  );
};

export default CategoriesPage;
