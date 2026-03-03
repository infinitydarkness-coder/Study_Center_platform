// Admin Dashboard JavaScript

// Global Functions
function approveUpload(id) {
  if (confirm('Are you sure you want to approve this upload?')) {
    alert('Upload approved successfully!');
    // In a real application, you would make an API call here
  }
}

function rejectUpload(id) {
  if (confirm('Are you sure you want to reject this upload?')) {
    alert('Upload rejected successfully!');
    // In a real application, you would make an API call here
  }
}

function editCourse(name) {
  alert('Edit course: ' + name);
  // In a real application, you would open an edit modal with the course data
}

function deleteCourse(name) {
  if (confirm('Are you sure you want to delete "' + name + '"?')) {
    alert('Course deleted successfully!');
    // In a real application, you would make an API call here
  }
}

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
  // Add search functionality to all search inputs
  const searchInputs = document.querySelectorAll('.search-input');
  
  searchInputs.forEach(input => {
    input.addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase();
      console.log('Searching for:', searchTerm);
      // In a real application, you would filter the table/list based on the search term
    });
  });

  // Add filter functionality
  const filterSelects = document.querySelectorAll('select[id*="filter"]');
  
  filterSelects.forEach(select => {
    select.addEventListener('change', function(e) {
      const filterValue = e.target.value;
      console.log('Filtering by:', filterValue);
      // In a real application, you would filter the data based on the selected value
    });
  });

  // Pagination
  const paginationBtns = document.querySelectorAll('.pagination-btn');
  
  paginationBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      paginationBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button (if it's a number)
      if (!isNaN(this.textContent)) {
        this.classList.add('active');
      }
      console.log('Navigating to page:', this.textContent);
      // In a real application, you would load the appropriate page data
    });
  });

  // Toggle switches
  const toggles = document.querySelectorAll('.toggle input[type="checkbox"]');
  
  toggles.forEach(toggle => {
    toggle.addEventListener('change', function() {
      console.log('Toggle changed:', this.checked);
      // In a real application, you would save the setting
    });
  });

  // Form submissions
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      console.log('Form submitted');
      // Form handling is done by specific functions
    });
  });

  // Close modal when clicking outside
  const modalOverlays = document.querySelectorAll('.modal-overlay');
  
  modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        overlay.classList.add('hidden');
      }
    });
  });

  // Escape key to close modals
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const visibleModals = document.querySelectorAll('.modal-overlay:not(.hidden)');
      visibleModals.forEach(modal => {
        modal.classList.add('hidden');
      });
    }
  });

  // Active navigation highlighting
  const currentPage = window.location.pathname.split('/').pop() || 'admin.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Add smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Table row hover effects
  const tableRows = document.querySelectorAll('.table tbody tr');
  
  tableRows.forEach(row => {
    row.addEventListener('mouseenter', function() {
      this.style.backgroundColor = '#f9fafb';
    });
    
    row.addEventListener('mouseleave', function() {
      this.style.backgroundColor = '';
    });
  });

  // Card hover effects
  const cards = document.querySelectorAll('.card, .stat-card, .category-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
      this.style.transition = 'all 0.2s ease';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });

  // Button loading state
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Skip for modal close buttons
      if (this.type === 'button' && this.textContent.includes('Cancel')) {
        return;
      }
      
      // Add loading state
      const originalText = this.innerHTML;
      this.disabled = true;
      this.innerHTML = '⌛ Processing...';
      
      // Simulate API call
      setTimeout(() => {
        this.disabled = false;
        this.innerHTML = originalText;
      }, 500);
    });
  });

  // Auto-hide alerts/notifications
  function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 16px 24px;
      background: ${type === 'success' ? '#10b981' : '#ef4444'};
      color: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      z-index: 9999;
      animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  // Add CSS animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Make showNotification globally available
  window.showNotification = showNotification;

  // Initialize tooltips
  const tooltipElements = document.querySelectorAll('[title]');
  
  tooltipElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      const title = this.getAttribute('title');
      if (title) {
        const tooltip = document.createElement('div');
        tooltip.textContent = title;
        tooltip.style.cssText = `
          position: absolute;
          background: #1e3a8a;
          color: white;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 12px;
          white-space: nowrap;
          z-index: 9999;
          pointer-events: none;
        `;
        tooltip.id = 'custom-tooltip';
        document.body.appendChild(tooltip);
        
        const rect = this.getBoundingClientRect();
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 8) + 'px';
        tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
      }
    });
    
    element.addEventListener('mouseleave', function() {
      const tooltip = document.getElementById('custom-tooltip');
      if (tooltip) {
        document.body.removeChild(tooltip);
      }
    });
  });

  // Print statistics to console (for debugging)
  console.log('Admin Dashboard initialized');
  console.log('Current page:', currentPage);
  console.log('Navigation links:', navLinks.length);
  console.log('Interactive elements loaded');
});

// Export functions for use in HTML onclick attributes
window.approveUpload = approveUpload;
window.rejectUpload = rejectUpload;
window.editCourse = editCourse;
window.deleteCourse = deleteCourse;

// Additional utility functions
function formatDate(date) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
}

function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Dark mode toggle (optional enhancement)
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
}

// Mobile menu toggle
function toggleMobileMenu() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('mobile-open');
}

// Add mobile menu button for small screens
if (window.innerWidth <= 768) {
  const mobileMenuBtn = document.createElement('button');
  mobileMenuBtn.innerHTML = '☰';
  mobileMenuBtn.style.cssText = `
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 101;
    background: #2563EB;
    color: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    font-size: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  mobileMenuBtn.onclick = toggleMobileMenu;
  document.body.appendChild(mobileMenuBtn);
}

console.log('Admin script loaded successfully!');
