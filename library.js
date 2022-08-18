// Some globals:

//Buttons
const removeBookBtn = document.querySelector(".remove-button");
const addBookBtn = document.querySelector(".add-book");
const addShelfBtn = document.querySelector(".add-shelf");
const markReadBtn = document.querySelector(".read-button");
const modalCloseBtn = document.querySelector(".modal-close");

//Modal
const modal = document.querySelector(".modal");
addBookBtn.addEventListener("click", (e) =>
{
    modal.style.display = "block";
});

modalCloseBtn.onclick = function()
{
    modal.style.display = "none";
}