document.addEventListener('DOMContentLoaded', () => {
  // 1. FadeUp Intersection Observer
  const fadeUpElements = document.querySelectorAll('.fade-up');
  const observerOptions = {
    threshold: 0.12
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeUpElements.forEach(el => {
    observer.observe(el);
  });

  // 2. SVG Comet & Draw Icon Animation Re-trigger on hover
  const animatedCards = document.querySelectorAll('.hero-icon-card, .mission-action-btn');
  animatedCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      // Retrigger comet path animation
      const cometPath = card.querySelector('.hero-icon-card-comet-path, .mission-action-btn-comet-path');
      if (cometPath) {
        cometPath.style.animation = 'none';
        void cometPath.offsetWidth; // trigger reflow
        cometPath.style.animation = '';
      }

      // Retrigger inner icon draw animation
      const drawIcon = card.querySelector('.draw-icon');
      if (drawIcon) {
        // Clone and replace to restart CSS animation properly on child paths
        const clonedIcon = drawIcon.cloneNode(true);
        drawIcon.parentNode.replaceChild(clonedIcon, drawIcon);
      }
    });
  });

  // 3. Tab Logic for Community Section
  const noticeBtn = document.getElementById('tab-notice');
  const archiveBtn = document.getElementById('tab-archive');
  const noticeList = document.getElementById('list-notice');
  const archiveList = document.getElementById('list-archive');

  if (noticeBtn && archiveBtn && noticeList && archiveList) {
    noticeBtn.addEventListener('click', () => {
      noticeBtn.classList.add('active');
      archiveBtn.classList.remove('active');
      noticeList.style.display = 'block';
      archiveList.style.display = 'none';
    });

    archiveBtn.addEventListener('click', () => {
      archiveBtn.classList.add('active');
      noticeBtn.classList.remove('active');
      archiveList.style.display = 'block';
      noticeList.style.display = 'none';
    });
  }
});
