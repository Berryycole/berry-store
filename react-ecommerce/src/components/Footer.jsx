import { Link } from 'react-router-dom';

const Footer = () => {
  // Theme Colors
  const midnightBlue = "#002d5b";
  const berryCyan = "#00d4ff";

  return (
    <footer 
      className="footer text-center p-5 mt-5" 
      style={{ 
        backgroundColor: midnightBlue, 
        color: 'white',
        borderTop: `4px solid ${berryCyan}` 
      }}
    >
      <div className="container">
        {/* Stylized Brand Name */}
        <div className="mb-4">
          <h4 className="fw-bold" style={{ letterSpacing: '1px' }}>
            <span style={{ color: 'white' }}>Berry</span>
            <span style={{ color: berryCyan, fontWeight: '300', marginLeft: '5px' }}>STORE</span>
          </h4>
          <p className="small text-light opacity-75">
            Your destination for premium fresh finds and tech essentials.
          </p>
        </div>

        {/* Policy Links */}
        <div className="mb-4">
          <Link 
            to="/terms" 
            className="text-decoration-none mx-3 small" 
            style={{ color: berryCyan, fontWeight: '500' }}
          >
            Terms & Conditions
          </Link>
          <Link 
            to="/privacy" 
            className="text-decoration-none mx-3 small" 
            style={{ color: berryCyan, fontWeight: '500' }}
          >
            Privacy Policy
          </Link>
        </div>

        {/* Social Icons */}
        <div className="mb-4">
          <a href="#" style={{ color: 'white' }} className="mx-2">
            <i className="fab fa-facebook fa-lg"></i>
          </a>
          <a href="#" style={{ color: 'white' }} className="mx-2">
            <i className="fab fa-twitter fa-lg"></i>
          </a>
          <a href="#" style={{ color: 'white' }} className="mx-2">
            <i className="fab fa-instagram fa-lg"></i>
          </a>
        </div>

        {/* Copyright */}
        <div className="pt-4 border-top border-secondary">
          <p className="mb-0 small opacity-50">
            &copy; 2026 BerryStore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;