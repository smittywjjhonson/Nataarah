const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const serviceDropdown = document.querySelector(".nav-dropdown");
const serviceDropdownToggle = document.querySelector(".nav-dropdown-toggle");

if (serviceDropdown && serviceDropdownToggle) {
  const closeServiceDropdown = () => {
    serviceDropdown.classList.remove("is-open");
    serviceDropdownToggle.setAttribute("aria-expanded", "false");
  };

  const openServiceDropdown = () => {
    serviceDropdown.classList.add("is-open");
    serviceDropdownToggle.setAttribute("aria-expanded", "true");
  };

  serviceDropdownToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = serviceDropdown.classList.contains("is-open");
    if (isOpen) {
      closeServiceDropdown();
    } else {
      openServiceDropdown();
    }
  });

  serviceDropdown.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeServiceDropdown();
      serviceDropdownToggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!serviceDropdown.contains(event.target)) {
      closeServiceDropdown();
    }
  });
}

if (menuToggle && siteNav) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    const label = menuToggle.querySelector(".menu-toggle-label");
    if (label) label.textContent = "Menu";
    siteNav.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    const label = menuToggle.querySelector(".menu-toggle-label");
    if (label) label.textContent = isOpen ? "Menu" : "Tutup";
    siteNav.classList.toggle("is-open", !isOpen);
  });

  siteNav.addEventListener("click", (event) => {
    const anchor = event.target.closest("a");
    if (anchor) {
      const href = anchor.getAttribute("href");
      if (href && href.startsWith("#")) {
        closeMenu();
      }
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      serviceDropdown?.classList.remove("is-open");
      serviceDropdownToggle?.setAttribute("aria-expanded", "false");
    }
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());
