/**
 * OVIYASRI JAYAKUMAR - PORTFOLIO INTERACTIVITY & SMOOTH ENHANCEMENTS
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Footer Year
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Sticky Header Effect & Mobile Navigation
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  const handleScrollHeader = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScrollHeader, { passive: true });
  handleScrollHeader();

  // Mobile menu toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close mobile menu on nav click
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileDrawer.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeMobileMenu();
      }
    });
  }

  function openMobileMenu() {
    mobileDrawer.classList.add('open');
    mobileToggle.classList.add('open');
    mobileToggle.setAttribute('aria-expanded', 'true');
  }

  function closeMobileMenu() {
    mobileDrawer.classList.remove('open');
    mobileToggle.classList.remove('open');
    mobileToggle.setAttribute('aria-expanded', 'false');
  }

  // 3. Active Nav Link on Scroll (ScrollSpy)
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.desktop-nav .nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        desktopLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => navObserver.observe(section));

  // 4. Skills Tabs Switcher
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Update button active state
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update content active state
      tabContents.forEach(content => {
        if (content.id === `tab-${targetTab}`) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });

  // 5. Copy to Clipboard & Toast System
  const copyButtons = document.querySelectorAll('.copy-btn');
  const toast = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer;

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
        }).catch(() => {
          // Fallback for older browsers
          const textarea = document.createElement('textarea');
          textarea.value = textToCopy;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          showToast(`Copied "${textToCopy}" to clipboard!`);
        });
      }
    });
  });

  function showToast(msg) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = msg;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // 6. Smooth Scroll Reveal on Elements
  const revealElements = document.querySelectorAll('.about-card, .timeline-card, .skill-card, .soft-skill-card, .project-card, .interest-card, .contact-card');
  
  revealElements.forEach(el => el.classList.add('reveal-on-scroll'));

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => scrollObserver.observe(el));

  // 7. Live Weather API Simulation / Demonstration (Chennai Weather)
  fetchLiveChennaiWeather();

  async function fetchLiveChennaiWeather() {
    const demoBox = document.getElementById('weatherDemo');
    if (!demoBox) return;

    try {
      // Using Open-Meteo free API (no API key needed, CORS enabled)
      const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=13.0827&longitude=80.2707&current_weather=true&hourly=relativehumidity_2m');
      if (!res.ok) throw new Error('API request failed');
      const data = await res.json();
      
      if (data && data.current_weather) {
        const temp = Math.round(data.current_weather.temperature);
        const wind = data.current_weather.windspeed;
        const weatherCode = data.current_weather.weathercode;
        
        let condition = 'Clear Sky';
        let iconClass = 'fa-sun';
        
        if (weatherCode >= 1 && weatherCode <= 3) {
          condition = 'Partly Cloudy';
          iconClass = 'fa-cloud-sun';
        } else if (weatherCode >= 45 && weatherCode <= 48) {
          condition = 'Foggy';
          iconClass = 'fa-smog';
        } else if (weatherCode >= 51 && weatherCode <= 67) {
          condition = 'Rain Showers';
          iconClass = 'fa-cloud-showers-heavy';
        } else if (weatherCode >= 80) {
          condition = 'Passing Showers';
          iconClass = 'fa-cloud-rain';
        }

        const tempNumEl = demoBox.querySelector('.temp-num');
        const tempCondEl = demoBox.querySelector('.temp-condition');
        const statsEl = demoBox.querySelector('.weather-stats');

        if (tempNumEl) tempNumEl.textContent = `${temp}°C`;
        if (tempCondEl) {
          tempCondEl.innerHTML = `<i class="fa-solid ${iconClass} weather-icon-sun"></i> ${condition}`;
        }
        if (statsEl) {
          statsEl.innerHTML = `<span>Wind: ${wind} km/h</span><span>Status: Live API Sync</span>`;
        }
      }
    } catch (err) {
      // Keep elegant fallback values if offline or blocked
      console.log('Weather demo running with default cached response:', err);
    }
  }

  // 8. Subtle 3D Card Hover Perspective Effect (Desktop only)
  if (window.matchMedia('(min-width: 992px)').matches) {
    const cards = document.querySelectorAll('.project-card, .profile-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateX = -(y / rect.height) * 6;
        const rotateY = (x / rect.width) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
});
