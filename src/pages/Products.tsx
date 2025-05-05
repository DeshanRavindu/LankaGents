
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from '@/components/ProductCard';
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';
import { Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample product data with additional fields
const products = [
  { 
    id: '1', 
    name: 'Premium Cotton T-Shirt', 
    price: 24.99, 
    category: 'T-Shirts', 
    image: '/placeholder.svg',
    badge: 'Best Seller'
  },
  { 
    id: '2', 
    name: 'Formal Business Shirt', 
    price: 49.99, 
    category: 'Shirts', 
    image: '/placeholder.svg',
    badge: 'New Arrival'
  },
  { 
    id: '3', 
    name: 'Classic Analog Watch', 
    price: 79.99, 
    category: 'Watches', 
    image: '/placeholder.svg'
  },
  { 
    id: '4', 
    name: 'Urban Sneakers', 
    price: 64.99, 
    category: 'Shoes', 
    image: '/placeholder.svg',
    badge: 'Best Seller'
  },
  { 
    id: '5', 
    name: 'Casual Hoodie', 
    price: 39.99, 
    category: 'Hoodies', 
    image: '/placeholder.svg'
  },
  { 
    id: '6', 
    name: 'Slim Fit Jeans', 
    price: 54.99, 
    category: 'Jeans', 
    image: '/placeholder.svg',
    badge: 'New Arrival'
  },
  { 
    id: '7', 
    name: 'Leather Jacket', 
    price: 129.99, 
    category: 'Jackets', 
    image: '/placeholder.svg'
  },
  { 
    id: '8', 
    name: 'Leather Wallet', 
    price: 34.99, 
    category: 'Accessories', 
    image: '/placeholder.svg'
  },
  { 
    id: '9', 
    name: 'Sports Jersey', 
    price: 59.99, 
    category: 'Sportswear', 
    image: '/placeholder.svg'
  },
  { 
    id: '10', 
    name: 'Denim Jacket', 
    price: 79.99, 
    category: 'Jackets', 
    image: '/placeholder.svg'
  },
  { 
    id: '11', 
    name: 'Cotton Polo', 
    price: 29.99, 
    category: 'T-Shirts', 
    image: '/placeholder.svg'
  },
  { 
    id: '12', 
    name: 'Aviator Sunglasses', 
    price: 45.99, 
    category: 'Accessories', 
    image: '/placeholder.svg'
  }
];

// Category options
const categories = ['All Products', 'T-Shirts', 'Shirts', 'Watches', 'Shoes', 'Hoodies', 'Jeans', 'Jackets', 'Accessories', 'Sportswear'];

// Price range options
const priceRanges = [
  { label: 'All Prices', value: 'all' },
  { label: 'Under $30', value: 'under-30' },
  { label: '$30 - $50', value: '30-50' },
  { label: '$50 - $100', value: '50-100' },
  { label: 'Over $100', value: 'over-100' }
];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('All Products');
  const [priceRange, setPriceRange] = useState('all');
  const { addToCart } = useCart();
  
  const filteredByCategory = activeCategory === 'All Products' 
    ? products
    : products.filter(product => product.category === activeCategory);

  const filteredProducts = filteredByCategory.filter(product => {
    if (priceRange === 'all') return true;
    if (priceRange === 'under-30') return product.price < 30;
    if (priceRange === '30-50') return product.price >= 30 && product.price <= 50;
    if (priceRange === '50-100') return product.price > 50 && product.price <= 100;
    if (priceRange === 'over-100') return product.price > 100;
    return true;
  });

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart`,
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-cream-light flex flex-col">
      <Navbar />
      
      {/* Banner Header */}
      <div className="w-full bg-charcoal-dark py-12 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Shop Our Collection</h1>
        <p className="text-sand text-lg">Handcrafted accessories for the modern gentleman</p>
      </div>
      
      <div className="section-container flex-1">
        {/* Filters Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 mb-4">
          {/* Category Tabs */}
          <div className="flex overflow-x-auto pb-4 gap-2 mb-4 sm:mb-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-md whitespace-nowrap transition-colors ${
                  activeCategory === category
                  ? 'bg-terracotta text-white font-medium'
                  : 'bg-white hover:bg-cream text-charcoal'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Price Filter */}
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-charcoal" />
            <div className="w-40">
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by price" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="relative">
              <Card className="overflow-hidden">
                {product.badge && (
                  <div className="absolute top-2 left-2 z-10">
                    <Badge className={`${product.badge === 'Best Seller' ? 'bg-sand text-charcoal' : 'bg-terracotta text-white'}`}>
                      {product.badge}
                    </Badge>
                  </div>
                )}
                <div className="h-48 bg-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                  <p className="text-terracotta font-bold mb-4">${product.price.toFixed(2)}</p>
                  <div className="flex justify-between items-center">
                    <Link to={`/products/${product.id}`} className="text-teal hover:text-teal-dark transition-colors">
                      View Details
                    </Link>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-teal text-teal hover:bg-teal hover:text-white"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-charcoal mb-2">No products found</h3>
            <p className="text-charcoal-light mb-4">We couldn't find any products matching your filters.</p>
            <Button 
              onClick={() => {
                setActiveCategory('All Products');
                setPriceRange('all');
              }}
              variant="outline"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Products;
