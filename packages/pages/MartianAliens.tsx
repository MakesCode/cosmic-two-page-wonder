import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/components/ui/card";
import { Badge } from "@ui/components/ui/badge";
import Navigation from "@ui/components/Navigation";
import { Zap, Sparkles, Globe } from "lucide-react";
import martianAliensImage from "@ui/assets/martian-aliens.jpg";
import { Button } from "@ui/components/button";

const MartianAliens = () => {
  const aliens = [
    {
      name: "Zyx'ara",
      species: "Martien Vert",
      power: "Télékinésie",
      level: "Avancé",
      description: "Capable de déplacer des objets par la pensée et de communiquer télépathiquement."
    },
    {
      name: "Blip'tor",
      species: "Martien Bleu",
      power: "Invisibilité",
      level: "Expert",
      description: "Maître de l'art de l'invisibilité et de la furtivité interplanétaire."
    },
    {
      name: "Glow'nix",
      species: "Martien Lumineux",
      power: "Bioluminescence",
      level: "Intermédiaire",
      description: "Génère sa propre lumière et peut créer des illusions lumineuses."
    },
    {
      name: "Echo'zap",
      species: "Martien Énergétique",
      power: "Manipulation Électrique",
      level: "Maître",
      description: "Contrôle l'électricité et peut créer des champs électromagnétiques."
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Débutant": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Intermédiaire": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Avancé": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "Expert": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "Maître": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${martianAliensImage})` }}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
              Planète Martienne
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Découvrez les civilisations alien fascinantes qui habitent les terres rouges de Mars
          </p>
          
          <div className="flex justify-center items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>Gravité : 0.38G</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>4 Espèces Découvertes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Aliens Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-cosmic bg-clip-text text-transparent">
              Les Habitants Martiens
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Chaque espèce alien possède des capacités uniques développées pour survivre dans l'environnement martien
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aliens.map((alien, index) => (
              <Card 
                key={alien.name} 
                className="group hover:shadow-cosmic hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 bg-card/50 backdrop-blur-sm"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-3">
                      <span className="text-xl">{alien.name}</span>
                    </CardTitle>
                    <Badge className={getLevelColor(alien.level)}>
                      {alien.level}
                    </Badge>
                  </div>
                  <CardDescription className="text-accent font-medium">
                    {alien.species}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-primary">Pouvoir :</span>
                      <span className="text-foreground">{alien.power}</span>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {alien.description}
                    </p>
                    
                    <Button 
                      variant="outline-solid" 
                      size="sm" 
                      className="w-full group-hover:shadow-glow transition-all duration-300"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      En savoir plus
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Environment Section */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-cosmic bg-clip-text text-transparent">
              Environnement Martien
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-primary">-63°C</div>
                <div className="text-sm text-muted-foreground">Température Moyenne</div>
              </div>
              
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-accent">687</div>
                <div className="text-sm text-muted-foreground">Jours Terrestres/Année</div>
              </div>
              
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-primary">2</div>
                <div className="text-sm text-muted-foreground">Lunes : Phobos & Deimos</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MartianAliens;