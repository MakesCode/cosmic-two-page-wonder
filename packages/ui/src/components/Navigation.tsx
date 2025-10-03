import { Link, useLocation } from "@tanstack/react-router";
import { Rocket, Globe } from "lucide-react";
import { Button } from "@ui/components/ui/button";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <Rocket className="w-8 h-8 text-primary group-hover:animate-pulse-glow transition-all duration-300" />
            <span className="text-2xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
              SpaceExplorer
            </span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Button
              variant={location.pathname === "/" ? "default" : "ghost"}
              asChild
              className="relative overflow-hidden group"
            >
              <Link to="/">
                <div className="absolute inset-0 bg-gradient-cosmic opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                Accueil
              </Link>
            </Button>
            
            <Button
              variant={location.pathname === "/systeme-solaire" ? "default" : "ghost"}
              asChild
              className="relative overflow-hidden group"
            >
              <Link to="/systeme-solaire" className="flex items-center space-x-2">
                <div className="absolute inset-0 bg-gradient-cosmic opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <Globe className="w-4 h-4" />
                <span>Système Solaire</span>
              </Link>
            </Button>
            
            <Button
              variant={location.pathname === "/mars" ? "default" : "ghost"}
              asChild
              className="relative overflow-hidden group"
            >
              <Link to="/mars" className="flex items-center space-x-2">
                <div className="absolute inset-0 bg-gradient-cosmic opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <Rocket className="w-4 h-4" />
                <span>Mars</span>
              </Link>
            </Button>
            
            <Button
              variant={location.pathname === "/aliens-martiens" ? "default" : "ghost"}
              asChild
              className="relative overflow-hidden group"
            >
              <Link to="/aliens-martiens" className="flex items-center space-x-2">
                <div className="absolute inset-0 bg-gradient-cosmic opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <Globe className="w-4 h-4" />
                <span>Aliens Martiens</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
