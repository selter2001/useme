// validation.js — Inline form validation with constructive error messages
// Validates on blur (not input) to avoid premature error display

(function() {
  'use strict';

  // Validation patterns
  const validation = {
    email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address (e.g. john@company.com)'
    },
    required: {
      test: (value) => value.trim().length > 0,
      message: 'This field is required'
    },
    minLength: (min) => ({
      test: (value) => value.trim().length >= min,
      message: `Please enter at least ${min} characters`
    })
  };

  /**
   * Validates a single form field
   * @param {HTMLElement} field - Input or textarea element to validate
   * @returns {boolean} - True if field is valid, false otherwise
   */
  function validateField(field) {
    const errorId = field.getAttribute('aria-describedby');
    const errorSpan = errorId ? document.getElementById(errorId) : null;
    const value = field.value;
    let errorMessage = '';

    // Check required
    if (field.hasAttribute('required')) {
      if (!validation.required.test(value)) {
        errorMessage = validation.required.message;
      }
    }

    // Check email format (if no error yet and field is email type)
    if (!errorMessage && field.type === 'email' && value.trim().length > 0) {
      if (!validation.email.pattern.test(value)) {
        errorMessage = validation.email.message;
      }
    }

    // Check minLength (if no error yet and data-minlength is set)
    if (!errorMessage && field.hasAttribute('data-minlength')) {
      const minLength = parseInt(field.getAttribute('data-minlength'), 10);
      const minLengthValidation = validation.minLength(minLength);
      if (value.trim().length > 0 && !minLengthValidation.test(value)) {
        errorMessage = minLengthValidation.message;
      }
    }

    // Update field state
    if (errorMessage) {
      field.setAttribute('aria-invalid', 'true');
      field.classList.add('input-error');
      if (errorSpan) {
        errorSpan.textContent = errorMessage;
      }
      return false;
    } else {
      field.setAttribute('aria-invalid', 'false');
      field.classList.remove('input-error');
      if (errorSpan) {
        errorSpan.textContent = '';
      }
      return true;
    }
  }

  /**
   * Validates all fields in a form
   * @param {HTMLFormElement} form - Form element to validate
   * @returns {boolean} - True if all fields are valid, false otherwise
   */
  function validateAllFields(form) {
    const fields = form.querySelectorAll('input, textarea');
    let isValid = true;
    let firstInvalidField = null;

    fields.forEach(field => {
      const fieldValid = validateField(field);
      if (!fieldValid) {
        isValid = false;
        if (!firstInvalidField) {
          firstInvalidField = field;
        }
      }
    });

    // Focus first invalid field
    if (!isValid && firstInvalidField) {
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) {
        firstInvalid.focus();
      }
    }

    return isValid;
  }

  // Attach blur listeners on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const fields = form.querySelectorAll('input, textarea');
    fields.forEach(field => {
      field.addEventListener('blur', function() {
        validateField(field);
      });
    });
  });

  // Export for use by emailjs-form.js
  window.FormValidation = {
    validateField: validateField,
    validateAllFields: validateAllFields
  };

})();
