// Book list data
const bookList = [
  {
    genre: "Fantasy",
    books: [
      { author: "J.K. Rowling", title: "Harry Potter", price: "$19.99", image: "https://cdn.dc5.ro/img-prod/98719839-1.jpeg" },
      { author: "George R.R. Martin", title: "A Game of Thrones", price: "$24.99", image: "https://cdn.dc5.ro/img-prod/98719839-1.jpeg" },
      { author: "Terry Pratchett", title: "Discworld", price: "$15.99", image: "https://cdn.dc5.ro/img-prod/98719839-1.jpeg" },
      { author: "Neil Gaiman", title: "American Gods", price: "$21.99", image: "https://cdn.dc5.ro/img-prod/98719839-1.jpeg" },
      { author: "Brandon Sanderson", title: "Mistborn", price: "$18.99", image: "https://cdn.dc5.ro/img-prod/98719839-1.jpeg" }
    ],
  },
  {
    genre: "Fairy Tales",
    books: [
      { author: "Hans Christian Andersen", title: "The Little Mermaid", price: "$14.99", image: "https://cdn.dc5.ro/img-prod/98719839-1.jpeg" },
      { author: "Brothers Grimm", title: "Cinderella", price: "$16.99", image: "https://cdn.dc5.ro/img-prod/98719839-1.jpeg" },
      { author: "Charles Perrault", title: "Beauty and the Beast", price: "$12.99", image: "https://cdn.dc5.ro/img-prod/98719839-1.jpeg" },
      { author: "Lewis Carroll", title: "Alice's Adventures in Wonderland", price: "$20.99", image: "https://cdn.dc5.ro/img-prod/98719839-1.jpeg" },
      { author: "J.M. Barrie", title: "Peter Pan", price: "$17.99", image: "https://cdn.dc5.ro/img-prod/98719839-1.jpeg" }
    ],
  },
];

// Mustache template for rendering books
const template = `
{{#books}}
  <li onclick="togglePopup('{{author}}', '{{title}}', '{{price}}', '{{image}}')">
    <img src="{{image}}" alt="{{title}} Cover" width="15" height="20">
    {{ author }} - {{ title }} - {{ price }}
  </li>
{{/books}}
`;

// Popup displaying book details
function togglePopup(author, title, price, image) {
  $("#popup-image").attr("src", image);
  $("#popup-image").attr("alt", `${title} Cover`);
  $("#popup-title").text(title);
  $("#popup-author").text(`Author: ${author}`);
  $("#popup-price").text(`Price: ${price}`);
  $(".modal").toggle();
  $(".popup").toggle();
}

$(document).mouseup(function (e) {
  const popup = $(".popup");
  const modal = $(".modal");
  if (!popup.is(e.target) && popup.has(e.target).length === 0) {
    popup.hide();
    modal.hide();
  }
});

// Close button functionality
function closePopup() {
  $(".popup").hide();
}

// Bind the closePopup function to the close button
$(".close-btn").on("click", closePopup);

// Function to generate HTML for a bookshelf dynamically
function generateBookshelfHtml(genre, btnId, shelfId, booksId, booksData) {
  return `
    <div class="book-shelf">
      <div id="${shelfId}">
        <h2 class="book-shelf-title">${genre} Books</h2>
        <button id="${btnId}">Shop now</button>
        <ul id="${booksId}" style="display: none"></ul>
      </div>
    </div>
  `;
}

// Container element for bookshelves
const container = $(".book-shelf");

// Loop through each genre and create corresponding bookshelves
bookList.forEach(({ genre, books }, index) => {
  const btnId = `btn-${index}`;
  const shelfId = `shelf-${index}`;
  const booksId = `books-${index}`;

  // Append dynamically generated bookshelf HTML to the container
  container.append(generateBookshelfHtml(genre, btnId, shelfId, booksId, books));

  // Attach event handler for the "Shop now" button click
  $(`#${btnId}`).on("click", function () {
    toggleBookList(`#${booksId}`, books, genre);
  });
});

// Function to toggle visibility of the book list
function toggleBookList(bookListId, booksData, genre) {
  const bookList = $(bookListId);
  const isHidden = bookList.is(":hidden");

  if (isHidden) {
    // Render books using Mustache template and show the book list
    const renderedBooks = Mustache.render(template, { books: booksData, genre: genre });
    bookList.html(renderedBooks).show();
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
