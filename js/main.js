/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  /* Close mobile menu on link click */
  document.querySelectorAll("#mobileMenu a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
}

/* =========================================================
   ACTIVE NAVIGATION ON SCROLL
========================================================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const typingElement = document.getElementById("typing-text");
  if (!typingElement) return;

  // Daftar kata yang akan bergantian diketik
  const words = ["Information Systems Student", "Tech Enthusiast"];

  let wordIndex = 0; // Indeks kata saat ini
  let charIndex = words[0].length; // Mulai dari panjang kata pertama (karena sudah ada di HTML)
  let isDeleting = true; // Status awal: mulai dengan menghapus setelah jeda

  // Pengaturan Kecepatan (dalam milidetik)
  const typingSpeed = 100; // Kecepatan mengetik per karakter
  const erasingSpeed = 50; // Kecepatan menghapus per karakter
  const pauseAfterType = 2000; // Jeda diam setelah selesai mengetik kata (2 detik)
  const pauseAfterErase = 500; // Jeda diam setelah selesai menghapus kata (0.5 detik)

  function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      // Hapus 1 karakter
      charIndex--;
      typingElement.textContent = currentWord.substring(0, charIndex);
    } else {
      // Ketik 1 karakter
      charIndex++;
      typingElement.textContent = currentWord.substring(0, charIndex);
    }

    let currentSpeed = isDeleting ? erasingSpeed : typingSpeed;

    // Jika kata selesai diketik penuh
    if (!isDeleting && charIndex === currentWord.length) {
      currentSpeed = pauseAfterType; // Tahan dulu selama 2 detik
      isDeleting = true; // Siapkan untuk mulai menghapus
    }
    // Jika kata selesai dihapus penuh
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length; // Pindah ke kata berikutnya (looping)
      currentSpeed = pauseAfterErase; // Tahan sebentar sebelum mengetik kata baru
    }

    setTimeout(typeEffect, currentSpeed);
  }

  // Mulai animasi pertama kali setelah jeda awal
  setTimeout(typeEffect, pauseAfterType);
});

/* =========================================================
   LANYARD SWING ANIMATION (CLEAN)
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const lanyardContainer = document.querySelector(".lanyard-container");

  if (!lanyardContainer) return;

  // Memastikan animasi swing langsung berjalan aktif saat halaman dimuat/di-refresh
  lanyardContainer.style.animation = "lanyardSwing 5s ease-in-out infinite";
});

/* =========================================================
   STAGGERED REVEAL ANIMATION (FADE IN ON SCROLL)
========================================================= */

const setupStaggeredReveals = () => {
  const sectionContainers = document.querySelectorAll("section");

  sectionContainers.forEach((section) => {
    const cards = section.querySelectorAll(
      ".project-card, .stat-card, .stack-card, .certificate-card, .contact-social-card, .motto-card, .cyber-card",
    );

    cards.forEach((card, index) => {
      if (!card.classList.contains("reveal")) {
        card.classList.add("reveal");
        card.style.transitionDelay = `${(index % 4) * 0.15}s`;
      }
    });
  });

  const otherElements = document.querySelectorAll(
    "section, .section-heading, .photo-wrapper, .cyber-form, .hero-terminal",
  );

  otherElements.forEach((el) => {
    if (
      !el.classList.contains("reveal") &&
      !el.classList.contains("reveal-up") &&
      !el.classList.contains("reveal-left") &&
      !el.classList.contains("reveal-right")
    ) {
      el.classList.add("reveal");
    }
  });
};

setupStaggeredReveals();

// Mengamati semua elemen dengan selector animasi reveal
const revealElements = document.querySelectorAll(
  ".reveal, .reveal-up, .reveal-left, .reveal-right",
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

/* =========================================================
   INTERACTIVE 3D TILT EFFECT ON CARDS
========================================================= */

const tiltCards = document.querySelectorAll(
  ".project-card, .stat-card, .stack-card, .certificate-card, .hero-terminal",
);

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  });
});

/* =========================================================
   SHOWCASE TABS WITH ANIMATION
========================================================= */

const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.tab;

    tabButtons.forEach((btn) => btn.classList.remove("active"));
    tabContents.forEach((content) => {
      content.classList.remove("active");
      content.style.opacity = "0";
      content.style.transform = "translateY(10px)";
    });

    button.classList.add("active");

    const targetContent = document.getElementById(target);
    if (targetContent) {
      targetContent.classList.add("active");
      setTimeout(() => {
        targetContent.style.opacity = "1";
        targetContent.style.transform = "translateY(0)";
        targetContent.style.transition = "all 0.4s ease";
      }, 50);
    }
  });
});

/* =========================================================
   COUNTER ANIMATION
========================================================= */

const counters = document.querySelectorAll(".counter");
let counterStarted = false;

function startCounter() {
  if (counterStarted) return;
  counterStarted = true;

  counters.forEach((counter) => {
    const target = Number(counter.dataset.target || counter.innerText);
    let current = 0;
    const increment = Math.max(1, Math.ceil(target / 40));

    const updateCounter = () => {
      current += increment;

      if (current >= target) {
        counter.textContent = target;
        return;
      }

      counter.textContent = current;
      requestAnimationFrame(updateCounter);
    };

    updateCounter();
  });
}

const statsSection =
  document.querySelector("#about") || document.querySelector(".stat-card");

if (statsSection) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        startCounter();
        statsObserver.disconnect();
      }
    },
    { threshold: 0.3 },
  );

  statsObserver.observe(statsSection);
}

/* =========================================================
   CONTACT FORM FEEDBACK ANIMATION
========================================================= */

const contactForm = document.querySelector(".cyber-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const button = contactForm.querySelector("button");
    if (!button) return;

    const originalText = button.innerHTML;

    button.innerHTML =
      '<i class="fa-solid fa-circle-notch fa-spin mr-2"></i> Mengirim...';
    button.disabled = true;

    setTimeout(() => {
      button.innerHTML =
        '<i class="fa-solid fa-check mr-2"></i> Pesan Terkirim!';
      button.classList.add("pulse");

      setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        button.classList.remove("pulse");
        contactForm.reset();
      }, 2500);
    }, 1200);
  });
}

/* =========================================================
   CERTIFICATE CLICK POPUP / ANIMATION
========================================================= */

function openCertModal(element) {
  const imgElement = element.querySelector('img');
  const modal = document.getElementById('certModal');
  const modalImg = document.getElementById('modalImg');

  if (imgElement && modal && modalImg) {
    modalImg.src = imgElement.src;
    modalImg.alt = imgElement.alt;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Mencegah halaman utama ter-scroll saat modal terbuka
  }
}

function closeCertModal() {
  const modal = document.getElementById('certModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto'; // Mengembalikan scroll halaman utama
  }
}

// Tutup modal jika user menekan tombol 'Esc'
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeCertModal();
  }
});

// Tutup modal jika user mengklik area luar gambar
document.getElementById('certModal')?.addEventListener('click', function(e) {
  if (e.target === this) {
    closeCertModal();
  }
});


// SECTION SHOWCASE
document.addEventListener("DOMContentLoaded", () => {
  const seeMoreBtn = document.getElementById("see-more-btn");
  const seeMoreText = document.getElementById("see-more-text");
  const seeMoreIcon = document.getElementById("see-more-icon");
  const seeMoreContainer = document.getElementById("see-more-container");
  const tabButtons = document.querySelectorAll(".tab-button");

  // Fungsi untuk mengecek ketersediaan item tambahan pada tab yang aktif
  function updateButtonVisibility() {
    const activeTabContent = document.querySelector(".tab-content.active");
    if (!activeTabContent) return;

    const extraItems = activeTabContent.querySelectorAll('[data-showmore="true"]');

    // Sembunyikan tombol jika tidak ada item ekstra (seperti pada tab Tech Stack)
    if (extraItems.length === 0) {
      seeMoreContainer.classList.add("hidden");
    } else {
      seeMoreContainer.classList.remove("hidden");

      // Cek apakah item sedang terbuka atau tertutup
      const isExpanded = Array.from(extraItems).some(item => !item.classList.contains("hidden"));
      if (isExpanded) {
        seeMoreText.textContent = "Show Less";
        seeMoreIcon.className = "fa-solid fa-chevron-up text-sm";
      } else {
        seeMoreText.textContent = "See More";
        seeMoreIcon.className = "fa-solid fa-chevron-down text-sm";
      }
    }
  }

  // Handle Klik Tombol See More / Show Less
  if (seeMoreBtn) {
    seeMoreBtn.addEventListener("click", () => {
      const activeTabContent = document.querySelector(".tab-content.active");
      if (!activeTabContent) return;

      const extraItems = activeTabContent.querySelectorAll('[data-showmore="true"]');
      const isExpanded = seeMoreText.textContent === "Show Less";

      extraItems.forEach(item => {
        if (isExpanded) {
          item.classList.add("hidden");
        } else {
          item.classList.remove("hidden");
        }
      });

      updateButtonVisibility();

      // Jika di-click "Show Less", scroll halus kembali ke atas tab
      if (isExpanded) {
        document.getElementById("showcase").scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // Update kondisi tombol saat berpindah Tab
  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      setTimeout(() => {
        updateButtonVisibility();
      }, 50);
    });
  });

  // Panggil saat halaman pertama dibuka
  updateButtonVisibility();
});



