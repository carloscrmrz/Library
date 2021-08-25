let myLibrary = [];
const UPLOADBOOK = document.querySelector(".upload-book");
const SUBMITFORM = document.getElementById("upload-book");
const SUBMITBUTTON = document.getElementById("submit-book");
const CREATEBOOKBTN = document.querySelector(".create-book");
const LIBRARY = document.querySelector(".library");
const BOOKCARDS = document.querySelector(".book-cards");

CREATEBOOKBTN.addEventListener("click", showSubmitWindow);

SUBMITBUTTON.addEventListener("click", () => {

    const book = submitBook()
    BOOKCARDS.appendChild(book.card);
    UPLOADBOOK.classList.toggle("active");
});

function showSubmitWindow() {
  SUBMITFORM.reset();
  UPLOADBOOK.classList.toggle("active");
}

function submitBook() {
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const pagInput = document.getElementById('pages');
    const isRead = document.getElementById('isRead');

    const book = Book(titleInput.value, authorInput.value, pagInput.value, isRead.checked, randomId());
    myLibrary.push(book);

    localStorage.setItem(`localLibrary`, JSON.stringify(myLibrary));

    return book
}

const deleteBook = (id) => {
  const indexOfBook = myLibrary.findIndex(book => book.id === id);

  // THIS SNIPPET DELETES THE CARD
  const bookCard = document.querySelector(`.card[data-id="${id}"]`);
  bookCard.remove();

  // THIS SNIPPET DELETES THE BOOK FROM THE LIBRARY
  myLibrary.splice(indexOfBook, 1);

  // THIS SNIPPET UPDATES THE LOCAL LIBRARY
  localStorage.setItem(`localLibrary`, JSON.stringify(myLibrary));

}

function randomId() {
  // Convert a random number to base 36 (numbers + letters), and grab the first
  // 9 characters after the decimal.
  return `${Math.random().toString(36).substr(2, 9)}`
};

function getIndexOfBook(id) {
  myLibrary.indexOf();
}

const Book = (title, author, pages, read, id) => {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;

  const pagesRead = (() =>  {
    if (read) {
      return parseInt(pages)
    } else {
      return 0
    }
  })();

// This method creates automatically the card container to append into the HTML library div
const card = (() => {
    const card = document.createElement("div");
    const toggleReadState = document.createElement("div");
    const deleteButton = document.createElement("div");
    const titleContainer = document.createElement("h2");
    const authorContainer = document.createElement("h2");
    const pagesContainer = document.createElement("p");
    const funkyButtons = document.createElement("div");
    let svgToggleReadState = document.createElement("span");
    let svgDeleteButton = document.createElement("span");
    let readContainer = document.createElement("p");
    let cardElements = [titleContainer, authorContainer, pagesContainer, readContainer, funkyButtons];


    const faBook = document.createElement("i");
    faBook.classList.add("fas", "fa-book", "fa-xs", "fa-stack-1x");
    faBook.style = "background: rgba(0,0,0,0);";
    const faBan = document.createElement("i");
    faBan.classList.add("fas", "fa-ban", "fa-xs", "fa-stack-2x");
    faBan.style = "color:Tomato; background: rgba(0,0,0,0)";
    const faTrash = document.createElement("i");
    faTrash.classList.add("fas", "fa-trash-alt", "fa-xs");
    faTrash.style = "color: Tomato;background: rgba(0,0,0,0)";

    // After creating the necessary elements for the card we add their respective CSS styles.
    // CARD
    card.classList.add("card")
    card.dataset.id = id;

    // TITLE
    if (title === undefined) return
    titleContainer.innerText = title;

    // AUTHOR
    if (this.author === undefined) return
    authorContainer.innerText = author;

    // PAGES
    if (pages === undefined) pages = 0;
    pagesContainer.innerText = `Number of pages: ${pages}`;

    // ALREADY READ
    if (read) {
      readContainer.innerText = "You've already read this book";
    } else {
      readContainer.innerText = "In to-read list";
    }

    // TOGGLE READ STATE
    toggleReadState.dataset.id = card.dataset.id;
    toggleReadState.classList.add("toggle-read");
    svgToggleReadState.classList.add("fa-stack","fa-2x", "toggle-read");

    if (read) {
      svgToggleReadState.appendChild(faBook);
    } else {
      svgToggleReadState.appendChild(faBook);
      svgToggleReadState.appendChild(faBan);
    }

    toggleReadState.appendChild(svgToggleReadState);

    // DELETE BOOK
    deleteButton.dataset.id = card.dataset.id;
    deleteButton.classList.add("delete-book");
    svgDeleteButton.classList.add("delete-book")

    svgDeleteButton.appendChild(faTrash);
    deleteButton.appendChild(svgDeleteButton);

    // THE FUNCTION BUTTON (DELETE BOOK, TOGGLE READ STATE)
    funkyButtons.classList.add("function-buttons");
    funkyButtons.appendChild(toggleReadState);
    funkyButtons.appendChild(deleteButton);

    cardElements.forEach((item) => {
      card.appendChild(item);
    });

    // WE ADD THE NECESSARY EVENT LISTENERS TO THE FUNCTION buttons
    toggleReadState.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;

      myLibrary[id].read = !myLibrary[id].read;

      // svgToggleReadState.remove();
      // svgToggleReadState = toggleReadStateIcon(myLibrary[id].read);
      // toggleReadState.appendChild(svgToggleReadState);

          if (myLibrary[id].read) {
            readContainer.innerText = "You've already read this book";
          } else {
            readContainer.innerText = "In to-read list";
          }
    }, true);

    deleteButton.addEventListener('click', (e) => {
      let id = e.currentTarget.dataset.id;
      deleteBook(id);
    });

    return card
  })();

  return {title, author, pages, read, id, card, pagesRead}
}

// LOCAL STORAGE

function createCardFromLocalStorage() {
  if (localStorage.length === 0) return

  if ( myLibrary.length === 0 ) {

    let localLibrary = JSON.parse(localStorage["localLibrary"]);
    let i = 0;

    for (i; i < localLibrary.length; i++) {
      let localBook = localLibrary[i];
      let title = localBook.title;
      let author = localBook.author;
      let pages = localBook.pages;
      let read = localBook.read;
      let id = localBook.id;

      const book = Book(title, author, pages, read, id);
      myLibrary.push(book);
      BOOKCARDS.appendChild(book.card);
      }

      return i
  }
}

createCardFromLocalStorage();
