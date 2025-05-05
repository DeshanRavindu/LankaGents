
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-cream-light flex flex-col">
      <Navbar />
      <div className="section-container flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-6 mt-4">About StyleFinds</h1>
          
          {/* Our Story Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-teal mb-4">Our Story</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="prose max-w-none">
                <p className="mb-4">
                  Founded in 2020, StyleFinds began with a simple mission: to provide high-quality, fashionable clothing 
                  for men who appreciate both style and substance. What started as a small online boutique has grown 
                  into a beloved destination for modern gentlemen looking to elevate their wardrobe.
                </p>
                <p className="mb-4">
                  Our team of experienced designers and fashion enthusiasts work tirelessly to curate collections 
                  that blend timeless classics with contemporary trends, ensuring that our customers always look 
                  and feel their best.
                </p>
                <p>
                  At StyleFinds, we believe that great style shouldn't come at the expense of quality or ethics. 
                  That's why we partner with responsible manufacturers who share our commitment to sustainable 
                  practices and fair labor standards.
                </p>
              </div>
            </div>
          </section>
          
          {/* Our Values Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-teal mb-4">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="font-medium text-lg mb-2 text-charcoal">Quality First</h3>
                <p className="text-gray-600">
                  We never compromise on the quality of our products, using premium materials and expert craftsmanship in everything we create.
                </p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="font-medium text-lg mb-2 text-charcoal">Sustainability</h3>
                <p className="text-gray-600">
                  We're committed to reducing our environmental footprint through responsible sourcing and eco-friendly practices.
                </p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="font-medium text-lg mb-2 text-charcoal">Customer Satisfaction</h3>
                <p className="text-gray-600">
                  Your happiness is our priority. We strive to provide exceptional service and products that exceed expectations.
                </p>
              </div>
            </div>
          </section>
          
          {/* Team Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-teal mb-4">Our Team</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-lg shadow-sm text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="font-medium text-lg text-charcoal">James Wilson</h3>
                <p className="text-teal mb-2">Founder & CEO</p>
                <p className="text-gray-600 text-sm">
                  With over 15 years in fashion retail, James brings his vision and expertise to every aspect of StyleFinds.
                </p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="font-medium text-lg text-charcoal">Emily Chen</h3>
                <p className="text-teal mb-2">Creative Director</p>
                <p className="text-gray-600 text-sm">
                  Emily's keen eye for design and trends helps shape our distinctive collections each season.
                </p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="font-medium text-lg text-charcoal">Michael Roberts</h3>
                <p className="text-teal mb-2">Head of Operations</p>
                <p className="text-gray-600 text-sm">
                  Michael ensures that our supply chain and customer service operations run smoothly and efficiently.
                </p>
              </div>
            </div>
          </section>
          
          {/* Call to Action */}
          <div className="bg-teal rounded-lg p-8 text-center text-white mb-8">
            <h2 className="text-2xl font-bold mb-4">Join the StyleFinds Community</h2>
            <p className="mb-6 max-w-xl mx-auto">
              Discover our latest collections and be the first to know about exclusive offers, style tips, and more.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-white text-teal hover:bg-cream hover:text-charcoal">
                <Link to="/products">Shop Collection</Link>
              </Button>
              <Button className="bg-terracotta hover:bg-terracotta-dark">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
