let myLibrary = [];
let i = 0;
const UPLOADBOOK = document.querySelector(".upload-book");
const CREATEBOOKWINDOW = document.querySelector(".create-book-window");
const CREATEBOOKBTN = document.querySelector(".create-book");
const LIBRARY = document.querySelector(".library");
const BOOKCARDS = document.querySelector(".book-cards");

// CREATEBOOKWINDOW.addEventListener("click", createBookObject);
// ADDBOOK.addEventListener("click", addBookToMyLibrary);
CREATEBOOKBTN.addEventListener("click", createBookWindow);

function createInput(cls, type, id, placeholder = "") {
  const input = document.createElement("input");
  input.class = cls;
  input.type = type;
  input.id = id;
  input.placeholder = placeholder;
  input.required = 'required';

  return input
}


function createBookWindow() {
  const popup = document.createElement("div");
  const read = document.createElement("div");
  const submitButton = document.createElement("button");
  const readNotice = document.createElement("p");

  const titleInput = createInput("input", "text", "title", "Title");
  const authInput = createInput("input", "text", "author", "Author");
  const pagInput = createInput("input", "number", "pages", "Pages");
  const readInput = createInput("checkbox", "checkbox", "isRead");

  popup.classList.add("upload-book");

  submitButton.type = "button";
  submitButton.name = "submit";
  submitButton.id = "submitBook";
  submitButton.innerText = "Submit";
  readNotice.innerText = "Already read? "

  LIBRARY.appendChild(popup);
  popup.appendChild(titleInput);
  popup.appendChild(authInput);
  popup.appendChild(pagInput);
  popup.appendChild(read);
  read.appendChild(readNotice);
  read.appendChild(readInput);
  popup.appendChild(submitButton);

  submitButton.addEventListener("click", () => {
      submitBook();
      createBookCard(i);
      i++;
      deleteBookWindow();
    });
}

function createBookCard(i) {
    const book = myLibrary[i];

    const changeReadSlider = document.createElement("button");
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

    changeReadSlider.read = book.read;

    let cardElements = [titleContainer, authorContainer, pagesContainer, readContainer, changeReadSlider, deleteButton];

    cardElements.forEach((element) => {
      card.appendChild(element);
    });

    BOOKCARDS.appendChild(card);

    deleteButton.addEventListener('click', (e) => {
      const position = e.target.dataset.position;
      deleteBookCard(position);
      deleteBook(position);
    });
}

function deleteBookWindow() {
  const window = document.querySelector(".upload-book");

  window.remove()
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

Books.prototype.toggleRead = function() {
    this.read = !this.read;
}
