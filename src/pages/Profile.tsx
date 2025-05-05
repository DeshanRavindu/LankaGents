
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { User, Mail, Phone, MapPin } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        if (userData.isLoggedIn) {
          setIsLoggedIn(true);
          setUsername(userData.username);
          setEmail(userData.email);
          
          // For demo purposes, populate with sample data
          // In a real app, you would fetch this data from your backend
          const name = userData.username.split(' ');
          setProfileData({
            firstName: name[0] || '',
            lastName: name.length > 1 ? name[1] : '',
            email: userData.email,
            phone: '555-123-4567',
            address: '123 Main St',
            city: 'San Francisco',
            state: 'CA',
            zipCode: '94105',
          });
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      // Update username in localStorage
      const user = localStorage.getItem('user');
      if (user) {
        try {
          const userData = JSON.parse(user);
          userData.username = `${profileData.firstName} ${profileData.lastName}`;
          localStorage.setItem('user', JSON.stringify(userData));
          setUsername(userData.username);
        } catch (error) {
          console.error("Error updating user data", error);
        }
      }
      
      setIsSaving(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully."
      });
    }, 1000);
  };

  if (!isLoggedIn) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen bg-cream-light flex flex-col">
      <Navbar />
      
      <div className="section-container flex-1 py-10">
        <div className="flex flex-wrap items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-charcoal">My Profile</h1>
          <div className="flex space-x-2 mt-2 sm:mt-0">
            <Button variant="outline" className="border-teal text-teal" onClick={() => navigate('/profile/orders')}>
              View Orders
            </Button>
            <Button variant="outline" className="border-teal text-teal" onClick={() => navigate('/profile/settings')}>
              Account Settings
            </Button>
          </div>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Summary */}
              <div className="w-full md:w-1/3">
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <div className="w-24 h-24 bg-teal rounded-full flex items-center justify-center text-white mx-auto mb-4">
                    <User size={40} />
                  </div>
                  
                  <h2 className="text-xl font-bold">{username}</h2>
                  <p className="text-gray-500 mt-1 mb-4">{email}</p>
                  
                  <div className="space-y-3 text-left">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="w-4 h-4 mr-2" />
                      {profileData.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      {profileData.phone}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {profileData.address}, {profileData.city}, {profileData.state} {profileData.zipCode}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Profile Form */}
              <div className="w-full md:w-2/3">
                <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        value={profileData.firstName} 
                        onChange={handleInputChange} 
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        value={profileData.lastName} 
                        onChange={handleInputChange} 
                        className="mt-1" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={profileData.email} 
                      onChange={handleInputChange} 
                      className="mt-1" 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      value={profileData.phone} 
                      onChange={handleInputChange} 
                      className="mt-1" 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address" 
                      value={profileData.address} 
                      onChange={handleInputChange} 
                      className="mt-1" 
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input 
                        id="city" 
                        value={profileData.city} 
                        onChange={handleInputChange} 
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input 
                        id="state" 
                        value={profileData.state} 
                        onChange={handleInputChange} 
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">Zip Code</Label>
                      <Input 
                        id="zipCode" 
                        value={profileData.zipCode} 
                        onChange={handleInputChange} 
                        className="mt-1" 
                      />
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Button 
                      type="submit" 
                      className="bg-teal hover:bg-teal-dark"
                      disabled={isSaving}
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;
