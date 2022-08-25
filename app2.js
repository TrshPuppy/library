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
const modalCloseBtn = document.querySelector(".modal-close");
const modalContentBox = document.querySelector(".modal-content");
const modalActual = document.querySelector(".modal");
const modalAlertBox = document.querySelector(".modal-alert-box");
modalAlertBox.style.display = 'none';
let modalInputTitle = document.querySelector("#title");
let modalInputAuthor = document.querySelector("#author");
let modalCheckBox = document.querySelector('.read');
const modalEditBook = document.querySelector("#modal-edit-book");
const submitBookBtn = document.querySelector('.submit-book-button');

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

// Functions:
function rebuildAllCards()
{
    desk.textContent = "";
    library.forEach(populateDeskCard);
}

function removeBookFromLibrary(book)
{
    let currentBookIndex = library.findIndex(bookObject => book.title === bookObject.title && book.author === bookObject.author);

    library.splice(currentBookIndex, 1);
    rebuildAllCards();
}

function editBookInLibrary(book)
{
    
}
// Event Listeners:
modalCloseBtn.addEventListener('click', () =>
{
    modalActual.style.display = 'none';
})

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

