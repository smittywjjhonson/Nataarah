/**
 * NATAARAH — Business · Strategy · Creative
 * Reports Showcase Interactivity (Modal Lightbox & Image Preview)
 * Real report samples with permanently watermarked assets
 */

document.addEventListener("DOMContentLoaded", () => {
  const cards = Array.from(document.querySelectorAll(".report-card"));

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

  // Open Modal function
  const openModal = (card) => {
    if (!modal) return;
    const translate = (text) => window.nataarahTranslateText ? window.nataarahTranslateText(text) : text;

    const title = translate(card.getAttribute("data-title") || "");
    const catName = translate(card.getAttribute("data-category-name") || "");
    const date = card.getAttribute("data-date") || "";
    const imgSrc = card.getAttribute("data-img") || "";
    const statVal = translate(card.getAttribute("data-stat") || "");
    const statLbl = translate(card.getAttribute("data-stat-label") || "");
    const summary = translate(card.getAttribute("data-summary") || "");
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
          li.textContent = translate(item.trim());
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
          li.textContent = translate(item.trim());
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

  // Smooth scroll back to top
  const backTop = document.getElementById("reports-back-top");
  if (backTop) {
    backTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
