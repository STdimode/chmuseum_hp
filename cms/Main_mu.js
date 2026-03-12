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

  // 2. SVG Comet Animation Re-trigger (simulating React key change on hover)
  // Instead of swapping key in React, we remove and re-add the element or clone to restart CSS animation if needed.
  // Actually, standard CSS `:hover` triggers the animation correctly on mouse enter since we defined it as `animation: cometSweep 2200ms forwards` inside the hover state in CSS.
  // We just need to make sure the animation runs cleanly. If re-trigger is needed every hover, we can force a reflow via JS.
  const animatedCards = document.querySelectorAll('.hero-icon-card, .mission-action-btn');
  animatedCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const path = card.querySelector('.hero-icon-card-comet-path, .mission-action-btn-comet-path');
      if (path) {
        path.style.animation = 'none';
        void path.offsetWidth; // trigger reflow
        path.style.animation = ''; // restore to let CSS rule take over
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
