/**
 * Portfolio Website - Interactive Features
 * Progressive enhancement: all functionality works without JS
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {

  // ========================================
  // Mobile Navigation Toggle
  // ========================================
  const navToggle = document.querySelector('.nav-toggle');
  const navMobile = document.querySelector('.nav-mobile');
  const navMobileLinks = document.querySelectorAll('.nav-mobile-links a');

  if (navToggle && navMobile) {
    // Toggle mobile menu on button click
    navToggle.addEventListener('click', function() {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navMobile.classList.toggle('active');
    });

    // Close menu when clicking a link
    navMobileLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        navToggle.setAttribute('aria-expanded', 'false');
        navMobile.classList.remove('active');
      });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navMobile.classList.contains('active')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMobile.classList.remove('active');
      }
    });
  }


  // ========================================
  // Smooth Scroll for Anchor Links
  // ========================================
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  const siteNav = document.querySelector('.site-nav');
  const navHeight = siteNav ? siteNav.offsetHeight : 0;

  anchorLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');

      // Skip empty hash
      if (targetId === '#' || !targetId) return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();

        // Calculate scroll position with nav offset
        const targetPosition = targetElement.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });


  // ========================================
  // Active Section Highlighting
  // ========================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (sections.length > 0 && navLinks.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id');

          // Remove active class from all nav links
          navLinks.forEach(function(link) {
            link.classList.remove('active');
          });

          // Add active class to matching nav link
          const activeLink = document.querySelector('.nav-links a[href="#' + sectionId + '"]');
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(function(section) {
      observer.observe(section);
    });
  }

});
