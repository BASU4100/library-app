const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = (read=='Read already')?true:false;
    this.id = crypto.randomUUID();
    this.hueDeg = 15 * (Math.floor(Math.random() * 23) + 1);
    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ` + (this.read?"read already.":"not read yet.");
    }
}

const addNewBook = document.querySelector(".add-new-book");
const form = document.querySelector("form");
const parent = addNewBook.parentElement;
const addBook = document.querySelector("form > button");
const books = document.querySelector(".books");


addNewBook.addEventListener('click', () => {
    parent.classList.toggle("inactive");
    form.classList.toggle("inactive");
});

addBook.addEventListener('click', () => {
    if (form.checkValidity()==false) {
        event.preventDefault();
        return;
    }
    form.classList.toggle("inactive");
    parent.classList.toggle("inactive");
    addBookToLibrary();
    form.reset();
    event.preventDefault();
});

function addBookToLibrary() {
    const formData = new FormData(form);
    let title = formData.get('title');
    let author = formData.get('author');
    let pages = formData.get('pages');
    let read = formData.get('readStatus');
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    display();
}

function display() {
    for (let book of myLibrary) {
        console.log(book);
        const newChild  = document.createElement('div.card');
        newChild.innerHTML = `<div>
                    <img src="./image/Book.jpg" alt="Book" style="filter: hue-rotate(${book.hueDeg}deg)">
                    <p>${book.title}</p>
                    <p>${book.author}</p>
                </div>
                <button type="submit"><img src="./image/check.svg" alt="Mark as Read" class="icons" title="Mark as read"></button>
                <button type="reset"><img src="./image/delete-outline.svg" alt="Delete icon" title="Delete" class="icons"></button>`
        books.insertBefore(newChild, books.lastElementChild);
        const bookInfo = newChild.querySelector(".card > div");
        bookInfo.classList.add("book");
        const bookTitle = newChild.querySelector(".card > p:first-of-type");
        bookTitle.classList.add("title");
        const bookAuthor = newChild.querySelector(".card > p:last-of-type");
        bookTitle.classList.add("author");
        if (book.read) {
            const checked = newChild.querySelector("button[type='submit']");
            checked.classList.toggle("inactve");
        }
    }
}

books.addEventListener('click', () => {
    if (event.target.matches('button[type="submit"]'))
        event.target.classList.toggle("inactive");
});