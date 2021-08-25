let myLibrary = [];
let i = 0;
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
    i++;
    UPLOADBOOK.classList.toggle("active");
});

function showSubmitWindow() {
  SUBMITFORM.reset();
  UPLOADBOOK.classList.toggle("active");
}

// function toggleReadStateIcon(read) {
//   const svgContainer = document.createElement("span");
//   const faBook = document.createElement("i");
//   faBook.classList.add("fas", "fa-book", "fa-xs", "fa-stack-1x");
//   faBook.style = "background: rgba(0,0,0,0);";
//   const faBan = document.createElement("i");
//   faBan.classList.add("fas", "fa-ban", "fa-xs", "fa-stack-2x");
//   faBan.style = "color:Tomato; background: rgba(0,0,0,0)";
//
//   if (read) {
//     svgContainer.appendChild(faBook);
//   } else {
//     svgContainer.appendChild(faBook);
//     svgContainer.appendChild(faBan);
//   }
//
//   return svgContainer
// }

function submitBook() {
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const pagInput = document.getElementById('pages');
    const isRead = document.getElementById('isRead');

    const book = Book(titleInput.value, authorInput.value, pagInput.value, isRead.checked, i);
    myLibrary.push(book);

    return book
}

const deleteBook = (position) => {
  // THIS SNIPPET DELETES THE CARD
  const bookCard = document.querySelector(`.card[data-position="${position}"]`);
  bookCard.remove();

  // THIS SNIPPET DELETES THE BOOK FROM THE LIBRARY
  myLibrary.splice(position, 1);
  i--;
}

const Book = (title, author, pages, read, pos) => {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.position = pos;

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
    card.dataset.position = pos;

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
    toggleReadState.dataset.position = card.dataset.position;
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
    deleteButton.dataset.position = card.dataset.position;
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
      const position = parseInt(e.currentTarget.dataset.position);

      myLibrary[position].read = !myLibrary[position].read;

      // svgToggleReadState.remove();
      // svgToggleReadState = toggleReadStateIcon(myLibrary[position].read);
      // toggleReadState.appendChild(svgToggleReadState);

          if (myLibrary[position].read) {
            readContainer.innerText = "You've already read this book";
          } else {
            readContainer.innerText = "In to-read list";
          }
    }, true);

    deleteButton.addEventListener('click', (e) => {
      let position = parseInt(e.currentTarget.dataset.position);
      deleteBook(position);
    });

    return card
  })();

  return {pos, card, read, pagesRead}
}
