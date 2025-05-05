
import { Heart, Eye, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  discountedPrice?: number;
  imageUrl: string;
  isNew?: boolean;
  isSale?: boolean;
  category: string;
}

const ProductCard = ({
  id,
  name,
  price,
  discountedPrice,
  imageUrl,
  isNew = false,
  isSale = false,
  category
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = useCart();

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    toast({
      title: !isFavorite ? "Added to Favorites" : "Removed from Favorites",
      description: !isFavorite ? `${name} has been added to your favorites` : `${name} has been removed from your favorites`,
      duration: 3000,
    });
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: "Quick View",
      description: `${name} quick view opened`,
      duration: 3000,
    });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id,
      name,
      price: discountedPrice || price,
      image: imageUrl
    });
    
    toast({
      title: "Added to Cart",
      description: `${name} has been added to your cart`,
      duration: 3000,
    });
  };

  return (
    <div 
      className="group bg-white rounded-lg card-shadow overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-64 overflow-hidden">
        {/* Product Image */}
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110" 
        />
        
        {/* Product Badges */}
        <div className="absolute top-2 left-2 flex gap-2">
          {isNew && (
            <Badge className="bg-teal text-white">New</Badge>
          )}
          {isSale && (
            <Badge className="bg-terracotta text-white">Sale</Badge>
          )}
        </div>

        {/* Product Quick Actions on Hover */}
        <div className={`absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 py-3 px-3 flex justify-between transition-all duration-300 transform ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
          <button 
            onClick={handleQuickView}
            className="text-charcoal hover:text-teal transition-colors duration-200"
          >
            <Eye size={20} />
          </button>
          
          <button 
            onClick={handleAddToCart}
            className="bg-teal text-white px-4 py-1 rounded-md hover:bg-teal-dark transition-colors duration-300 flex items-center gap-1"
          >
            <ShoppingCart size={16} />
            <span>Add to Cart</span>
          </button>
          
          <button 
            onClick={toggleFavorite} 
            className={`transition-colors duration-200 ${isFavorite ? 'text-terracotta' : 'text-charcoal hover:text-terracotta'}`}
          >
            <Heart size={20} fill={isFavorite ? "#E76F51" : "none"} />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="text-sm text-muted-foreground mb-1">{category}</div>
        <h3 className="font-medium text-lg text-charcoal mb-1 group-hover:text-teal transition-colors duration-200">{name}</h3>
        <div className="flex items-center space-x-2">
          {discountedPrice ? (
            <>
              <span className="font-semibold text-terracotta">${discountedPrice.toFixed(2)}</span>
              <span className="text-muted-foreground line-through">${price.toFixed(2)}</span>
            </>
          ) : (
            <span className="font-semibold">${price.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
