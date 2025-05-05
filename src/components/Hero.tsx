
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-cream-light py-16 md:py-24">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">
          {/* Hero Content */}
          <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
            <span className="inline-block bg-teal-light/20 text-teal px-3 py-1 rounded-full text-sm font-medium">Summer Collection 2025</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-tight">
              Discover <span className="text-teal">Your Style</span>, Elevate Your Look
            </h1>
            <p className="text-lg text-charcoal-light max-w-xl">
              Curated men's fashion finds for the modern gentleman. Explore our premium collection of clothing, accessories, and essentials.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
              <a href="/products" className="btn-primary flex items-center justify-center space-x-2">
                <span>Shop Now</span>
                <ArrowRight size={16} />
              </a>
            </div>
            <div className="flex justify-center md:justify-start space-x-6 pt-4">
              <div className="text-center">
                <div className="font-bold text-xl text-charcoal">500+</div>
                <div className="text-charcoal-light text-sm">Products</div>
              </div>
              <div className="border-r border-charcoal-light/20"></div>
              <div className="text-center">
                <div className="font-bold text-xl text-charcoal">50+</div>
                <div className="text-charcoal-light text-sm">Brands</div>
              </div>
              <div className="border-r border-charcoal-light/20"></div>
              <div className="text-center">
                <div className="font-bold text-xl text-charcoal">10k+</div>
                <div className="text-charcoal-light text-sm">Happy Customers</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full md:w-1/2 relative">
            <div className="aspect-[4/3] relative z-10 rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVuJTIwZmFzaGlvbnxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60" 
                alt="Men's Fashion" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-teal/20 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-sand/30 blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-teal/20 blur-xl"></div>
    </div>
  );
};

export default Hero;
