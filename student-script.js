// Student Platform JavaScript

// Chatbot Functions
function toggleChatbot() {
  const chatWindow = document.getElementById('chatbotWindow');
  if (chatWindow) {
    chatWindow.classList.toggle('hidden');
    
    // Focus input when opening
    if (!chatWindow.classList.contains('hidden')) {
      const input = document.getElementById('chatInput');
      if (input) input.focus();
    }
  }
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  const messagesContainer = document.getElementById('chatMessages');
  
  if (!input || !messagesContainer) return;
  
  const message = input.value.trim();
  if (!message) return;
  
  // Add user message
  const userMessage = document.createElement('div');
  userMessage.className = 'chat-message user';
  userMessage.textContent = message;
  messagesContainer.appendChild(userMessage);
  
  // Clear input
  input.value = '';
  
  // Scroll to bottom
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
  // Simulate AI response
  setTimeout(() => {
    const botMessage = document.createElement('div');
    botMessage.className = 'chat-message bot';
    
    // Simple AI responses based on keywords
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('help')) {
      botMessage.textContent = 'I can help you with courses, materials, roadmaps, and certificates. What do you need?';
    } else if (lowerMessage.includes('course')) {
      botMessage.textContent = 'You can browse all your courses in the "My Courses" section. Would you like help with a specific course?';
    } else if (lowerMessage.includes('certificate')) {
      botMessage.textContent = 'To earn certificates, complete all materials in a course. You can view your certificates in the Certificates section.';
    } else if (lowerMessage.includes('roadmap')) {
      botMessage.textContent = 'The AI Roadmap Generator creates personalized learning paths based on your goals. Have you tried it yet?';
    } else if (lowerMessage.includes('material') || lowerMessage.includes('download')) {
      botMessage.textContent = 'You can find study materials in each subject page. Just click on any course to see available resources.';
    } else {
      botMessage.textContent = 'That\'s a great question! I\'m here to help you with your studies. Feel free to ask me about courses, materials, or certificates.';
    }
    
    messagesContainer.appendChild(botMessage);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, 500);
}

function handleChatKeypress(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
}

// Notification System
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 24px;
    background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#2563EB'};
    color: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 9999;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
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

// Smooth Scrolling
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Mobile menu toggle
  const menuButton = document.querySelector('.mobile-menu-btn');
  const sidebar = document.querySelector('.sidebar');
  
  if (menuButton && sidebar) {
    menuButton.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (sidebar && sidebar.classList.contains('open')) {
      if (!sidebar.contains(e.target) && !menuButton?.contains(e.target)) {
        sidebar.classList.remove('open');
      }
    }
  });

  // Card hover effects
  document.querySelectorAll('.course-card, .material-card, .feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });

  // Progress bar animations
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target.querySelector('.progress-fill');
        if (progressBar) {
          const width = progressBar.style.width;
          progressBar.style.width = '0%';
          setTimeout(() => {
            progressBar.style.width = width;
          }, 100);
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll('.progress-bar').forEach(bar => {
    observer.observe(bar.parentElement);
  });

  // Form validation
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#ef4444';
          
          setTimeout(() => {
            field.style.borderColor = '';
          }, 2000);
        }
      });
      
      if (!isValid) {
        e.preventDefault();
        showNotification('Please fill in all required fields', 'error');
      }
    });
  });

  // Search functionality
  const searchInputs = document.querySelectorAll('input[type="search"], input[placeholder*="Search"]');
  
  searchInputs.forEach(input => {
    input.addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase();
      console.log('Searching for:', searchTerm);
      // In a real app, you would filter content here
    });
  });

  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Initialize tooltips
  document.querySelectorAll('[title]').forEach(element => {
    element.addEventListener('mouseenter', function() {
      const title = this.getAttribute('title');
      if (title) {
        const tooltip = document.createElement('div');
        tooltip.textContent = title;
        tooltip.id = 'tooltip';
        tooltip.style.cssText = `
          position: absolute;
          background: #1e3a8a;
          color: white;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 12px;
          z-index: 10000;
          pointer-events: none;
          white-space: nowrap;
        `;
        document.body.appendChild(tooltip);
        
        const rect = this.getBoundingClientRect();
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 8) + 'px';
        tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
      }
    });
    
    element.addEventListener('mouseleave', function() {
      const tooltip = document.getElementById('tooltip');
      if (tooltip) {
        document.body.removeChild(tooltip);
      }
    });
  });

  // Lazy loading for images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // Auto-save form data
  const autoSaveForms = document.querySelectorAll('[data-autosave]');
  
  autoSaveForms.forEach(form => {
    const formId = form.id || 'form';
    
    // Load saved data
    const savedData = localStorage.getItem(formId);
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        Object.keys(data).forEach(key => {
          const field = form.elements[key];
          if (field) field.value = data[key];
        });
      } catch (e) {
        console.error('Error loading form data:', e);
      }
    }
    
    // Save on input
    form.addEventListener('input', () => {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      localStorage.setItem(formId, JSON.stringify(data));
    });
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K: Open chatbot
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      toggleChatbot();
    }
    
    // Escape: Close modals/chatbot
    if (e.key === 'Escape') {
      const chatWindow = document.getElementById('chatbotWindow');
      if (chatWindow && !chatWindow.classList.contains('hidden')) {
        toggleChatbot();
      }
    }
  });

  // Button loading states
  document.querySelectorAll('button[type="submit"]').forEach(button => {
    button.addEventListener('click', function() {
      if (this.form && this.form.checkValidity()) {
        const originalText = this.innerHTML;
        this.innerHTML = '⌛ Loading...';
        this.disabled = true;
        
        setTimeout(() => {
          this.innerHTML = originalText;
          this.disabled = false;
        }, 1000);
      }
    });
  });

  // Active page highlighting
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.sidebar-nav a, .nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || href === `./${currentPath}`) {
      link.classList.add('active');
    }
  });

  // Stats counter animation
  const animateCounter = (element, target) => {
    const duration = 1000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  };

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const value = entry.target.textContent.replace(/[^0-9]/g, '');
        if (value) {
          animateCounter(entry.target, parseInt(value));
          statObserver.unobserve(entry.target);
        }
      }
    });
  });

  document.querySelectorAll('.stat-value').forEach(stat => {
    statObserver.observe(stat);
  });
});

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
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .fade-in {
    animation: fadeIn 0.3s ease;
  }
`;
document.head.appendChild(style);

// Export functions for global use
window.toggleChatbot = toggleChatbot;
window.sendMessage = sendMessage;
window.handleChatKeypress = handleChatKeypress;
window.showNotification = showNotification;

// Service Worker Registration (for PWA features)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Uncomment when you have a service worker file
    // navigator.serviceWorker.register('/sw.js');
  });
}

console.log('Student platform initialized! 📚');
