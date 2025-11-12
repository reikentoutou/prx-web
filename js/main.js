document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  let lastScrollY = window.scrollY;
  const threshold = 8;

  if (navbar) {
    window.addEventListener("scroll", () => {
      const currentY = window.scrollY;

      if (currentY > lastScrollY + threshold && currentY > 120) {
        navbar.classList.add("navbar--hidden");
      } else if (currentY < lastScrollY - threshold) {
        navbar.classList.remove("navbar--hidden");
      }

      lastScrollY = currentY;
    });
  }

  const cards = document.querySelectorAll("#teams .person-card");

  const toggleCard = (card) => {
    card.classList.toggle("person-card--flipped");
    const pressed = card.classList.contains("person-card--flipped");
    card.setAttribute("aria-pressed", String(pressed));
  };

  cards.forEach((card) => {
    card.setAttribute("aria-pressed", "false");

    card.addEventListener("click", () => {
      toggleCard(card);
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleCard(card);
      }
    });
  });

  const revealTargets = document.querySelectorAll(".reveal");
  if (revealTargets.length) {
    const revealWithObserver = typeof IntersectionObserver !== "undefined";

    if (revealWithObserver) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
      );

      revealTargets.forEach((target) => observer.observe(target));
    }

    const manualReveal = () => {
      revealTargets.forEach((target) => {
        if (target.classList.contains("is-visible")) return;
        const rect = target.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
          target.classList.add("is-visible");
        }
      });
    };

    manualReveal();
    window.addEventListener("scroll", manualReveal, { passive: true });
    window.addEventListener("resize", manualReveal);
  }
});
