// Some globals:

//Buttons
const removeBookBtn = document.querySelector(".remove-button");
const addBookBtn = document.querySelector(".add-book");
const addShelfBtn = document.querySelector(".add-shelf");
const markReadBtn = document.querySelector(".read-button");
const modalCloseBtns = document.querySelectorAll(".modal-close");
const modalContentBox = document.querySelector(".modal-content");
const modalActuals = document.querySelectorAll(".modal");

//Modals
// let modalIsOpen = false;
const modalAddBook = document.querySelector("#modal-add-book");
addBookBtn.addEventListener("click", (e) =>
{
    modalAddBook.style.display = "block";
});

const modalAddShelf = document.querySelector("#modal-add-shelf");
addShelfBtn.addEventListener("click", (e) =>
{
    modalAddShelf.style.display = "block";
});

modalCloseBtns.forEach(button =>
    button.addEventListener('click', ()=>
    {
        modalAddBook.style.display = "none";
        modalAddShelf.style.display = "none";
    }));

modalActuals.forEach(modalActual =>
    modalActual.addEventListener('click', (e) =>
    {
        if(e.target === modalActual)
        {
            modalAddBook.style.display = "none";
            modalAddShelf.style.display = "none";
        }
        else if(e.target === modalContentBox)
        {
            return;
        }
    }
    ));

// Fetch add book form input:
let library = [];
let submitBookTitle;
let submitBookAuthor;
let isReadCheckbox;
let book;
class Book 
{
    constructor(title, author, isRead)
    {
        this.title = title;
        this.author = author;
        this.bookIsRead = isRead;
    }
}

const submitBookBtn = document.querySelector(".submit-book-button");
submitBookBtn.addEventListener('click', () =>
{
    submitBookTitle = document.querySelector("#title").value;
    submitBookAuthor = document.querySelector('#author').value;
    isReadCheckbox = document.querySelector('#read').checked;

    book = new Book(submitBookTitle, submitBookAuthor,isReadCheckbox);
    library.push(book);

    modalAddBook.style.display = "none";
    console.log(book);

    populateDesk();
})

// Populate desk:
function populateDesk()
{
    let desk = document.querySelector('.desk');
    let bookCard = document.createElement('div');
    
    library.forEach(object =>
        {
            desk.insertAdjacentElement('beforeend', bookCard);
        });
}



