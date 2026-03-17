import { useEffect, useState, useMemo } from "react";
import ProductCard from '../components/ProductCard';
import Sidebar from '../components/Sidebar';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- STATE FOR FILTERING & FEATURES ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(1000); // Added for Price Filtering
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
        console.error("Backend offline, loading mock inventory", err);
        setProducts([
          { id: 1, name: "Organic Gala Apples", price: 150, category: "Fruits", rating: 5, image: "https://i.ibb.co/v4fF7VKv/Organic-Gala-Apples.webp" },
          { id: 2, name: "Fresh Baby Spinach", price: 85, category: "Vegetables", rating: 4, image: "https://i.ibb.co/358gdPS4/Fresh-Spinach-Bunch.jpg" },
          { id: 3, name: "Sweet Cavendish Bananas", price: 120, category: "Fruits", rating: 5, image: "https://i.ibb.co/BV3Ydn31/Sweet-Cavendish-Bananas.jpg" },
          { id: 4, name: "Cherry Tomatoes", price: 190, category: "Vegetables", rating: 4, image: "https://i.ibb.co/6cLvWzvP/Vine-Ripened-Cherry-Tomatoes.jpg" },
          { id: 5, name: "Navel Oranges", price: 140, category: "Fruits", rating: 4, image: "https://i.ibb.co/RpDKYZMP/Organic-Navel-Oranges.jpg" },
          { id: 6, name: "Bell Pepper Mix", price: 210, category: "Vegetables", rating: 5, image: "https://i.ibb.co/W45dfmnr/Crisp-Bell-Pepper-Mix.jpg" },
          { id: 7, name: "Broccoli Crowns", price: 95, category: "Vegetables", rating: 4, image: "https://i.ibb.co/gFhg914t/Fresh-Broccoli-Crowns.webp" },
          { id: 8, name: "Thai Mangoes", price: 250, category: "Fruits", rating: 5, image: "https://i.ibb.co/0v3Dj8q/Sweet-Thai-Mangoes.webp" }
        ]);
        setLoading(false);
      });
  }, []);

  // --- LOGIC: Filter, Search, Sort, AND Price ---
  const displayedProducts = useMemo(() => {
    let filtered = [...products];

    // 1. Wishlist Filter
    if (showWishlistOnly) filtered = filtered.filter(p => wishlist.includes(p.id));

    // 2. Category Filter
    if (selectedCategory !== 'All') filtered = filtered.filter(p => p.category === selectedCategory);

    // 3. Search Filter
    if (searchQuery.trim() !== '') filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

    // 4. Price Filter (NEW)
    filtered = filtered.filter(p => p.price <= maxPrice);

    // 5. Sorting
    switch (sortOption) {
      case 'price-asc': filtered.sort((a, b) => a.price - b.price); break;
      case 'price-desc': filtered.sort((a, b) => b.price - a.price); break;
      case 'name': filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }
    return filtered;
  }, [products, searchQuery, selectedCategory, maxPrice, sortOption, showWishlistOnly, wishlist]);

  const toggleWishlist = (productId) => {
    setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };

  // Helper to handle updates from the Sidebar component
  const handleSidebarFilter = ({ category, maxPrice }) => {
    setSelectedCategory(category);
    setMaxPrice(maxPrice);
  };

  return (
    <div className="container mt-4">
      <div className="row g-4">
        {/* Sidebar Column */}
        <div className="col-lg-3 col-md-4 mb-4">
          <Sidebar onFilterChange={handleSidebarFilter} activeCategory={selectedCategory} />
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
          <div className="custom-card mb-4 p-3 shadow-sm bg-white rounded-3">
            <div className="row g-2">
              <div className="col-md-6">
                <div className="input-group">
                  <span className="input-group-text bg-transparent border-end-0"><i className="fas fa-search text-muted"></i></span>
                  <input type="text" className="form-control border-start-0" placeholder="Search harvest..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
              </div>
              <div className="col-md-4">
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
              {displayedProducts.length > 0 ? (
                displayedProducts.map((product) => (
                  <div className="col-lg-4 col-md-6 col-sm-6 mb-4" key={product.id}>
                    <ProductCard 
                      product={product} 
                      isFavorited={wishlist.includes(product.id)}
                      onToggleWishlist={() => toggleWishlist(product.id)}
                    />
                  </div>
                ))
              ) : (
                <div className="text-center py-5">
                  <i className="fas fa-seedling fa-3x mb-3 text-muted"></i>
                  <p className="text-muted">No produce matches your current filters.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;