import { useContext, useEffect, useState } from 'react';
import { WishlistContext } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlist } = useContext(WishlistContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://berry-store.onrender.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback mock data if backend is offline
        setProducts([
          { id: 1, name: "Organic Gala Apples", price: 150, category: "Fruits", image: "https://i.ibb.co/v4fF7VKv/Organic-Gala-Apples.webp" },
          { id: 2, name: "Fresh Baby Spinach", price: 85, category: "Vegetables", image: "https://i.ibb.co/358gdPS4/Fresh-Spinach-Bunch.jpg" },
          { id: 3, name: "Sweet Cavendish Bananas", price: 120, category: "Fruits", image: "https://i.ibb.co/BV3Ydn31/Sweet-Cavendish-Bananas.jpg" },
          { id: 4, name: "Cherry Tomatoes", price: 190, category: "Vegetables", image: "https://i.ibb.co/6cLvWzvP/Vine-Ripened-Cherry-Tomatoes.jpg" },
          { id: 5, name: "Navel Oranges", price: 140, category: "Fruits", image: "https://i.ibb.co/RpDKYZMP/Organic-Navel-Oranges.jpg" },
          { id: 6, name: "Bell Pepper Mix", price: 210, category: "Vegetables", image: "https://i.ibb.co/W45dfmnr/Crisp-Bell-Pepper-Mix.jpg" },
          { id: 7, name: "Broccoli Crowns", price: 95, category: "Vegetables", image: "https://i.ibb.co/gFhg914t/Fresh-Broccoli-Crowns.webp" },
          { id: 8, name: "Thai Mangoes", price: 250, category: "Fruits", image: "https://i.ibb.co/0v3Dj8q/Sweet-Thai-Mangoes.webp" }
        ]);
        setLoading(false);
      });
  }, []);

  // Filter products to show only those in the wishlist
  const favoriteProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="container mt-5 min-vh-100">
      <div className="text-center mb-5">
        <h2 className="fw-bold" style={{ color: "var(--berry-cyan)" }}>
          <i className="fas fa-heart me-2"></i> My Wishlist
        </h2>
        <p className="text-muted">Your curated selection of farm-fresh favorites.</p>
      </div>

      {loading ? (
        <div className="text-center py-5"><div className="spinner-border text-info"></div></div>
      ) : favoriteProducts.length > 0 ? (
        <div className="row">
          {favoriteProducts.map(product => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5 bg-white rounded-4 shadow-sm">
          <i className="far fa-heart fa-4x mb-3 text-muted" style={{ opacity: 0.3 }}></i>
          <h4>Your wishlist is empty</h4>
          <p className="text-muted mb-4">Looks like you haven't saved any produce yet.</p>
          <Link to="/products" className="btn btn-primary px-4 fw-bold">
            Back to Shop
          </Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;