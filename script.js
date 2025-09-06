// ===== UTIL =====
const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));

// ===== THEME TOGGLE =====
const root = document.documentElement;
const themeToggle = $("#themeToggle");
const themeToggleMobile = $("#themeToggleMobile");
const savedTheme = localStorage.getItem("theme") || "dark";
if (savedTheme === "light") root.setAttribute("data-theme", "light");
updateToggleState();

function toggleTheme() {
  const isLight = root.getAttribute("data-theme") === "light";
  if (isLight) {
    root.removeAttribute("data-theme");
    localStorage.setItem("theme", "dark");
  } else {
    root.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
  updateToggleState();
}
function updateToggleState() {
  const isLight = root.getAttribute("data-theme") === "light";
  themeToggle.setAttribute("aria-pressed", isLight);
  themeToggle.textContent = isLight ? "☀️" : "🌙";
  themeToggleMobile && themeToggleMobile.setAttribute("aria-pressed", isLight);
}
themeToggle.addEventListener("click", toggleTheme);
themeToggleMobile && themeToggleMobile.addEventListener("click", toggleTheme);

// ===== HAMBURGER =====
const burger = $("#hamburger");
const mobileMenu = $("#mobileMenu");
burger.addEventListener("click", () => {
  const open = mobileMenu.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});

// ===== HERO: QUOTE (Creative Feature using API) =====
const inspireBtn = $("#inspire");
const quoteEl = $("#quote");
inspireBtn.addEventListener("click", async () => {
  try {
    inspireBtn.disabled = true;
    inspireBtn.textContent = "Loading…";
    const r = await fetch("https://api.quotable.io/random");
    const q = await r.json();
    quoteEl.textContent = q.content + " — " + q.author;
  } catch (e) {
    quoteEl.textContent = "Could not fetch a quote right now.";
  } finally {
    inspireBtn.disabled = false;
    inspireBtn.textContent = "Inspire me ✨";
  }
});

// ===== PROJECTS =====
const localProjects = [
  {
    title: "InterioHubb",
    desc: "Complete responsive and animated website for interior designing company with smooth UI interactions using HTML, CSS, JS, GSAP.",
    img: "./assets/pro1.png",
    link: "https://interiohubb-main.netlify.app/",
  },
  {
    title: "Void Games",
    desc: "Complete gaming website for ARK: Survival Evolved with engaging UI using HTML, CSS, JS.",
    img: "./assets/pro2.png",
    link: "https://void-games.netlify.app/",
  },
  {
    title: "Oasis",
    desc: "Animated service company website offering logo, web design, and 3D design services using HTML, CSS, JS and GSAP.",
    img: "./assets/pro3.png",
    link: "https://oasis-ks.netlify.app/",
  },
  {
    title: "Panto",
    desc: "Animated furniture selling platform with modern UI/UX using HTML, CSS, JS, GSAP.",
    img: "./assets/pro4.png",
    link: "https://panto-ks.netlify.app/",
  },
  
];

const grid = $("#projectGrid");
const dataSource = $("#dataSource");
const ghUser = $("#ghUser");
const loadBtn = $("#loadBtn");

dataSource.addEventListener("change", () => {
  const mode = dataSource.value;
  ghUser.style.display = mode === "github" ? "block" : "none";
});

loadBtn.addEventListener("click", () => {
  if (dataSource.value === "github") {
    renderGitHub();
  } else {
    renderProjects(localProjects);
  }
});

function cardTemplate(p) {
  const safeDesc = p.desc || p.description || "—";
  const safeImg =
    p.img ||
    `https://source.unsplash.com/featured/800x600?${encodeURIComponent(
      p.title || "project"
    )}`;
  const safeLink = p.link || p.html_url || p.homepage || "#";
  return `
        <article class="card animate-in">
          <div class="thumb"><img src="${safeImg}" alt="${
    p.title || p.name
  } thumbnail" loading="lazy"></div>
          <div class="content">
            <h3>${p.title || p.name}</h3>
            <p>${safeDesc}</p>
          </div>
          <div class="actions">
            <a class="pill" href="${safeLink}" target="_blank" rel="noopener">Visit ↗</a>
          </div>
        </article>`;
}

function renderProjects(list) {
  grid.innerHTML = list.map(cardTemplate).join("");
}

async function renderGitHub() {
  const user = ghUser.value.trim() || "octocat";
  grid.innerHTML =
    '<p class="muted">Loading repositories for ' + user + "…</p>";
  try {
    const r = await fetch(
      `https://api.github.com/users/${user}/repos?sort=updated&per_page=9`
    );
    const data = await r.json();
    const mapped = data
      .filter((r) => !r.fork)
      .slice(0, 9)
      .map((repo) => ({
        title: repo.name,
        desc: repo.description || "No description provided",
        img: `https://source.unsplash.com/featured/800x600?code,${encodeURIComponent(
          repo.name
        )}`,
        link: repo.homepage || repo.html_url,
      }));
    renderProjects(mapped);
  } catch (e) {
    grid.innerHTML =
      '<p class="error">Failed to load GitHub repos. Try again.</p>';
  }
}

// initial render
renderProjects(localProjects);

// ===== CONTACT FORM =====
const form = $("#contactForm");
const nameInput = $("#name");
const emailInput = $("#email");
const messageInput = $("#message");
const nameError = $("#nameError");
const emailError = $("#emailError");
const messageError = $("#messageError");
const formStatus = $("#formStatus");
const toast = $("#toast");

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  return re.test(email);
}

function clearErrors() {
  nameError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";
  formStatus.textContent = "";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  clearErrors();
  let valid = true;
  if (!nameInput.value.trim()) {
    nameError.textContent = "Name is required.";
    valid = false;
  }
  if (!emailInput.value.trim()) {
    emailError.textContent = "Email is required.";
    valid = false;
  } else if (!validateEmail(emailInput.value.trim())) {
    emailError.textContent = "Please enter a valid email.";
    valid = false;
  }
  if (!messageInput.value.trim()) {
    messageError.textContent = "Message is required.";
    valid = false;
  }
  if (!valid) return;

  // Simulate success (no backend required)
  form.reset();
  formStatus.textContent = "Thanks! Your message was sent successfully.";
  showToast();
});

function showToast() {
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

// year
$("#year").textContent = new Date().getFullYear();

// Accessibility niceties
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mobileMenu.classList.contains("open")) {
    mobileMenu.classList.remove("open");
    burger.setAttribute("aria-expanded", false);
  }
});
