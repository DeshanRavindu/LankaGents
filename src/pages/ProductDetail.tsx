import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Heart, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';

// Sample product data - in a real app, this would come from an API
const products = [
  { 
    id: '1', 
    name: 'Premium Cotton T-Shirt', 
    price: 24.99, 
    category: 'T-Shirts', 
    image: '/placeholder.svg',
    badge: 'Best Seller',
    description: 'Our premium cotton t-shirt is made from 100% organic cotton for maximum comfort and durability. Perfect for everyday wear.',
    shortDescription: 'Comfortable, durable, and stylish - the perfect everyday t-shirt made from 100% organic cotton.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Navy', 'Gray'],
    additionalImages: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ]
  },
  { 
    id: '2', 
    name: 'Formal Business Shirt', 
    price: 49.99, 
    category: 'Shirts', 
    image: '/placeholder.svg',
    badge: 'New Arrival',
    description: 'Classic formal business shirt with wrinkle-resistant fabric. Ideal for professional settings and formal occasions.',
    shortDescription: 'A wrinkle-resistant formal shirt designed for professional environments and special occasions.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Light Blue', 'Pink', 'Gray'],
    additionalImages: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1589310243389-96a5483213a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563630423918-b58f07336ac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ]
  },
  { 
    id: '3', 
    name: 'Premium Cotton T-Shirt', 
    price: 24.99, 
    category: 'T-Shirts', 
    image: '/placeholder.svg',
    badge: 'Best Seller',
    description: 'Our premium cotton t-shirt is made from 100% organic cotton for maximum comfort and durability. Perfect for everyday wear.',
    shortDescription: 'Comfortable, durable, and stylish - the perfect everyday t-shirt made from 100% organic cotton.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Navy', 'Gray'],
    additionalImages: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ]
  },
  // Add more products here with detailed descriptions
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      toast({
        title: "Added to Wishlist",
        description: `${product?.name} has been added to your wishlist`,
      });
    }
  };
  
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "You need to select a size before adding to cart",
        variant: "destructive"
      });
      return;
    }
    
    if (!selectedColor) {
      toast({
        title: "Please select a color",
        description: "You need to select a color before adding to cart",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Added to Cart",
      description: `${quantity} × ${product?.name} has been added to your cart`,
    });
  };
  
  if (!product) {
    return (
      <div className="min-h-screen bg-cream-light flex flex-col">
        <Navbar />
        <div className="section-container flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-charcoal mb-4">Product Not Found</h2>
            <p className="text-charcoal-light mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <Link to="/products">
              <Button>Return to Products</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const displayImage = product.additionalImages && product.additionalImages.length > 0 
    ? (selectedImageIndex === 0 ? product.image : product.additionalImages[selectedImageIndex - 1])
    : product.image;
  
  return (
    <div className="min-h-screen bg-cream-light flex flex-col">
      <Navbar />
      
      <div className="section-container flex-1">
        <div className="mb-6">
          <Link to="/products" className="flex items-center text-teal hover:underline">
            <ArrowLeft size={16} className="mr-1" />
            Back to Products
          </Link>
        </div>
        
        {/* Short Description */}
        <div className="bg-white p-6 rounded-lg mb-8">
          <h2 className="text-xl font-medium text-charcoal mb-2">About this product</h2>
          <p className="text-charcoal-light">{product.shortDescription}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg">
              <div className="relative">
                {product.badge && (
                  <Badge className={`absolute top-2 left-2 z-10 ${product.badge === 'Best Seller' ? 'bg-sand text-charcoal' : 'bg-terracotta text-white'}`}>
                    {product.badge}
                  </Badge>
                )}
                <img 
                  src={displayImage} 
                  alt={product.name} 
                  className="w-full h-[400px] object-contain"
                />
              </div>
            </div>
            
            {/* Image thumbnails */}
            {product.additionalImages && product.additionalImages.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                <div 
                  className={`w-20 h-20 rounded-md overflow-hidden border-2 cursor-pointer ${selectedImageIndex === 0 ? 'border-teal' : 'border-transparent'}`}
                  onClick={() => setSelectedImageIndex(0)}
                >
                  <img src={product.image} alt="Main" className="w-full h-full object-cover" />
                </div>
                {product.additionalImages.map((img, index) => (
                  <div 
                    key={index}
                    className={`w-20 h-20 rounded-md overflow-hidden border-2 cursor-pointer ${selectedImageIndex === index + 1 ? 'border-teal' : 'border-transparent'}`}
                    onClick={() => setSelectedImageIndex(index + 1)}
                  >
                    <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold text-charcoal mb-2">{product.name}</h1>
            <p className="text-charcoal-light mb-4">{product.category}</p>
            <div className="text-2xl font-bold text-terracotta mb-6">${product.price.toFixed(2)}</div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-charcoal-light">{product.description}</p>
            </div>
            
            {/* Sizes */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button 
                    key={size} 
                    variant={selectedSize === size ? "default" : "outline"}
                    className={selectedSize === size ? "bg-teal hover:bg-teal-dark" : "hover:bg-cream"}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Colors */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <Button 
                    key={color} 
                    variant={selectedColor === color ? "default" : "outline"}
                    className={selectedColor === color ? "bg-teal hover:bg-teal-dark" : "hover:bg-cream"}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Quantity */}
            <div className="mb-8">
              <h3 className="font-medium mb-2">Quantity</h3>
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={decreaseQuantity}
                  className="rounded-l-md rounded-r-none"
                >
                  <Minus size={16} />
                </Button>
                <div className="px-6 py-2 border-y border-input">
                  {quantity}
                </div>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={increaseQuantity}
                  className="rounded-r-md rounded-l-none"
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>
            
            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button 
                className="flex-1 bg-teal hover:bg-teal-dark"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2" size={18} />
                Add to Cart
              </Button>
              <Button 
                variant="outline" 
                className={isFavorite ? "border-terracotta text-terracotta" : "border-charcoal text-charcoal"}
                onClick={toggleFavorite}
              >
                <Heart className="mr-2" size={18} fill={isFavorite ? "#E76F51" : "none"} />
                {isFavorite ? "Saved" : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
