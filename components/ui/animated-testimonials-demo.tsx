import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Proteios Education",
      designation: "Educational Leadership & Strategic Operations",
      src: "assets/logo1.jpeg",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "X-Club Kashmir",
      designation: "Youth Engagement & Community Initiatives",
      src: "assets/logo2.jpeg",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Prime Design Studio",
      designation: "Branding & Visual System Architecture",
      src: "assets/logo3.jpeg",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "inAmigos Foundation",
      designation: "Social Impact & Community Leadership",
      src: "assets/inAmigos Foundation.png",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Khan AI Systems",
      designation: "Custom AI Assistant & Autonomous Workflows",
      src: "assets/Khan AI logo.png",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} autoplay={true} />;
}

export { AnimatedTestimonialsDemo };
