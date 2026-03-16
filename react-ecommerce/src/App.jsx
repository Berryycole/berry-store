import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Blog from './pages/Blog';
import Cart from './pages/Cart'; 
import Checkout from './pages/Checkout'; 
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container-fluid px-4 py-4 min-vh-100 d-flex flex-column">
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/blog" element={<Blog />} />
            
            {/* Add the new Cart route here */}
            <Route path="/cart" element={<Cart />} />
            
            {/* Add the new Checkout route here */}
            <Route path="/checkout" element={<Checkout />} /> {/* [cite: 120] */}
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;