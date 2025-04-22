import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "KUNAL RATHOD",
    role: "Co-Founder",
    bio: "With over 10 years in fashion retail, Kunal's vision to make designer clothing accessible to everyone led to the creation of Pehnawa. Her expertise in customer experience and sustainable fashion drives our core values.",
    image: "/images/kunal.jpg"
  },
  {
    name: "WAHAB SHAIKH",
    role: "Co-Founder",
    bio: "A fashion designer by training, Wahab oversees our curation process and ensures that every piece in our collection meets our high standards for quality, style, and versatility.",
    image: "/images/wahab.jpg"
  },
  {
    name: "JAYESH WAKODE",
    role: "Co-Founder",
    bio: "Jayesh brings his background in logistics and supply chain management to ensure Pehnawa delivers a seamless rental experience. His passion for technology and efficiency has revolutionized our operations.",
    image: "/images/jayesh.jpg"
  },
  {
    name: "HEMAKSHI SURYAVANSHI",
    role: "Co-Founder",
    bio: "A fashion designer by training, Hemakshi oversees our curation process and ensures that every piece in our collection meets our high standards for quality, style, and versatility.",
    image: "/images/hemakshi.jpg"
  }
];

const AboutTeam = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block">
            <div className="flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-pehnawa-terracotta mr-2" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Meet Our Team</h2>
            </div>
            <div className="h-1 w-20 bg-pehnawa-terracotta mx-auto"></div>
          </div>
          <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
            Founded by fashion enthusiasts who believe everyone deserves access to premium clothing without the premium price tag,
            Pehnawa is bringing the sharing economy to your wardrobe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="border-pehnawa-green/20 overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="aspect-w-1 aspect-h-1 w-full h-64">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                  <p className="text-pehnawa-terracotta font-medium">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 p-8 bg-pehnawa-cream rounded-premium shadow-md">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 h-80 rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                alt="Pehnawa Team" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              <h3 className="text-2xl font-bold text-gray-800">Our Story</h3>
              <p className="text-gray-600">
                Founded in 2025, Pehnawa began with a simple question: Why should quality clothing be so expensive when we only wear it a few times? 
                Our co-founders Kunal, Wahab, Jayesh & Hemakshi combined their expertise in fashion, logistics, and technology to create a platform that 
                connects people with premium clothing at a fraction of the retail cost.
              </p>
              <p className="text-gray-600">
                Today, Pehnawa serves thousands of customers across India, helping people look their best for special occasions without breaking the bank 
                or contributing to fashion waste. Our commitment to quality, sustainability, and customer service drives everything we do.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
