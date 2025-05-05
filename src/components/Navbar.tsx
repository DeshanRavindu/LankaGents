import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, User, LogOut, Settings, ShoppingCart } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useCart } from '@/context/CartContext';

// Sample product data for search
const searchProducts = [
  { id: '1', name: 'Premium Cotton T-Shirt', category: 'T-Shirts' },
  { id: '2', name: 'Formal Business Shirt', category: 'Shirts' },
  { id: '3', name: 'Classic Analog Watch', category: 'Watches' },
  { id: '4', name: 'Urban Sneakers', category: 'Shoes' },
  { id: '5', name: 'Casual Hoodie', category: 'Hoodies' },
  { id: '6', name: 'Slim Fit Jeans', category: 'Jeans' },
  { id: '7', name: 'Leather Jacket', category: 'Jackets' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof searchProducts>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  const { itemCount } = useCart();

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        if (userData.isLoggedIn) {
          setIsLoggedIn(true);
          setUsername(userData.username);
        }
      } catch (error) {
        console.error("Error parsing user data", error);
      }
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    const filtered = searchProducts.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
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
    
    setIsLoggedIn(false);
    setUsername('');
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully."
    });
    
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-teal">
              StyleFinds
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="text-charcoal hover:text-teal transition-colors duration-200">Home</Link>
            <Link to="/products" className="text-charcoal hover:text-teal transition-colors duration-200">Products</Link>
            <Link to="/about" className="text-charcoal hover:text-teal transition-colors duration-200">About</Link>
            <Link to="/contact" className="text-charcoal hover:text-teal transition-colors duration-200">Contact</Link>
          </div>

          {/* Search, Auth, and Cart - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Popover>
              <PopoverTrigger asChild>
                <button className="text-charcoal hover:text-teal transition-colors duration-200 flex items-center gap-1">
                  <Search size={18} />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-2">
                <div className="space-y-2">
                  <Input 
                    type="search" 
                    placeholder="Search products..." 
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full"
                  />
                  {searchResults.length > 0 && (
                    <div className="max-h-60 overflow-y-auto">
                      {searchResults.map(product => (
                        <Link 
                          key={product.id}
                          to={`/products/${product.id}`}
                          className="block p-2 hover:bg-gray-100 rounded"
                        >
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.category}</p>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="text-charcoal hover:text-teal transition-colors duration-200 flex items-center gap-1">
                  <User size={18} />
                  <span className="text-sm font-medium">{username}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white w-40">
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/profile')}>
                    <User size={16} className="mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/profile/orders')}>
                    <ShoppingCart size={16} className="mr-2" />
                    Your Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/profile/settings')}>
                    <Settings size={16} className="mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-red-500" onClick={handleLogout}>
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="border-teal text-teal hover:bg-teal hover:text-white" onClick={() => navigate('/login')}>
                  Sign In
                </Button>
                <Button size="sm" className="bg-teal text-white hover:bg-teal-dark" onClick={() => navigate('/register')}>
                  Sign Up
                </Button>
              </div>
            )}
            
            <Link to="/cart" className="text-charcoal hover:text-teal transition-colors duration-200 relative">
              <ShoppingBag size={18} />
              <span className="absolute -top-2 -right-2 bg-terracotta text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {itemCount > 0 ? itemCount : 0}
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <button className="text-charcoal hover:text-teal">
                  <Search size={18} />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-screen p-2">
                <div className="space-y-2">
                  <Input 
                    type="search" 
                    placeholder="Search products..." 
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full"
                  />
                  {searchResults.length > 0 && (
                    <div className="max-h-60 overflow-y-auto">
                      {searchResults.map(product => (
                        <Link 
                          key={product.id}
                          to={`/products/${product.id}`}
                          className="block p-2 hover:bg-gray-100 rounded"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.category}</p>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
            
            <Link to="/cart" className="text-charcoal hover:text-teal transition-colors duration-200 relative">
              <ShoppingBag size={18} />
              <span className="absolute -top-2 -right-2 bg-terracotta text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {itemCount > 0 ? itemCount : 0}
              </span>
            </Link>
            
            <button onClick={toggleMenu} className="text-charcoal">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t">
            <div className="flex flex-col space-y-2">
              <Link to="/" className="text-charcoal hover:text-teal transition-colors duration-200 py-2">Home</Link>
              <Link to="/products" className="text-charcoal hover:text-teal transition-colors duration-200 py-2">Products</Link>
              <Link to="/about" className="text-charcoal hover:text-teal transition-colors duration-200 py-2">About</Link>
              <Link to="/contact" className="text-charcoal hover:text-teal transition-colors duration-200 py-2">Contact</Link>
              
              {isLoggedIn ? (
                <div className="border-t pt-2 mt-2">
                  <div className="flex items-center mb-2">
                    <User size={16} className="mr-2" />
                    <span className="font-medium">{username}</span>
                  </div>
                  <Link to="/profile" className="block py-2 pl-6 hover:text-teal">Profile</Link>
                  <Link to="/profile/orders" className="block py-2 pl-6 hover:text-teal">Your Orders</Link>
                  <Link to="/profile/settings" className="block py-2 pl-6 hover:text-teal">Settings</Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left py-2 pl-6 text-red-500 hover:text-red-700"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="border-t pt-2 mt-2 flex flex-col space-y-2">
                  <Button variant="outline" className="border-teal text-teal hover:bg-teal hover:text-white" onClick={() => { navigate('/login'); setIsMenuOpen(false); }}>
                    Sign In
                  </Button>
                  <Button className="bg-teal text-white hover:bg-teal-dark" onClick={() => { navigate('/register'); setIsMenuOpen(false); }}>
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
