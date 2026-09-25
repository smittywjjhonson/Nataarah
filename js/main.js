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

// Core Service Detail Section Toggle (Expand / Collapse)
const toggleDetailBtn = document.getElementById("toggle-detail-btn");
const collapseDetailBottomBtn = document.getElementById("collapse-detail-bottom-btn");
const detailWrapper = document.getElementById("tahapan-detail-wrapper");
const heroDetailBtn = document.querySelector(".detail-hero a[href='#tahapan']");

if (toggleDetailBtn && detailWrapper) {
  const expandDetail = (scroll = true) => {
    detailWrapper.removeAttribute("hidden");
    toggleDetailBtn.setAttribute("aria-expanded", "true");
    const textSpan = toggleDetailBtn.querySelector(".btn-text");
    const iconSpan = toggleDetailBtn.querySelector(".btn-icon");
    if (textSpan) textSpan.textContent = "Sembunyikan Detail Tahapan";
    if (iconSpan) iconSpan.textContent = "↑";
    if (scroll) {
      const target = document.getElementById("tahapan");
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 60);
      }
    }
  };

  const collapseDetail = (scroll = true) => {
    detailWrapper.setAttribute("hidden", "");
    toggleDetailBtn.setAttribute("aria-expanded", "false");
    const textSpan = toggleDetailBtn.querySelector(".btn-text");
    const iconSpan = toggleDetailBtn.querySelector(".btn-icon");
    if (textSpan) textSpan.textContent = "Lihat Detail Tahapan Layanan";
    if (iconSpan) iconSpan.textContent = "↓";
    if (scroll) {
      const toggleAction = document.querySelector(".detail-toggle-action");
      if (toggleAction) {
        toggleAction.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  toggleDetailBtn.addEventListener("click", () => {
    const isExpanded = toggleDetailBtn.getAttribute("aria-expanded") === "true";
    if (isExpanded) {
      collapseDetail(false);
    } else {
      expandDetail(true);
    }
  });

  if (collapseDetailBottomBtn) {
    collapseDetailBottomBtn.addEventListener("click", () => {
      collapseDetail(true);
    });
  }

  if (heroDetailBtn) {
    heroDetailBtn.addEventListener("click", (e) => {
      e.preventDefault();
      expandDetail(true);
    });
  }
}
