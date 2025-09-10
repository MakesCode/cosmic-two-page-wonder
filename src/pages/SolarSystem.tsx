import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import solarSystemImg from "@/assets/solar-system.jpg";

const planets = [
  {
    name: "Mercure",
    description: "La planète la plus proche du Soleil, avec des températures extrêmes.",
    distance: "57,9 millions km",
    color: "from-orange-400 to-red-500",
  },
  {
    name: "Vénus",
    description: "Surnommée l'étoile du berger, elle possède une atmosphère très dense.",
    distance: "108,2 millions km",
    color: "from-yellow-300 to-orange-400",
  },
  {
    name: "Terre",
    description: "Notre planète bleue, la seule connue à abriter la vie.",
    distance: "149,6 millions km",
    color: "from-blue-400 to-green-500",
  },
  {
    name: "Mars",
    description: "La planète rouge, objectif des futures missions habitées.",
    distance: "227,9 millions km",
    color: "from-red-500 to-orange-600",
  },
  {
    name: "Jupiter",
    description: "La plus grande planète du système solaire, une géante gazeuse.",
    distance: "778,5 millions km",
    color: "from-orange-300 to-yellow-600",
  },
  {
    name: "Saturne",
    description: "Célèbre pour ses magnifiques anneaux composés de glace et de roche.",
    distance: "1,43 milliards km",
    color: "from-yellow-200 to-orange-300",
  },
  {
    name: "Uranus",
    description: "Une géante de glace qui tourne sur le côté.",
    distance: "2,87 milliards km",
    color: "from-cyan-300 to-blue-400",
  },
  {
    name: "Neptune",
    description: "La planète la plus éloignée, avec des vents très violents.",
    distance: "4,5 milliards km",
    color: "from-blue-500 to-indigo-600",
  },
];

const SolarSystem = () => {
  return (
    <div className="min-h-screen bg-gradient-space">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <div className="relative max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-cosmic bg-clip-text text-transparent">
                  Notre Système Solaire
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                Explorez les huit planètes qui gravitent autour de notre étoile, 
                chacune avec ses caractéristiques uniques et ses mystères.
              </p>
              
              <div className="relative">
                <img 
                  src={solarSystemImg} 
                  alt="Système solaire" 
                  className="w-full max-w-3xl mx-auto rounded-2xl shadow-space"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/60 to-transparent rounded-2xl" />
              </div>
            </div>
          </section>

          {/* Planets Grid */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
              Les Huit Planètes
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {planets.map((planet, index) => (
                <Card 
                  key={planet.name} 
                  className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-xs hover:shadow-cosmic transition-all duration-300 hover:-translate-y-1"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full bg-linear-to-br ${planet.color} shadow-md animate-pulse-glow`} />
                      <CardTitle className="text-lg">{planet.name}</CardTitle>
                    </div>
                    <CardDescription className="text-sm text-muted-foreground">
                      Distance du Soleil: {planet.distance}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {planet.description}
                    </p>
                  </CardContent>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-cosmic opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                </Card>
              ))}
            </div>
          </section>

          {/* Fun Facts */}
          <section className="mt-20 text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-8 text-foreground">Le Saviez-vous ?</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 rounded-xl bg-secondary/30 backdrop-blur-xs border border-border/30">
                  <div className="text-3xl font-bold text-primary mb-2">4,6</div>
                  <div className="text-sm text-muted-foreground">Milliards d'années - l'âge de notre système solaire</div>
                </div>
                <div className="p-6 rounded-xl bg-secondary/30 backdrop-blur-xs border border-border/30">
                  <div className="text-3xl font-bold text-accent mb-2">1,39M</div>
                  <div className="text-sm text-muted-foreground">Kilomètres - le diamètre du Soleil</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default SolarSystem;