let myLibrary = [];
let i = 0;
const UPLOADBOOK = document.querySelector(".upload-book");
const SUBMITFORM = document.getElementById("upload-book");
const SUBMITBUTTON = document.getElementById("submit-book");
const CREATEBOOKBTN = document.querySelector(".create-book");
const LIBRARY = document.querySelector(".library");
const BOOKCARDS = document.querySelector(".book-cards");
// const TOGGLEREADBUTTON = document.querySelector(".toggle-read");

CREATEBOOKBTN.addEventListener("click", showSubmitWindow);

SUBMITBUTTON.addEventListener("click", () => {
    submitBook();
    createBookCard(i);
    i++;
    UPLOADBOOK.classList.toggle("active");
});

function showSubmitWindow() {

  SUBMITFORM.reset();

  UPLOADBOOK.classList.toggle("active");

}

function createBookCard(i) {
    const book = myLibrary[i];

    const changeReadSlider = document.createElement("button");
    changeReadSlider.classList.add("toggle-read");
    changeReadSlider.dataset.position = i;

    const deleteButton = document.createElement("button");
    deleteButton.dataset.position = changeReadSlider.dataset.position;
    deleteButton.classList.add("delete-book");
    deleteButton.innerText = "Delete Book";

    const card = document.createElement("div");
    card.classList.add("card")
    card.dataset.position = changeReadSlider.dataset.position;

    const titleContainer = document.createElement("h2");
    if (book.title === undefined) return
    titleContainer.innerText = book.title;

    const authorContainer = document.createElement("h2");
    if (book.author === undefined) return
    authorContainer.innerText = book.author;

    const pagesContainer = document.createElement("p");
    if (book.pages === undefined) book.pages = 0;
    pagesContainer.innerText = `Number of pages: ${book.pages}`;

    let readContainer = document.createElement("p");
    if (book.read) {
      readContainer.innerText = "You've already read this book";
    } else {
      readContainer.innerText = "In to-read list";
    }

    const funkyButtons = document.createElement("div");
    funkyButtons.classList.add("function-buttons");
    funkyButtons.appendChild(changeReadSlider);
    funkyButtons.appendChild(deleteButton);

    readState = book.read;

    let cardElements = [titleContainer, authorContainer, pagesContainer, readContainer, funkyButtons];

    cardElements.forEach((element) => {
      card.appendChild(element);
    });

    BOOKCARDS.appendChild(card);

    changeReadSlider.addEventListener('click', (e) => {
      const position = parseInt(e.target.dataset.position);
      toggleRead(position);

      if (book.read) {
        readContainer.innerText = "You've already read this book";
      } else {
        readContainer.innerText = "In to-read list";
      }
    });

    deleteButton.addEventListener('click', (e) => {
      const position = e.target.dataset.position;
      deleteBookCard(position);
      deleteBook(position);
    });
}

function submitBook() {
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const pagInput = document.getElementById('pages');
    const isRead = document.getElementById('isRead');

    const book = new Books(titleInput.value, authorInput.value, pagInput.value, isRead.checked, i);

    myLibrary.push(book);
}

function deleteBookCard(position) {
  const BookCard = document.querySelector(`.card[data-position="${position}"]`);

  BookCard.remove();

}

function deleteBook(position) {
  myLibrary.splice(position, 1);
  i--;
}

function Books(title, author, pages, read, pos) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.position = pos;
}

const toggleRead = function(position) {
    var _FOUND = myLibrary.find(function(book,index) {
      if (book.position === position) {
          return true
      }});
      
    myLibrary[position].read = !myLibrary[position].read;
}
