/**
 * PÃ¡gina de lista de tutoriais - Busca e paginaÃ§Ã£o
 */
(function () {
  const ITEMS_PER_PAGE = 5;
  const list = document.getElementById('tutorial-list');
  const searchInput = document.getElementById('tutorial-search');
  const paginationEl = document.getElementById('pagination');
  const paginationNumbers = document.getElementById('pagination-numbers');
  const emptyEl = document.getElementById('tutorial-empty');

  if (!list || !searchInput || !paginationNumbers) return;

  const items = Array.from(list.querySelectorAll('.tutorial-item'));
  let currentPage = 1;
  let filteredItems = [...items];

  function getSearchTerm() {
    return searchInput.value.trim().toLowerCase();
  }

  function filterItems() {
    const term = getSearchTerm();
    if (!term) {
      filteredItems = [...items];
    } else {
      const words = term.split(/\s+/);
      filteredItems = items.filter((item) => {
        const searchText = (item.getAttribute('data-search') || '').toLowerCase();
        return words.every((word) => searchText.includes(word));
      });
    }
  }

  function renderPage() {
    filterItems();
    const total = filteredItems.length;
    const totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));
    currentPage = Math.min(currentPage, totalPages);

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const visibleItems = filteredItems.slice(start, end);

    if (emptyEl) {
      emptyEl.style.display = total === 0 ? 'block' : 'none';
    }

    items.forEach((item) => {
      item.style.display = visibleItems.includes(item) ? '' : 'none';
    });

    renderPagination(totalPages, total);
  }

  function renderPagination(totalPages, total) {
    paginationNumbers.innerHTML = '';

    if (totalPages <= 1 || total === 0) {
      paginationEl.style.display = 'none';
      return;
    }

    paginationEl.style.display = '';

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pagination__btn' + (i === currentPage ? ' pagination__btn--active' : '');
      btn.textContent = i;
      btn.setAttribute('aria-label', `PÃ¡gina ${i}`);
      btn.setAttribute('aria-current', i === currentPage ? 'page' : null);
      btn.addEventListener('click', () => {
        currentPage = i;
        renderPage();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      paginationNumbers.appendChild(btn);
    }
  }

  searchInput.addEventListener('input', () => {
    currentPage = 1;
    renderPage();
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchInput.value = '';
      currentPage = 1;
      renderPage();
      searchInput.blur();
    }
  });

  renderPage();
})();