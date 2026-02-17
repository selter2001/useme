// emailjs-form.js — EmailJS form submission handler
// Requires: emailjs SDK loaded, validation.js loaded before this script

(function() {
  'use strict';

  // Initialize EmailJS with public key
  // TODO: Replace YOUR_PUBLIC_KEY with your actual EmailJS public key
  // Get it from: EmailJS Dashboard -> Account -> General -> Public Key
  emailjs.init({
    publicKey: "YOUR_PUBLIC_KEY"
  });

  // Form submission handler
  document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const statusDiv = document.querySelector('.form-status');
    const submitButton = form.querySelector('button[type="submit"]');
    const buttonText = submitButton.querySelector('.button-text');
    const buttonLoading = submitButton.querySelector('.button-loading');

    form.addEventListener('submit', function(event) {
      // CRITICAL: Prevent default form submission first
      event.preventDefault();

      // Validate all fields before submission
      if (!window.FormValidation.validateAllFields(form)) {
        statusDiv.textContent = 'Please fix the errors in the form';
        statusDiv.className = 'form-status error';
        return;
      }

      // Show loading state
      submitButton.disabled = true;
      buttonText.style.display = 'none';
      buttonLoading.style.display = 'inline';
      statusDiv.className = 'form-status';
      statusDiv.textContent = '';

      // TODO: Replace YOUR_SERVICE_ID with your EmailJS Service ID
      // Get it from: EmailJS Dashboard -> Email Services
      // TODO: Replace YOUR_TEMPLATE_ID with your EmailJS Template ID
      // Get it from: EmailJS Dashboard -> Email Templates
      // Template must include variables: {{user_name}}, {{user_email}}, {{message}}
      emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)
        .then(function(response) {
          // Success
          statusDiv.textContent = 'Message sent! I\'ll get back to you within 24 hours.';
          statusDiv.className = 'form-status success';
          form.reset();

          // Reset all field states
          const fields = form.querySelectorAll('input, textarea');
          fields.forEach(field => {
            field.setAttribute('aria-invalid', 'false');
            field.classList.remove('input-error');
            const errorId = field.getAttribute('aria-describedby');
            if (errorId) {
              const errorSpan = document.getElementById(errorId);
              if (errorSpan) {
                errorSpan.textContent = '';
              }
            }
          });

          // Reset button state
          submitButton.disabled = false;
          buttonText.style.display = 'inline';
          buttonLoading.style.display = 'none';
        })
        .catch(function(error) {
          // Error
          console.error('EmailJS Error:', error);
          statusDiv.textContent = 'Failed to send the message. Please try again or email me directly.';
          statusDiv.className = 'form-status error';

          // Reset button state
          submitButton.disabled = false;
          buttonText.style.display = 'inline';
          buttonLoading.style.display = 'none';
        });
    });
  });

})();
