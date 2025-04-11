
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  activeFilter: string | null;
  searchTerm: string | null;
  onClearFilter: () => void;
}

const CategoryFilter = ({ activeFilter, searchTerm, onClearFilter }: CategoryFilterProps) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-pehnawa-blue mb-4">
        Our Premium Collections
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Browse our extensive collection of high-quality, designer clothing available for rent at affordable prices.
      </p>
      
      {/* Display search term if provided */}
      {searchTerm && (
        <div className="mt-4">
          <p className="text-sm text-pehnawa-blue mb-2">Searching for: {searchTerm}</p>
        </div>
      )}
      
      {/* Add category filter buttons if needed */}
      {activeFilter && (
        <div className="mt-4">
          <p className="text-sm text-pehnawa-blue mb-2">Filtered by: {activeFilter}</p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onClearFilter}
            className="text-xs"
          >
            Clear Filter
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
