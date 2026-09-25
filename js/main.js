const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const serviceDropdown = document.querySelector(".nav-dropdown");
const serviceDropdownToggle = document.querySelector(".nav-dropdown-toggle");

if (serviceDropdown && serviceDropdownToggle) {
  const closeServiceDropdown = () => {
    serviceDropdown.classList.remove("is-open");
    serviceDropdownToggle.setAttribute("aria-expanded", "false");
  };

  serviceDropdownToggle.addEventListener("click", () => {
    const isOpen = serviceDropdownToggle.getAttribute("aria-expanded") === "true";
    serviceDropdownToggle.setAttribute("aria-expanded", String(!isOpen));
    serviceDropdown.classList.toggle("is-open", !isOpen);
  });

  serviceDropdown.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeServiceDropdown();
      serviceDropdownToggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!serviceDropdown.contains(event.target)) closeServiceDropdown();
  });
}

if (menuToggle && siteNav) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.querySelector(".menu-toggle-label").textContent = "Menu";
    siteNav.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.querySelector(".menu-toggle-label").textContent = isOpen ? "Menu" : "Tutup";
    siteNav.classList.toggle("is-open", !isOpen);
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      closeMenu();
      if (event.target.closest(".dropdown-menu")) {
        serviceDropdown?.classList.remove("is-open");
        serviceDropdownToggle?.setAttribute("aria-expanded", "false");
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
