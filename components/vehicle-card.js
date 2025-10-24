class VehicleCard extends HTMLElement {
  static get observedAttributes() {
    return ['image', 'title', 'type', 'passengers', 'price', 'badge', 'badge-color'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  render() {
    const image = this.getAttribute('image') || 'https://images.unsplash.com/photo-1494972308805-463bc619d34e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80';
    const title = this.getAttribute('title') || 'Premium Vehicle';
    const type = this.getAttribute('type') || 'Luxury';
    const passengers = this.getAttribute('passengers') || '4';
    const price = this.getAttribute('price') || '$299/day';
    const badge = this.getAttribute('badge');
    const badgeColor = this.getAttribute('badge-color') || 'primary';

    this.shadowRoot.innerHTML = `
      <style>
        .vehicle-card {
          background-color: white;
          border-radius: 0.5rem;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        
        .vehicle-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        
        .vehicle-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        
        .vehicle-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .vehicle-card:hover .vehicle-image img {
          transform: scale(1.05);
        }
        
        .badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          color: white;
        }
        
        .badge-primary {
          background-color: #1a365d;
        }
        
        .badge-accent {
          background-color: #d4a017;
        }
        
        .vehicle-details {
          padding: 1.5rem;
        }
        
        .vehicle-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #1a202c;
        }
        
        .vehicle-specs {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          color: #4a5568;
          font-size: 0.875rem;
        }
        
        .spec-item {
          display: flex;
          align-items: center;
        }
        
        .spec-item i {
          margin-right: 0.25rem;
          width: 16px;
          height: 16px;
        }
        
        .vehicle-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .vehicle-price {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1a365d;
        }
        
        .vehicle-link {
          color: #1a365d;
          font-weight: 500;
          transition: color 0.3s ease;
        }
        
        .vehicle-link:hover {
          color: #2c5282;
        }
      </style>
      
      <div class="vehicle-card">
        <div class="vehicle-image">
          <img src="${image}" alt="${title}">
          ${badge ? `<div class="badge badge-${badgeColor}">${badge}</div>` : ''}
        </div>
        <div class="vehicle-details">
          <h3 class="vehicle-title">${title}</h3>
          <div class="vehicle-specs">
            <div class="spec-item">
              <i data-feather="users"></i> ${passengers} Passengers
            </div>
            <div class="spec-item">
              <i data-feather="car"></i> ${type}
            </div>
          </div>
          <div class="vehicle-footer">
            <span class="vehicle-price">${price}</span>
            <a href="#" class="vehicle-link">View Details</a>
          </div>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define('vehicle-card', VehicleCard);