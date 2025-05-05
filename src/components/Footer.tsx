
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">StyleFinds</h3>
            <p className="text-white/70 mb-6">
              Premium men's fashion for the modern gentleman. Quality, style, and comfort in every piece.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-teal transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-teal transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-teal transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/products" className="text-white/70 hover:text-teal transition-colors">All Products</a>
              </li>
              <li>
                <a href="/new-arrivals" className="text-white/70 hover:text-teal transition-colors">New Arrivals</a>
              </li>
              <li>
                <a href="/bestsellers" className="text-white/70 hover:text-teal transition-colors">Bestsellers</a>
              </li>
              <li>
                <a href="/sale" className="text-white/70 hover:text-teal transition-colors">Sale Items</a>
              </li>
              <li>
                <a href="/about" className="text-white/70 hover:text-teal transition-colors">About Us</a>
              </li>
              <li>
                <a href="/contact" className="text-white/70 hover:text-teal transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Categories</h4>
            <ul className="space-y-2">
              <li>
                <a href="/category/shirts" className="text-white/70 hover:text-teal transition-colors">Shirts</a>
              </li>
              <li>
                <a href="/category/pants" className="text-white/70 hover:text-teal transition-colors">Pants</a>
              </li>
              <li>
                <a href="/category/shoes" className="text-white/70 hover:text-teal transition-colors">Shoes</a>
              </li>
              <li>
                <a href="/category/accessories" className="text-white/70 hover:text-teal transition-colors">Accessories</a>
              </li>
              <li>
                <a href="/category/outerwear" className="text-white/70 hover:text-teal transition-colors">Outerwear</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-teal mt-1" />
                <span className="text-white/70">123 Fashion Street, Style City, SC 12345</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-teal" />
                <span className="text-white/70">(123) 456-7890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-teal" />
                <span className="text-white/70">info@stylefinds.com</span>
              </li>
            </ul>
            <div className="mt-6">
              <h5 className="font-medium text-white mb-2">Subscribe to our newsletter</h5>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="bg-charcoal-light text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-teal w-full"
                />
                <button className="bg-teal text-white px-4 py-2 rounded-r-md hover:bg-teal-dark transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="bg-charcoal-dark py-4">
        <div className="section-container">
          <div className="flex flex-col md:flex-row justify-between items-center text-white/50 text-sm">
            <div>© {new Date().getFullYear()} StyleFinds. All rights reserved.</div>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <a href="/privacy" className="hover:text-teal transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-teal transition-colors">Terms of Service</a>
              <a href="/shipping" className="hover:text-teal transition-colors">Shipping Info</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
