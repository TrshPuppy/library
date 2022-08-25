class Book 
{
    constructor(title, author, isRead)
    {
        this.title = title;
        this.author = author;
        this.bookIsRead = isRead;
    }
}

let library = [];

// Globals:
const addBookBtn = document.querySelector(".add-book");
let desk = document.querySelector('.desk');
let bookBeingEdited;

const modalCloseBtns = document.querySelectorAll(".modal-close");
const modalContentBox = document.querySelector(".modal-content");
const modalActual = document.querySelector(".modal");
const modalAlertBox = document.querySelector(".modal-alert-box");
let modalInputTitle = document.querySelector("#title");
let modalInputAuthor = document.querySelector("#author");
let modalCheckBox = document.querySelector('.read');
const submitBookBtn = document.querySelector('.submit-book-button');

const modalEditBook = document.querySelector("#modal-edit-book");
let modalEditTitle = document.querySelector('.edit-title');
let modalEditAuthor = document.querySelector('.edit-author');
let modalEditCheckbox = document.querySelector('.edit-read');
const modalEditAlertBox = document.querySelector('#modal-edit-alert');
const submitEditedBookBtn = document.querySelector('#submit-edit-book-btn');

// Functions:
function displayAddModal(modal)
{
    modal.style.display = 'block';
}

function createBookObject(title, author, isRead)
{
    book = new Book(title, author, isRead);
    return book;
}

function addBookToLibrary(book)
{
    const otherBook = (element) =>  element.title === book.title && element.author === book.author;

        if(!library.some(otherBook))
        {
            library.push(book);
            return true;
        }
    return false;
}

function populateDeskCard(book)
{
    bookCard = document.createElement('div');
    bookCard.classList.add('book-card');

    bookCardTitle = document.createElement('div');
    bookCardTitle.classList.add('book-card-title');
    bookCard.insertAdjacentElement('beforeend', bookCardTitle);

    bookCardAuthor = document.createElement('div');
    bookCardAuthor.classList.add('book-card-author');
    bookCard.insertAdjacentElement('beforeend', bookCardAuthor);

    bookCardButtons = document.createElement('div');
    bookCardButtons.classList.add('.book-card-buttons');
    bookCard.insertAdjacentElement('beforeend', bookCardButtons);
    
    readButton = document.createElement('button');
    readButton.innerText = "Mark Read";
    readButton.classList.add('read-button');
    editButton = document.createElement('button');
    editButton.innerText = "Edit";
    editButton.classList.add('.edit-button');
    removeCardButton = document.createElement('button');
    removeCardButton.innerText = "Remove";
    removeCardButton.classList.add('remove-card-button');
   
    bookCardButtons.insertAdjacentElement('beforeend', readButton);
    bookCardButtons.insertAdjacentElement('beforeend', editButton);
    bookCardButtons.insertAdjacentElement('beforeend', removeCardButton);

    if(book.bookIsRead === true)
    {
        bookCard.style.borderColor = 'green';
        readButton.innerText = 'Mark Un-read';
    }
    
    desk.insertAdjacentElement('beforeend', bookCard);

    bookCardTitle.innerText = book.title;
    bookCardAuthor.innerText = book.author;

    removeCardButton.addEventListener('click', () =>
    {
        removeBookFromLibrary(book);
    })

    editButton.addEventListener('click', () =>
    {
        editBookInLibrary(book);
        displayAddModal(modalEditBook);
       
    })
}

function rebuildAllCards()
{
    desk.textContent = "";
    library.forEach(populateDeskCard);

    console.log(library);
}

function removeBookFromLibrary(book)
{
    // let currentBookIndex = library.findIndex(bookObject => book.title === bookObject.title && book.author === bookObject.author);

    const currentBookIndex = library.indexOf(book);

    library.splice(currentBookIndex, 1);
    rebuildAllCards();
}

function editBookInLibrary(oldBook)
{
    // const oldBookIndex = library.indexOf(oldBook);
    // console.log(oldBookIndex);
    modalEditTitle.value = oldBook.title;
    modalEditAuthor.value = oldBook.author;
    modalEditCheckbox.checked = oldBook.isRead;

    bookBeingEdited = oldBook;
}

function isDuplicateInLibrary(title, author)
{
    const duplicateBookIndex = library.findIndex(b => b !== bookBeingEdited && b.title === title && b.author === author);

    return duplicateBookIndex !== -1;
}

// Event Listeners:
addBookBtn.addEventListener('click', () =>
{
    displayAddModal(modalActual);
})

submitBookBtn.addEventListener('click', () =>
{
    let bookAddedToLibrary = addBookToLibrary(createBookObject(modalInputTitle.value, modalInputAuthor.value, modalCheckBox.checked));

    if(bookAddedToLibrary)
    {
        modalActual.style.display = 'none';
        rebuildAllCards();
    }
})

submitEditedBookBtn.addEventListener('click', (e) =>
{
    if(isDuplicateInLibrary(modalEditTitle.value, modalEditAuthor.value))
    {
        modalEditAlertBox.style.display = 'block';
        return;
    }

    bookBeingEdited.title = modalEditTitle.value;
    bookBeingEdited.author = modalEditAuthor.value;
    bookBeingEdited.isRead = modalEditCheckbox.checked;

    rebuildAllCards();
    modalEditAlertBox.style.display = 'none';
    e.target.parentElement.parentElement.parentElement.style.display = 'none';
})

modalCloseBtns.forEach(button =>
{
    button.addEventListener('click', (e) =>
    {
        e.target.parentElement.parentElement.style.display = 'none';
    })
})