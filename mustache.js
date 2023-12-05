// Book list data
const bookList = [
  {
    genre: "Fantasy",
    books: [
      { author: "J.K. Rowling", title: "Harry Potter", price: "$19.99" },
      { author: "George R.R. Martin", title: "A Game of Thrones", price: "$24.99" },
      { author: "Terry Pratchett", title: "Discworld", price: "$15.99" },
      { author: "Neil Gaiman", title: "American Gods", price: "$21.99" },
      { author: "Brandon Sanderson", title: "Mistborn", price: "$18.99" }
    ],
  },
  {
    genre: "Fairy Tales",
    books: [
      { author: "Hans Christian Andersen", title: "The Little Mermaid", price: "$14.99" },
      { author: "Brothers Grimm", title: "Cinderella", price: "$16.99" },
      { author: "Charles Perrault", title: "Beauty and the Beast", price: "$12.99" },
      { author: "Lewis Carroll", title: "Alice's Adventures in Wonderland", price: "$20.99" },
      { author: "J.M. Barrie", title: "Peter Pan", price: "$17.99" }
    ],
  },
];

// Select all elements with class "book-shelf"
const bookShelves = $(".book-shelf");

// Generate HTML for each bookshelf and append it to the DOM
bookList.forEach(shelf => {
  const shelfHTML = `
    <div class="shelf" data-genre="${shelf.genre}">
      <h2 class="book-shelf-title">${shelf.genre} Books</h2>
      <button class="book-shelf-btn">Shop now</button>
      <ul class="book-list" style="display: none"></ul>
    </div>
  `;
  bookShelves.append(shelfHTML);
});

// Event handling for dynamically generated buttons
bookShelves.on("click", ".book-shelf-btn", function () {
  const bookList = $(this).siblings(".book-list");
  const genre = $(this).closest(".shelf").data("genre");
  const booksData = bookList.find(shelf => shelf.genre === genre).books;
  toggleBookList(bookList, booksData);
});

// Function to toggle book list visibility
function toggleBookList(bookListId, booksData) {
  let bookList = $(bookListId);
  let isHidden = bookList.is(":hidden");

  if (isHidden) {
    let template = "{{#books}}<li>{{ author }} - {{ title }} - {{ price }}</li>{{/books}}";
    let renderedBooks = Mustache.render(template, { books: booksData });
    bookList.html(renderedBooks);
    bookList.show();
  } else {
    bookList.hide();
  }
}

// Banner Fetching
// Function to render banner with fetched data
function renderBanner(bannerID, bannerData) {
  let banner = $(bannerID);
  let bannerTemplate =
    "{{#banner}}<div class='banner-content'><div class='banner-text'><ul></li><li><h3>Ads</h3></li><li>{{ title }}</li><li>{{ description }}</li><li>Buy Now! Price: ${{ price }}</li></ul></div><div class='banner-image'><img src='{{ image }}' alt='{{ title }}'></div></div>{{/banner}}";
  let renderedBanner = Mustache.render(bannerTemplate, { banner: bannerData });
  banner.html(renderedBanner);
  banner.show();
}

// Fetch data from the API and render the banner
fetch("https://fakestoreapi.com/products/1")
  .then((res) => res.json())
  .then((json) => {
    console.log(json);
    renderBanner("#banner", json);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
