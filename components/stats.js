class CustomStats extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .stats-section {
          background-color: #1a202c;
          color: white;
          padding: 4rem 1rem;
        }
        
        .stats-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          text-align: center;
        }
        
        .stat-item {
          padding: 1.5rem;
        }
        
        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          font-family: serif;
        }
        
        .stat-label {
          color: #737475ff;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        @media (max-width: 640px) {
          .stats-container {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      </style>
      
      <section class="stats-section">
        <div class="stats-container">
          <div class="stat-item">
            <div class="stat-number">15+</div>
            <div class="stat-label">Premium Vehicles</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">99%</div>
            <div class="stat-label">Client Satisfaction</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">24/7</div>
            <div class="stat-label">Support Available</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">5+</div>
            <div class="stat-label">Years Experience</div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('custom-stats', CustomStats);