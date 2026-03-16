import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Theme Colors
  const berryBlue = "#0056b3";
  const midnightBlue = "#002d5b";
  const berryCyan = "#00d4ff";

  const formatPrice = (value) => {
    return value.toLocaleString('en-PH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  if (cart.length === 0) {
    return (
      <div className="container my-5 text-center py-5">
        <div className="mb-4">
          <i className="fas fa-shopping-basket display-1" style={{ opacity: 0.2 }}></i>
        </div>
        <h2 className="fw-bold">Your cart is empty</h2>
        <p className="mb-4" style={{ opacity: 0.7 }}>Looks like you haven't added any fresh treats yet.</p>
        <Link to="/products" className="btn btn-lg px-5 shadow-sm" 
              style={{ backgroundColor: berryBlue, color: 'white', borderRadius: '30px', fontWeight: 'bold' }}>
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      {/* 2. Page Header */}
      <div className="mb-5">
        <h2 className="fw-bold">
          Shopping <span style={{ color: berryCyan }}>Cart</span>
        </h2>
        <div style={{ height: '4px', width: '60px', backgroundColor: berryCyan, borderRadius: '2px' }}></div>
      </div>

      <div className="row g-4">
        {/* 3. Cart Items List */}
        <div className="col-lg-8">
          {cart.map(item => (
            /* FIX: Swapped 'card' for 'custom-card' */
            <div key={item.id} className="custom-card mb-3 border-0 shadow-sm p-3" style={{ borderRadius: '15px' }}>
              <div className="row align-items-center g-3 text-center text-md-start">
                
                <div className="col-md-2">
                  <div className="rounded-3 d-flex align-items-center justify-content-center" 
                       style={{ height: '80px', width: '80px', margin: '0 auto', backgroundColor: 'rgba(128,128,128,0.1)' }}>
                    {/* Display actual product image if available */}
                    <img src={item.image || item.img} alt={item.name} className="img-fluid p-2" style={{ maxHeight: '100%' }} />
                  </div>
                </div>
                
                <div className="col-md-4">
                  <h5 className="mb-1 fw-bold">{item.name}</h5>
                  <p className="mb-0 fw-bold small" style={{ color: berryCyan }}>₱{formatPrice(item.price)}</p>
                </div>

                <div className="col-md-3">
                  {/* FIX: Removed 'bg-light' and used a semi-transparent background */}
                  <div className="d-inline-flex align-items-center rounded-pill px-2 py-1" style={{ backgroundColor: 'rgba(128,128,128,0.1)' }}>
                    <button onClick={() => decreaseQty(item.id)} className="btn btn-sm border-0"><i className="fas fa-minus" style={{ opacity: 0.6 }}></i></button>
                    <span className="mx-3 fw-bold" style={{ minWidth: '20px', textAlign: 'center' }}>{item.qty}</span>
                    <button onClick={() => increaseQty(item.id)} className="btn btn-sm border-0"><i className="fas fa-plus" style={{ color: berryCyan }}></i></button>
                  </div>
                </div>

                <div className="col-md-3 text-md-end">
                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    className="btn btn-link text-decoration-none text-danger small p-0"
                  >
                    <i className="fas fa-trash-alt me-1"></i> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 4. Order Summary Sidebar */}
        <div className="col-lg-4">
          {/* FIX: Swapped 'card' for 'custom-card' */}
          <div className="custom-card border-0 shadow-sm overflow-hidden" style={{ borderRadius: '15px' }}>
            <div className="card-header border-0 py-3 text-white text-center" style={{ backgroundColor: midnightBlue }}>
              <h5 className="mb-0 fw-bold">Order Summary</h5>
            </div>
            <div className="card-body p-4">
              
              {/* FIX: Removed text-muted for labels so they are readable in dark mode */}
              <div className="d-flex justify-content-between mb-2">
                <span style={{ opacity: 0.7 }}>Subtotal</span>
                <span className="fw-bold">₱{formatPrice(total)}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-3 pb-3" style={{ borderBottom: '1px solid rgba(128, 128, 128, 0.1)' }}>
                <span style={{ opacity: 0.7 }}>Shipping</span>
                <span className="text-success fw-bold small">FREE</span>
              </div>
              
              <div className="d-flex justify-content-between mb-4">
                <h4 className="fw-bold m-0">Total</h4>
                {/* FIX: Changed color to berryCyan so the price glows in dark mode */}
                <h4 className="fw-bold m-0" style={{ color: berryCyan }}>₱{formatPrice(total)}</h4>
              </div>
              
              <Link to="/checkout" className="btn btn-lg w-100 shadow-sm py-3" 
                    style={{ backgroundColor: berryCyan, color: midnightBlue, fontWeight: '900', borderRadius: '12px' }}>
                PROCEED TO CHECKOUT
              </Link>
              
              <div className="text-center mt-3">
                <small style={{ opacity: 0.6 }}><i className="fas fa-lock me-1"></i> Secure Checkout</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;