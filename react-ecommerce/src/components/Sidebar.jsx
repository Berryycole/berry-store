import { useState, useEffect } from "react";

const Sidebar = ({ onFilterChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(1000); // Default max price

  useEffect(() => {
    fetch("https://berry-store.onrender.com/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(() => setCategories(["Fruits", "Vegetables"]));
  }, []);

  // Update parent whenever filters change
  const handleFilterUpdate = (category, price) => {
    onFilterChange({ category, maxPrice: price });
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    handleFilterUpdate(category, priceRange);
  };

  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setPriceRange(newPrice);
    handleFilterUpdate(selectedCategory, newPrice);
  };

  return (
    <aside className="berry-sidebar bg-white custom-card shadow-sm border-0 rounded-4 overflow-hidden mb-4">
      {/* Categories Section */}
      <div className="p-4 border-bottom" style={{ borderColor: 'rgba(128,128,128,0.1)' }}>
        <h6 className="m-0 fw-bold text-uppercase d-flex align-items-center" style={{ letterSpacing: '1px' }}>
          <i className="fas fa-list me-3" style={{ color: "var(--berry-cyan)" }}></i>
          Categories
        </h6>
      </div>

      <div className="sidebar-content">
        <ul className="category-list list-unstyled m-0 p-0">
          <li
            className={`category-item p-3 px-4 d-flex align-items-center border-bottom ${selectedCategory === 'All' ? 'active' : ''}`}
            onClick={() => handleCategoryClick('All')}
            style={{ cursor: 'pointer', transition: '0.3s', borderColor: 'rgba(128,128,128,0.05)' }}
          >
            <i className="fas fa-th-large me-3" style={{ width: '20px', textAlign: 'center' }}></i>
            <span className="fw-semibold small">All Products</span>
          </li>

          {categories.map((cat, index) => (
            <li
              key={index}
              className={`category-item p-3 px-4 d-flex align-items-center border-bottom ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => handleCategoryClick(cat)}
              style={{ cursor: 'pointer', transition: '0.3s', borderColor: 'rgba(128,128,128,0.05)' }}
            >
              <i className="fas fa-tag me-3" style={{ width: '20px', textAlign: 'center' }}></i>
              <span className="fw-semibold small">{cat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Filter section */}
      <div className="p-4 bg-transparent">
        <h6 className="fw-bold small mb-3 text-uppercase" style={{ letterSpacing: '1px', color: "var(--berry-cyan)" }}>
          Max Price: <span className="text-dark">₱{priceRange}</span>
        </h6>
        <input 
            type="range" 
            className="form-range custom-range" 
            min="0" 
            max="1000" 
            step="50"
            value={priceRange}
            onChange={handlePriceChange} 
        />
        <div className="d-flex justify-content-between small mt-2" style={{ opacity: '0.8' }}>
          <span>₱0</span>
          <span>₱1000</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;