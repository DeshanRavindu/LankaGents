
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, Package, User } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-cream-light flex flex-col">
      <Navbar />
      <div className="section-container flex-1">
        <h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-8 mt-4">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h2 className="text-2xl font-semibold text-teal mb-4">Get In Touch</h2>
              <p className="text-gray-600 mb-6">
                We'd love to hear from you! Whether you have a question about our products, need styling advice, 
                or want to provide feedback, our team is here to help.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-teal-light p-2 rounded-full mr-4">
                    <Mail size={20} className="text-teal" />
                  </div>
                  <div>
                    <h3 className="font-medium text-charcoal">Email Us</h3>
                    <p className="text-gray-600">info@stylefinds.com</p>
                    <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-teal-light p-2 rounded-full mr-4">
                    <Phone size={20} className="text-teal" />
                  </div>
                  <div>
                    <h3 className="font-medium text-charcoal">Call Us</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500">Mon-Fri, 9am-5pm EST</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-teal-light p-2 rounded-full mr-4">
                    <Package size={20} className="text-teal" />
                  </div>
                  <div>
                    <h3 className="font-medium text-charcoal">Orders & Returns</h3>
                    <p className="text-gray-600">orders@stylefinds.com</p>
                    <p className="text-sm text-gray-500">For order status and returns</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-teal text-white p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-3">Visit Our Showroom</h2>
              <p className="mb-4">
                123 Fashion Avenue<br />
                Suite 500<br />
                New York, NY 10001
              </p>
              <p className="text-sm opacity-80">
                Open Monday through Saturday<br />
                10:00 AM - 7:00 PM
              </p>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-teal mb-4">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <User size={16} />
                  </span>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail size={16} />
                  </span>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  rows={5}
                  required
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-teal hover:bg-teal-dark"
                disabled={formStatus === 'sending'}
              >
                {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
              </Button>
              
              {formStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}
              
              {formStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded">
                  There was an error sending your message. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
