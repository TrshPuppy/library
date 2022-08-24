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
const submitBookBtn = document.querySelector('.submit-book-button');

function displayAddModal()
{
    modalActual.style.display = 'block';
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

modalCloseBtn.addEventListener('click', () =>
{
    modalActual.style.display = 'none';
})

addBookBtn.addEventListener('click', () =>
{
    displayAddModal();
})

submitBookBtn.addEventListener('click', () =>
{
    let bookAddedToLibrary = addBookToLibrary(createBookObject(modalInputTitle.value, modalInputAuthor.value, modalCheckBox.checked));

    if(bookAddedToLibrary)
    {
        modalActual.style.display = 'none';
    }

   
})