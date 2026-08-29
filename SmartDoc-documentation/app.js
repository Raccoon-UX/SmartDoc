// SmartDoc Interactive Documentation Engine

document.addEventListener('DOMContentLoaded', () => {
  initProgressBar();
  initSidebarScrollspy();
  initSearch();
  initCopyCodeButtons();
  initBackToTop();
  initMobileSidebar();
});

// 1. Reading Progress Bar
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

// 2. Sidebar and TOC Scrollspy
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

// 3. Fast Global Documentation Search
function initSearch() {
  const searchInput = document.getElementById('docSearchInput');
  const sections = document.querySelectorAll('.doc-section');

  if (!searchInput) return;

  // Keyboard shortcut '/' or 'Ctrl+K'
  window.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      searchInput.focus();
    }
  });

  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();

    if (!q) {
      sections.forEach((sec) => {
        sec.style.display = '';
      });
      return;
    }

    let firstMatch = null;

    sections.forEach((sec) => {
      const text = sec.innerText.toLowerCase();
      const id = sec.getAttribute('id') || '';
      
      if (text.includes(q) || id.includes(q)) {
        sec.style.display = '';
        if (!firstMatch) firstMatch = sec;
      } else {
        sec.style.display = 'none';
      }
    });

    if (firstMatch && q.length > 2) {
      firstMatch.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

// 4. Code Block Copy Buttons
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

// 5. Back to Top Button
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

// 6. Mobile Sidebar Drawer
function initMobileSidebar() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const sidebar = document.getElementById('docSidebar');

  if (!toggleBtn || !sidebar) return;

  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  // Close sidebar on link click on mobile
  const links = sidebar.querySelectorAll('.sidebar-link');
  links.forEach((l) => {
    l.addEventListener('click', () => {
      sidebar.classList.remove('open');
    });
  });
}
