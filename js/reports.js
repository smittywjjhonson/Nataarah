/**
 * INSIDER Healthcare Growth Partner
 * Reports Page Interactivity (Filtering, Search, Modal Lightbox)
 * Uses real report samples from "REPORTS sample"
 */

document.addEventListener("DOMContentLoaded", () => {
  const cards = Array.from(document.querySelectorAll(".report-card"));
  const filterBtns = Array.from(document.querySelectorAll(".filter-btn[data-filter]"));
  const searchInput = document.getElementById("report-search-input");
  const searchClearBtn = document.getElementById("report-search-clear");
  const visibleCountEl = document.getElementById("visible-count");
  const emptyStateEl = document.getElementById("reports-empty");
  const resetFilterBtn = document.getElementById("reset-filter-btn");

  // Modal elements
  const modal = document.getElementById("report-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const modalImg = document.getElementById("modal-img");
  const modalImgLink = document.getElementById("modal-img-link");
  const modalCat = document.getElementById("modal-cat");
  const modalDate = document.getElementById("modal-date");
  const modalTitle = document.getElementById("modal-report-title");
  const modalSummary = document.getElementById("modal-summary");
  const modalDataRequired = document.getElementById("modal-data-required");
  const modalOutcomes = document.getElementById("modal-outcomes");
  const modalStatValue = document.getElementById("modal-stat-value");
  const modalStatLabel = document.getElementById("modal-stat-label");
  const modalDummyDownload = document.getElementById("modal-dummy-download");

  let currentCategory = "all";
  let currentSearchQuery = "";

  // Dynamic Count Calculation
  const updateCounts = () => {
    const counts = {
      all: cards.length,
      intelligence: 0,
      pasien: 0,
      pasar: 0,
      strategi: 0
    };

    cards.forEach((card) => {
      const cat = card.getAttribute("data-category");
      if (counts[cat] !== undefined) {
        counts[cat]++;
      }
    });

    Object.keys(counts).forEach((key) => {
      const el = document.getElementById(`count-${key}`);
      if (el) el.textContent = String(counts[key]);
    });
  };

  updateCounts();

  // Filter & Search Handler
  const applyFilterAndSearch = () => {
    let visibleCount = 0;

    cards.forEach((card) => {
      const cardCategory = card.getAttribute("data-category") || "";
      const cardTitle = (card.getAttribute("data-title") || "").toLowerCase();
      const cardSummary = (card.getAttribute("data-summary") || "").toLowerCase();
      const cardCatName = (card.getAttribute("data-category-name") || "").toLowerCase();

      const matchesCategory = (currentCategory === "all" || cardCategory === currentCategory);
      const matchesSearch = !currentSearchQuery || 
        cardTitle.includes(currentSearchQuery) || 
        cardSummary.includes(currentSearchQuery) || 
        cardCatName.includes(currentSearchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = "flex";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    if (visibleCountEl) {
      visibleCountEl.textContent = String(visibleCount);
    }

    if (emptyStateEl) {
      emptyStateEl.style.display = visibleCount === 0 ? "block" : "none";
    }
  };

  // Filter Buttons Click
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => {
        b.classList.remove("is-active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");
      currentCategory = btn.getAttribute("data-filter") || "all";
      applyFilterAndSearch();
    });
  });

  // Search Input Event
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearchQuery = e.target.value.trim().toLowerCase();
      if (searchClearBtn) {
        searchClearBtn.style.display = currentSearchQuery ? "block" : "none";
      }
      applyFilterAndSearch();
    });
  }

  // Clear Search Button
  if (searchClearBtn && searchInput) {
    searchClearBtn.addEventListener("click", () => {
      searchInput.value = "";
      currentSearchQuery = "";
      searchClearBtn.style.display = "none";
      searchInput.focus();
      applyFilterAndSearch();
    });
  }

  // Reset Filter Button (Empty state)
  if (resetFilterBtn) {
    resetFilterBtn.addEventListener("click", () => {
      currentCategory = "all";
      currentSearchQuery = "";
      if (searchInput) searchInput.value = "";
      if (searchClearBtn) searchClearBtn.style.display = "none";
      
      filterBtns.forEach((b) => {
        const isAll = b.getAttribute("data-filter") === "all";
        b.classList.toggle("is-active", isAll);
        b.setAttribute("aria-selected", String(isAll));
      });

      applyFilterAndSearch();
    });
  }

  // Open Modal function
  const openModal = (card) => {
    if (!modal) return;

    const title = card.getAttribute("data-title") || "";
    const catName = card.getAttribute("data-category-name") || "";
    const date = card.getAttribute("data-date") || "";
    const imgSrc = card.getAttribute("data-img") || "";
    const statVal = card.getAttribute("data-stat") || "";
    const statLbl = card.getAttribute("data-stat-label") || "";
    const summary = card.getAttribute("data-summary") || "";
    const dataReqStr = card.getAttribute("data-required") || "";
    const outcomesStr = card.getAttribute("data-outcomes") || "";

    if (modalTitle) modalTitle.textContent = title;
    if (modalCat) modalCat.textContent = catName;
    if (modalDate) modalDate.textContent = date;
    if (modalImg) {
      modalImg.src = imgSrc;
      modalImg.alt = title;
    }
    if (modalImgLink) {
      modalImgLink.href = imgSrc;
    }
    if (modalStatValue) modalStatValue.textContent = statVal;
    if (modalStatLabel) modalStatLabel.textContent = statLbl;
    if (modalSummary) modalSummary.textContent = summary;

    // Render Data yang dibutuhkan
    if (modalDataRequired) {
      modalDataRequired.innerHTML = "";
      const reqList = dataReqStr.split("|");
      reqList.forEach((item) => {
        if (item.trim()) {
          const li = document.createElement("li");
          li.textContent = item.trim();
          modalDataRequired.appendChild(li);
        }
      });
    }

    // Render Manfaat / Yang didapatkan
    if (modalOutcomes) {
      modalOutcomes.innerHTML = "";
      const outList = outcomesStr.split("|");
      outList.forEach((item) => {
        if (item.trim()) {
          const li = document.createElement("li");
          li.textContent = item.trim();
          modalOutcomes.appendChild(li);
        }
      });
    }

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (modalCloseBtn) modalCloseBtn.focus();
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  // Card click & keyboard event
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      openModal(card);
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(card);
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeModal);
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("is-open")) {
      closeModal();
    }
  });

  // Simulated download button
  if (modalDummyDownload) {
    modalDummyDownload.addEventListener("click", () => {
      alert("📥 Simulasi Unduh Laporan: Dokumen laporan resmi INSIDER disusun secara khusus berdasarkan data aktual klinik Anda. Silakan hubungi tim kami untuk mendiskusikan implementasi laporan ini.");
    });
  }

  // Smooth scroll back to top
  const backTop = document.getElementById("reports-back-top");
  if (backTop) {
    backTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
