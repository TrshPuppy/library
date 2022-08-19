// Some globals:

//Buttons
const removeBookBtn = document.querySelector(".remove-button");
const addBookBtn = document.querySelector(".add-book");
const addShelfBtn = document.querySelector(".add-shelf");
const markReadBtn = document.querySelector(".read-button");
const modalCloseBtns = document.querySelectorAll(".modal-close");
const modalContentBox = document.querySelector(".modal-content");
const modalActual = document.querySelector(".modal");

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


modalCloseBtns.onclick = function()
{
    modalAddBook.style.display = "none";
}


modalActual.onclick = function(e)
{
    if(e.target !== modalContentBox)
    {
        modalAddBook.style.display = "none";
        modalAddShelf.style.display = "none";
    }
}

// window.onclick = function(e)
// {
//     if(modalIsOpen === true && e.target != modalContentBox)
//     {
//         // modalAddBook.style.display = "none";
//         // modalAddShelf.style.display = "none";

//         // modalIsOpen = false;
//         console.log("hi");
//     }
// }
