import React from 'react';

const Contact = () => {
  return (
    <div className="container py-5 mb-5">
      {/* 1. Page Header */}
      <div className="text-center mb-5">
        {/* FIX: Removed hardcoded midnightBlue color */}
        <h2 className="display-4 fw-bold">
          Get in <span style={{ color: "var(--berry-cyan)" }}>Touch</span>
        </h2>
        {/* FIX: Removed 'text-muted' and used opacity for dark mode visibility */}
        <p className="lead mb-4" style={{ opacity: 0.85 }}>
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
        <div className="mx-auto mt-3" style={{ height: '4px', width: '60px', backgroundColor: 'var(--berry-cyan)', borderRadius: '2px' }}></div>
      </div>

      <div className="row g-5">
        {/* 2. Contact Information Column */}
        <div className="col-lg-5">
          {/* FIX: Added 'custom-card' so it perfectly matches the Slate Navy theme in Dark Mode */}
          {/* Note: The inline background-color ensures it stays Midnight Blue in Light Mode! */}
          <div className="custom-card h-100 border-0 shadow-sm p-4 p-lg-5 text-white" style={{ backgroundColor: 'var(--midnight-blue)', borderRadius: '15px' }}>
            <h3 className="fw-bold mb-4">Contact Information</h3>
            
            <div className="d-flex align-items-center mb-4">
              <div className="icon-box me-3 p-3 rounded-circle d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(255,255,255,0.1)', width: '50px', height: '50px' }}>
                <i className="fas fa-phone-alt fs-5" style={{ color: "var(--berry-cyan)" }}></i>
              </div>
              <div>
                <p className="mb-0 small opacity-75">Phone</p>
                <h6 className="mb-0 fw-bold">+63 912 345 6789</h6>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4">
              <div className="icon-box me-3 p-3 rounded-circle d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(255,255,255,0.1)', width: '50px', height: '50px' }}>
                <i className="fas fa-envelope fs-5" style={{ color: "var(--berry-cyan)" }}></i>
              </div>
              <div>
                <p className="mb-0 small opacity-75">Email</p>
                <h6 className="mb-0 fw-bold">support@berrystore.com</h6>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4">
              <div className="icon-box me-3 p-3 rounded-circle d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(255,255,255,0.1)', width: '50px', height: '50px' }}>
                <i className="fas fa-map-marker-alt fs-5" style={{ color: "var(--berry-cyan)" }}></i>
              </div>
              <div>
                <p className="mb-0 small opacity-75">Location</p>
                <h6 className="mb-0 fw-bold">Navotas, Metro Manila, Philippines</h6>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-auto pt-4 border-top" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
              <div className="d-flex gap-4">
                <i className="fab fa-facebook fs-4 hover-cyan" style={{ cursor: 'pointer', transition: '0.3s' }}></i>
                <i className="fab fa-instagram fs-4 hover-cyan" style={{ cursor: 'pointer', transition: '0.3s' }}></i>
                <i className="fab fa-twitter fs-4 hover-cyan" style={{ cursor: 'pointer', transition: '0.3s' }}></i>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Redesigned Contact Form Column */}
        <div className="col-lg-7">
          {/* FIX: Swapped 'card' for 'custom-card' */}
          <div className="custom-card h-100 border-0 shadow-sm p-4 p-lg-5" style={{ borderRadius: '15px' }}>
            <form>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <label className="form-label fw-bold small text-uppercase" style={{ letterSpacing: '1px' }}>Your Name</label>
                  <div className="input-group">
                    {/* FIX: Stripped 'bg-light' and 'border-0' from inputs so app.css can style them properly */}
                    <span className="input-group-text"><i className="fas fa-user" style={{ color: "var(--berry-cyan)" }}></i></span>
                    <input type="text" className="form-control shadow-none" placeholder="John Doe" />
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <label className="form-label fw-bold small text-uppercase" style={{ letterSpacing: '1px' }}>Email Address</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="fas fa-at" style={{ color: "var(--berry-cyan)" }}></i></span>
                    <input type="email" className="form-control shadow-none" placeholder="john@example.com" />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold small text-uppercase" style={{ letterSpacing: '1px' }}>Subject</label>
                <input type="text" className="form-control shadow-none" placeholder="Product Inquiry" />
              </div>

              <div className="mb-5">
                <label className="form-label fw-bold small text-uppercase" style={{ letterSpacing: '1px' }}>Message</label>
                <textarea className="form-control shadow-none" rows="5" placeholder="How can we help you?"></textarea>
              </div>

              <button 
                type="submit" 
                className="btn w-100 shadow-sm py-3" 
                style={{ backgroundColor: "var(--berry-cyan)", color: "var(--midnight-blue)", fontWeight: 'bold', borderRadius: '12px', fontSize: '1.1rem' }}
              >
                <i className="fas fa-paper-plane me-2"></i> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;