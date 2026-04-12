# 📚 Book Explorer Library

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

## 📌 Project Overview

**Book Explorer Library** is a robust, dynamic, and fully responsive single-page web application that allows users to discover, search, and manage a vast collection of books. Designed with a premium aesthetic and rich user interaction in mind, it provides a seamless experience for finding books, viewing detailed information, and saving favorites—all powered by real-time data from the **Open Library API**.

This project represents the culminating milestone for the web development curriculum, demonstrating advanced vanilla JavaScript concepts, RESTful API integration, and modern UI/UX design.

## 🎯 Objectives & Milestones Achieved
- **Milestone 1:** Project setup, UI foundation, and README documentation.
- **Milestone 2:** Seamless API integration using `fetch()` and handling dynamic data.
- **Milestone 3:** Core interactivity using Array Higher-Order Functions (`map`, `filter`, `sort`, `find`).
- **Milestone 4:** Final codebase refactoring, cleanup, and documentation.

---

## ✨ Core Features

- 🔍 **Real-Time Search**: Search for books by title or author instantly.
- 🗂️ **Dynamic Filtering**: Filter the retrieved book library precisely by the publish year.
- 🔃 **Custom Sorting**: Sort the results by relevance, title (A-Z/Z-A), or publish year (Newest/Oldest).
- ⭐ **Favorites System**: Allow users to 'favorite' books to view them in their personalized curated collection. 
- 🌓 **Theme Toggle**: A fully integrated Light/Dark mode toggle for improved accessibility and user experience.
- 📱 **Responsive Design**: Fluid and modern layout tailored for Desktop, Tablet, and Mobile screens.

---

## ⚡ Bonus Features Implemented

To enhance performance and user experience, several advanced optimizations were included:
- **Debouncing**: Applied to the search input field to prevent excessive, unnecessary API requests on every keystroke, limiting API calls effectively.
- **Loading Indicators**: Visual feedback (spinner/loading text) presented to the user while fetching API data.
- **Active Filter Tags**: Dynamic UI elements showing current filters, with the ability to clear them instantly.
- **Modal Overlays**: A detailed expanded view fetching additional descriptive text and subjects for each clicked book.

---

## 🛠️ Built With

- **HTML5** - Semantic layout structure.
- **CSS3 (Vanilla)** - Premium styling, custom CSS variables, flexbox/grid layouts, and smooth micro-animations.
- **JavaScript (ES6+)** - Advanced DOM manipulation, asynchronous operations, and strict usage of Higher-Order Functions over traditional loops. 

---

## 📡 API Reference

This application retrieves data from the **[Open Library API](https://openlibrary.org/developers/api)**.

- **Search Query Endpoint**: `https://openlibrary.org/search.json?q={query}&limit={limit}`
- **Details Endpoint**: `https://openlibrary.org{bookKey}.json`
- **Covers API**: `https://covers.openlibrary.org/b/id/{cover_id}-M.jpg`

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites
A modern web browser (Google Chrome, Mozilla Firefox, Safari, Edge) and Git installed on your system.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/library.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd library
   ```
3. **Run the Project:**
   Simply open the `index.html` file in your preferred web browser. No local development server or npm installation is required!

---

## 💡 Code Highlights: Higher-Order Functions

As per the project requirements, traditional `for` or `while` loops have been exclusively replaced with functional array methods:
- **`map()`**: Used extensively to transform the raw API JSON data into HTML elements.
- **`filter()`**: Powering the ability to sift through book arrays to display only favorites, or books matching a specific publication year.
- **`sort()`**: Implementing the multi-criteria sorting handler algorithm.
- **`find()`**: Used in checking and toggling states in the Favorites array.

---

## 👨‍💻 Author

**Prince Chhikara**  
*Developed as part of the JavaScript API Integration Milestone.*
