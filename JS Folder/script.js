
let books = [];
let favorites = [];
let currentSort = 'relevance';
let currentYearFilter = '';
let searchQuery = 'reference book';
let showFavoritesOnly = false;
let searchTimeout = null;
let currentLimit = '50';

const searchInput = document.getElementById('searchInput');
const yearFilter = document.getElementById('yearFilter');
const sortSelect = document.getElementById('sortSelect');
const limitSelect = document.getElementById('limitSelect');
const resetFiltersBtn = document.getElementById('resetFiltersBtn');
const activeFiltersContainer = document.getElementById('activeFiltersContainer');
const themeToggle = document.getElementById('toggleBtn');
const favoritesToggle = document.getElementById('favoriteBtn');
const bookGrid = document.getElementById('bookGrid');
const loadingState = document.getElementById('loadingState');
const emptyState = document.getElementById('emptyState');
const emptyMessage = document.getElementById('emptyMessage');

const bookModal = document.getElementById('bookModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalCover = document.getElementById('modalCover');
const modalTitle = document.getElementById('modalTitle');
const modalAuthor = document.getElementById('modalAuthor');
const modalYear = document.getElementById('modalYear');
const modalSubjects = document.getElementById('modalSubjects');
const modalDescription = document.getElementById('modalDescription');

function handleSearch(e) {
  clearTimeout(searchTimeout);
  
  searchTimeout = setTimeout(() => {
    const query = e.target.value.trim();
    if (query.length > 2) {
      searchQuery = query;
      fetchBooks(query);
    } else if (query.length === 0) {
      searchQuery = 'reference book';
      fetchBooks(searchQuery);
    }
  }, 300);
}

function handleFilterAndSort() {
  currentYearFilter = yearFilter.value;
  currentSort = sortSelect.value;
  renderBooks();
}

function handleLimitChange(e) {
  currentLimit = e.target.value;
  fetchBooks(searchQuery);
}

function resetFilters() {
  yearFilter.value = '';
  currentYearFilter = '';
  sortSelect.value = 'relevance';
  currentSort = 'relevance';
  
  let needsRefetch = false;
  if (currentLimit !== '50') {
    limitSelect.value = '50';
    currentLimit = 50;
    needsRefetch = true;
  }
  
  if (showFavoritesOnly) {
    showFavoritesOnly = false;
    favoritesToggle.textContent = 'View Favorites';
    favoritesToggle.style.backgroundColor = 'transparent';
    favoritesToggle.style.color = 'var(--accent-gold)';
  }
  
  if (needsRefetch) {
    fetchBooks(searchQuery);
  } else {
    renderBooks();
  }
}

function toggleTheme() {
  document.body.classList.toggle('light-theme');
  const isLight = document.body.classList.contains('light-theme');
  themeToggle.textContent = isLight ? 'Dark Mode' : 'Light Mode';
}

function toggleFavoritesView() {
    if (showFavoritesOnly) {
  showFavoritesOnly = false;
} else {
  showFavoritesOnly = true;
}
  favoritesToggle.textContent = showFavoritesOnly ? 'View All Books' : 'View Favorites';
  favoritesToggle.style.backgroundColor = showFavoritesOnly ? 'var(--accent-gold)' : 'transparent';
  favoritesToggle.style.color = showFavoritesOnly ? '#000' : 'var(--accent-gold)';
  renderBooks();
}

function closeModal() {
  bookModal.classList.add('hidden');
}

function showLoading(active) {
  if(active) {
    loadingState.classList.remove('hidden');
    bookGrid.classList.add('hidden');
    emptyState.classList.add('hidden');
  } else {
    loadingState.classList.add('hidden');
    bookGrid.classList.remove('hidden');
  }
}

function showEmptyState(msg) {
  bookGrid.classList.add('hidden');
  emptyState.classList.remove('hidden');
  if(msg) emptyMessage.textContent = msg;
  else emptyMessage.textContent = "No books found. Try a different search.";
}


function init() {
  searchInput.addEventListener('input', handleSearch);
  yearFilter.addEventListener('input', handleFilterAndSort);
  sortSelect.addEventListener('change', handleFilterAndSort);
  limitSelect.addEventListener('change', handleLimitChange);
  resetFiltersBtn.addEventListener('click', resetFilters);
  themeToggle.addEventListener('click', toggleTheme);
  favoritesToggle.addEventListener('click', toggleFavoritesView);
  closeModalBtn.addEventListener('click', closeModal);
  

  bookModal.addEventListener('click', (e) => {
    if(e.target === bookModal) closeModal();
  });
  fetchBooks(searchQuery);
}

async function fetchBooks(query) {
    showLoading(true);
    try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=${currentLimit}`);
        const data = await response.json();

        books = data.docs.map(doc => ({
        key: doc.key,
        title: doc.title,
        author: doc.author_name ? doc.author_name[0] : 'Unknown Author',
        year: doc.first_publish_year || null,
        coverId: doc.cover_i || null
        }));
        renderBooks();
    } catch (error) {
    console.error("Error fetching books:", error);
    showEmptyState("An error occurred while fetching books. Please try again.");
    } finally {
        showLoading(false);
    }
}


function filterBooks(bookArray) {
    return bookArray.filter(book => {
        if (showFavoritesOnly) {
            const isFav = favorites.find(fav => fav.key === book.key) !== undefined;
            if (!isFav) return false;
        }
        
        
        if (currentYearFilter) {
            if (!book.year || book.year.toString() !== currentYearFilter) return false;
        }
        return true;
    });
}

function sortBooks(bookArray) {
  return [...bookArray].sort((a, b) => {
    if (currentSort === 'titleAsc') return a.title.localeCompare(b.title);
    if (currentSort === 'titleDesc') return b.title.localeCompare(a.title);
    
    if (currentSort === 'yearDesc') {
      const yearA = a.year || 0;
      const yearB = b.year || 0;
      return yearB - yearA;
    }

    if (currentSort === 'yearAsc') {
      const yearA = a.year || Infinity;
      const yearB = b.year || Infinity;
      return yearA - yearB;
    }

    return 0;
  });
}

function hideEmptyState() {
  emptyState.classList.add('hidden');
}


function toggleFavorite(event, bookKey) {
  event.stopPropagation();
  
  const existingFavIndex = favorites.findIndex(fav => fav.key === bookKey);
  
  if (existingFavIndex !== -1) {
    favorites = favorites.filter(fav => fav.key !== bookKey);
  } else {
    const bookToAdd = books.find(book => book.key === bookKey);
    if (bookToAdd) favorites = [...favorites, bookToAdd];
  }
  
  renderBooks();
}





function renderBooks() {
    let processedBooks = filterBooks(books);
    processedBooks = sortBooks(processedBooks);
    bookGrid.innerHTML = '';
    if (processedBooks.length === 0) {
        showEmptyState();
    return;
    }

    hideEmptyState();

    const htmlStrings = processedBooks.map(book => {
        const isFav = favorites.find(fav => fav.key === book.key) !== undefined;
        const coverUrl = book.coverId 
            ? `https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg` 
            : 'https://via.placeholder.com/300x450/222222/D4AF37?text=No+Cover';
        return `
            <div class="book-card" data-key="${book.key}">
                <img src="${coverUrl}" alt="${book.title} cover" class="book-cover" loading="lazy">
                <div class="book-info">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">${book.author}</p>
                    <p class="book-year">${book.year || 'Unknown Year'}</p>
                    <div class="card-actions">
                        <button class="btn-favorite ${isFav ? 'active' : ''}" data-key="${book.key}">
                            ${isFav ? '★ Favorited' : '☆ Add to Favorites'}
                        </button>
                    </div>
                </div>
            </div>
        `;

    });
  bookGrid.innerHTML = htmlStrings.join('');


  const bookCards = bookGrid.querySelectorAll('.book-card');
  bookCards.forEach(card => {
    card.addEventListener('click', () => {
      openBookDetails(card.getAttribute('data-key'));
    });
  });

  const favBtns = bookGrid.querySelectorAll('.btn-favorite');
  favBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      toggleFavorite(e, btn.getAttribute('data-key'));
    });
  });

  renderActiveTags();
}



function renderActiveTags() {
  if (!activeFiltersContainer) return;
  activeFiltersContainer.innerHTML = '';
  
  if (currentYearFilter) {
    const tag = document.createElement('span');
    tag.className = 'active-tag';
    tag.innerHTML = `Year: ${currentYearFilter} <span class="remove-tag" data-type="year">✕</span>`;
    activeFiltersContainer.appendChild(tag);
  }
  
  if (showFavoritesOnly) {
    const tag = document.createElement('span');
    tag.className = 'active-tag';
    tag.innerHTML = `Favorites <span class="remove-tag" data-type="fav">✕</span>`;
    activeFiltersContainer.appendChild(tag);
  }

  const removeBtns = activeFiltersContainer.querySelectorAll('.remove-tag');
  removeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const type = e.target.getAttribute('data-type');
      if (type === 'year') {
        yearFilter.value = '';
        currentYearFilter = '';
      } else if (type === 'fav') {
        toggleFavoritesView();
        return;
      }
      renderBooks();
    });
  });
}

async function openBookDetails(bookKey) {
  const book = books.find(b => b.key === bookKey);
  if (!book) return;

  modalTitle.textContent = book.title;
  modalAuthor.textContent = book.author;
  modalYear.querySelector('span').textContent = book.year || 'Unknown';
  modalCover.src = book.coverId 
      ? `https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg` 
      : 'https://via.placeholder.com/300x450/222222/D4AF37?text=No+Cover';
  
  modalDescription.textContent = 'Loading description...';
  modalSubjects.innerHTML = '';
  

  bookModal.classList.remove('hidden');

  await fetchExpandedBookData(bookKey);
}

async function fetchExpandedBookData(bookKey) {
  try {
    const response = await fetch(`https://openlibrary.org${bookKey}.json`);
    const data = await response.json();
    

    if (data.description) {

      const descText = typeof data.description === 'string' ? data.description : data.description.value;
      modalDescription.textContent = descText || "No description available for this book.";
    } else {
      modalDescription.textContent = "No description available for this book.";
    }

    if (data.subjects && data.subjects.length > 0) {
      const topSubjects = data.subjects.filter((_, index) => index < 5);
      const tagsHtml = topSubjects.map(sub => `<span class="tag">${sub}</span>`).join('');
      modalSubjects.innerHTML = tagsHtml;
    } else {
      modalSubjects.innerHTML = '<span class="tag">No subjects listed</span>';
    }
  } catch (error) {
    console.error("Failed to fetch detailed book data", error);
    modalDescription.textContent = "Could not load additional information.";
  }
}

init();