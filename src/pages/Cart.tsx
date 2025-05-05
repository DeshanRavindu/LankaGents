
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        if (userData.isLoggedIn) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error parsing user data", error);
      }
    }
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 5.99;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    if (!isLoggedIn) {
      toast({
        title: "Login required",
        description: "Please login to proceed with checkout.",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-cream-light flex flex-col">
      <Navbar />
      
      <div className="section-container flex-1 py-10">
        <h1 className="text-3xl font-bold mb-6 text-charcoal">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Button onClick={() => navigate('/products')} className="bg-teal hover:bg-teal-dark">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row items-center p-4 border-b last:border-0">
                    <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden mb-4 sm:mb-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-1 sm:ml-4">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-terracotta font-bold mt-1">${item.price.toFixed(2)}</p>
                    </div>
                    
                    <div className="flex items-center mt-4 sm:mt-0">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center border rounded-l-md"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-10 text-center border-t border-b">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center border rounded-r-md"
                      >
                        <Plus size={16} />
                      </button>
                      
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="ml-4 text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-teal hover:bg-teal-dark"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
                
                <div className="mt-4 text-center">
                  <Link to="/products" className="text-teal hover:underline">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Cart;
