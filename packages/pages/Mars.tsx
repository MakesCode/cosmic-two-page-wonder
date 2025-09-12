import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/components/ui/card";
import Navigation from "@ui/components/Navigation";
import elonMarsImg from "@ui/assets/elon-musk-mars.jpg";
import { Rocket, Users, Calendar, Target, Globe, Zap } from "lucide-react";
import { Button } from "@ui/button";

const marsFeatures = [
  {
    icon: <Rocket className="w-8 h-8 text-red-400" />,
    title: "Starship",
    description: "Le véhicule spatial révolutionnaire conçu pour emmener l'humanité sur Mars.",
  },
  {
    icon: <Users className="w-8 h-8 text-orange-400" />,
    title: "Colonie martienne",
    description: "Vision d'une ville autonome de 1 million d'habitants sur la planète rouge.",
  },
  {
    icon: <Globe className="w-8 h-8 text-red-500" />,
    title: "Terraformation",
    description: "Projet à long terme de transformation de l'atmosphère martienne.",
  },
];

const timeline = [
  {
    year: "2024-2026",
    milestone: "Missions cargo sans équipage",
    description: "Livraison d'équipements et de ressources essentielles",
  },
  {
    year: "2028-2030",
    milestone: "Première mission habitée",
    description: "Premiers astronautes SpaceX sur Mars",
  },
  {
    year: "2040s",
    milestone: "Base permanente",
    description: "Établissement d'une base martienne auto-suffisante",
  },
  {
    year: "2050s+",
    milestone: "Ville martienne",
    description: "Développement d'une véritable ville sur Mars",
  },
];

const Mars = () => {
  return (
    <div className="min-h-screen bg-gradient-space">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <section className="text-center mb-20">
            <div className="relative max-w-6xl mx-auto">
              <h1 className="text-4xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-red-400 via-orange-500 to-red-600 bg-clip-text text-transparent">
                  Mars avec Elon Musk
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
                Découvrez la vision révolutionnaire d'Elon Musk pour faire de l'humanité 
                une espèce multiplanétaire en colonisant Mars.
              </p>
              
              <div className="relative mb-12">
                <img 
                  src={elonMarsImg} 
                  alt="Elon Musk sur Mars" 
                  className="w-full max-w-4xl mx-auto rounded-3xl shadow-space"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent rounded-3xl" />
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    "Je veux mourir sur Mars, mais pas lors de l'impact"
                  </h3>
                  <p className="text-lg text-gray-200">- Elon Musk, Fondateur de SpaceX</p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-red-500 hover:bg-red-600">
                  <Rocket className="w-5 h-5 mr-2" />
                  Explorer la Mission
                </Button>
                <Button variant="outline" size="lg" className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white">
                  <Target className="w-5 h-5 mr-2" />
                  Objectifs SpaceX
                </Button>
              </div>
            </div>
          </section>

          {/* Vision Section */}
          <section className="mb-20">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-red-500/20 backdrop-blur-xs border border-red-400/30 mb-6">
                <Zap className="w-4 h-4 text-red-400 animate-pulse" />
                <span className="text-sm text-red-300">Mission Mars</span>
              </div>
              
              <h2 className="text-4xl font-bold mb-8 text-foreground">
                La Vision SpaceX pour Mars
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Elon Musk et SpaceX travaillent à rendre possible le voyage vers Mars avec 
                le Starship, un système de transport spatial révolutionnaire conçu pour 
                transporter jusqu'à 100 personnes vers la planète rouge.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {marsFeatures.map((feature, index) => (
                <Card 
                  key={feature.title}
                  className="group relative overflow-hidden border-red-400/30 bg-card/50 backdrop-blur-xs hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-300 hover:-translate-y-2"
                >
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 p-3 rounded-full bg-red-500/20 w-fit group-hover:animate-pulse transition-all duration-300">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl text-red-100">{feature.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <CardDescription className="text-center text-muted-foreground leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                  
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Card>
              ))}
            </div>
          </section>

          {/* Timeline Section */}
          <section className="mb-20">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-center mb-16 text-foreground">
                Chronologie de la Conquête Martienne
              </h3>
              
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div key={item.year} className="flex items-center space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                    </div>
                    
                    <Card className="flex-1 border-red-400/30 bg-card/30 backdrop-blur-xs">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg text-red-100">{item.milestone}</CardTitle>
                          <div className="flex items-center space-x-2 text-red-400">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm font-medium">{item.year}</span>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        <p className="text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="text-center">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold mb-12 text-foreground">
                Mars en Chiffres
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="p-8 rounded-2xl bg-red-500/10 backdrop-blur-xs border border-red-400/30 hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-300">
                  <div className="text-4xl font-bold text-red-400 mb-2">225M km</div>
                  <div className="text-lg text-orange-300 mb-2">Distance minimale</div>
                  <div className="text-sm text-muted-foreground">De la Terre à Mars</div>
                </div>
                
                <div className="p-8 rounded-2xl bg-red-500/10 backdrop-blur-xs border border-red-400/30 hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-300">
                  <div className="text-4xl font-bold text-orange-400 mb-2">9 mois</div>
                  <div className="text-lg text-red-300 mb-2">Durée du voyage</div>
                  <div className="text-sm text-muted-foreground">Avec la technologie actuelle</div>
                </div>
                
                <div className="p-8 rounded-2xl bg-red-500/10 backdrop-blur-xs border border-red-400/30 hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-300">
                  <div className="text-4xl font-bold text-red-400 mb-2">1M</div>
                  <div className="text-lg text-orange-300 mb-2">Habitants</div>
                  <div className="text-sm text-muted-foreground">Objectif pour la ville martienne</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Mars;