// Some globals:

//Buttons
const removeBookBtn = document.querySelector(".remove-button");
const addBookBtn = document.querySelector(".add-book");
const addShelfBtn = document.querySelector(".add-shelf");
const markReadBtn = document.querySelector(".read-button");

//Modal
const modal = document.querySelector(".modal");
addBookBtn.addEventListener("click", (e) =>
{
    modal.style.display = "block";
})
