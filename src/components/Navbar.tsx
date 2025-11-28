import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <MapPin className="w-8 h-8 text-primary" />
          <span className="text-2xl font-bold text-foreground">CivicLink</span>
        </Link>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => navigate("/auth")}
            className="border-border hover:bg-secondary"
          >
            Citizen Login
          </Button>
          <Button
            onClick={() => navigate("/auth")}
            className="bg-primary hover:bg-primary/90"
          >
            Official Login
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
