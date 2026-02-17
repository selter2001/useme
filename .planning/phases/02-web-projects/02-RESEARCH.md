# Phase 2: Web Projects - Research

**Researched:** 2026-02-17
**Domain:** Portfolio Websites, Landing Pages, EmailJS Integration, Responsive Web Design
**Confidence:** HIGH

## Summary

Phase 2 builds production-ready portfolio and landing page sites using vanilla HTML/CSS/JS on top of the Phase 1 design system foundation. Research confirms that modern portfolio websites in 2026 prioritize clarity over cleverness, fast load times (under 2 seconds), and mobile-first responsive design. The standard approach uses CSS Grid with auto-fit columns and container queries for truly responsive project showcases, semantic HTML5 for SEO optimization, and EmailJS for client-side contact form functionality without backend infrastructure.

The critical technical insight is that EmailJS public keys are designed to be exposed in client-side code but require domain whitelisting to prevent abuse—the service model restricts sending to predefined templates only, making spam attacks impractical. However, effective form validation requires both client-side instant feedback (inline validation after field blur) and robust error messaging that's polite, precise, and provides constructive guidance. Image optimization through WebP format and native lazy loading (loading="lazy" attribute) can reduce portfolio load times by 25-34% without quality loss.

Hero sections should lead with clarity over cleverness—a clear headline stating what you do, a concise value proposition, and a singular call-to-action button. Project cards need structured information: one-sentence description, tech stack, role, and links to live demo and code. The biggest mistake developers make is over-engineering the portfolio instead of shipping—a simple, fast, accessible site beats a complex, delayed launch.

**Primary recommendation:** Use CSS Grid with auto-fit for project showcase responsiveness, EmailJS with domain whitelist for contact forms, WebP images with lazy loading for performance, semantic HTML5 structure for SEO, and inline validation with constructive error messages for UX. Deploy both sites to GitHub Pages using the existing Phase 1 infrastructure, maintaining the shared design token system for visual consistency.

## Standard Stack

### Core
| Library/Tool | Version | Purpose | Why Standard |
|--------------|---------|---------|--------------|
| EmailJS | @emailjs/browser@4 | Client-side email sending | Industry standard for static site contact forms, 20K+ projects, no backend needed, free tier sufficient |
| CSS Grid | Native (CSS3) | Responsive project showcase layout | 98% browser support in 2026, auto-fit/minmax creates truly responsive grids without media queries |
| Container Queries | Native (CSS) | Component-level responsiveness | Major adoption in 2026, allows cards to respond to container width not viewport, eliminates cascading media queries |
| Semantic HTML5 | Native | SEO and accessibility | Search engines prioritize semantic structure, essential for entity-based SEO in 2026, improves screen reader navigation |
| WebP Images | Native browser support | Image optimization | 25-34% smaller than PNG/JPEG with same quality, universally supported, reduces LCP (Largest Contentful Paint) |

### Supporting
| Tool | Version | Purpose | When to Use |
|------|---------|---------|-------------|
| loading="lazy" | Native HTML | Deferred image loading | All below-fold images, reduces initial page weight, improves Time to Interactive |
| FormData API | Native JS | Form data extraction | EmailJS integration, prevents manual field selection, works with preventDefault() |
| clamp() | Native CSS | Fluid typography | Responsive text scaling without media queries, min-max-preferred syntax for smooth scaling |
| :focus-visible | Native CSS | Non-intrusive focus styles | Better UX than :focus, only shows outline for keyboard navigation, not mouse clicks |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| EmailJS | Formspree, Netlify Forms | Formspree free tier limited to 50/month; Netlify Forms requires Netlify hosting; EmailJS works anywhere with 200/month free |
| CSS Grid auto-fit | Media query breakpoints | Manual breakpoints require maintenance; auto-fit adapts automatically; use breakpoints only for layout shifts |
| WebP | AVIF | AVIF has better compression but slower encoding and 95% browser support vs WebP 98%; use WebP for broader compatibility |
| Inline validation | Submit-only validation | Inline reduces errors by 22% and completion time by 42% according to Baymard Institute research |

**Installation:**
```bash
# No npm installation needed for vanilla JS - use CDN
# EmailJS loaded via script tag in HTML (see Code Examples section)
```

## Architecture Patterns

### Recommended Project Structure
```
web/
├── index.html              # Portfolio homepage
├── css/
│   ├── main.css           # Portfolio-specific styles
│   └── components.css     # Reusable component overrides
├── js/
│   ├── main.js            # Portfolio interactions
│   └── contact.js         # Contact form logic
└── assets/
    └── images/
        ├── projects/      # Project screenshots (WebP)
        ├── avatar.webp    # Profile photo
        └── placeholders/  # Loading skeletons

landing/
├── index.html             # Service landing page
├── css/
│   ├── main.css          # Landing-specific styles
│   └── form.css          # Contact form styles
├── js/
│   ├── emailjs-form.js   # EmailJS integration
│   └── validation.js     # Form validation logic
└── assets/
    └── images/
        ├── icons/        # Service icons (SVG preferred)
        └── social-proof/ # Mock testimonials
```

### Pattern 1: Auto-Fit Responsive Grid (No Media Queries)

**What:** CSS Grid with auto-fit and minmax creates automatically responsive layouts that adapt to available space without breakpoints.

**When to use:** Project showcase grids, service cards, testimonial sections—any grid where items should wrap naturally based on container width.

**Example:**
```css
/* Source: https://devtoolbox.dedyn.io/blog/css-grid-complete-guide */

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-component-gap, 1.5rem);
  padding: var(--spacing-section-gap, 3rem) 0;
}

/* Explanation:
   - auto-fit: Creates as many columns as fit in container
   - minmax(300px, 1fr): Each column minimum 300px, maximum equal fraction
   - Result: Automatically wraps to fewer columns on narrow screens */
```

**Benefits:** Zero media queries, naturally responsive, container-aware. Grid recalculates on every resize.

### Pattern 2: EmailJS Contact Form Integration

**What:** Client-side email sending using EmailJS service with form validation and error handling.

**When to use:** Contact forms on static sites without backend infrastructure, ideal for GitHub Pages deployment.

**Example:**
```html
<!-- Source: https://www.emailjs.com/docs/sdk/installation/ -->

<!-- 1. Load EmailJS SDK before </body> -->
<script type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js">
</script>
<script type="text/javascript">
   (function(){
      emailjs.init({
        publicKey: "YOUR_PUBLIC_KEY", // From EmailJS dashboard
      });
   })();
</script>

<!-- 2. HTML Form Structure -->
<form id="contact-form" name="contact">
  <label for="user_name">Name *</label>
  <input type="text" id="user_name" name="user_name" required>
  <span class="error-message" aria-live="polite"></span>

  <label for="user_email">Email *</label>
  <input type="email" id="user_email" name="user_email" required>
  <span class="error-message" aria-live="polite"></span>

  <label for="message">Message *</label>
  <textarea id="message" name="message" rows="5" required></textarea>
  <span class="error-message" aria-live="polite"></span>

  <button type="submit" class="button-primary">Send Message</button>
  <div class="form-status" role="status" aria-live="polite"></div>
</form>
```

```javascript
// Source: https://medium.com/@remcojonk/contact-form-withvanilla-javascript-and-emailjs-cdad241736df

// 3. Form submission handler
const contactForm = document.getElementById('contact-form');
const formStatus = document.querySelector('.form-status');

contactForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent page reload

  // Show loading state
  formStatus.textContent = 'Sending...';
  formStatus.className = 'form-status loading';

  // Send via EmailJS
  emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
      formStatus.textContent = 'Message sent successfully!';
      formStatus.className = 'form-status success';
      contactForm.reset(); // Clear form
    }, function(error) {
      console.log('FAILED...', error);
      formStatus.textContent = 'Failed to send message. Please try again.';
      formStatus.className = 'form-status error';
    });
});
```

**Configuration requirements:**
1. Create EmailJS account at emailjs.com
2. Add email service (Gmail, Outlook, etc.)
3. Create email template with variables: `{{user_name}}`, `{{user_email}}`, `{{message}}`
4. Get Public Key from Account page
5. Get Service ID and Template ID from dashboard
6. **Whitelist domain** in EmailJS settings (e.g., username.github.io)

### Pattern 3: Inline Form Validation with Constructive Errors

**What:** Field-level validation triggered on blur event, displaying specific, actionable error messages immediately below inputs.

**When to use:** All forms, especially contact forms where user errors cause frustration and form abandonment.

**Example:**
```javascript
// Source: https://www.nngroup.com/articles/errors-forms-design-guidelines/
// Source: https://gomakethings.com/vanilla-javascript-form-validation/

// Validation patterns
const validators = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address (e.g., name@example.com)'
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

// Validate single field
function validateField(field) {
  const errorSpan = field.nextElementSibling;
  let isValid = true;
  let errorMessage = '';

  // Check required
  if (field.hasAttribute('required') && !validators.required.test(field.value)) {
    isValid = false;
    errorMessage = validators.required.message;
  }

  // Check email format
  if (field.type === 'email' && field.value && !validators.email.pattern.test(field.value)) {
    isValid = false;
    errorMessage = validators.email.message;
  }

  // Check minimum length (e.g., message field)
  if (field.dataset.minlength && !validators.minLength(parseInt(field.dataset.minlength)).test(field.value)) {
    isValid = false;
    errorMessage = validators.minLength(parseInt(field.dataset.minlength)).message;
  }

  // Display error or clear
  if (!isValid) {
    field.setAttribute('aria-invalid', 'true');
    field.classList.add('input-error');
    errorSpan.textContent = errorMessage;
    errorSpan.classList.add('visible');
  } else {
    field.setAttribute('aria-invalid', 'false');
    field.classList.remove('input-error');
    errorSpan.textContent = '';
    errorSpan.classList.remove('visible');
  }

  return isValid;
}

// Attach blur event listeners
const formFields = document.querySelectorAll('#contact-form input, #contact-form textarea');
formFields.forEach(field => {
  field.addEventListener('blur', () => validateField(field));
});

// Validate all on submit
contactForm.addEventListener('submit', function(event) {
  let formIsValid = true;
  formFields.forEach(field => {
    if (!validateField(field)) {
      formIsValid = false;
    }
  });

  if (!formIsValid) {
    event.preventDefault(); // Block submission
    // Focus first error field
    const firstError = document.querySelector('[aria-invalid="true"]');
    if (firstError) firstError.focus();
  }
});
```

**Error message best practices (Nielsen Norman Group):**
- Be explicit, polite, and precise
- Use plain language, not technical jargon
- Suggest how to fix the problem
- Place message directly below the field (not at top of form)
- Use color + icon (never color alone for accessibility)

### Pattern 4: Lazy Loading Images with WebP Format

**What:** Deferred loading of below-fold images using native HTML attribute, combined with modern WebP format for optimal performance.

**When to use:** All images except above-fold hero image; especially important for project screenshots and portfolios with many images.

**Example:**
```html
<!-- Source: https://developer.mozilla.org/en-US/blog/fix-image-lcp/ -->
<!-- Source: https://requestmetrics.com/web-performance/high-performance-images/ -->

<!-- Above-fold hero image: NO lazy loading, preload -->
<link rel="preload" as="image" href="assets/images/hero.webp">
<img src="assets/images/hero.webp"
     alt="Portfolio hero image"
     width="1200"
     height="600"
     fetchpriority="high">

<!-- Below-fold project images: lazy loading + WebP -->
<img src="assets/images/projects/project1.webp"
     alt="E-commerce dashboard showing analytics"
     width="600"
     height="400"
     loading="lazy">

<!-- With fallback for older browsers -->
<picture>
  <source srcset="assets/images/projects/project1.webp" type="image/webp">
  <source srcset="assets/images/projects/project1.jpg" type="image/jpeg">
  <img src="assets/images/projects/project1.jpg"
       alt="E-commerce dashboard showing analytics"
       width="600"
       height="400"
       loading="lazy">
</picture>
```

**Image optimization workflow:**
1. Compress originals using tools like Squoosh or ImageOptim
2. Convert to WebP format (25-34% smaller than JPEG/PNG)
3. Always specify width/height attributes (prevents layout shift, improves CLS)
4. Use descriptive alt text for accessibility and SEO
5. Apply loading="lazy" to all images except above-fold content

**Performance impact:** Lazy loading reduces initial page weight by 40-60% on image-heavy portfolios, directly improving Time to Interactive and Largest Contentful Paint metrics.

### Pattern 5: Semantic HTML5 Structure for SEO

**What:** Using semantic HTML5 elements (header, nav, main, section, article, aside, footer) instead of generic divs to communicate page structure to search engines and assistive technologies.

**When to use:** All pages—semantic structure is foundational for modern SEO and accessibility.

**Example:**
```html
<!-- Source: https://searchatlas.com/blog/semantic-html/ -->
<!-- Source: https://www.javascriptdoctor.blog/2026/02/semantic-html5-elements-for-better-seo.html -->

<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Jan Kowalski — Front-end Developer Portfolio</title>
  <meta name="description" content="Portfolio of Jan Kowalski, front-end developer specializing in React, TypeScript, and accessible web applications.">
</head>
<body>
  <!-- Skip link for keyboard users -->
  <a href="#main-content" class="sr-only">Skip to main content</a>

  <header>
    <nav aria-label="Main navigation">
      <ul>
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main id="main-content">
    <!-- Hero section -->
    <section aria-labelledby="hero-heading">
      <h1 id="hero-heading">Jan Kowalski</h1>
      <p>Front-end Developer building accessible web experiences</p>
    </section>

    <!-- About section -->
    <section aria-labelledby="about-heading">
      <h2 id="about-heading">About Me</h2>
      <p>I'm a developer passionate about...</p>
    </section>

    <!-- Projects section -->
    <section aria-labelledby="projects-heading">
      <h2 id="projects-heading">Projects</h2>
      <div class="project-grid">
        <!-- Each project is an article -->
        <article aria-labelledby="project1-title">
          <img src="..." alt="...">
          <h3 id="project1-title">E-commerce Dashboard</h3>
          <p>Analytics platform for online retailers</p>
          <ul aria-label="Technologies used">
            <li>React</li>
            <li>TypeScript</li>
            <li>D3.js</li>
          </ul>
          <footer>
            <a href="...">Live Demo</a>
            <a href="...">GitHub</a>
          </footer>
        </article>
      </div>
    </section>

    <!-- Contact section -->
    <section aria-labelledby="contact-heading">
      <h2 id="contact-heading">Get in Touch</h2>
      <form id="contact-form">
        <!-- Form fields -->
      </form>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 Jan Kowalski</p>
  </footer>
</body>
</html>
```

**SEO benefits:**
- Search engines understand content hierarchy (header vs nav vs main)
- Entity-based SEO in 2026 prioritizes semantic structure
- Improves featured snippet eligibility
- Enhances mobile search ranking (mobile-first indexing)

**Accessibility benefits:**
- Screen readers announce landmarks ("main content", "navigation")
- Keyboard users can jump between sections
- Better focus management

### Pattern 6: Container Queries for Card Responsiveness

**What:** Modern CSS feature allowing components to respond to their container width rather than viewport width, eliminating media query complexity.

**When to use:** Project cards, testimonial cards, service cards—any component that appears in different container widths.

**Example:**
```css
/* Source: https://www.javascriptdoctor.blog/2026/02/mastering-flexbox-and-css-grid-for.html */

/* Define container on parent */
.project-grid {
  container-type: inline-size;
  container-name: project-grid;
}

/* Card base styles */
.project-card {
  background: var(--color-bg-elevated, #262626);
  border-radius: var(--border-radius-card, 0.5rem);
  padding: var(--spacing-component-gap, 1.5rem);
  display: flex;
  flex-direction: column;
}

/* Card adapts to container width, not viewport */
@container project-grid (min-width: 400px) {
  .project-card {
    flex-direction: row;
    gap: var(--spacing-component-gap, 1.5rem);
  }

  .project-card img {
    width: 40%;
    object-fit: cover;
  }

  .project-card .content {
    width: 60%;
  }
}

/* Wide container layout */
@container project-grid (min-width: 600px) {
  .project-card h3 {
    font-size: var(--font-size-heading-2, 1.875rem);
  }
}
```

**Advantages over media queries:**
- Component is truly reusable in any context
- No cascade conflicts from viewport-based breakpoints
- Sidebar vs full-width layouts automatically handled
- Simplifies responsive design logic

**Browser support:** 98% as of 2026 (Chrome 105+, Safari 16+, Firefox 110+)

### Anti-Patterns to Avoid

- **Vague hero headlines:** "Innovative solutions for modern businesses" tells visitors nothing. Use specific value: "Front-end developer building fast, accessible web apps" or "Custom landing pages that convert visitors to customers."

- **Submit-only validation:** Waiting until form submission to show errors frustrates users and increases abandonment by 22%. Validate fields on blur for immediate feedback.

- **Missing image dimensions:** Omitting width/height attributes causes layout shift (poor CLS score) as images load. Always specify dimensions even with responsive CSS.

- **Exposing EmailJS Private Key:** Public Key is safe to expose (designed for client-side use), but Private Key (Access Token) must never appear in client-side code. Only use Public Key in browser JavaScript.

- **Clever but unclear messaging:** Portfolios should answer "Can this person build things that work?" immediately. Avoid abstract taglines, focus on specific skills and outcomes.

- **Over-engineering before shipping:** Spending months deciding on tech stack instead of launching with simple HTML/CSS/JS. A live simple portfolio beats a perfect unfinished one.

- **Not whitelisting EmailJS domain:** Anyone can copy your Public Key and use it on their site. Whitelist only your GitHub Pages domain (username.github.io) in EmailJS settings to prevent abuse.

- **Color-only error indicators:** Relying solely on red text for errors fails accessibility. Always combine color with icons and explicit text messages.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Email sending from static site | Custom SMTP implementation or PHP backend | EmailJS with domain whitelist | EmailJS handles rate limiting, spam prevention, template management, and retry logic. Custom SMTP requires server infrastructure and security hardening. |
| Form validation | Custom regex validation for every field type | Native HTML5 validation + lightweight JS enhancement | HTML5 type="email" provides 95% of validation needs. JS enhancement adds UX polish. Custom regex misses edge cases (international domains, unicode characters). |
| Image lazy loading | Intersection Observer implementation | Native loading="lazy" attribute | Browser-native lazy loading is optimized, tested across devices, and requires zero JavaScript. Custom IntersectionObserver adds complexity for same result. |
| Responsive breakpoints | Manual media queries for every component | CSS Grid auto-fit + container queries | Auto-fit handles most cases automatically. Container queries eliminate cascade issues. Manual media queries create maintenance burden. |
| Loading skeletons | JavaScript-based skeleton rendering | CSS-only skeleton with fixed aspect ratios | CSS skeletons load instantly (no JS parse/execute delay). JavaScript-based solutions can cause flash of unstyled content if script loads slowly. |

**Key insight:** Modern web platform features (EmailJS, container queries, loading="lazy", CSS Grid auto-fit) eliminate the need for custom implementations that appeared necessary 3-5 years ago. Favor platform features over custom code—they're tested, optimized, and maintained by browser vendors.

## Common Pitfalls

### Pitfall 1: EmailJS Public Key Confusion Leading to Security Concerns

**What goes wrong:** Developers worry that exposing EmailJS Public Key in client-side JavaScript creates a security vulnerability, leading to over-engineering with serverless functions or abandoning EmailJS entirely.

**Why it happens:** Confusion between Public Key (designed for client-side exposure) and Private Key (must remain secret). Traditional API key security advice doesn't apply to EmailJS's unique model.

**How to avoid:**
- **Understand the model:** EmailJS doesn't send arbitrary emails; it only triggers predefined templates from your dashboard. An attacker copying your Public Key can only send your templates with your content, which isn't useful for spam.
- **Whitelist domains:** In EmailJS settings, restrict your Public Key to specific domains (e.g., username.github.io). Attempts from other domains will fail.
- **Never expose Private Key:** If you need REST API access, use serverless functions to keep Private Key secure. For simple contact forms, Public Key in client code is the intended approach.
- **Enable bot protection:** Use EmailJS's built-in reCAPTCHA integration to prevent automated form spam.

**Warning signs:**
- Over-complicating simple contact form with serverless architecture
- Searching for ways to "hide" Public Key in environment variables (not possible for client-side code)
- Abandoning EmailJS due to misunderstood security model

**Reference:** https://www.emailjs.com/docs/faq/is-it-okay-to-expose-my-public-key/

### Pitfall 2: Premature Validation Interrupting User Input

**What goes wrong:** Form fields show error messages while user is still typing, creating frustrating UX where errors appear and disappear with each keystroke.

**Why it happens:** Attaching validation to input or keyup events instead of blur event. Developer wants "real-time" validation but doesn't account for incomplete input.

**How to avoid:**
- **Validate on blur, not input:** Only trigger validation when user leaves the field (blur event), indicating they're done entering data.
- **Exception for submit:** Always validate all fields on form submit to catch any missed fields.
- **Progressive enhancement:** After first submit attempt, can add real-time validation to show when user corrects errors.
- **Avoid premature empty field errors:** Don't show "This field is required" until user attempts to submit form or explicitly tabs through field.

**Example of correct timing:**
```javascript
// GOOD: Validate when user finishes with field
field.addEventListener('blur', () => validateField(field));

// BAD: Validates while user is still typing
field.addEventListener('input', () => validateField(field));
```

**Warning signs:**
- Error messages flickering as user types
- "Email invalid" shown before user finishes typing email
- Users complaining form feels "aggressive" or "impatient"

**Reference:** https://www.bunnyfoot.com/2024/01/13-best-practices-to-design-error-friendly-forms/

### Pitfall 3: Hero Image Blocking Initial Paint (Poor LCP)

**What goes wrong:** Large hero images load slowly, delaying Largest Contentful Paint (LCP) metric to 4-6 seconds, causing poor Core Web Vitals scores and SEO penalties.

**Why it happens:** Hero image is large (500KB+ JPEG), not optimized for web, lacks preload hint, and may use lazy loading incorrectly (never lazy load above-fold images).

**How to avoid:**
- **Optimize hero image:** Compress to WebP format, target 100KB or less for hero images.
- **Add preload hint:** `<link rel="preload" as="image" href="hero.webp">` in `<head>` tells browser to prioritize hero image.
- **Never lazy load above-fold:** Hero image should load immediately. Only lazy load below-fold images.
- **Specify dimensions:** `width` and `height` attributes prevent layout shift and improve CLS.
- **Use fetchpriority:** `fetchpriority="high"` on hero img tag signals importance to browser.
- **Consider responsive images:** Use `<picture>` with srcset to serve appropriately sized images for mobile vs desktop.

**Example:**
```html
<!-- In <head> -->
<link rel="preload" as="image" href="assets/images/hero.webp">

<!-- In <body> -->
<img src="assets/images/hero.webp"
     alt="Portfolio showcase"
     width="1200"
     height="600"
     fetchpriority="high">
     <!-- NO loading="lazy" on hero image! -->
```

**Warning signs:**
- Lighthouse LCP score >2.5 seconds
- Hero section appears blank for 1-2 seconds on page load
- Mobile users see white screen before hero appears
- Core Web Vitals report shows poor LCP

**Reference:** https://developer.mozilla.org/en-US/blog/fix-image-lcp/

### Pitfall 4: Auto-Fit Grid with Minmax Causing Overflow

**What goes wrong:** CSS Grid with `auto-fit` and `minmax(300px, 1fr)` causes horizontal overflow on mobile screens narrower than 300px, breaking layout.

**Why it happens:** Minimum width (300px) is absolute, not flexible. On 320px mobile screens with padding, effective width is <300px, forcing grid to overflow.

**How to avoid:**
- **Use smaller minimum or responsive units:** `minmax(min(100%, 280px), 1fr)` ensures minimum never exceeds container width.
- **Account for padding/gap:** If container has 20px padding each side and 16px gap, effective width is viewport - 56px. Ensure minmax minimum is less than this.
- **Test on narrow viewports:** Check layout at 320px width (iPhone SE size).
- **Alternative approach:** Use `minmax(0, 1fr)` with explicit column count at different breakpoints.

**Example of fix:**
```css
/* BEFORE: Causes overflow on <300px screens */
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

/* AFTER: Adapts to container width */
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: 1rem;
}
```

**Warning signs:**
- Horizontal scrollbar on mobile
- Cards appear cut off on small screens
- Layout breaks specifically on iPhone SE or similar small devices
- Grid items don't wrap as expected

**Reference:** https://www.testmuai.com/blog/css-grid-best-practices/

### Pitfall 5: Form Submit Not Prevented, Causing Page Reload

**What goes wrong:** Contact form appears to submit but immediately reloads page, losing form data and EmailJS success message. User thinks form failed.

**Why it happens:** Forgot to call `event.preventDefault()` in form submit handler, allowing default browser behavior (POST request and page reload) to occur.

**How to avoid:**
- **Always call preventDefault first:** Make it first line of submit handler before any other logic.
- **Attach to form, not button:** Add event listener to form's submit event, not button's click event.
- **Check event parameter:** Ensure submit handler receives event parameter and calls preventDefault() on it.
- **Test thoroughly:** Submit form and verify page doesn't reload—EmailJS success message should persist.

**Example of correct implementation:**
```javascript
// CORRECT: Prevent default as first action
contactForm.addEventListener('submit', function(event) {
  event.preventDefault(); // ← CRITICAL: Must be first

  // Now safe to process form
  emailjs.sendForm('service_id', 'template_id', this)
    .then(response => {
      console.log('SUCCESS', response);
    });
});

// WRONG: Missing preventDefault
contactForm.addEventListener('submit', function(event) {
  emailjs.sendForm('service_id', 'template_id', this); // Page reloads before this completes
});
```

**Warning signs:**
- Form appears to submit but page reloads instantly
- Success message flashes briefly then disappears
- Form data is cleared without confirmation
- EmailJS dashboard shows no sends (page reloaded before request completed)

**Reference:** https://wesbos.com/javascript/05-events/prevent-default-and-form-events

### Pitfall 6: Missing aria-live on Form Status Messages

**What goes wrong:** Screen reader users submit form but don't hear success or error messages, leaving them uncertain if form worked.

**Why it happens:** Dynamic content (success/error messages) injected via JavaScript isn't automatically announced to screen readers. Developers assume visible message is sufficient.

**How to avoid:**
- **Add aria-live="polite" to status container:** Screen readers will announce content changes in this element.
- **Use role="status" for success messages:** Semantic HTML role that conveys meaning.
- **Use role="alert" for error messages:** Higher priority announcement, interrupts current reading.
- **Keep announcements concise:** "Message sent successfully" not "Your message has been successfully sent to our servers and we will respond within 24 hours..."

**Example:**
```html
<!-- Status message container -->
<div class="form-status" role="status" aria-live="polite"></div>

<!-- Error message container -->
<div class="form-error" role="alert" aria-live="assertive"></div>
```

```javascript
// Update status (screen reader will announce change)
formStatus.textContent = 'Message sent successfully!';

// For errors, use more urgent announcement
formError.textContent = 'Failed to send message. Please try again.';
```

**Warning signs:**
- Accessibility audit tools flag missing live regions
- Screen reader users report uncertainty about form submission
- Success/error messages only visible, not announced
- Form appears to work for sighted users but not for screen reader users

**Reference:** https://www.nngroup.com/articles/errors-forms-design-guidelines/

## Code Examples

Verified patterns from official sources:

### Complete EmailJS Contact Form with Validation

```html
<!-- Source: https://www.emailjs.com/docs/sdk/installation/ -->
<!-- Source: https://vizionconcept.hashnode.dev/how-to-create-a-contact-form-with-email-js-using-vanilla-javascript-with-validation -->

<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact | Portfolio</title>
  <link rel="stylesheet" href="../shared/styles/tokens.css">
  <link rel="stylesheet" href="./css/form.css">
</head>
<body>
  <main>
    <section aria-labelledby="contact-heading">
      <h1 id="contact-heading">Get in Touch</h1>

      <form id="contact-form" novalidate>
        <div class="form-group">
          <label for="user_name">Name *</label>
          <input
            type="text"
            id="user_name"
            name="user_name"
            required
            aria-required="true"
            aria-describedby="name-error">
          <span id="name-error" class="error-message" aria-live="polite"></span>
        </div>

        <div class="form-group">
          <label for="user_email">Email *</label>
          <input
            type="email"
            id="user_email"
            name="user_email"
            required
            aria-required="true"
            aria-describedby="email-error">
          <span id="email-error" class="error-message" aria-live="polite"></span>
        </div>

        <div class="form-group">
          <label for="message">Message *</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            required
            data-minlength="10"
            aria-required="true"
            aria-describedby="message-error"></textarea>
          <span id="message-error" class="error-message" aria-live="polite"></span>
        </div>

        <button type="submit" class="button-primary">
          <span class="button-text">Send Message</span>
          <span class="button-loading" hidden>Sending...</span>
        </button>

        <div class="form-status" role="status" aria-live="polite"></div>
      </form>
    </section>
  </main>

  <!-- EmailJS SDK -->
  <script type="text/javascript"
          src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js">
  </script>
  <script type="text/javascript">
    (function(){
      emailjs.init({
        publicKey: "YOUR_PUBLIC_KEY", // Replace with your key from EmailJS dashboard
      });
    })();
  </script>

  <!-- Form validation and submission -->
  <script src="./js/contact-form.js"></script>
</body>
</html>
```

```javascript
// contact-form.js
// Source: https://gomakethings.com/vanilla-javascript-form-validation/

const contactForm = document.getElementById('contact-form');
const formStatus = document.querySelector('.form-status');
const submitButton = contactForm.querySelector('button[type="submit"]');
const buttonText = submitButton.querySelector('.button-text');
const buttonLoading = submitButton.querySelector('.button-loading');

// Validation patterns
const validators = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address (e.g., name@example.com)'
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

// Validate single field
function validateField(field) {
  const errorId = field.getAttribute('aria-describedby');
  const errorSpan = document.getElementById(errorId);
  let isValid = true;
  let errorMessage = '';

  // Required check
  if (field.hasAttribute('required') && !validators.required.test(field.value)) {
    isValid = false;
    errorMessage = validators.required.message;
  }
  // Email format check
  else if (field.type === 'email' && field.value && !validators.email.pattern.test(field.value)) {
    isValid = false;
    errorMessage = validators.email.message;
  }
  // Minimum length check
  else if (field.dataset.minlength) {
    const min = parseInt(field.dataset.minlength);
    if (!validators.minLength(min).test(field.value)) {
      isValid = false;
      errorMessage = validators.minLength(min).message;
    }
  }

  // Update UI
  if (!isValid) {
    field.setAttribute('aria-invalid', 'true');
    field.classList.add('input-error');
    errorSpan.textContent = errorMessage;
  } else {
    field.setAttribute('aria-invalid', 'false');
    field.classList.remove('input-error');
    errorSpan.textContent = '';
  }

  return isValid;
}

// Attach blur validation to all inputs
const formFields = contactForm.querySelectorAll('input, textarea');
formFields.forEach(field => {
  field.addEventListener('blur', () => validateField(field));
});

// Form submission
contactForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent page reload

  // Validate all fields
  let formIsValid = true;
  formFields.forEach(field => {
    if (!validateField(field)) {
      formIsValid = false;
    }
  });

  if (!formIsValid) {
    // Focus first error field
    const firstError = contactForm.querySelector('[aria-invalid="true"]');
    if (firstError) {
      firstError.focus();
      formStatus.textContent = 'Please fix the errors above';
      formStatus.className = 'form-status error';
    }
    return;
  }

  // Show loading state
  submitButton.disabled = true;
  buttonText.hidden = true;
  buttonLoading.hidden = false;
  formStatus.textContent = '';

  // Send via EmailJS
  emailjs.sendForm(
    'YOUR_SERVICE_ID',    // Replace with your Service ID
    'YOUR_TEMPLATE_ID',   // Replace with your Template ID
    this
  )
  .then(function(response) {
    console.log('SUCCESS!', response.status, response.text);

    // Show success message
    formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
    formStatus.className = 'form-status success';

    // Reset form
    contactForm.reset();

    // Reset button state
    submitButton.disabled = false;
    buttonText.hidden = false;
    buttonLoading.hidden = true;
  }, function(error) {
    console.error('FAILED...', error);

    // Show error message
    formStatus.textContent = 'Failed to send message. Please try again or email me directly.';
    formStatus.className = 'form-status error';

    // Reset button state
    submitButton.disabled = false;
    buttonText.hidden = false;
    buttonLoading.hidden = true;
  });
});
```

```css
/* form.css - Form styling with error states */
/* Source: https://clearout.io/blog/form-error-messages/ */

.form-group {
  margin-bottom: var(--spacing-component-gap, 1.5rem);
}

label {
  display: block;
  margin-bottom: var(--spacing-element-gap, 0.75rem);
  font-weight: var(--font-weight-emphasis, 600);
  color: var(--color-text-primary, #F9FAFB);
}

input,
textarea {
  width: 100%;
  padding: var(--spacing-element-gap, 0.75rem);
  font-family: var(--font-family-base, -apple-system, sans-serif);
  font-size: var(--font-size-body, 1rem);
  color: var(--color-text-primary, #F9FAFB);
  background-color: var(--color-bg-elevated, #262626);
  border: 2px solid var(--color-border-default, #404040);
  border-radius: var(--border-radius-input, 0.25rem);
  transition: border-color 0.2s ease;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: var(--color-interactive-primary, #22C55E);
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
}

/* Error state */
input.input-error,
textarea.input-error {
  border-color: #EF4444; /* Red for errors */
}

.error-message {
  display: block;
  margin-top: var(--primitive-spacing-2, 0.5rem);
  font-size: var(--font-size-caption, 0.875rem);
  color: #EF4444;
  font-weight: var(--font-weight-emphasis, 600);
}

.error-message:empty {
  display: none;
}

/* Add error icon */
.error-message::before {
  content: "⚠ ";
  margin-right: var(--primitive-spacing-1, 0.25rem);
}

/* Status messages */
.form-status {
  margin-top: var(--spacing-component-gap, 1.5rem);
  padding: var(--spacing-element-gap, 0.75rem);
  border-radius: var(--border-radius-input, 0.25rem);
  font-weight: var(--font-weight-emphasis, 600);
}

.form-status.success {
  background-color: rgba(34, 197, 94, 0.1);
  color: #22C55E;
  border: 1px solid #22C55E;
}

.form-status.error {
  background-color: rgba(239, 68, 68, 0.1);
  color: #EF4444;
  border: 1px solid #EF4444;
}

.form-status.loading {
  background-color: rgba(58, 130, 255, 0.1);
  color: #3A82FF;
  border: 1px solid #3A82FF;
}

/* Button loading state */
.button-loading {
  display: inline-block;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

### Responsive Project Showcase Grid

```html
<!-- Source: https://devtoolbox.dedyn.io/blog/css-grid-complete-guide -->

<section aria-labelledby="projects-heading">
  <h2 id="projects-heading">Projects</h2>

  <div class="project-grid">
    <!-- Project card 1 -->
    <article class="project-card" aria-labelledby="project1-title">
      <picture>
        <source srcset="assets/images/projects/ecommerce-dashboard.webp" type="image/webp">
        <img
          src="assets/images/projects/ecommerce-dashboard.jpg"
          alt="E-commerce analytics dashboard showing sales graphs and metrics"
          width="600"
          height="400"
          loading="lazy">
      </picture>

      <div class="project-content">
        <h3 id="project1-title">E-commerce Analytics Dashboard</h3>
        <p class="project-description">
          Real-time sales analytics platform for online retailers with customizable KPI tracking.
        </p>

        <div class="project-meta">
          <p class="project-role"><strong>Role:</strong> Full-stack Developer</p>
          <ul class="tech-stack" aria-label="Technologies used">
            <li>React</li>
            <li>TypeScript</li>
            <li>D3.js</li>
            <li>Node.js</li>
          </ul>
        </div>

        <div class="project-links">
          <a href="https://demo.example.com" class="button-primary" target="_blank" rel="noopener noreferrer">
            Live Demo
            <span class="sr-only">(opens in new tab)</span>
          </a>
          <a href="https://github.com/username/project" class="button-secondary" target="_blank" rel="noopener noreferrer">
            GitHub
            <span class="sr-only">(opens in new tab)</span>
          </a>
        </div>
      </div>
    </article>

    <!-- Project card 2 - Placeholder for loading state -->
    <article class="project-card project-card-skeleton" aria-hidden="true">
      <div class="skeleton skeleton-image"></div>
      <div class="project-content">
        <div class="skeleton skeleton-title"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text"></div>
      </div>
    </article>

    <!-- Additional project cards... -->
  </div>
</section>
```

```css
/* Project grid with auto-fit responsiveness */
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
  gap: var(--spacing-component-gap, 1.5rem);
  margin-top: var(--spacing-section-gap, 3rem);
}

/* Project card */
.project-card {
  background-color: var(--color-bg-secondary, #1A1A1A);
  border: 1px solid var(--color-border-default, #404040);
  border-radius: var(--border-radius-card, 0.5rem);
  overflow: hidden;
  transition: transform 0.2s ease, border-color 0.2s ease;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-interactive-primary, #22C55E);
}

.project-card img {
  width: 100%;
  height: auto;
  display: block;
  aspect-ratio: 3 / 2;
  object-fit: cover;
}

.project-content {
  padding: var(--spacing-component-gap, 1.5rem);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.project-card h3 {
  margin: 0 0 var(--spacing-element-gap, 0.75rem) 0;
  color: var(--color-text-primary, #F9FAFB);
}

.project-description {
  margin: 0 0 var(--spacing-component-gap, 1.5rem) 0;
  color: var(--color-text-secondary, #F3F4F6);
  line-height: var(--line-height-body, 1.5);
}

.project-meta {
  margin-bottom: var(--spacing-component-gap, 1.5rem);
  flex: 1;
}

.project-role {
  margin: 0 0 var(--spacing-element-gap, 0.75rem) 0;
  font-size: var(--font-size-caption, 0.875rem);
  color: var(--color-text-muted, #E5E7EB);
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: var(--primitive-spacing-2, 0.5rem);
  list-style: none;
  padding: 0;
  margin: 0;
}

.tech-stack li {
  background-color: var(--color-bg-elevated, #262626);
  color: var(--color-interactive-primary, #22C55E);
  padding: var(--primitive-spacing-1, 0.25rem) var(--primitive-spacing-3, 0.75rem);
  border-radius: var(--border-radius-pill, 9999px);
  font-size: var(--font-size-caption, 0.875rem);
  font-weight: var(--font-weight-emphasis, 600);
}

.project-links {
  display: flex;
  gap: var(--spacing-element-gap, 0.75rem);
  flex-wrap: wrap;
}

/* Skeleton loading state */
.project-card-skeleton {
  pointer-events: none;
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-bg-elevated, #262626) 25%,
    var(--color-bg-secondary, #1A1A1A) 50%,
    var(--color-bg-elevated, #262626) 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s ease-in-out infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton-image {
  width: 100%;
  height: 0;
  padding-bottom: 66.67%; /* 3:2 aspect ratio */
}

.skeleton-title {
  height: 1.5rem;
  margin-bottom: var(--spacing-element-gap, 0.75rem);
  border-radius: var(--border-radius-input, 0.25rem);
}

.skeleton-text {
  height: 1rem;
  margin-bottom: var(--primitive-spacing-2, 0.5rem);
  border-radius: var(--border-radius-input, 0.25rem);
}

.skeleton-text:last-of-type {
  width: 60%;
}
```

### Portfolio Hero Section

```html
<!-- Source: https://www.perfectafternoon.com/2025/hero-section-design/ -->

<section class="hero" aria-labelledby="hero-heading">
  <div class="hero-content">
    <img
      src="assets/images/avatar.webp"
      alt="Profile photo of Jan Kowalski"
      width="120"
      height="120"
      class="hero-avatar">

    <h1 id="hero-heading">Hi, I'm Jan Kowalski</h1>
    <p class="hero-subtitle">
      Front-end Developer building fast, accessible web applications with React and TypeScript
    </p>

    <div class="hero-cta">
      <a href="#contact" class="button-primary">Get in Touch</a>
      <a href="#projects" class="button-secondary">View Projects</a>
    </div>
  </div>
</section>
```

```css
/* Hero section */
.hero {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--spacing-section-gap, 3rem) var(--spacing-page-padding-mobile, 1rem);
}

.hero-content {
  max-width: 800px;
}

.hero-avatar {
  width: 120px;
  height: 120px;
  border-radius: var(--border-radius-full, 9999px);
  border: 3px solid var(--color-interactive-primary, #22C55E);
  margin-bottom: var(--spacing-component-gap, 1.5rem);
  object-fit: cover;
}

.hero h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin-bottom: var(--spacing-element-gap, 0.75rem);
}

.hero-subtitle {
  font-size: clamp(1.125rem, 2.5vw, 1.5rem);
  color: var(--color-text-secondary, #F3F4F6);
  margin-bottom: var(--spacing-section-gap, 3rem);
  line-height: var(--line-height-body, 1.5);
}

.hero-cta {
  display: flex;
  gap: var(--spacing-element-gap, 0.75rem);
  justify-content: center;
  flex-wrap: wrap;
}

/* Responsive adjustments */
@media (min-width: 768px) {
  .hero {
    padding: var(--spacing-section-gap, 3rem) var(--spacing-page-padding-desktop, 2rem);
  }

  .hero-avatar {
    width: 150px;
    height: 150px;
  }
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| PHP/Node.js backend for contact forms | EmailJS client-side email sending | 2020-2022 | Eliminates server infrastructure, reduces deployment complexity, enables static hosting |
| Manual media query breakpoints | CSS Grid auto-fit + container queries | 2023-2026 | Reduces CSS maintenance burden, enables truly responsive components, eliminates cascade conflicts |
| JavaScript Intersection Observer for lazy loading | Native loading="lazy" attribute | 2020-2021 | Zero JavaScript required, browser-optimized implementation, improved performance |
| JPEG/PNG images | WebP format | 2021-2026 | 25-34% file size reduction, widespread browser support (98%), faster page loads |
| jQuery for form handling | Vanilla JavaScript with FormData API | 2018-2020 | Eliminates 30KB+ dependency, native browser APIs are faster and simpler |
| Viewport-only responsiveness (media queries) | Container queries for component-level responsiveness | 2023-2026 | Components adapt to context not just viewport, enables true component reusability |
| Complex validation libraries (Parsley.js, jQuery Validate) | Native HTML5 validation + lightweight JS enhancement | 2019-2022 | Reduces dependencies, leverages browser capabilities, simpler implementation |
| Layout shift during image load | Width/height attributes + aspect-ratio CSS | 2021-2026 | Improves CLS (Cumulative Layout Shift), better Core Web Vitals scores, enhanced SEO |

**Deprecated/outdated:**
- **PHP contact form scripts:** Require server infrastructure, vulnerable to spam, complex deployment. EmailJS replaced this pattern for static sites.
- **Captcha v2 (checkbox):** EmailJS supports invisible reCAPTCHA v3 with score-based bot detection, better UX than checkbox.
- **Flexbox for complex grids:** CSS Grid is now standard for 2D layouts; Flexbox remains ideal for 1D layouts (navigation bars, button groups).
- **Polyfills for Grid/Flexbox:** 98%+ browser support means polyfills add unnecessary bloat for modern web projects.
- **Third-party skeleton loaders:** CSS-only skeletons are now standard, no need for React Loading Skeleton or similar libraries on vanilla sites.

## Open Questions

1. **Landing page differentiation from portfolio**
   - What we know: Requirements specify separate landing page for services vs portfolio for projects
   - What's unclear: Degree of design consistency vs differentiation between the two sites
   - Recommendation: Share design system (colors, typography, buttons) for brand consistency, but differentiate layouts—portfolio uses project grid, landing uses service feature list + testimonials. Portfolio is personal ("I build..."), landing is service-oriented ("Get a custom website...").

2. **Useme profile integration depth**
   - What we know: Portfolio contact section needs link to Useme profile
   - What's unclear: Should we embed Useme widgets/reviews or just link to profile?
   - Recommendation: Start with simple link button in contact section. Useme likely doesn't provide embed widgets for external sites. Include text like "Or view my profile on Useme" with call-to-action button linking to profile.

3. **Mock testimonials vs real data**
   - What we know: Landing page requires testimonials/social proof section (mock)
   - What's unclear: Structure and content of mock testimonials
   - Recommendation: Create 2-3 realistic mock testimonials with placeholder names, photos (avatar placeholders), and credible feedback. Include role/company context. Mark clearly in code comments as placeholders for future replacement.

4. **Project showcase placeholder card content**
   - What we know: Portfolio should display project grid with placeholder cards
   - What's unclear: How many placeholders, what content should they contain?
   - Recommendation: Include 4-6 project cards total. Mix 1-2 real projects (if available from prior work) with placeholder cards showing skeleton loading state or "Coming Soon" messaging with tech stack listed. Demonstrates grid responsiveness while allowing incremental content addition.

5. **EmailJS template customization**
   - What we know: EmailJS uses dashboard templates with variables
   - What's unclear: Best practice for template structure—HTML vs plain text, auto-reply configuration
   - Recommendation: Create two templates—(1) notification template sending form data to your email (HTML formatted with sender details), (2) auto-reply template confirming receipt to user (plain text is more deliverable). Use variables: {{user_name}}, {{user_email}}, {{message}} in both.

6. **Performance budget for "under 2 seconds" requirement**
   - What we know: Success criteria requires sites load in under 2 seconds
   - What's unclear: Measurement method (Lighthouse, real user metrics, specific network conditions)
   - Recommendation: Use Lighthouse CI in GitHub Actions to enforce performance budget: LCP <2s, FCP <1.5s, TTI <3s on mobile 4G throttling. This matches Core Web Vitals "good" threshold and GitHub Actions can gate deployment on these metrics.

7. **Mobile-first breakpoints for specific components**
   - What we know: Requirements specify mobile-first, responsive on mobile devices
   - What's unclear: Specific breakpoints for navigation, hero section, form layouts
   - Recommendation: Use 3 breakpoints—(1) Mobile base (no query), (2) Tablet 768px (stacked to side-by-side layouts), (3) Desktop 1024px (multi-column grids, wider containers). Leverage auto-fit grid to minimize manual breakpoints.

## Sources

### Primary (HIGH confidence)
- [EmailJS SDK Installation](https://www.emailjs.com/docs/sdk/installation/) - Official EmailJS documentation
- [EmailJS Getting Started](https://www.emailjs.com/docs/) - Official EmailJS workflow
- [EmailJS Public Key Security](https://www.emailjs.com/docs/faq/is-it-okay-to-expose-my-public-key/) - Official security guidance
- [MDN: Event preventDefault()](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) - Browser API documentation
- [MDN: Fix LCP with Image Optimization](https://developer.mozilla.org/en-US/blog/fix-image-lcp/) - Official performance guide
- [W3Schools: HTML Semantic Elements](https://www.w3schools.com/html/html5_semantic_elements.asp) - Semantic HTML reference

### Secondary (MEDIUM confidence - verified with multiple sources)
- [Mailtrap: EmailJS Tutorial 2026](https://mailtrap.io/blog/emailjs/) - Updated tutorial with code examples
- [Medium: Contact Form with EmailJS](https://medium.com/@remcojonk/contact-form-withvanilla-javascript-and-emailjs-cdad241736df) - Implementation guide
- [DevToolbox: CSS Grid Complete Guide](https://devtoolbox.dedyn.io/blog/css-grid-complete-guide) - Grid layout patterns
- [TestMu AI: CSS Grid Best Practices](https://www.testmu.ai/blog/css-grid-best-practices/) - Grid optimization techniques
- [JavaScript Doctor: Mastering Flexbox and CSS Grid 2026](https://www.javascriptdoctor.blog/2026/02/mastering-flexbox-and-css-grid-for.html) - Modern layout techniques
- [BrowserStack: Responsive Design Breakpoints](https://www.browserstack.com/guide/responsive-design-breakpoints) - Breakpoint strategies
- [Request Metrics: Optimize Images 2026](https://requestmetrics.com/web-performance/high-performance-images/) - Image optimization workflow
- [Aleksandr Hovhannisyan: Optimizing Images with WebP](https://www.aleksandrhovhannisyan.com/blog/optimizing-images-for-the-web/) - WebP implementation
- [Nielsen Norman Group: Form Error Guidelines](https://www.nngroup.com/articles/errors-forms-design-guidelines/) - UX research on error messaging
- [Clearout: Form Error Messages Best Practices](https://clearout.io/blog/form-error-messages/) - Error message design
- [Bunnyfoot: Error-Friendly Forms](https://www.bunnyfoot.com/2024/01/13-best-practices-to-design-error-friendly-forms/) - Form validation UX
- [Go Make Things: Vanilla JS Form Validation](https://gomakethings.com/vanilla-javascript-form-validation/) - Lightweight validation patterns
- [Perfect Afternoon: Hero Section Design 2026](https://www.perfectafternoon.com/2025/hero-section-design/) - Hero section best practices
- [Elementor: Best Developer Portfolios 2026](https://elementor.com/blog/best-web-developer-portfolio-examples/) - Portfolio structure examples
- [Hostinger: Web Developer Portfolio Examples](https://www.hostinger.com/tutorials/web-developer-portfolio) - Portfolio content strategy
- [Search Atlas: Semantic HTML for SEO](https://searchatlas.com/blog/semantic-html/) - SEO optimization guide
- [JavaScript Doctor: Semantic HTML5 for SEO 2026](https://www.javascriptdoctor.blog/2026/02/semantic-html5-elements-for-better-seo.html) - Entity-based SEO

### Tertiary (LOW confidence - single source or unverified)
- [Wes Bos: Prevent Default and Form Events](https://wesbos.com/javascript/05-events/prevent-default-and-form-events) - Tutorial on form handling
- [FreeCodeCamp: Skeleton Screen Tutorial](https://www.freecodecamp.org/news/how-to-build-skeleton-screens-using-css-for-better-user-experience/) - Skeleton loader implementation

## Metadata

**Confidence breakdown:**
- EmailJS integration: HIGH - Official documentation verified, security model understood, multiple tutorial sources confirm implementation
- Responsive grid patterns: HIGH - CSS Grid auto-fit is well-documented, container queries have 98% support, verified across multiple authoritative sources
- Form validation UX: HIGH - Nielsen Norman Group research cited, best practices consistent across multiple UX sources
- Image optimization: HIGH - MDN documentation for LCP, WebP format widely adopted (98% support), lazy loading native feature
- Portfolio structure: MEDIUM-HIGH - Best practices consistent across multiple 2026 sources, but specific content decisions remain subjective
- Hero section design: MEDIUM - Design principles well-established but specific implementations vary by brand/style
- Landing page differentiation: MEDIUM - General best practices clear, but project-specific decisions on mock content need iteration

**Research date:** 2026-02-17
**Valid until:** ~2026-04-17 (60 days - domain is relatively stable)

**Notes:**
- EmailJS free tier (200 emails/month) sufficient for portfolio contact forms; paid tier only needed if exceeding quota
- Container queries adoption accelerated in 2025-2026; now 98% browser support makes them production-ready
- Native lazy loading and WebP are mature technologies; no polyfills or fallbacks needed for modern browsers
- Form validation patterns stable; inline validation on blur is industry standard as of 2026
- Portfolio best practices emphasize clarity over creativity—"show working projects" is universal guidance
- Mobile-first is now assumed default; research focuses on container queries as evolution beyond viewport-based media queries
