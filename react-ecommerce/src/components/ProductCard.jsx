import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext'; // 1. Import WishlistContext

const ProductCard = ({ product }) => { // 2. Removed isFavorited and onToggleWishlist from props
  const { addToCart } = useContext(CartContext);
  const { wishlist, toggleWishlist } = useContext(WishlistContext); // 3. Access global wishlist logic

  // 4. Determine if THIS specific product is in the wishlist
  const isFavorited = wishlist.includes(product.id);

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
          onClick={() => toggleWishlist(product.id)} // 5. Use the global toggle function
          className="position-absolute top-0 end-0 m-2 btn btn-light rounded-circle shadow-sm d-flex justify-content-center align-items-center"
          style={{ width: '35px', height: '35px', border: 'none', zIndex: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
          title={isFavorited ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          {/* Heart Icon logic */}
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
        <h6 className="card-title fw-bold mb-2 text-truncate product-title" title={product.name}>
          {product.name}
        </h6>
        
        {/* Star Rating */}
        <div className="mb-2">
          {[...Array(5)].map((_, index) => {
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