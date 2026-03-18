import { useEffect, useState, useMemo, useContext } from "react";
import ProductCard from '../components/ProductCard';
import Sidebar from '../components/Sidebar';
import { WishlistContext } from '../context/WishlistContext';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- GLOBAL STATE ---
  const { wishlist } = useContext(WishlistContext); 

  // --- LOCAL STATE FOR FILTERING ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(1000); 
  const [sortOption, setSortOption] = useState('default');

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

  // --- LOGIC: Simplified to Category, Search, Price, and Sort ---
  const displayedProducts = useMemo(() => {
    let filtered = [...products];

    // No longer filtering by "Wishlist Only" here
    if (selectedCategory !== 'All') filtered = filtered.filter(p => p.category === selectedCategory);
    if (searchQuery.trim() !== '') filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    filtered = filtered.filter(p => p.price <= maxPrice);

    switch (sortOption) {
      case 'price-asc': filtered.sort((a, b) => a.price - b.price); break;
      case 'price-desc': filtered.sort((a, b) => b.price - a.price); break;
      case 'name': filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }
    return filtered;
  }, [products, searchQuery, selectedCategory, maxPrice, sortOption]);

  const handleSidebarFilter = ({ category, maxPrice }) => {
    setSelectedCategory(category);
    setMaxPrice(maxPrice);
  };

  return (
    <div className="container mt-4">
      <div className="row g-4">
        <div className="col-lg-3 col-md-4 mb-4">
          <Sidebar onFilterChange={handleSidebarFilter} activeCategory={selectedCategory} />
        </div>
        
        <div className="col-lg-9 col-md-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold m-0" style={{ color: "var(--berry-cyan)" }}>
              Our Harvest
            </h2>
            {!loading && <span className="text-muted small">{displayedProducts.length} Items Found</span>}
          </div>

          {/* --- UPDATED CONTROL PANEL (Wishlist Button Removed) --- */}
          <div className="custom-card mb-4 p-3 shadow-sm bg-white rounded-3">
            <div className="row g-2">
              <div className="col-md-7">
                <div className="input-group">
                  <span className="input-group-text bg-transparent border-end-0"><i className="fas fa-search text-muted"></i></span>
                  <input type="text" className="form-control border-start-0" placeholder="Search harvest..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
              </div>
              <div className="col-md-5">
                <select className="form-select" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                  <option value="default">Sort By: Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
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
                    <ProductCard product={product} />
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