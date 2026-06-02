/* ================================================
   ULTIMATE FITNESS CLUB — JavaScript
   All interactive features (no backend)
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- PRELOADER ----
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 1200);
  });
  // Fallback: remove preloader after 3s even if load doesn't fire
  setTimeout(() => { preloader.classList.add('hidden'); }, 3000);


  // ---- NAVBAR SCROLL EFFECT ----
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });


  // ---- HAMBURGER MENU ----
  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
  });

  // Close mobile menu on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinksContainer.classList.remove('active');
    });
  });


  // ---- COUNTER ANIMATION ----
  const counters = document.querySelectorAll('.stat-number[data-target]');
  let countersAnimated = false;

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000;
      const start = 0;
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out curve
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * easeOut);

        counter.textContent = current.toLocaleString() + (target >= 100 ? '+' : '+');
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      };

      requestAnimationFrame(updateCounter);
    });
  };

  const statsSection = document.querySelector('.stats-bar');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          animateCounters();
        }
      });
    }, { threshold: 0.5 });
    statsObserver.observe(statsSection);
  }


  // ---- SCROLL REVEAL ANIMATIONS ----
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // ---- TESTIMONIAL SLIDER ----
  const slider = document.getElementById('testimonialSlider');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  let slideIndex = 0;

  const getVisibleCards = () => {
    const width = window.innerWidth;
    if (width <= 768) return 1;
    if (width <= 1024) return 2;
    return 3;
  };

  const updateSlider = () => {
    if (!slider) return;
    const cards = slider.querySelectorAll('.testimonial-card');
    const visible = getVisibleCards();
    const maxIndex = Math.max(0, cards.length - visible);
    slideIndex = Math.min(slideIndex, maxIndex);

    const cardWidth = cards[0].offsetWidth + 28; // 28px gap
    slider.style.transform = `translateX(-${slideIndex * cardWidth}px)`;
  };

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      slideIndex = Math.max(0, slideIndex - 1);
      updateSlider();
    });

    nextBtn.addEventListener('click', () => {
      const cards = slider.querySelectorAll('.testimonial-card');
      const visible = getVisibleCards();
      const maxIndex = Math.max(0, cards.length - visible);
      slideIndex = Math.min(maxIndex, slideIndex + 1);
      updateSlider();
    });

    window.addEventListener('resize', updateSlider);
  }


  // ---- LOGIN MODAL ----
  const loginBtn = document.getElementById('loginBtn');
  const loginModal = document.getElementById('loginModal');
  const closeModal = document.getElementById('closeModal');
  const loginForm = document.getElementById('loginForm');
  const mainSite = document.getElementById('mainSite');
  const dashboardPage = document.getElementById('dashboardPage');
  const logoutBtn = document.getElementById('logoutBtn');
  const dashLogo = document.getElementById('dashLogo');
  const whatsappFloat = document.getElementById('whatsappFloat');

  const openLogin = (e) => {
    e.preventDefault();
    loginModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLogin = () => {
    loginModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (loginBtn) loginBtn.addEventListener('click', openLogin);
  if (closeModal) closeModal.addEventListener('click', closeLogin);

  // Close on outside click
  if (loginModal) {
    loginModal.addEventListener('click', (e) => {
      if (e.target === loginModal) closeLogin();
    });
  }

  // ESC key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLogin();
  });


  // ---- LOGIN FORM (DEMO) ----
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const phone = document.getElementById('loginPhone').value;
      const password = document.getElementById('loginPassword').value;

      // Accept any credentials for demo, or show the demo note
      if (phone && password) {
        // Show dashboard
        closeLogin();
        mainSite.classList.add('hidden');
        dashboardPage.classList.add('active');
        whatsappFloat.style.display = 'none';
        navbar.style.display = 'none';
        document.body.style.overflow = '';
        window.scrollTo(0, 0);

        // Dashboard Animations (Analytics Vibe)
        setTimeout(() => {
          // Animate Macro Bars
          document.querySelectorAll('.macro-bar .fill').forEach(bar => {
            const originalWidth = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => { bar.style.width = originalWidth; }, 100);
          });

          // Animate Counter Numbers in Dashboard
          document.querySelectorAll('.dash-num').forEach(counter => {
            const targetStr = counter.getAttribute('data-target');
            const isDecimal = counter.hasAttribute('data-decimal');
            const target = parseFloat(targetStr);
            const unit = counter.querySelector('.unit') ? counter.querySelector('.unit').outerHTML : '';
            
            let start = 0;
            const duration = 1500;
            const startTime = performance.now();

            const updateDashCounter = (currentTime) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeOut = 1 - Math.pow(1 - progress, 3);
              const current = start + (target - start) * easeOut;

              const displayValue = isDecimal ? current.toFixed(1) : Math.floor(current);
              counter.innerHTML = displayValue + ' ' + unit;

              if (progress < 1) {
                requestAnimationFrame(updateDashCounter);
              } else {
                counter.innerHTML = (isDecimal ? target.toFixed(1) : target) + ' ' + unit;
              }
            };
            requestAnimationFrame(updateDashCounter);
          });
        }, 300);
      }
    });
  }


  // ---- LOGOUT ----
  const showMainSite = () => {
    dashboardPage.classList.remove('active');
    mainSite.classList.remove('hidden');
    whatsappFloat.style.display = 'flex';
    navbar.style.display = '';
    window.scrollTo(0, 0);
  };

  if (logoutBtn) logoutBtn.addEventListener('click', showMainSite);
  if (dashLogo) dashLogo.addEventListener('click', (e) => {
    e.preventDefault();
    showMainSite();
  });


  // ---- BMI CALCULATOR ----
  const calcBmiBtn = document.getElementById('calcBmi');
  if (calcBmiBtn) {
    calcBmiBtn.addEventListener('click', () => {
      const weight = parseFloat(document.getElementById('bmiWeight').value);
      const height = parseFloat(document.getElementById('bmiHeight').value);

      if (weight > 0 && height > 0) {
        const heightM = height / 100;
        const bmi = (weight / (heightM * heightM)).toFixed(1);

        let category = '';
        if (bmi < 18.5) category = 'Underweight';
        else if (bmi < 25) category = 'Normal Weight ✅';
        else if (bmi < 30) category = 'Overweight';
        else category = 'Obese';

        const resultDiv = document.getElementById('bmiResult');
        const bmiValue = document.getElementById('bmiValue');
        const bmiCategory = document.getElementById('bmiCategory');

        resultDiv.style.display = 'block';
        bmiValue.textContent = bmi;
        bmiCategory.textContent = category;
      }
    });
  }


  // ---- SMOOTH SCROLL FOR ANCHOR LINKS ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const offset = 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });


  // ---- GALLERY LIGHTBOX (Simple) ----
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;

      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed; inset: 0; z-index: 99999;
        background: rgba(0,0,0,0.92); display: flex;
        align-items: center; justify-content: center;
        cursor: pointer; animation: fadeIn 0.3s ease;
        padding: 40px;
      `;

      const bigImg = document.createElement('img');
      bigImg.src = img.src.replace('w=600', 'w=1200').replace('w=800', 'w=1200');
      bigImg.alt = img.alt;
      bigImg.style.cssText = `
        max-width: 90vw; max-height: 85vh;
        object-fit: contain; border-radius: 8px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
      `;

      const closeBtn = document.createElement('button');
      closeBtn.textContent = '✕';
      closeBtn.style.cssText = `
        position: absolute; top: 20px; right: 28px;
        background: none; border: none; color: white;
        font-size: 32px; cursor: pointer; z-index: 100000;
      `;

      overlay.appendChild(closeBtn);
      overlay.appendChild(bigImg);
      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';

      const closeLightbox = () => {
        document.body.removeChild(overlay);
        document.body.style.overflow = '';
      };

      overlay.addEventListener('click', closeLightbox);
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
      });
      document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
          closeLightbox();
          document.removeEventListener('keydown', escHandler);
        }
      });
    });
  });

});
