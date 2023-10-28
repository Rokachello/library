
const myLibrary = []
const container = document.querySelector(".card-container")
const addButton = document.querySelector(".trigger")

let title = ""
let author = ""
let pages = ""

class Book{
    constructor(title,author,pages,read){
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
    info(){
    const isRead = (read) ? "read already" : "not read yet"    
    return `${title} by ${author}, ${pages} pages, ${isRead}`;
    }
}


// create 10 books using the Book constructor
const newBook1 = new Book("The Hitchhiker's Guide to the Galaxy", "Douglas Adams", 216, true);
const newBook2 = new Book("The Lord of the Rings", "J.R.R. Tolkien", 1178, false);
const newBook3 = new Book("Harry Potter and the Philosopher's Stone", "J.K. Rowling", 223, true);
const newBook4 = new Book("1984", "George Orwell", 328, false);
const newBook5 = new Book("The Catcher in the Rye", "J.D. Salinger", 277, true);
const newBook6 = new Book("To Kill a Mockingbird", "Harper Lee", 281, false);
const newBook7 = new Book("The Da Vinci Code", "Dan Brown", 489, true);
const newBook8 = new Book("The Hunger Games", "Suzanne Collins", 374, false);
const newBook9 = new Book("The Girl with the Dragon Tattoo", "Stieg Larsson", 465, true);
const newBook10 = new Book("The Kite Runner", "Khaled Hosseini", 372, false);

// push the books to the array
myLibrary.push(newBook1);
myLibrary.push(newBook2);
myLibrary.push(newBook3);
myLibrary.push(newBook4);
myLibrary.push(newBook5);
myLibrary.push(newBook6);
myLibrary.push(newBook7);
myLibrary.push(newBook8);
myLibrary.push(newBook9);
myLibrary.push(newBook10);

const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");
const addBook = document.querySelector(".add-book")

addBook.addEventListener("click", () => {
title = document.querySelector("#title").value
author = document.querySelector("#author").value
pages = document.querySelector("#pages").value
read = document.querySelector("#isRead").value
const isRead = document.querySelector("#isRead").checked;
addBookToLibrary(title,author,pages,isRead)
toggleModal()
clearInputs()
})

function clearInputs(){
document.querySelector("#title").value = ""
document.querySelector("#author").value = ""
document.querySelector("#pages").value = ""
document.querySelector("#isRead").checked = false
}

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

function addBookToLibrary(title,author,pages,read){
    const newBook = new Book(title,author,pages,read)
    myLibrary.push(newBook)
    displayBooks()
}

function displayBooks(){
    container.innerHTML = ""
    myLibrary.forEach((book,index) => {

        const bookCard = document.createElement("div")
        bookCard.classList.add("book-card")

        const bookTitle = document.createElement("h1")
        bookTitle.textContent = book.title
        const bookAuthor = document.createElement("p")
        bookAuthor.textContent = book.author
        const bookPages = document.createElement("p")
        bookPages.textContent = book.pages + " pages"
        let bookRead = document.createElement("p")
        bookRead.classList.add("align-bottom")
        bookRead.textContent = (book.read)? "Read already" : "Not read yet"

        // CARD BUTTONS
        const buttonContainer = document.createElement("div")
        buttonContainer.classList.add("button-container")

        const changeBookRead = document.createElement("button")
        changeBookRead.classList.add("change-button")
        changeBookRead.textContent="CHANGE STATE"
        buttonContainer.appendChild(changeBookRead)

        const removeBtn = document.createElement("button")
        removeBtn.classList.add("remove-button")
        removeBtn.textContent = "REMOVE BOOK"
        buttonContainer.appendChild(removeBtn)

        changeBookRead.addEventListener("click", () => {
            myLibrary[index].read = !myLibrary[index].read;
            displayBooks();
        });

        removeBtn.addEventListener("click", () =>{
            myLibrary.splice(index,1)
            displayBooks()
        })

    
        bookCard.appendChild(bookTitle)
        bookCard.appendChild(bookAuthor)
        bookCard.appendChild(bookPages)
        bookCard.appendChild(bookRead)
        bookCard.appendChild(buttonContainer)
       

        container.appendChild(bookCard)
    })
}

displayBooks()

