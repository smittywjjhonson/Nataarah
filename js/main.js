const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const allNavDropdowns = Array.from(document.querySelectorAll(".nav-dropdown"));
const uiText = (text) => window.nataarahTranslateText ? window.nataarahTranslateText(text) : text;

if (allNavDropdowns.length > 0) {
  allNavDropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".nav-dropdown-toggle");
    if (!toggle) return;

    const closeDropdown = () => {
      dropdown.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    const openDropdown = () => {
      allNavDropdowns.forEach((other) => {
        if (other !== dropdown) {
          other.classList.remove("is-open");
          const otherToggle = other.querySelector(".nav-dropdown-toggle");
          if (otherToggle) otherToggle.setAttribute("aria-expanded", "false");
        }
      });
      dropdown.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
    };

    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = dropdown.classList.contains("is-open");
      if (isOpen) {
        closeDropdown();
      } else {
        openDropdown();
      }
    });

    dropdown.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeDropdown();
        toggle.focus();
      }
    });

    dropdown.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeDropdown();
        if (siteNav && siteNav.classList.contains("is-open") && menuToggle) {
          menuToggle.setAttribute("aria-expanded", "false");
          const label = menuToggle.querySelector(".menu-toggle-label");
          if (label) label.textContent = uiText("Menu");
          siteNav.classList.remove("is-open");
        }
      });
    });
  });

  document.addEventListener("click", (event) => {
    allNavDropdowns.forEach((dropdown) => {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove("is-open");
        const toggle = dropdown.querySelector(".nav-dropdown-toggle");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}

if (menuToggle && siteNav) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    const label = menuToggle.querySelector(".menu-toggle-label");
    if (label) label.textContent = uiText("Menu");
    siteNav.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    const label = menuToggle.querySelector(".menu-toggle-label");
    if (label) label.textContent = uiText(isOpen ? "Menu" : "Tutup");
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
      allNavDropdowns.forEach((d) => {
        d.classList.remove("is-open");
        d.querySelector(".nav-dropdown-toggle")?.setAttribute("aria-expanded", "false");
      });
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
    if (textSpan) textSpan.textContent = uiText("Sembunyikan Detail Tahapan");
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
    if (textSpan) textSpan.textContent = uiText("Lihat Detail Tahapan Layanan");
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

// Enabler Service Detail Section Toggle (Expand / Collapse)
const toggleEnablerBtn = document.getElementById("toggle-enabler-detail-btn");
const collapseEnablerBottomBtn = document.getElementById("collapse-enabler-bottom-btn");
const enablerWrapper = document.getElementById("enabler-detail-wrapper");
const heroEnablerBtn = document.querySelector(".detail-hero a[href='#enabler']");

if (toggleEnablerBtn && enablerWrapper) {
  const expandEnabler = (targetSelectorOrEl = null, scroll = true) => {
    enablerWrapper.removeAttribute("hidden");
    toggleEnablerBtn.setAttribute("aria-expanded", "true");
    const textSpan = toggleEnablerBtn.querySelector(".btn-text");
    const iconSpan = toggleEnablerBtn.querySelector(".btn-icon");
    if (textSpan) textSpan.textContent = uiText("Sembunyikan Detail Informasi");
    if (iconSpan) iconSpan.textContent = "↑";

    if (scroll) {
      setTimeout(() => {
        let target = null;
        if (typeof targetSelectorOrEl === "string") {
          target = document.querySelector(targetSelectorOrEl);
        } else if (targetSelectorOrEl instanceof HTMLElement) {
          target = targetSelectorOrEl;
        } else {
          target = document.getElementById("enabler");
        }
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 70);
    }
  };

  const collapseEnabler = (scroll = true) => {
    enablerWrapper.setAttribute("hidden", "");
    toggleEnablerBtn.setAttribute("aria-expanded", "false");
    const textSpan = toggleEnablerBtn.querySelector(".btn-text");
    const iconSpan = toggleEnablerBtn.querySelector(".btn-icon");
    if (textSpan) textSpan.textContent = uiText("Lihat Detail Informasi Semua Pilar");
    if (iconSpan) iconSpan.textContent = "↓";

    if (scroll) {
      const toggleAction = document.querySelector(".enabler-intro .detail-toggle-action");
      if (toggleAction) {
        toggleAction.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  toggleEnablerBtn.addEventListener("click", () => {
    const isExpanded = toggleEnablerBtn.getAttribute("aria-expanded") === "true";
    if (isExpanded) {
      collapseEnabler(false);
    } else {
      expandEnabler(null, true);
    }
  });

  if (collapseEnablerBottomBtn) {
    collapseEnablerBottomBtn.addEventListener("click", () => {
      collapseEnabler(true);
    });
  }

  if (heroEnablerBtn) {
    heroEnablerBtn.addEventListener("click", (e) => {
      e.preventDefault();
      expandEnabler(null, true);
    });
  }

  // Intercept pillar chips and overview list items to expand detail section first if hidden
  const anchorLinks = document.querySelectorAll(
    ".enabler-pillars-bar a[href^='#'], .enabler-overview-card a[href^='#']"
  );
  anchorLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        expandEnabler(href, true);
      }
    });
  });

  // Handle direct hash navigation on initial load (e.g. #marketing, #digital, #operational, #enabler)
  if (window.location.hash) {
    const hashTarget = document.querySelector(window.location.hash);
    if (hashTarget && enablerWrapper.contains(hashTarget)) {
      expandEnabler(hashTarget, true);
    }
  }
}
