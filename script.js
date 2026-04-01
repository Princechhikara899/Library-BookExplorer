const container = document.getElementById("container");
fetch("https://openlibrary.org/search.json?q=harry+potter")
  .then(response => response.json())
  .then(data => {
    data.docs.forEach(book => {
      const div = document.createElement("div");
      const title = document.createElement("h3");
      title.textContent = book.title;
      const img = document.createElement("img");
      if (book.cover_i) {
        img.src = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
      } else {
        img.src = "https://via.placeholder.com/100x150?text=No+Image";
      }
      div.appendChild(img);
      div.appendChild(title);
      container.appendChild(div);
    });
  })
  .catch(error => {
    console.log("Error:", error);
  });