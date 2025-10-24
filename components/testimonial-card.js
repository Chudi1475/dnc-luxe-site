class TestimonialCard extends HTMLElement {
  static get observedAttributes() {
    return ['rating', 'text', 'image', 'name', 'position'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
      stars += '<i data-feather="star" class="text-yellow-400 w-4 h-4"></i>';
    }
    
    if (hasHalfStar) {
      stars += '<i data-feather="star" class="text-yellow-400 w-4 h-4"></i>';
    }
    
    return stars;
  }

  render() {
    const rating = parseFloat(this.getAttribute('rating')) || 5;
    const text = this.getAttribute('text') || 'Great service!';
    const image = this.getAttribute('image') || 'https://randomuser.me/api/portraits/men/1.jpg';
    const name = this.getAttribute('name') || 'John Doe';
    const position = this.getAttribute('position') || 'Client';

    this.shadowRoot.innerHTML = `
      <style>
        .testimonial-card {
          background-color: white;
          border-radius: 0.5rem;
          padding: 1.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        
        .testimonial-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        
        .rating {
          display: flex;
          margin-bottom: 1rem;
        }
        
        .testimonial-text {
          color: #4a5568;
          margin-bottom: 1.5rem;
          font-style: italic;
        }
        
        .client-info {
          display: flex;
          align-items: center;
        }
        
        .client-image {
          width: 3rem;
          height: 3rem;
          border-radius: 9999px;
          margin-right: 1rem;
          object-fit: cover;
        }
        
        .client-name {
          font-weight: 600;
          color: #1a202c;
        }
        
        .client-position {
          color: #718096;
          font-size: 0.875rem;
        }
      </style>
      
      <div class="testimonial-card">
        <div class="rating">
          ${this.renderStars(rating)}
        </div>
        <p class="testimonial-text">"${text}"</p>
        <div class="client-info">
          <img src="${image}" alt="${name}" class="client-image">
          <div>
            <div class="client-name">${name}</div>
            <div class="client-position">${position}</div>
          </div>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define('testimonial-card', TestimonialCard);
