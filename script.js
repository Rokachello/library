

let myLibrary = [];

function Book(name, author, pages, read = "✗") {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

let book1 = new Book("Rock N Roll History", "The Ramones", 320, "✓");
let book2 = new Book("Reggae Hits", "Bob Marley", 420, "✗");
let book3 = new Book("Basketball basics", "The coach", 315, "✗");

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
  function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    let th = document.createElement("th");
    let text = document.createTextNode("Number");
    th.appendChild(text);
    row.appendChild(th);
    for (let key of data) {
      let th = document.createElement("th");
      let text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
    }
    th = document.createElement("th");
    text = document.createTextNode("actions");
    th.appendChild(text);
    row.appendChild(th);
    
  }
  
  function generateTable(table, data) {
    let rowNo = 1

    for (let element of data) {
      let row = table.insertRow();
      let cell = row.insertCell();
      let text = document.createTextNode(rowNo);
      cell.appendChild(text);
      rowNo++
      for (key in element) {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }
      cell = row.insertCell();
      let button = document.createElement("button")
      text = document.createTextNode("remove")
      button.addEventListener("click", () => {
        // Get the index of the book to remove based on the row number
        const indexToRemove = rowNo - 2; // Adjust for 0-based indexing
        if (indexToRemove >= 0 && indexToRemove < myLibrary.length) {
            myLibrary.splice(indexToRemove, 1); // Remove the book from the library array
            updateTable(); // Update the table to reflect the changes
        } });
      button.appendChild(text)
      button.classList.add("remove")
      cell.appendChild(button)
    }
  }


  
  let table = document.querySelector("table");
  let data = Object.keys(myLibrary[0]);
  generateTableHead(table, data);
  generateTable(table, myLibrary);

const showButton = document.getElementById("showDialog");
const favDialog = document.getElementById("favDialog");
const confirmBtn = document.querySelector("#confirmBtn");
const inputName = document.querySelector("input")
const inputAuthor = document.getElementById("authorInput");
const inputPages = document.getElementById("pagesInput")
const inputRead = document.getElementById("readInput")
const removeButton = document.querySelector("remove")


let bookName = null
let bookAuthor = null
let bookYear = null
let bookRead = "✗"

// "Show the dialog" button opens the <dialog> modally
showButton.addEventListener("click", () => {
  favDialog.showModal();
});

inputName.addEventListener("change", (e) => {
  bookName = inputName.value
});
inputAuthor.addEventListener("change", (e) => {
    bookAuthor = inputAuthor.value
  });
  inputPages.addEventListener("change", (e) => {
    bookYear = inputPages.value
  });

  inputRead.addEventListener("change", (e) => {
    if(inputRead.checked){
       bookRead = "✓"
    }
    else {
        bookRead = "✗"
    }
  });




// "Cancel" button closes the dialog without submitting because of [formmethod="dialog"], triggering a close event.
favDialog.addEventListener("close", (e) => {
    updateTable()
});

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmBtn.addEventListener("click", (event) => {

    if(bookName == null || bookAuthor == null || bookYear == null){
    
    } else {
    let newBook = new Book( bookName, bookAuthor, bookYear, bookRead);
    addBookToLibrary(newBook); 
    document.querySelector("form").reset();
    bookRead = "✗"
    event.preventDefault(); // We don't want to submit this fake form
    favDialog.close(inputName.value); // Have to send the select box value here. 
}
});

cancelBtn.addEventListener("click", (e) => {
favDialog.close()
}
)

function updateTable(){
     const table = document.querySelector("table");
    table.innerHTML = ""; // Clear the table content
    generateTableHead(table, data);
    generateTable(table, myLibrary);
}
