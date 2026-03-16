import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product, isFavorited, onToggleWishlist }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="card custom-card h-100 border-0 shadow-sm">
      
      {/* Image Wrapper */}
      <div className="product-img-wrapper position-relative" style={{ overflow: 'hidden' }}>
        
        {/* Discount Badge */}
        {product.discount && (
          <div className="sale-badge position-absolute top-0 start-0 m-2 bg-danger text-white px-2 py-1 rounded shadow-sm" style={{ zIndex: 2, fontSize: '0.8rem', fontWeight: 'bold' }}>
            -{product.discount}%
          </div>
        )}
        
        {/* Wishlist Heart Button */}
        <button 
          onClick={onToggleWishlist}
          className="position-absolute top-0 end-0 m-2 btn btn-light rounded-circle shadow-sm d-flex justify-content-center align-items-center"
          style={{ width: '35px', height: '35px', border: 'none', zIndex: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
          title={isFavorited ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          {/* FIX: Removed 'text-muted' so the empty heart adapts correctly */}
          <i className={`${isFavorited ? 'fas text-danger' : 'far'} fa-heart fs-5`} style={{ color: isFavorited ? '' : '#a0aec0' }}></i>
        </button>

        {/* Product Image */}
        <img 
          src={product.image || product.img} 
          className="card-img-top product-img bg-white" 
          alt={product.name} 
          style={{ height: '200px', objectFit: 'contain', width: '100%', padding: '10px' }}
        />
      </div>
      
      {/* Card Body */}
      <div className="card-body d-flex flex-column text-center p-3">
        {/* FIX: Added 'product-title' class so it links with the app.css fix we just did */}
        <h6 className="card-title fw-bold mb-2 text-truncate product-title" title={product.name}>
          {product.name}
        </h6>
        
        {/* Star Rating */}
        <div className="mb-2">
          {[...Array(5)].map((star, index) => {
            return (
              <i key={index} className={`fa-star ${index < (product.rating || 0) ? 'fas text-warning' : 'far'} fa`} style={{ opacity: index < (product.rating || 0) ? 1 : 0.3 }}></i>
            );
          })}
        </div>
        
        {/* Pricing */}
        <div className="mb-3 mt-auto">
          {product.oldPrice && (
            <span className="text-decoration-line-through me-2 small" style={{ opacity: 0.5 }}>
              ₱{product.oldPrice.toLocaleString()}
            </span>
          )}
          {/* FIX: Changed color to berry-cyan so it pops on the dark cards */}
          <span className="fw-bold fs-5" style={{ color: "var(--berry-cyan)" }}>
            ₱{product.price.toLocaleString()}
          </span>
        </div>
        
        {/* Add to Cart */}
        <button 
          className="btn btn-primary mt-auto w-100 fw-bold shadow-sm" 
          onClick={() => addToCart(product)}
          style={{ borderRadius: '8px' }}
        >
          <i className="fas fa-shopping-cart me-2"></i> Add to Cart
        </button>
      </div>
      
    </div>
  );
};

export default ProductCard; 