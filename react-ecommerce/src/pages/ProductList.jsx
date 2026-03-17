import { useEffect, useState, useMemo } from "react";
import ProductCard from '../components/ProductCard';
import Sidebar from '../components/Sidebar';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- STATE FOR FILTERING & FEATURES ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('default');
  const [wishlist, setWishlist] = useState([]);
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);

  useEffect(() => {
    fetch("https://berry-store.onrender.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Backend offline, loading farm-fresh mock inventory", err);
        // FRUIT & VEGETABLE MOCK DATA
        setProducts([
          { id: 1, name: "Organic Gala Apples", price: 150, category: "Fruits", rating: 5, image: "https://i.ibb.co/v4fF7VKv/Organic-Gala-Apples.webp" },
          { id: 2, name: "Fresh Baby Spinach", price: 85, category: "Vegetables", rating: 4, image: "https://i.ibb.co/358gdPS4/Fresh-Spinach-Bunch.jpg" },
          { id: 3, name: "Sweet Cavendish Bananas", price: 120, category: "Fruits", rating: 5, image: "https://i.ibb.co/BV3Ydn31/Sweet-Cavendish-Bananas.jpg" },
          { id: 4, name: "Vine-Ripened Cherry Tomatoes", price: 190, category: "Vegetables", rating: 4, image: "https://i.ibb.co/6cLvWzvP/Vine-Ripened-Cherry-Tomatoes.jpg" },
          { id: 5, name: "Organic Navel Oranges", price: 140, category: "Fruits", rating: 4, image: "https://i.ibb.co/RpDKYZMP/Organic-Navel-Oranges.jpg" },
          { id: 6, name: "Crisp Bell Pepper Mix", price: 210, category: "Vegetables", rating: 5, image: "https://i.ibb.co/W45dfmnr/Crisp-Bell-Pepper-Mix.jpg" },
          { id: 7, name: "Fresh Broccoli Crowns", price: 95, category: "Vegetables", rating: 4, image: "https://i.ibb.co/gFhg914t/Fresh-Broccoli-Crowns.webp" },
          { id: 8, name: "Sweet Thai Mangoes", price: 250, category: "Fruits", rating: 5, image: "https://i.ibb.co/0v3Dj8q/Sweet-Thai-Mangoes.webp" }
        ]);
        setLoading(false);
      });
  }, []);

  // --- LOGIC: Filter, Search, Sort ---
  const displayedProducts = useMemo(() => {
    let filtered = [...products];
    if (showWishlistOnly) filtered = filtered.filter(p => wishlist.includes(p.id));
    if (selectedCategory !== 'All') filtered = filtered.filter(p => p.category === selectedCategory);
    if (searchQuery.trim() !== '') filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

    switch (sortOption) {
      case 'price-asc': filtered.sort((a, b) => a.price - b.price); break;
      case 'price-desc': filtered.sort((a, b) => b.price - a.price); break;
      case 'name': filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }
    return filtered;
  }, [products, searchQuery, selectedCategory, sortOption, showWishlistOnly, wishlist]);

  const toggleWishlist = (productId) => {
    setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };

  const categories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];

  return (
    <div className="container mt-4">
      <div className="row g-4">
        {/* Sidebar Column */}
        <div className="col-lg-3 col-md-4 mb-4">
          <Sidebar onCategorySelect={setSelectedCategory} activeCategory={selectedCategory} />
        </div>
        
        {/* Main Grid Column */}
        <div className="col-lg-9 col-md-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold m-0" style={{ color: "var(--berry-cyan)" }}>
              {showWishlistOnly ? "My Wishlist" : "Our Harvest"}
            </h2>
            {!loading && <span className="text-muted small">{displayedProducts.length} Items Found</span>}
          </div>

          {/* --- CONTROL PANEL --- */}
          <div className="custom-card mb-4 p-3 shadow-sm">
            <div className="row g-2">
              <div className="col-md-4">
                <input type="text" className="form-control" placeholder="Search harvest..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
              <div className="col-md-3">
                <select className="form-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="col-md-3">
                <select className="form-select" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                  <option value="default">Sort By: Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
              <div className="col-md-2">
                <button className={`btn w-100 fw-bold ${showWishlistOnly ? 'btn-danger' : 'btn-outline-danger'}`} onClick={() => setShowWishlistOnly(!showWishlistOnly)}>
                  <i className="fas fa-heart"></i> ({wishlist.length})
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5"><div className="spinner-border text-info" role="status"></div></div>
          ) : (
            <div className="row">
              {displayedProducts.map((product) => (
                <div className="col-lg-4 col-md-6 col-sm-6 mb-4" key={product.id}>
                  <ProductCard 
                    product={product} 
                    isFavorited={wishlist.includes(product.id)}
                    onToggleWishlist={() => toggleWishlist(product.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;