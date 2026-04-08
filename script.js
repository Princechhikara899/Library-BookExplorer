const searchInput = document.getElementById("searchInput");
const bookGrid = document.getElementById("bookGrid");
const loadingState = document.getElementById("loadingState");
const emptyState = document.getElementById("emptyState");

const toggleBtn = document.getElementById("toggleBtn");
const yearFilter = document.getElementById("yearFilter");
const resetBtn = document.getElementById("resetFiltersBtn");


let allBooks = [];


async function searchBooks(query) {
    if (query === "") return;

    loadingState.classList.remove("hidden");
    bookGrid.innerHTML = "";
    emptyState.classList.add("hidden");

    try {
        const res = await fetch(`https://openlibrary.org/search.json?q=${query}`);

        if (!res.ok) {
            throw new Error("Fetch failed");
        }

        const data = await res.json();

        allBooks = data.docs.slice(0, 50);

        displayBooks(allBooks);

    } catch (error) {
        console.log("Error:", error);
    }

    loadingState.classList.add("hidden");
}

function displayBooks(books) {
    bookGrid.innerHTML = "";

    if (books.length === 0) {
        emptyState.classList.remove("hidden");
        return;
    }

    books.forEach(book => {
        const div = document.createElement("div");
        div.classList.add("book-card");

        div.innerHTML = `
            <h3>${book.title}</h3>
            <p>${book.author_name ? book.author_name[0] : "Unknown Author"}</p>
            <p>${book.first_publish_year || "N/A"}</p>
        `;

        bookGrid.appendChild(div);
    });
}

searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        searchBooks(searchInput.value.trim());
    }
});

yearFilter.addEventListener("input", function () {
    const year = yearFilter.value;

    if (year === "") {
        displayBooks(allBooks);
        return;
    }

    const filteredBooks = allBooks.filter(book => {
        return book.first_publish_year == year;
    });

    displayBooks(filteredBooks);
});

resetBtn.addEventListener("click", function () {
    searchInput.value = "";
    yearFilter.value = "";
    bookGrid.innerHTML = "";
    emptyState.classList.add("hidden");
});


toggleBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {
        toggleBtn.textContent = "Light Mode";
    } else {
        toggleBtn.textContent = "Dark Mode";
    }
});