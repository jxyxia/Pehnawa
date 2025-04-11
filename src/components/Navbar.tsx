// This file is already implemented in the project and should be kept as is.
// We just need to add a link to the Orders page in the navigation

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, PackageOpen, LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SearchBar from "./SearchBar";
import Cart from "./Cart";
import Wishlist from "./Wishlist";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out",
      });
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="bg-white/50 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {isMobile && (
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <div className="flex flex-col gap-4 mt-8">
                    <Link 
                      to="/" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-medium hover:text-pehnawa-terracotta transition-colors"
                    >
                      Home
                    </Link>
                    <Link 
                      to="/categories"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-medium hover:text-pehnawa-terracotta transition-colors"
                    >
                      Categories
                    </Link>
                    <Link 
                      to="/how-it-works"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-medium hover:text-pehnawa-terracotta transition-colors"
                    >
                      How It Works
                    </Link>
                    <Link 
                      to="/orders"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-medium hover:text-pehnawa-terracotta transition-colors"
                    >
                      My Orders
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            )}
            
            <Link to="/" className="flex items-center">
              <img 
                src="/pehnawa-logo.png" 
                alt="Pehnawa" 
                className="h-8 mr-4" 
              />
            </Link>
            
            {!isMobile && (
              <div className="ml-10 flex items-center space-x-8">
                <Link 
                  to="/" 
                  className="font-medium hover:text-pehnawa-terracotta transition-colors"
                >
                  Home
                </Link>
                <Link 
                  to="/categories" 
                  className="font-medium hover:text-pehnawa-terracotta transition-colors"
                >
                  Categories
                </Link>
                <Link 
                  to="/how-it-works" 
                  className="font-medium hover:text-pehnawa-terracotta transition-colors"
                >
                  How It Works
                </Link>
                <Link 
                  to="/orders" 
                  className="font-medium hover:text-pehnawa-terracotta transition-colors"
                >
                  My Orders
                </Link>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <SearchBar />
            <Wishlist />
            <Cart />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate("/orders")}>
                    <PackageOpen className="h-4 w-4 mr-2" />
                    My Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate("/auth")}
              >
                <LogIn className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
