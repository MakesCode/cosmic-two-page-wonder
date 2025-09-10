import Navigation from "@/components/Navigation";
import SpaceHero from "@/components/SpaceHero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Telescope, Rocket, Star, Sparkles } from "lucide-react";

const features = [
  {
    icon: <Telescope className="w-8 h-8 text-primary" />,
    title: "Observation",
    description: "Découvrez les techniques d'observation astronomique et les dernières découvertes spatiales.",
  },
  {
    icon: <Rocket className="w-8 h-8 text-accent" />,
    title: "Exploration",
    description: "Suivez les missions spatiales actuelles et futures vers Mars, la Lune et au-delà.",
  },
  {
    icon: <Star className="w-8 h-8 text-primary" />,
    title: "Étoiles",
    description: "Apprenez tout sur la formation des étoiles, les constellations et les galaxies.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-space">
      <Navigation />
      
      <SpaceHero />
      
      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-secondary/50 backdrop-blur-sm border border-border/50 mb-6">
              <Sparkles className="w-4 h-4 text-accent animate-pulse" />
              <span className="text-sm text-muted-foreground">Explorez l'univers</span>
            </div>
            
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Un Voyage au Cœur de l'Espace
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Plongez dans les mystères de l'univers et découvrez les merveilles qui nous entourent.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card 
                key={feature.title}
                className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-cosmic transition-all duration-300 hover:-translate-y-2"
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-secondary/30 w-fit group-hover:animate-pulse-glow transition-all duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <CardDescription className="text-center text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
                
                <div className="absolute inset-0 bg-gradient-cosmic opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 border-t border-border/30">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-12 text-foreground">
              L'Univers en Chiffres
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-secondary/20 backdrop-blur-sm border border-border/30 hover:shadow-nebula transition-all duration-300">
                <div className="text-4xl font-bold text-primary mb-2">13,8</div>
                <div className="text-lg text-accent mb-2">Milliards d'années</div>
                <div className="text-sm text-muted-foreground">Âge de l'univers</div>
              </div>
              
              <div className="p-8 rounded-2xl bg-secondary/20 backdrop-blur-sm border border-border/30 hover:shadow-nebula transition-all duration-300">
                <div className="text-4xl font-bold text-accent mb-2">2×10²³</div>
                <div className="text-lg text-primary mb-2">Étoiles</div>
                <div className="text-sm text-muted-foreground">Dans l'univers observable</div>
              </div>
              
              <div className="p-8 rounded-2xl bg-secondary/20 backdrop-blur-sm border border-border/30 hover:shadow-nebula transition-all duration-300">
                <div className="text-4xl font-bold text-primary mb-2">93</div>
                <div className="text-lg text-accent mb-2">Milliards d'années-lumière</div>
                <div className="text-sm text-muted-foreground">Diamètre de l'univers observable</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;