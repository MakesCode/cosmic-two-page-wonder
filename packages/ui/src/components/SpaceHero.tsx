import { Button } from "@ui/components/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import heroSpace from "@ui/assets/hero-space.jpg";

const SpaceHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroSpace})`,
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-background/60 via-background/40 to-background/80" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-secondary/50 backdrop-blur-xs border border-border/50">
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            <span className="text-sm text-muted-foreground">Explorez l'univers infini</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="bg-gradient-cosmic bg-clip-text text-transparent">
              L'Espace
            </span>
            <br />
            <span className="text-foreground">Sans Limites</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Découvrez les merveilles de l'univers, des nébuleuses aux galaxies lointaines, 
            et explorez notre système solaire dans toute sa splendeur.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Button
              size="lg"
              className="group relative overflow-hidden px-8 py-6 text-lg font-semibold bg-gradient-cosmic hover:shadow-cosmic transition-all duration-300"
              asChild
            >
              <Link to="/systeme-solaire" className="flex items-center space-x-2">
                <span>Explorer le Système Solaire</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg border-primary/50 hover:bg-primary/10 hover:shadow-nebula transition-all duration-300"
            >
              En Savoir Plus
            </Button>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent rounded-full animate-float opacity-60" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-primary rounded-full animate-float opacity-80" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-accent rounded-full animate-float opacity-70" style={{ animationDelay: "4s" }} />
      </div>
    </section>
  );
};

export default SpaceHero;
