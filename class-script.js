class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = (read=='yes')?true:false;
    }

    #id = crypto.randomUUID();
    #hueDeg =  15 * (Math.floor(Math.random() * 23) + 1);

    get id() {
        return this.#id;
    }

    get hueDeg() {
        return this.#hueDeg;
    }

    get info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ` + (this.read?"read already.":"not read yet.");
    }
}

class Library {
    #myLibrary; 
    // addNewBook;
    #form;
    #parent;
    // addBook;
    // books;
    constructor() {
        this.#myLibrary = [];
        this.addNewBook = document.querySelector(".add-new-book");
        this.#form = document.querySelector("form");
        this.#parent = this.addNewBook.parentElement;
        this.addBook = document.querySelector("form > button");
        this.books = document.querySelector(".books");
    }

    #addBookToLibrary() {
        const formData = new FormData(this.#form);
        let title = formData.get('title');
        let author = formData.get('author');
        let pages = formData.get('pages');
        let read = formData.get('readStatus');
        let newBook = new Book(title, author, pages, read);
        this.#myLibrary.push(newBook);
        this.#display(newBook);
    }

    #display(book) {
        const newChild  = document.createElement('div');
        newChild.setAttribute("data-id", book.id);
        newChild.innerHTML = `<div>
        <img src="./image/Book.jpg" alt="Book" style="filter: hue-rotate(${book.hueDeg}deg)">
        <p>${book.title}</p>
        <p>${book.author}</p>
        </div>
        <button type="submit"><img src="./image/check.svg" alt="Mark as Read" class="icons" title="Mark as read"></button>
        <button type="reset"><img src="./image/delete-outline.svg" alt="Delete icon" title="Delete" class="icons"></button>`
        this.books.insertBefore(newChild, this.books.lastElementChild);
        newChild.classList.add("card");
        const bookInfo = newChild.querySelector(".card > div");
        bookInfo.classList.add("book");
        const bookTitle = newChild.querySelector(".book > p:first-of-type");
        bookTitle.classList.add("title");
        const bookAuthor = newChild.querySelector(".book > p:last-of-type");
        bookAuthor.classList.add("author");
        if (book.read) {
            const checked = newChild.querySelector("button[type='submit']");
            checked.previousElementSibling.style = "grid-column: span 1";
            checked.remove();
        }
    }

    #markAsRead(node, id) {
        node.previousElementSibling.style = "grid-column: span 1";
        node.remove();
        for (let book in this.#myLibrary) {
            if (this.#myLibrary[book].id == id) {
                this.#myLibrary[book].read = true;
                break;
            }
        }
    }

    #deleteBook(node, id) {
        node.parentElement.remove();
        for (let book in this.#myLibrary) {
            if (this.#myLibrary[book].id == id) {
                this.#myLibrary.splice(book, 1);
                break;
            }
        }
    }

    eventListener() {
        this.addNewBook.addEventListener('click', () => {
            this.#parent.classList.toggle("inactive");
            this.#form.classList.toggle("inactive");
        });

        this.addBook.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.#form.checkValidity()==false) {
                e.preventDefault();
                return;
            }
            this.#form.classList.toggle("inactive");
            this.#parent.classList.toggle("inactive");
            this.#addBookToLibrary();
            this.#form.reset();
        });

        this.books.addEventListener('click', (e) => {
            const parentNode = e.target.parentElement;
            let cardId = parentNode.parentElement.dataset.id;
            if (parentNode.matches('button[type="submit"]'))
                this.#markAsRead(parentNode, cardId);
            else if (e.target.matches('button[type="submit"]'))
                this.#markAsRead(e.target, cardId)
            else if (parentNode.matches('button[type="reset"]'))
                this.#deleteBook(parentNode, cardId);
            else if (e.target.matches('button[type="reset"]'))
                this.#deleteBook(e.target, cardId);
        });
    }
}

const vivekLib = new Library();

vivekLib.eventListener();