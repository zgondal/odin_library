const myLibrary = [];
const bookDisplay = document.querySelector(".library tbody");
const last = bookDisplay.lastChild;
let count = 0;
const dialog = document.getElementById("newBook");
const cancelButton = document.getElementById("cancel");
const submitButton = document.getElementById("submit");
const addBook = document.querySelector(".add");
const form = document.getElementById("form");

class Book {
    constructor(index, title, author, year, pages, read, rating) {
        this.index = index;
        this.title = title;
        this.author = author;
        this.year = year;
        this.pages = pages;
        this.read = read;
        this.rating = rating;
    }

    bookRead() {
        this.read = true;
    }
}


function addBookToLibrary(book) {
    myLibrary.push(book);
}

const firstBook = new Book(count++, "A", "b", 1923, 394, true, 3.5);
addBookToLibrary(firstBook);
const bookTwo = new Book(count++, "asdas", "asdsad", 124, 1255, false, 2.5);
const book1 = new Book(count++, "asdas", "asdsad", 124, 1255, false, 2.5);
const book2 = new Book(count++, "asdas", "asdsad", 124, 1255, false, 2.5);
const book3 = new Book(count++, "asdas", "asdsad", 124, 1255, false, 2.5);
const book4 = new Book(count++, "asdas", "asdsad", 124, 1255, false, 2.5);
addBookToLibrary(bookTwo);
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);

function populate() {
    for (let book of myLibrary) {
    var row = document.createElement("tr");
    for (let prop in book) {
        var cell = document.createElement("td");
        cell.textContent = book[prop];
        if (book.hasOwnProperty(prop)) {
            cell.textContent = book[prop];
            row.appendChild(cell);
        }
    }
    let deleteCell = document.createElement("td");
    deleteCell.appendChild(document.createElement("button"));
    // deleteCell.className = "delete";
    styleDeleteButton(deleteCell.lastChild);
    row.appendChild(deleteCell);
    bookDisplay.insertBefore(row, bookDisplay.lastElementChild);
    }
}

populate();

submitButton.addEventListener("click", submit);

function submit(event) {
    event.preventDefault();
    var title = document.getElementById("title").value;
    var author = document.getElementById("author").value;
    var year = document.getElementById("year").value;
    var pages = document.getElementById("pages").value;
    var read = document.querySelector('input[name="read"]:checked').value;
    var rating = document.getElementById("rating").value;
    var index = count++;
    let newBook = new Book(index, title, author, year, pages, read, rating);
    addBookToLibrary(newBook);
    var row = document.createElement("tr");
    for (let prop in newBook) {
        var cell = document.createElement("td");
        if (newBook.hasOwnProperty(prop)) {
            cell.textContent = newBook[prop];
            row.appendChild(cell);
        }
    }
    let deleteCell = document.createElement("td");
    deleteCell.appendChild(document.createElement("button"));
    // deleteCell.className = "delete";
    styleDeleteButton(deleteCell.lastChild);
    row.appendChild(deleteCell);
    bookDisplay.insertBefore(row, bookDisplay.lastElementChild);
    dialog.close();
    form.reset();
}

function styleDeleteButton(button) {
    button.textContent = "🗑";
    button.className = "delete";
    button.style.backgroundColor = "black";
    button.style.borderRadius = "32px";
    button.style.padding = "3px 8px 3px 8px";
    button.style.border = "none";
    button.style.fontSize = "24px";
}

addBook.addEventListener("click", () => {
    dialog.showModal();
})

cancelButton.addEventListener("click", () => {
    dialog.close("Cancelled");
})

document.addEventListener("DOMContentLoaded", function() {
    const libraryTable = document.querySelector(".library");
    libraryTable.addEventListener("click", function(event) {
        if (event.target.classList.contains("delete")) {
            const rowDeleted = event.target.closest("tr");
            const bookIndex = rowDeleted.firstElementChild.textContent;
            rowDeleted.remove();
            count--;
            // decrement indices of all subsequent books in the library array
            myLibrary.splice(bookIndex, 1);
            for (let i = bookIndex; i < myLibrary.length; i++) {
                myLibrary[i].index -= 1;
            }
            //decrement indices of all subsequent rows in the table
            const rows = libraryTable.querySelectorAll("tbody tr");
            for (let i = bookIndex - 1; i < rows.length - 2; i++) {
                let row = rows[i + 1];
                if (row) {
                    var rowIndexCell = row.querySelector("td:first-child");
                    rowIndexCell.textContent = i;
                }
                
            }
        }
    });
});

