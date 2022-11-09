class Book {
  constructor(title, author, isRead) {
    this.title = title;
    this.author = author;
    this.bookIsRead = isRead;
  }
}

//Buttons

const addBookBtn = document.querySelector(".add-book");
const addShelfBtn = document.querySelector(".add-shelf");
const markReadBtn = document.querySelector(".read-button");

const modalCloseBtns = document.querySelectorAll(".modal-close");
const modalContentBox = document.querySelector(".modal-content");
const modalActuals = document.querySelectorAll(".modal");
const modalAlertBox = document.querySelector(".modal-alert-box");
modalAlertBox.style.display = "none";
let modalInputTitle = document.querySelector("#title");

// Test form validation on book title
modalInputTitle.addEventListener("input", (e) => {
  if (modalInputTitle.validity.typeMismatch) {
    modalInputTitle.setCustomValidity("The title you entered is invalid!");
    modalInputTitle.reportValidity();
  } else {
    modalInputTitle.setCustomValidity("");
  }
});

let modalInputAuthor = document.querySelector("#author");
const modalEditBook = document.querySelector("#modal-edit-book");
let modalEditTitle = document.querySelector(".edit-title");
let modalEditAuthor = document.querySelector(".edit-author");
let modalEditCheckbox = document.querySelector(".edit-read");

const editModalAlert = document.querySelector("#modal-edit-alert");

//Modals
const modalAddBook = document.querySelector("#modal-add-book");
addBookBtn.addEventListener("click", (e) => {
  modalAddBook.style.display = "block";
  modalInputTitle.value = "";
  modalInputAuthor.value = "";
});

const modalAddShelf = document.querySelector("#modal-add-shelf");
addShelfBtn.addEventListener("click", (e) => {
  modalAddShelf.style.display = "block";
});

modalCloseBtns.forEach((button) =>
  button.addEventListener("click", () => {
    modalAddBook.style.display = "none";
    modalAddShelf.style.display = "none";
    modalAlertBox.style.display = "none";
    modalEditBook.style.display = "none";
  })
);

modalActuals.forEach((modalActual) =>
  modalActual.addEventListener("click", (e) => {
    if (e.target === modalActual) {
      modalAddBook.style.display = "none";
      modalAddShelf.style.display = "none";
      modalEditBook.style.display = "none";
    } else if (e.target === modalContentBox) {
      return;
    }
  })
);

// Fetch add book form input:
let library = [];
let submitBookTitle;
let submitBookAuthor;
let isReadCheckbox;
let book;

const submitBookBtn = document.querySelector(".submit-book-button");
submitBookBtn.addEventListener("click", () => {
  submitBookTitle = document.querySelector("#title").value;
  submitBookAuthor = document.querySelector("#author").value;
  isReadCheckbox = document.querySelector("#read").checked;

  createBook(submitBookTitle, submitBookAuthor, isReadCheckbox);
});

function createBook(title, author, isRead) {
  if (title === "" || author === "") {
    modalAlertBox.style.display = "block";
    modalAlertBox.innerText = "Please add the required information!";
  } else {
    book = new Book(title, author, isRead);

    const otherBook = (element) =>
      element.title === book.title && element.author === book.author;

    if (!library.some(otherBook)) {
      library.push(book);
      populateDesk(book);
      modalAddBook.style.display = "none";
      modalAlertBox.style.display = "none";
    } else {
      modalAlertBox.style.display = "block";
      editModalAlert.style.display = "block";
      editModalAlert.innerText = "That book already exists in your library!";
      modalAlertBox.innerText = "That book already exists in your library!";
    }
  }
  return;
}

// Populate desk:
let desk = document.querySelector(".desk");
let bookCard;
let bookCardTitle;
let bookCardAuthor;
let bookCardButtons;
let readButton;
let editButton;
let removeCardButton;

function populateDesk(book) {
  bookCard = document.createElement("div");
  bookCard.classList.add("book-card");

  bookCardTitle = document.createElement("div");
  bookCardTitle.classList.add("book-card-title");
  bookCard.insertAdjacentElement("beforeend", bookCardTitle);

  bookCardAuthor = document.createElement("div");
  bookCardAuthor.classList.add("book-card-author");
  bookCard.insertAdjacentElement("beforeend", bookCardAuthor);

  bookCardButtons = document.createElement("div");
  bookCardButtons.classList.add(".book-card-buttons");
  bookCard.insertAdjacentElement("beforeend", bookCardButtons);

  readButton = document.createElement("button");
  readButton.innerText = "Mark Read";
  readButton.classList.add("read-button");
  editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.classList.add(".edit-button");
  removeCardButton = document.createElement("button");
  removeCardButton.innerText = "Remove";
  removeCardButton.classList.add("remove-card-button");

  bookCardButtons.insertAdjacentElement("beforeend", readButton);
  bookCardButtons.insertAdjacentElement("beforeend", editButton);
  bookCardButtons.insertAdjacentElement("beforeend", removeCardButton);

  if (book.bookIsRead === true) {
    bookCard.style.borderColor = "green";
    readButton.innerText = "Mark Un-read";
  }

  desk.insertAdjacentElement("beforeend", bookCard);
  bookCardTitle.innerText = book.title;
  bookCardAuthor.innerText = book.author;

  // Remove book functionality:
  removeCardButton.addEventListener("click", (e) => {
    removeBookCard(e);
    removeBook(book);
  });

  // Mark book as read:
  readButton.addEventListener("click", (e) => {
    if (book.bookIsRead === true) {
      updateCardtoUnread(e);
      markBookUnread(book);
    } else {
      updateCardtoRead(e);
      markBookRead(book);
    }
  });

  // Edit book card:
  editButton.addEventListener("click", (e) => {
    console.log(book);
    editBookCard(book, e);
  });
  return;
}

function removeBook(book) {
  let currentBookIndex = library.findIndex(
    (bookObject) =>
      book.title === bookObject.title && book.author === bookObject.author
  );

  library.splice(currentBookIndex, 1);
}

function removeBookCard(e) {
  const currentBookCard = e.target.parentElement.parentElement;
  currentBookCard.remove();
}

function updateCardtoRead(e) {
  const currentBookCard = e.target.parentElement.parentElement;
  currentBookCard.style.borderColor = "green";

  e.target.innerText = "Mark Un-read";
}

function markBookRead(book) {
  book.bookIsRead = true;
}

function updateCardtoUnread(e) {
  const currentBookCard = e.target.parentElement.parentElement;
  currentBookCard.style.borderColor = "white";
  e.target.innerText = "Mark Read";
}

function markBookUnread(book) {
  book.bookIsRead = false;
}

function editBookCard(oldBook, e) {
  modalEditBook.style.display = "block";
  modalEditTitle.value = oldBook.title;
  modalEditAuthor.value = oldBook.author;
  const editSubmitBtn = document.querySelector("#submit-edit-book-btn");

  if (oldBook.bookIsRead === true) {
    modalEditCheckbox.checked = true;
  } else if (oldBook.bookIsRead === false) {
    modalEditCheckbox.checked = false;
  }

  editSubmitBtn.addEventListener("click", () => {
    editBookinArray(
      modalEditTitle.value,
      modalEditAuthor.value,
      modalEditCheckbox.checked,
      oldBook
    );

    removeBookCard(e);

    modalEditBook.value = "";
    modalEditAuthor.value = "";
    modalEditCheckbox.checked = false;
  });
  return;
}

function editBookinArray(title, author, isRead, book) {
  if (title === "" || author === "") {
    modalAlertBox.style.display = "block";
    modalAlertBox.innerText = "Please add the required information!";
  } else {
    book.title = title;
    book.author = author;
    book.isRead = isRead;

    populateDesk(book);

    modalEditBook.style.display = "none";
  }
  return;
}
