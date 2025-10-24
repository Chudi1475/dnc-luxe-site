class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host { display:block; }
        nav {
          position: sticky;
          top: 0;
          z-index: 50;
          padding: 0.75rem 0;
          background: linear-gradient(90deg, #454e8171 0%, #b1b1b1ff 100%);
          color: white;
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0,0,0,0.08);
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        .logo {
          display: flex;
          align-items: baseline;
          gap: .35rem;
          font-weight: 700;
          font-size: 1.5rem;
          color: #1a365d;
          text-decoration: none;
        }
        .logo-accent { color: #d4a017; }

        /* Right side group */
        .right {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-links {
          display: none;        /* mobile default */
          align-items: center;
          gap: 1.5rem;
          white-space: nowrap;
        }

        .nav-link {
          color: #4a5568;
          font-weight: 500;
          text-decoration: none;
        }
        .nav-link:hover { color: #1a365d; }

        .cta {
          background: #1a365d;
          color: #fff;
          padding: 0.5rem 1.1rem;
          border-radius: 0.4rem;
          text-decoration: none;
          font-weight: 600;
          display: inline-block;
          transform: translateY(0);
          transition: transform .2s ease, background .2s ease;
        }
        .cta:hover { background: #2c5282; transform: translateY(-2px); }

        .menu-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border: 1px solid rgba(0,0,0,0.12);
          border-radius: 0.5rem;
          background: #fff;
          cursor: pointer;
        }
        .menu-btn svg { width: 22px; height: 22px; }
        ----background-color:rgb(13, 20, 26);
        /* Mobile menu panel */
        .mobile {
          display: block;
          background: #fff;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          overflow: hidden;
          max-height: 0;
          transition: max-height .25s ease;
        }
        .mobile.open { max-height: 320px; }
        .mobile-inner {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 0.75rem 1rem 1rem;
        }
        .mobile .cta { text-align: center; }

        /* Desktop breakpoint */
        @media (min-width: 768px) {
          .menu-btn { display: none; }
          .nav-links { display: flex; }
          .mobile { display: none; }
        }
      </style>

      <nav>
        <div class="nav-container">
          <a href="/index.html" class="logo">
            <span class="logo-accent">DNC</span><span>Luxe Rentals</span>
          </a>

          <div class="right">
            <div class="nav-links">
              <a href="/index.html" class="nav-link">Home</a>
              <a href="#fleet" class="nav-link">Our Fleet</a>
              <a href="#services" class="nav-link">Services</a>
              <a href="#about" class="nav-link">About Us</a>
              <a href="#contact" class="nav-link">Contact</a>
              <a href="#contact" class="cta">Book Now</a>
            </div>

            <button class="menu-btn" aria-label="Open menu">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="mobile" aria-hidden="true">
          <div class="mobile-inner">
            <a href="/index.html" class="nav-link">Home</a>
            <a href="#fleet" class="nav-link">Our Fleet</a>
            <a href="#services" class="nav-link">Services</a>
            <a href="#about" class="nav-link">About Us</a>
            <a href="#contact" class="nav-link">Contact</a>
            <a href="#contact" class="cta">Book Now</a>
          </div>
        </div>
      </nav>
    `;

    const btn = this.shadowRoot.querySelector('.menu-btn');
    const panel = this.shadowRoot.querySelector('.mobile');
    btn.addEventListener('click', () => {
      panel.classList.toggle('open');
      const open = panel.classList.contains('open');
      panel.setAttribute('aria-hidden', String(!open));
      btn.setAttribute('aria-expanded', String(open));
    });
  }
}

customElements.define('custom-navbar', CustomNavbar);
