document.addEventListener('DOMContentLoaded', () => {
  const tabs = [
    { buttonId: 'btn-1', divId: 'projects-column' },
    { buttonId: 'btn-2', divId: 'overview-column' },
    { buttonId: 'btn-3', divId: 'notes-column' }
  ];

  let currentMode = getMode();

  function getMode() {
    return window.getComputedStyle(document.body, '::before').content.replace(/"/g, '');
  }

  function isTabMode() {
    return getMode() === 'tab-mode';
  }

  function updateView(targetDivId = null) {
    const tabMode = isTabMode();

    tabs.forEach(({ buttonId, divId }) => {
      const button = document.getElementById(buttonId);
      const div = document.getElementById(divId);

      if (tabMode) {
        const isActive = divId === targetDivId;
        div.classList.toggle('active', isActive);
        button.classList.toggle('active', isActive);
      } else {
        div.classList.add('active');
        button.classList.remove('active');
      }
    });
  }

  // Attach click events
  tabs.forEach(({ buttonId, divId }) => {
    const button = document.getElementById(buttonId);
    button.addEventListener('click', () => {
      if (isTabMode()) {
        updateView(divId);
      }
    });
  });

  // On resize, reset to overview if switching into tab mode
  window.addEventListener('resize', () => {
    const newMode = getMode();
    if (newMode !== currentMode) {
      currentMode = newMode;
      if (newMode === 'tab-mode') {
        updateView('overview-column'); // Always show overview on enter
      } else {
        updateView(); // Show all if switching to desktop
      }
    }
  });

  // Add data-targets
  tabs.forEach(({ buttonId, divId }) => {
    document.getElementById(buttonId).dataset.target = divId;
  });

  // Initial view setup: Overview if in tab mode, else show all
  if (isTabMode()) {
    updateView('overview-column');
  } else {
    updateView();
  }
});
