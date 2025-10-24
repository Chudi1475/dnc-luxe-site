class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        footer {
          background-color: #1a202c;
          color: #f7fafc;
          padding: 4rem 1rem;
        }
        
        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }
        
        .footer-logo {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
        }
        
        .footer-logo-accent {
          color: #d4a017;
          margin-right: 0.25rem;
        }
        
        .footer-description {
          color: #a0aec0;
          margin-bottom: 1.5rem;
        }
        
        .footer-heading {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
        }
        
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .footer-link {
          color: #a0aec0;
          transition: color 0.3s ease;
        }
        
        .footer-link:hover {
          color: #d4a017;
        }
        
        .social-links {
          display: flex;
          gap: 1rem;
        }
        
        .social-link {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        
        .social-link:hover {
          background-color: #d4a017;
          transform: translateY(-3px);
        }
        
        .copyright {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 2rem;
          margin-top: 3rem;
          text-align: center;
          color: #a0aec0;
        }
      </style>
      
      <footer>
        <div class="footer-container">
          <div class="footer-about">
            <div class="footer-logo">
              <span class="footer-logo-accent">DNC</span> Luxe Rentals
            </div>
            <p class="footer-description">
              Premium vehicle rentals for the discerning client. Experience luxury like never before.
            </p>
            <div class="social-links">
              <a href="#" class="social-link">
                <i data-feather="facebook"></i>
              </a>
              <a href="#" class="social-link">
                <i data-feather="twitter"></i>
              </a>
              <a href="#" class="social-link">
                <i data-feather="instagram"></i>
              </a>
              <a href="#" class="social-link">
                <i data-feather="linkedin"></i>
              </a>
            </div>
          </div>
          
          <div class="footer-links-section">
            <h3 class="footer-heading">Quick Links</h3>
            <div class="footer-links">
              <a href="/" class="footer-link">Home</a>
              <a href="#fleet" class="footer-link">Our Fleet</a>
              <a href="#services" class="footer-link">Services</a>
              <a href="#about" class="footer-link">About Us</a>
              <a href="#contact" class="footer-link">Contact</a>
            </div>
          </div>
          
          <div class="footer-contact">
            <h3 class="footer-heading">Contact Us</h3>
            <div class="footer-links">
              <a href="tel:+1234567890" class="footer-link">
                <i data-feather="phone" class="mr-2"></i> +1 (972) 218-8829
              </a>
              <a href="mailto:info@dncluxe.com" class="footer-link">
                <i data-feather="mail" class="mr-2"></i> Dncluxeauto@gmail.com
              </a>
              <a href="#" class="footer-link">
                <i data-feather="map-pin" class="mr-2"></i> 2001 Ross Ave #2800, Dallas, TX 75201
              </a>
            </div>
          </div>
        </div>
        
        <div class="copyright">
          &copy; ${new Date().getFullYear()} DNC Luxe Rentals. All rights reserved.
        </div>
      </footer>
    `;
  }
}

customElements.define('custom-footer', CustomFooter);
