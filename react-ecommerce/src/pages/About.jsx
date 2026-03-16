import React from 'react';

const About = () => {
  // Theme Colors
  const berryBlue = "#0056b3";
  const midnightBlue = "#002d5b";
  const berryCyan = "#00d4ff";

  return (
    <div className="container mt-5 py-4 mb-5">
      {/* 1. Header Section */}
      <div className="text-center mb-5">
        <h2 className="display-4 fw-bold">
          About <span style={{ color: berryCyan }}>Berry</span>Store
        </h2>
        <div className="mx-auto" style={{ height: '5px', width: '80px', backgroundColor: berryCyan, borderRadius: '5px' }}></div>
      </div>

      <div className="row g-5 align-items-center">
        {/* 2. Brand Story / Image Section */}
        <div className="col-lg-6">
          <div className="position-relative">
            <img 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" 
              className="img-fluid rounded-4 shadow-lg" 
              alt="Our Store"
              style={{ border: `4px solid var(--dark-border)` }}
            />
            <div 
              className="position-absolute bottom-0 end-0 p-4 m-3 rounded-3 shadow"
              style={{ backgroundColor: berryCyan, color: midnightBlue, fontWeight: 'bold' }}
            >
              Est. 2026
            </div>
          </div>
        </div>

        {/* 3. Mission & Tech Stack */}
        <div className="col-lg-6">
          <h3 className="fw-bold mb-3" style={{ color: berryCyan }}>Our Mission</h3>
          
          {/* FIX: Set a specific color variable so it has high contrast in light mode */}
          <p className="lead mb-4 fw-medium" style={{ color: "inherit", opacity: 0.9 }}>
            We provide high-quality products with affordable prices, bridging the gap between local fresh access and modern convenience.
          </p>
          
          <h5 className="fw-bold mb-3" style={{ color: berryBlue }}>The Tech Behind the Store</h5>
          <div className="d-flex flex-wrap gap-2 mb-4">
            {['React', 'Vite', 'Bootstrap', 'NodeJS', 'PWA Ready'].map((tech) => (
              <span 
                key={tech} 
                /* FIX: Removed 'badge' class to stop white-on-white text conflict */
                className="custom-card px-3 py-2 border rounded-pill d-inline-block shadow-sm" 
                style={{ 
                  fontWeight: '700', 
                  fontSize: '0.85rem',
                  /* Ensures text is Midnight Blue in Light Mode and stays white in Dark Mode */
                  color: "inherit" 
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="p-4 rounded-4 custom-card" style={{ borderLeft: `5px solid ${berryBlue}` }}>
            <p className="fst-italic mb-0" style={{ opacity: 0.9, fontWeight: '500' }}>
              "Building the future of e-commerce with a focus on user experience and lightning-fast performance."
            </p>
          </div>
        </div>
      </div>

      {/* 4. Feature Cards */}
      <div className="row mt-5 pt-4 g-4 text-center">
        {[
          { icon: 'fa-shipping-fast', title: 'Fast Delivery', text: 'Quick and reliable shipping for all our premium products.' },
          { icon: 'fa-shield-alt', title: 'Secure Payment', text: 'Your transactions are encrypted and safe with BerryStore.' },
          { icon: 'fa-hand-holding-heart', title: 'Affordable Prices', text: 'High-quality lifestyle and tech gear without the premium markup.' }
        ].map((feature, idx) => (
           <div className="col-md-4" key={idx}>
             <div className="p-4 shadow-sm h-100 rounded-4 custom-card">
               <i className={`fas ${feature.icon} mb-3 fs-1`} style={{ color: berryCyan }}></i>
               <h5 className="fw-bold">{feature.title}</h5>
               <p className="small mb-0 fw-medium" style={{ opacity: 0.8 }}>{feature.text}</p>
             </div>
           </div>
        ))}
      </div>
    </div>
  );
};

export default About;