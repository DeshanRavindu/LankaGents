
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Eye } from 'lucide-react';

// Sample orders data
const sampleOrders = [
  {
    id: 'ORD-1234',
    date: '2025-05-01',
    total: 104.97,
    status: 'delivered',
    items: [
      { id: '1', name: 'Premium Cotton T-Shirt', price: 24.99, quantity: 1 },
      { id: '4', name: 'Urban Sneakers', price: 64.99, quantity: 1 }
    ]
  },
  {
    id: 'ORD-5678',
    date: '2025-04-15',
    total: 79.99,
    status: 'processing',
    items: [
      { id: '7', name: 'Leather Jacket', price: 129.99, quantity: 1 }
    ]
  },
  {
    id: 'ORD-9012',
    date: '2025-03-28',
    total: 45.99,
    status: 'delivered',
    items: [
      { id: '12', name: 'Aviator Sunglasses', price: 45.99, quantity: 1 }
    ]
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'processing':
      return 'bg-blue-100 text-blue-800';
    case 'shipped':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const ProfileOrders = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [orders, setOrders] = useState(sampleOrders);
  
  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        if (userData.isLoggedIn) {
          setIsLoggedIn(true);
          
          // For a real app, you would fetch orders from your backend
          // setOrders(fetchedOrders);
        } else {
          // Redirect to login if not logged in
          navigate('/login');
        }
      } catch (error) {
        console.error("Error parsing user data", error);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!isLoggedIn) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen bg-cream-light flex flex-col">
      <Navbar />
      
      <div className="section-container flex-1 py-10">
        <div className="flex flex-wrap items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-charcoal">My Orders</h1>
          <div className="flex space-x-2 mt-2 sm:mt-0">
            <Button variant="outline" className="border-teal text-teal" onClick={() => navigate('/profile')}>
              Profile
            </Button>
            <Button variant="outline" className="border-teal text-teal" onClick={() => navigate('/profile/settings')}>
              Account Settings
            </Button>
          </div>
        </div>
        
        {orders.length === 0 ? (
          <Card>
            <CardContent className="p-10 text-center">
              <Package size={48} className="mx-auto mb-4 text-gray-400" />
              <h2 className="text-xl font-medium mb-2">No Orders Yet</h2>
              <p className="text-gray-500 mb-4">
                You haven't placed any orders yet. Start shopping to see your orders here.
              </p>
              <Button onClick={() => navigate('/products')} className="bg-teal hover:bg-teal-dark">
                Shop Now
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <div className="bg-gray-50 px-6 py-3 flex flex-wrap justify-between items-center">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Order ID:</span>
                    <span className="ml-2 font-semibold">{order.id}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Date:</span>
                    <span className="ml-2">{formatDate(order.date)}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Total:</span>
                    <span className="ml-2 font-semibold">${order.total.toFixed(2)}</span>
                  </div>
                  <Badge className={`ml-auto mt-2 sm:mt-0 ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>
                
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium">${item.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Eye size={16} />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default ProfileOrders;
