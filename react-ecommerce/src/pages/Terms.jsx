import React from 'react';

const Terms = () => {
  // Theme Colors
  const berryBlue = "#0056b3";
  const midnightBlue = "#002d5b";
  const berryCyan = "#00d4ff";

  const sections = [
    {
      title: "1. Acceptance of Terms",
      icon: "fa-check-circle",
      content: "By accessing and using BerryStore, you agree to comply with and be bound by these Terms and Conditions and our Privacy Policy."
    },
    {
      title: "2. Product Information",
      icon: "fa-info-circle",
      content: "We strive to ensure that all product descriptions and pricing are accurate. However, we reserve the right to correct any errors and update information at any time."
    },
    {
      title: "3. Shipping & Delivery",
      icon: "fa-truck",
      content: "BerryStore offers fast and reliable shipping. Delivery times may vary based on your location. We are not responsible for delays beyond our control."
    },
    {
      title: "4. Returns & Refunds",
      icon: "fa-undo",
      content: "If you are not satisfied with your purchase, you may request a return within 7 days of delivery. Items must be in their original condition and packaging."
    }
  ];

  return (
    <div className="container mt-5 py-4 mb-5">
      {/* 1. Header Section */}
      <div className="text-center mb-5">
        {/* FIX: Removed hardcoded dark color */}
        <h2 className="display-4 fw-bold">
          Terms & <span style={{ color: berryCyan }}>Conditions</span>
        </h2>
        {/* FIX: Used opacity instead of text-muted for better visibility in Dark Mode */}
        <p style={{ opacity: 0.7 }}>Last Updated: March 2026</p>
        <div className="mx-auto" style={{ height: '5px', width: '60px', backgroundColor: berryCyan, borderRadius: '5px' }}></div>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-10">
          {/* FIX: Added 'custom-card' for slate background in Dark Mode */}
          <div className="custom-card border-0 shadow-sm p-4 p-md-5" style={{ borderRadius: '20px' }}>
            {/* FIX: Removed hardcoded midnightBlue */}
            <p className="lead text-center mb-5 fw-medium">
              Welcome to <strong>BerryStore</strong>. By using our website, you agree to follow the rules and policies outlined below.
            </p>

            <div className="row g-4">
              {sections.map((sec, index) => (
                <div className="col-md-6" key={index}>
                  {/* FIX: Removed hardcoded light-gray background and used a transparent border/background style */}
                  <div className="h-100 p-4 rounded-4" 
                       style={{ 
                         backgroundColor: 'rgba(128, 128, 128, 0.05)', 
                         borderLeft: `5px solid ${berryBlue}`,
                         border: '1px solid rgba(128, 128, 128, 0.1)',
                         borderLeftWidth: '5px'
                       }}>
                    <h5 className="fw-bold mb-3 d-flex align-items-center">
                      <i className={`fas ${sec.icon} me-2`} style={{ color: berryCyan }}></i>
                      {sec.title}
                    </h5>
                    {/* FIX: Removed text-muted for visibility */}
                    <p className="small mb-0 lh-lg" style={{ opacity: 0.85 }}>
                      {sec.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Final Contact Note */}
            <div className="mt-5 p-4 rounded-4 text-center" style={{ backgroundColor: midnightBlue, color: 'white' }}>
              <h6 className="fw-bold mb-2">Have questions about our terms?</h6>
              <p className="small mb-0 opacity-75">
                Please reach out to our legal team at <span style={{ color: berryCyan }}>legal@berrystore.com</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;