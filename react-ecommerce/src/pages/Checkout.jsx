import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  
  // Theme Colors
  const berryBlue = "#0056b3";
  const midnightBlue = "#002d5b";
  const berryCyan = "#00d4ff";

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const formatPrice = (value) => {
    return value.toLocaleString('en-PH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order successful! Thank you for shopping at BerryStore.");
    clearCart();
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <div className="container mt-5 text-center py-5">
        <h2 className="fw-bold">Your cart is empty</h2>
        <Link to="/products" className="btn btn-primary mt-3 px-4 rounded-pill">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="container mt-5 py-4 mb-5">
      {/* 1. Page Header */}
      <div className="mb-5">
        <h2 className="fw-bold">
          Final <span style={{ color: berryCyan }}>Checkout</span>
        </h2>
        <div style={{ height: '4px', width: '60px', backgroundColor: berryCyan, borderRadius: '2px' }}></div>
      </div>

      <div className="row g-4">
        {/* 2. Shipping Details Form */}
        <div className="col-lg-7">
          <div className="custom-card border-0 shadow-sm p-4" style={{ borderRadius: '15px' }}>
            <h5 className="fw-bold mb-4">
              <i className="fas fa-truck me-2" style={{ color: berryCyan }}></i>Shipping Information
            </h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold small text-uppercase" style={{ letterSpacing: '1px' }}>Full Name</label>
                <input type="text" className="form-control" placeholder="Enter your full name" required />
              </div>
              
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold small text-uppercase" style={{ letterSpacing: '1px' }}>Email Address</label>
                  <input type="email" className="form-control" placeholder="email@example.com" required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold small text-uppercase" style={{ letterSpacing: '1px' }}>Phone Number</label>
                  <input type="tel" className="form-control" placeholder="09XXXXXXXXX" required />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold small text-uppercase" style={{ letterSpacing: '1px' }}>Delivery Address</label>
                <textarea className="form-control" rows="3" placeholder="Street, Barangay, City, Province" required></textarea>
              </div>

              <div className="p-3 rounded-3 mb-4 custom-card shadow-none" style={{ borderLeft: `5px solid ${berryCyan}`, backgroundColor: 'rgba(0, 212, 255, 0.05)' }}>
                <p className="small mb-0">
                  <i className="fas fa-info-circle me-2" style={{ color: berryCyan }}></i>
                  Orders are typically processed within 24 hours.
                </p>
              </div>
              
              <button type="submit" className="btn btn-lg w-100 d-none d-lg-block shadow-sm py-3" 
                style={{ backgroundColor: berryCyan, color: midnightBlue, fontWeight: '900', borderRadius: '12px' }}>
                CONFIRM ORDER
              </button>
            </form>
          </div>
        </div>

        {/* 3. Order Summary Section */}
        <div className="col-lg-5">
          {/* FIX: Swapped 'card' for 'custom-card' */}
          <div className="custom-card border-0 shadow-sm overflow-hidden" style={{ borderRadius: '15px' }}>
            <div className="card-header border-0 py-3 text-white text-center" style={{ backgroundColor: midnightBlue }}>
              <h6 className="mb-0 fw-bold text-uppercase tracking-wider">Order Summary</h6>
            </div>
            <div className="card-body p-4">
              {/* Item Mini-List */}
              <div className="mb-4" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {cart.map(item => (
                  /* FIX: Replaced border-light with a subtle dynamic border */
                  <div key={item.id} className="d-flex justify-content-between align-items-center mb-2 pb-2" style={{ borderBottom: '1px solid rgba(128, 128, 128, 0.1)' }}>
                    <span className="small fw-medium" style={{ opacity: 0.8 }}>{item.qty}x {item.name}</span>
                    <span className="small fw-bold">₱{formatPrice(item.price * item.qty)}</span>
                  </div>
                ))}
              </div>

              {/* FIX: Removed text-muted for labels so they are readable in dark mode */}
              <div className="d-flex justify-content-between mb-2">
                <span className="fw-medium" style={{ opacity: 0.7 }}>Subtotal</span>
                <span className="fw-bold">₱{formatPrice(total)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3 pb-3" style={{ borderBottom: '1px solid rgba(128, 128, 128, 0.1)' }}>
                <span className="fw-medium" style={{ opacity: 0.7 }}>Shipping Fee</span>
                <span className="text-success fw-bold small">FREE</span>
              </div>
              
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold m-0">Grand Total</h5>
                <h4 className="fw-bold m-0" style={{ color: berryCyan }}>₱{formatPrice(total)}</h4>
              </div>

              <button onClick={handleSubmit} className="btn btn-lg w-100 d-lg-none shadow-sm py-3" 
                style={{ backgroundColor: berryCyan, color: midnightBlue, fontWeight: '900', borderRadius: '12px' }}>
                CONFIRM ORDER
              </button>

              <div className="text-center mt-3">
                <small style={{ opacity: 0.6 }}>
                  <i className="fas fa-shield-alt me-1" style={{ color: berryCyan }}></i> SSL Encrypted Checkout
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;