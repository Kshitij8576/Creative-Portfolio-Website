# Creative Portfolio Website

A modern, responsive portfolio built using **HTML, CSS, and JavaScript**. It showcases projects, includes a contact form with validation, supports dark/light mode, and integrates a random quote API for inspiration.

---

## 🚀 Tech Stack Used

* **HTML5** → Semantic structure, accessibility-first approach.
* **CSS3** → Modern layout (Grid, Flexbox), responsive design, animations.
* **JavaScript (ES6+)** → DOM manipulation, form validation, API calls.
* **Quotable API** → Random quotes feature.
* **GitHub API** → Optional integration to load repositories dynamically.

---

## ⚙️ Setup Instructions

1. Clone or download the repository

2. Open the project:

   * If using VS Code, install **Live Server** extension and right-click → *Open with Live Server*.
   * Or simply open `index.html` in your browser.


---

## 🛠 Challenges Faced & Solutions

### 1. **Responsive Navigation**

* **Challenge:** Ensuring the navigation worked seamlessly on desktop and mobile.
* **Solution:** Implemented a **hamburger menu** with ARIA attributes and toggle states for accessibility.

### 2. **Dark/Light Mode Persistence**

* **Challenge:** Remembering the user’s theme preference.
* **Solution:** Used **localStorage** to save theme choice and applied it on page load.

### 3. **Form Validation Without Backend**

* **Challenge:** Needing client-side validation with user feedback but no server.
* **Solution:** Added **JavaScript validation** for required fields + email regex check. Displayed a success toast message after submission.

### 4. **Dynamic Project Loading (GitHub API)**

* **Challenge:** Handling CORS and empty descriptions when fetching repositories.
* **Solution:** Used `fetch()` to get repos, filtered out forks, and provided fallback descriptions/images.

---

## 📌 Future Improvements

* Add animations via **Framer Motion (React)** or GSAP for smoother interactions.
* Store contact form submissions using Firebase / Supabase.
* Add blog section powered by Markdown or Headless CMS.
