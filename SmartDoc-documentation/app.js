// SmartDoc Interactive Documentation Engine

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initProgressBar();
  initSidebarScrollspy();
  initSearch();
  initCopyCodeButtons();
  initBackToTop();
  initMobileSidebar();
});

// 1. Dark / Light Mode Toggle with Persistence
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const storedTheme = localStorage.getItem('smartdoc_doc_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const currentTheme = storedTheme || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('smartdoc_doc_theme', nextTheme);
      updateThemeIcon(nextTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const iconSpan = document.getElementById('themeIcon');
  if (!iconSpan) return;
  iconSpan.innerHTML = theme === 'dark' ? '☀️' : '🌙';
}

// 2. Reading Progress Bar
function initProgressBar() {
  const progressBar = document.getElementById('progressBar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

// 3. Sidebar and TOC Scrollspy
function initSidebarScrollspy() {
  const sections = document.querySelectorAll('.doc-section');
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  const tocLinks = document.querySelectorAll('.toc-link');

  const observerOptions = {
    root: null,
    rootMargin: '-80px 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Update Sidebar active state
        sidebarLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        // Update TOC active state
        tocLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((sec) => observer.observe(sec));
}

// 4. Fast Global Documentation Search & Command Palette
function initSearch() {
  const searchBtn = document.getElementById('headerSearchBtn');
  const searchModal = document.getElementById('searchModal');
  const modalInput = document.getElementById('modalSearchInput');
  const modalClose = document.getElementById('searchModalClose');
  const modalResults = document.getElementById('modalSearchResults');
  const sections = document.querySelectorAll('.doc-section');

  const openSearch = () => {
    if (searchModal && modalInput) {
      searchModal.classList.add('open');
      modalInput.value = '';
      modalInput.focus();
      renderSearchResults('');
    }
  };

  const closeSearch = () => {
    if (searchModal) {
      searchModal.classList.remove('open');
    }
  };

  if (searchBtn) {
    searchBtn.addEventListener('click', openSearch);
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeSearch);
  }

  if (searchModal) {
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearch();
    });
  }

  // Keyboard shortcut '/' or 'Ctrl+K' / 'Cmd+K'
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchModal && searchModal.classList.contains('open')) {
      closeSearch();
    } else if (
      (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') ||
      ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')
    ) {
      e.preventDefault();
      openSearch();
    }
  });

  if (modalInput) {
    modalInput.addEventListener('input', (e) => {
      renderSearchResults(e.target.value.toLowerCase().trim());
    });
  }

  function renderSearchResults(q) {
    if (!modalResults) return;
    modalResults.innerHTML = '';

    if (!q) {
      // Default top 6 sections
      const defaultSections = Array.from(sections).slice(0, 6);
      defaultSections.forEach((sec) => {
        const id = sec.getAttribute('id');
        const title = sec.querySelector('.doc-h1')?.innerText || id;
        const tag = sec.querySelector('.doc-section-tag')?.innerText || 'Section';

        const item = document.createElement('a');
        item.href = `#${id}`;
        item.className = 'search-result-item';
        item.innerHTML = `
          <span>${title}</span>
          <span style="font-size: 11px; opacity: 0.6; font-family: monospace;">${tag}</span>
        `;
        item.addEventListener('click', closeSearch);
        modalResults.appendChild(item);
      });
      return;
    }

    let matches = 0;
    sections.forEach((sec) => {
      const id = sec.getAttribute('id');
      const text = sec.innerText.toLowerCase();
      const title = sec.querySelector('.doc-h1')?.innerText || id;
      const tag = sec.querySelector('.doc-section-tag')?.innerText || 'Section';

      if (text.includes(q) || id.includes(q) || title.toLowerCase().includes(q)) {
        matches++;
        const item = document.createElement('a');
        item.href = `#${id}`;
        item.className = 'search-result-item';
        item.innerHTML = `
          <span>${title}</span>
          <span style="font-size: 11px; color: var(--primary); font-family: monospace;">#${id}</span>
        `;
        item.addEventListener('click', closeSearch);
        modalResults.appendChild(item);
      }
    });

    if (matches === 0) {
      modalResults.innerHTML = `
        <div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 13px;">
          No matching documentation topics found for "<strong>${q}</strong>".
        </div>
      `;
    }
  }
}

// 5. Code Block Copy Buttons
function initCopyCodeButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const pre = btn.closest('.code-block-wrapper').querySelector('pre');
      if (!pre) return;

      const codeText = pre.innerText;
      navigator.clipboard.writeText(codeText).then(() => {
        const origText = btn.innerText;
        btn.innerText = 'Copied! ✓';
        btn.style.color = '#10B981';
        setTimeout(() => {
          btn.innerText = origText;
          btn.style.color = '';
        }, 2000);
      });
    });
  });
}

// 6. Back to Top Button
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// 7. Mobile Sidebar Drawer
function initMobileSidebar() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const sidebar = document.getElementById('docSidebar');

  if (!toggleBtn || !sidebar) return;

  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  const links = sidebar.querySelectorAll('.sidebar-link');
  links.forEach((l) => {
    l.addEventListener('click', () => {
      sidebar.classList.remove('open');
    });
  });
}
