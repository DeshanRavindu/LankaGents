
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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Lock, Bell, CreditCard, LogOut } from 'lucide-react';

const ProfileSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("password");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        if (userData.isLoggedIn) {
          setIsLoggedIn(true);
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

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setIsChangingPassword(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsChangingPassword(false);
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully."
      });
    }, 1000);
  };

  const handleLogout = () => {
    // Get current user data
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        userData.isLoggedIn = false;
        localStorage.setItem('user', JSON.stringify(userData));
      } catch (error) {
        console.error("Error parsing user data", error);
      }
    }
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully."
    });
    
    navigate('/');
  };

  if (!isLoggedIn) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen bg-cream-light flex flex-col">
      <Navbar />
      
      <div className="section-container flex-1 py-10">
        <div className="flex flex-wrap items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-charcoal">Account Settings</h1>
          <div className="flex space-x-2 mt-2 sm:mt-0">
            <Button variant="outline" className="border-teal text-teal" onClick={() => navigate('/profile')}>
              Profile
            </Button>
            <Button variant="outline" className="border-teal text-teal" onClick={() => navigate('/profile/orders')}>
              View Orders
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>
              Manage your account settings and preferences.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="password" className="flex items-center gap-2">
                  <Lock size={16} />
                  <span className="hidden sm:inline">Password</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell size={16} />
                  <span className="hidden sm:inline">Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="payment" className="flex items-center gap-2">
                  <CreditCard size={16} />
                  <span className="hidden sm:inline">Payment Methods</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="password">
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input type="password" id="currentPassword" className="mt-1" />
                  </div>
                  
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input type="password" id="newPassword" className="mt-1" />
                  </div>
                  
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input type="password" id="confirmPassword" className="mt-1" />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="bg-teal hover:bg-teal-dark"
                    disabled={isChangingPassword}
                  >
                    {isChangingPassword ? "Updating..." : "Update Password"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="notifications">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-gray-500">Receive emails about your orders and account</p>
                    </div>
                    <div>
                      <input type="checkbox" className="toggle" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Promotional Emails</h3>
                      <p className="text-sm text-gray-500">Receive emails about new products and offers</p>
                    </div>
                    <div>
                      <input type="checkbox" className="toggle" />
                    </div>
                  </div>
                  
                  <Button className="bg-teal hover:bg-teal-dark">
                    Save Preferences
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="payment">
                <div>
                  <p className="text-gray-500 mb-4">
                    You haven't added any payment methods yet.
                  </p>
                  
                  <Button variant="outline" className="border-teal text-teal">
                    Add Payment Method
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="border-t mt-8 pt-6">
              <h3 className="font-medium text-lg mb-4">Danger Zone</h3>
              
              <div className="flex flex-wrap gap-4">
                <Button variant="destructive" className="flex items-center gap-2" onClick={handleLogout}>
                  <LogOut size={16} />
                  Log Out
                </Button>
                
                <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50">
                  Delete Account
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProfileSettings;
