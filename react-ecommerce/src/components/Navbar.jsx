import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  // --- DARK MODE LOGIC ---
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  };

  // We are moving these to CSS variables in Navbar.css for better control
  const berryCyan = "#00d4ff";
  const midnightBlue = "#002d5b";

  return (
    <>
      {/* --- TOP NAVBAR --- */}
      {/* Removed the inline 'style' background so Navbar.css .berry-navbar handles it */}
      <nav className="navbar navbar-expand-lg sticky-top shadow-sm berry-navbar">
        <div className="container d-flex justify-content-between">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <span style={{ backgroundColor: berryCyan, color: midnightBlue, fontWeight: '900', padding: '0 10px', borderRadius: '6px', fontSize: '1.4rem', marginRight: '10px' }}>B</span>
            <span style={{ color: 'white', fontWeight: '800', fontSize: '1.6rem' }}>Berry</span>
            <span style={{ color: berryCyan, fontWeight: '300', fontSize: '1.4rem', textTransform: 'uppercase', marginLeft: '5px' }}>Store</span>
          </Link>

          {/* Mobile Toggle */}
          <button onClick={toggleTheme} className="btn btn-link text-white d-lg-none text-decoration-none ms-auto" style={{ fontSize: '1.2rem' }}>
            {isDarkMode ? <i className="fas fa-sun text-warning"></i> : <i className="fas fa-moon"></i>}
          </button>

          <div className="collapse navbar-collapse d-none d-lg-flex" id="navbarNav">
            <ul className="navbar-nav me-auto">
              {['Home', 'Products', 'Blog', 'About', 'Contact'].map((item) => (
                <li className="nav-item" key={item}>
                  <NavLink to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="nav-link">
                    {item}
                  </NavLink>
                </li>
              ))}
            </ul>
            
            <button onClick={toggleTheme} className="btn btn-link text-white me-3 text-decoration-none" style={{ fontSize: '1.2rem' }}>
              {isDarkMode ? <i className="fas fa-sun text-warning"></i> : <i className="fas fa-moon"></i>}
            </button>

            <Link className="nav-link position-relative d-none d-lg-block cart-pill" to="/cart">
              <i className="fas fa-shopping-cart fs-5"></i>
              {totalItems > 0 && <span className="badge rounded-pill bg-danger ms-2">{totalItems}</span>}
            </Link>
          </div>
        </div>
      </nav>

      {/* --- BOTTOM NAVIGATION (Mobile Only) --- */}
      {/* Removed all inline styles here so .mobile-bottom-nav in CSS can change the background */}
      <div className="mobile-bottom-nav d-lg-none fixed-bottom z-3">
        <div className="d-flex justify-content-around align-items-center h-100">
          <NavLink to="/" className="mobile-nav-link">
            <i className="fas fa-home"></i>
            <span>Home</span>
          </NavLink>
          <NavLink to="/products" className="mobile-nav-link">
            <i className="fas fa-th-large"></i>
            <span>Shop</span>
          </NavLink>
          
          <NavLink to="/cart" className="mobile-nav-link position-relative">
            <i className="fas fa-shopping-cart"></i>
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="position-absolute badge rounded-pill shadow-sm" 
                    style={{ top: '0px', right: '15px', backgroundColor: '#0056b3', color: 'white', fontSize: '0.65rem', border: '2px solid white' }}>
                {totalItems}
              </span>
            )}
          </NavLink>
          
          <NavLink to="/blog" className="mobile-nav-link">
            <i className="fas fa-newspaper"></i>
            <span>Blog</span>
          </NavLink>
          <NavLink to="/contact" className="mobile-nav-link">
            <i className="fas fa-phone-alt"></i>
            <span>Contact</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Navbar;