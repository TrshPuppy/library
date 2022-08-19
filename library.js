// Some globals:

//Buttons
const removeBookBtn = document.querySelector(".remove-button");
const addBookBtn = document.querySelector(".add-book");
const addShelfBtn = document.querySelector(".add-shelf");
const markReadBtn = document.querySelector(".read-button");
const modalCloseBtns = document.querySelectorAll(".modal-close");

//Modals
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


modalCloseBtns.onclick = function()
{
    modalAddBook.style.display = "none";
}

