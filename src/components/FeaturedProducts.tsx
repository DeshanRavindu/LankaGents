
import { useState } from 'react';
import ProductCard from './ProductCard';

// Sample product data
const products = [
  {
    id: '1',
    name: 'Classic Oxford Shirt',
    price: 69.99,
    imageUrl: 'https://images.unsplash.com/photo-1626497764746-6dc36546b388?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWVuJTIwc2hpcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    category: 'Shirts',
    isNew: true
  },
  {
    id: '2',
    name: 'Slim Fit Jeans',
    price: 89.99,
    discountedPrice: 69.99,
    imageUrl: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZGVuaW0lMjBqZWFuc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    category: 'Pants',
    isSale: true
  },
  {
    id: '3',
    name: 'Casual Sneakers',
    price: 119.99,
    imageUrl: 'https://images.unsplash.com/photo-1597248881519-db089d3744a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNuZWFrZXJzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    category: 'Shoes'
  },
  {
    id: '4',
    name: 'Leather Watch',
    price: 149.99,
    discountedPrice: 129.99,
    imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fHdhdGNofGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    category: 'Accessories',
    isSale: true
  },
  {
    id: '5',
    name: 'Premium Wool Coat',
    price: 299.99,
    imageUrl: 'https://images.unsplash.com/photo-1619603364904-c0498317e145?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWVuJTIwY29hdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    category: 'Outerwear',
    isNew: true
  },
  {
    id: '6',
    name: 'Leather Wallet',
    price: 59.99,
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGVhdGhlciUyMHdhbGxldHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    category: 'Accessories'
  },
  {
    id: '7',
    name: 'Casual T-Shirt',
    price: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    category: 'T-Shirts'
  },
  {
    id: '8',
    name: 'Aviator Sunglasses',
    price: 129.99,
    discountedPrice: 99.99,
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3VuZ2xhc3Nlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    category: 'Eyewear',
    isSale: true
  }
];

// Category options
const categories = ['All', 'Shirts', 'Pants', 'Shoes', 'Accessories', 'Outerwear', 'T-Shirts', 'Eyewear'];

const FeaturedProducts = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="bg-white py-16">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">Featured Products</h2>
          <p className="text-charcoal-light max-w-2xl mx-auto">
            Discover our handpicked collection of premium men's fashion essentials, crafted for comfort, style, and durability.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-teal text-white'
                  : 'bg-cream hover:bg-cream-dark text-charcoal'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              discountedPrice={product.discountedPrice}
              imageUrl={product.imageUrl}
              isNew={product.isNew}
              isSale={product.isSale}
              category={product.category}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a href="/products" className="btn-secondary">
            View All Products
          </a>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
