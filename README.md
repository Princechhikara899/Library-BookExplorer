# Library

## Project Overview

Library is a web application where users can explore and discover books using a public API. The idea behind this project is to create a simple and clean interface that feels like browsing through a digital library. Users can search for books, view details, and manage their own list of favorites.

---

## Objective

The purpose of this project is to apply what I have learned in JavaScript, especially working with APIs and handling data using array methods. It also focuses on building a responsive and user-friendly interface.

---

## Features

* Search for books using keywords like title or author
* Browse a collection of books fetched from the API
* Filter books based on publish year or author
* Sort books by newest, oldest, or alphabetical order
* Add and remove books from a favorites list
* Works on different screen sizes (mobile, tablet, desktop)

---

## API Used

This project uses the Open Library Search API.

Base URL:
https://openlibrary.org/search.json


The API provides information such as book titles, authors, publish years, cover images, and edition details.

---

## Use of Higher-Order Functions

In this project, I used JavaScript array methods instead of traditional loops:

* map() to display book data on the page
* filter() for searching and filtering results
* sort() to arrange books in different orders
* find() to manage the favorites list

---

## Project Structure

``` markdown
library/
│── index.html                         
│── explore.html
│── favorites.html
│── about.html
│
│── css/
│   └── style.css
│
│── js/
│   ├── app.js
│   ├── api.js
│   └── utils.js
│
│── assets/
│   └── images/
│
└── README.md
```
---

## How to Run the Project

1. Clone the repository:
   git clone https://github.com/your-username/library.git

2. Open the project folder

3. Open index.html in your browser

---

## Milestones

* Milestone 1: Project setup and planning
* Milestone 2: API integration
* Milestone 3: Adding features
* Milestone 4: Final deployment

---

## Future Improvements

* Add pagination or load more functionality
* Improve search performance using debouncing
* Store favorites using local storage
* Add infinite scrolling

---

## Author

Prince Chhikara
This project was developed as part of a JavaScript assignment.
