import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(0, 4)))
      .catch((err) => {
        console.error("Backend offline, loading fresh produce mock data", err);
        // Updated mock data for Fruits & Vegetables
        setProducts([
          { 
            id: 1, 
            name: "Organic Red Gala Apples", 
            price: 150, 
            oldPrice: 180, 
            discount: 16, 
            rating: 5, 
            image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6bcd6?auto=format&fit=crop&w=400&q=80" 
          },
          { 
            id: 2, 
            name: "Fresh Spinach Bunch", 
            price: 85, 
            oldPrice: 110, 
            discount: 22, 
            rating: 4, 
            image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=400&q=80" 
          },
          { 
            id: 3, 
            name: "Premium Cavendish Bananas", 
            price: 120, 
            oldPrice: 145, 
            discount: 17, 
            rating: 5, 
            image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=400&q=80" 
          },
          { 
            id: 4, 
            name: "Heirloom Tomato Mix", 
            price: 190, 
            oldPrice: 230, 
            discount: 17, 
            rating: 4, 
            image: "https://images.unsplash.com/photo-1518977676601-b53f02ac6d31?auto=format&fit=crop&w=400&q=80" 
          }
        ]);
      });
  }, []);

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  return (
    <div className="home-container">
      
      {/* 1. Redesigned Premium Hero Carousel */}
      <div id="homeCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ height: '80vh', marginTop: '-10px', position: 'relative' }}>
        
        <div className="hero-overlay" style={{ zIndex: 1, pointerEvents: 'none' }}></div>

        <div className="carousel-inner h-100">

          {/* Slide 1: Farm Focus */}
          <div className="carousel-item active h-100">
            <div style={{ 
              height: '100%', 
              width: '100%',
              backgroundImage: `url("https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=2000&q=80")`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div className="hero-content text-center px-3 animate-fade-in" style={{ zIndex: 2 }}>
                <h1 className="hero-title text-white">Fresh from the <span className="hero-accent">Farm</span></h1>
                <p className="hero-subtitle mb-4 mt-2">Organic fruits and vegetables delivered to your doorstep</p>
                <Link to="/products" className="btn-berry-lg">
                  Shop Fresh Now <i className="fas fa-leaf ms-2"></i>
                </Link>
              </div>
            </div>
          </div>

          {/* Slide 2: Healthy Living */}
          <div className="carousel-item h-100">
             <div style={{ 
               height: '100%', 
               width: '100%',
               backgroundImage: `url("https://images.unsplash.com/photo-1601999114066-542b3ae71891?auto=format&fit=crop&w=2000&q=80")`, 
               backgroundSize: 'cover', 
               backgroundPosition: 'center', 
               display: 'flex', 
               alignItems: 'center', 
               justifyContent: 'center' 
             }}>
              <div className="hero-content text-center px-3 animate-fade-in" style={{ zIndex: 2 }}>
                <h1 className="hero-title text-white">Eat <span className="hero-accent">Healthy</span>, Live Better</h1>
                <p className="hero-subtitle mb-4 mt-2">Sustainable produce for a healthier lifestyle</p>
                <Link to="/products" className="btn-berry-lg">
                  Explore Harvest <i className="fas fa-seedling ms-2"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev" style={{ zIndex: 5 }}>
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next" style={{ zIndex: 5 }}>
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
      </div>

      {/* 2. Featured Products Section */}
      <div className="featured-section py-5">
        <div className='container pt-3'>
          <div className="d-flex justify-content-between align-items-end mb-4 pb-2" style={{ borderBottom: '1px solid rgba(128, 128, 128, 0.2)' }}>
            <div>
              <h6 className="hero-accent text-uppercase fw-bold mb-1" style={{ letterSpacing: '2px', fontSize: '0.85rem' }}>Direct from Source</h6>
              <h2 className="fw-bold m-0 section-title">Today's Harvest</h2>
            </div>
            
            <Link to="/products" className="view-all-link">
              View All Produce <i className="fas fa-chevron-right ms-1"></i>
            </Link>
          </div>

          <div className="row g-4 mb-4">
            {products.map((product) => (
              <div className="col-lg-3 col-md-4 col-sm-6" key={product.id}>
                <ProductCard 
                  product={product} 
                  isFavorited={wishlist.includes(product.id)}
                  onToggleWishlist={() => toggleWishlist(product.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;