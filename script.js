// ===== DWY — Done-With-You Growth =====

// Change this to your agency's contact email:
const CONTACT_EMAIL = "hello@dwy-growth.com";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// --- Light / dark theme toggle ---
// (initial theme is set by the inline script in <head> to avoid a flash)
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  const next = current === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("dwy-theme", next);
});

// --- Mobile navigation toggle ---
const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  navToggle.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", isOpen);
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// --- Header border + scroll progress bar ---
const header = document.getElementById("siteHeader");
const progressBar = document.getElementById("scrollProgress");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 10);
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = progress + "%";
}, { passive: true });

// --- Scroll reveal animations (with stagger support) ---
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal, .stagger").forEach((el) => observer.observe(el));

// Give each child of a .stagger container an increasing delay
document.querySelectorAll(".stagger").forEach((container) => {
  Array.from(container.children).forEach((child, i) => {
    child.style.setProperty("--stagger-delay", `${i * 0.12}s`);
  });
});

// --- Cursor spotlight on glass cards ---
if (!reducedMotion) {
  document.querySelectorAll(".glass-card").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    });
  });
}

// --- 3D tilt on featured cards ---
if (!reducedMotion && window.matchMedia("(pointer: fine)").matches) {
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    const strength = 7; // max degrees

    card.addEventListener("pointermove", (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform =
        `perspective(900px) rotateY(${px * strength}deg) rotateX(${-py * strength}deg)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)";
    });
  });
}

// --- Looping AI chat animation ---
const chatDemo = document.getElementById("chatDemo");

if (chatDemo && !reducedMotion) {
  const messages = Array.from(chatDemo.querySelectorAll(".msg"));
  let timers = [];

  const wait = (ms) => new Promise((resolve) => {
    const t = setTimeout(resolve, ms);
    timers.push(t);
  });

  const resetChat = () => {
    messages.forEach((m) => m.classList.remove("show", "typing", "done"));
  };

  async function playChat() {
    resetChat();
    await wait(600);

    for (const msg of messages) {
      if (msg.classList.contains("ai")) {
        msg.classList.add("show", "typing");
        await wait(1400);
        msg.classList.remove("typing");
        msg.classList.add("done");
        await wait(1000);
      } else {
        msg.classList.add("show");
        await wait(1000);
      }
    }

    await wait(4000);
    playChat(); // loop
  }

  // Start when the chat card scrolls into view (once)
  const chatObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        chatObserver.disconnect();
        playChat();
      }
    },
    { threshold: 0.4 }
  );

  chatObserver.observe(chatDemo);
} else if (chatDemo) {
  // Reduced motion: show the full conversation statically
  chatDemo.querySelectorAll(".msg").forEach((m) => m.classList.add("show", "done"));
}

// --- Contact form (static hosting friendly: opens the visitor's email app) ---
const form = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    formNote.textContent = "Please fill in all fields before sending.";
    return;
  }

  const subject = encodeURIComponent(`Growth inquiry from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\n${message}`
  );

  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  formNote.textContent = "Opening your email app… we look forward to hearing from you!";
});

// --- Footer year ---
document.getElementById("year").textContent = new Date().getFullYear();
