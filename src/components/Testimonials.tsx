
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Ananya Sharma",
      avatar: "AS",
      role: "Student",
      content: "Pehnawa saved my graduation day! I couldn't afford to buy a designer outfit for the ceremony, but I was able to rent a gorgeous dress at a fraction of the cost. The quality was amazing!",
      rating: 5,
    },
    {
      name: "Rahul Kapoor",
      avatar: "RK",
      role: "Software Engineer",
      content: "I needed a suit for an important job interview but didn't want to invest in one yet. Pehnawa delivered a perfectly tailored suit that helped me make a great first impression!",
      rating: 5,
    },
    {
      name: "Priya Malhotra",
      avatar: "PM",
      role: "Marketing Manager",
      content: "The variety of traditional wear available at Pehnawa is impressive. I've rented multiple outfits for different family weddings, and everyone thinks I have an endless wardrobe!",
      rating: 4,
    },
    {
      name: "Vikram Singh",
      avatar: "VS",
      role: "Photographer",
      content: "As someone who needs different outfits for photoshoots but doesn't want to invest heavily, Pehnawa has been a game-changer. Easy process and excellent quality clothes.",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-pehnawa-blue mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers have to say about their Pehnawa experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-pehnawa-green/20 h-full hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col justify-between h-full">
                <div>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6">"{testimonial.content}"</p>
                </div>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-pehnawa-terracotta text-white flex items-center justify-center mr-3 flex-shrink-0">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-pehnawa-blue">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
