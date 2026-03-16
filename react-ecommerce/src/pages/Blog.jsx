import React from 'react';

const Blog = () => {
  const articles = [
    {
      title: 'The Power of Organic Berries',
      desc: 'Discover why antioxidants found in our fresh-picked berries are essential for your daily immune boost and heart health.',
      img: 'https://i.ibb.co/mVCMFy9C/5-Tips-for-Storing-Leafy-Greens.png',
      tag: 'Nutrition'
    },
    {
      title: '5 Tips for Storing Leafy Greens',
      desc: 'Stop your spinach and kale from wilting. Learn the professional kitchen secrets to keeping your vegetables crisp for up to two weeks.',
      img: 'https://i.ibb.co/WS1nKxJ/The-Power-of-Organic-Berries.avif',
      tag: 'Kitchen Hacks'
    },
  ];

  return (
    <div className="container mt-5 py-5 mb-5">
      {/* Page Header */}
      <div className="text-center mb-5">
        <h2 className="display-5 fw-bold">
          The <span style={{ color: "var(--berry-cyan)" }}>Harvest</span> Journal
        </h2>
        <p className="lead" style={{ opacity: 0.85 }}>Your guide to healthy eating and sustainable living.</p>
        <div className="mx-auto mt-3" style={{ height: '4px', width: '60px', backgroundColor: 'var(--berry-cyan)', borderRadius: '2px' }}></div>
      </div>

      <div className="row g-4">
        {/* Main Content: Article Cards */}
        <div className="col-lg-8">
          {articles.map((post, idx) => (
            <div className="custom-card mb-4 shadow-sm border-0 overflow-hidden" key={idx} style={{ borderRadius: '15px' }}>
              <div className="row g-0 align-items-center">
                <div className="col-md-5 h-100">
                  <img
                    src={post.img}
                    className="img-fluid w-100"
                    alt={post.title}
                    style={{ objectFit: 'cover', minHeight: '220px', height: '100%' }}
                  />
                </div>
                <div className="col-md-7">
                  <div className="card-body p-4 p-lg-5 text-start">
                    <span className="badge mb-2 shadow-sm" style={{ backgroundColor: "var(--berry-blue)", color: "white" }}>{post.tag}</span>
                    <h4 className="card-title fw-bold mb-3" style={{ color: "var(--berry-cyan)" }}>{post.title}</h4>
                    <p className="card-text mb-4" style={{ opacity: 0.85 }}>{post.desc}</p>
                    <button className="btn btn-sm px-4 fw-bold shadow-sm" style={{ backgroundColor: "var(--berry-cyan)", color: "var(--midnight-blue)", borderRadius: '20px' }}>
                      Read Article <i className="fas fa-book-open ms-2"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar: Lifestyle & Seasonality */}
        <div className="col-lg-4 ps-lg-4">
          
          {/* Recent Tips Widget */}
          <div className="custom-card mb-4 border-0 shadow-sm overflow-hidden" style={{ borderRadius: '15px' }}>
            <div className="card-header py-3 px-4 text-white border-0" style={{ backgroundColor: "var(--midnight-blue)" }}>
              <h6 className="mb-0 fw-bold"><i className="fas fa-leaf me-2"></i>Healthy Recipes</h6>
            </div>
            <ul className="list-group list-group-flush text-start">
              {[
                'Summer Berry Smoothie Bowl', 
                'Roasted Mediterranean Veggies', 
                'Homemade Organic Apple Sauce'
              ].map((item, i) => (
                <li className="list-group-item bg-transparent py-3 px-4" key={i} style={{ borderColor: 'rgba(128,128,128,0.1)' }}>
                  <a href="#" className="text-decoration-none d-flex align-items-center" style={{ color: "var(--berry-cyan)" }}>
                    <i className="fas fa-chevron-right me-2 small" style={{ fontSize: '0.7rem' }}></i>
                    <span className="fw-semibold">{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Seasonal Harvest Widget */}
          <div className="custom-card border-0 shadow-sm overflow-hidden" style={{ borderRadius: '15px' }}>
            <div className="card-header py-3 px-4 text-white border-0" style={{ backgroundColor: "var(--berry-blue)" }}>
              <h6 className="mb-0 fw-bold"><i className="fas fa-calendar-alt me-2"></i>In Season: March</h6>
            </div>
            <ul className="list-group list-group-flush text-start">
              {['Strawberries', 'Fresh Spinach', 'Navel Oranges'].map((item, i) => (
                <li className="list-group-item bg-transparent py-3 px-4 d-flex justify-content-between align-items-center" key={i} style={{ borderColor: 'rgba(128,128,128,0.1)' }}>
                  <span className="fw-semibold" style={{ opacity: 0.85 }}>{item}</span>
                  <span className="badge rounded-pill shadow-sm" style={{ backgroundColor: "var(--midnight-blue)", color: "white", border: "1px solid var(--berry-cyan)" }}>Fresh</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Blog;