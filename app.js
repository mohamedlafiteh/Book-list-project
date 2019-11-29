//Book class: represents a book
class book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//UI class: handle UI tasks
class UI {
  static displayBooks() {
    const StoredBooks = [
      {
        title: "book one",
        author: "Mohamed Lafiteh",
        isbn: "3244233"
      },
      {
        title: "book two",
        author: "Sam James",
        isbn: "5555788"
      }
    ];
    const books = StoredBooks;

    books.forEach(book => {
      UI.addBookToList(book);
    });
  }
  static addBookToList(book) {
    const list = document.querySelector("#book-list");
    const row = document.createElement("tr");
    row.innerHTML = `<td> ${book.title}</td>
<td> ${book.author}</td>
<td> ${book.isbn}</td>
<td> <a href="#" class="btn btn-danger btn-sm delete">x</a></td>`;
    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);

    //finish alert after three seconds
    setTimeout(() => document.querySelector(".alert").remove(), 1000);
  }
  static clearfields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}

//Event: display books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

//Event: add book

document.querySelector("#book-form").addEventListener("submit", e => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  //validate
  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("Please fill in all the fields", "danger");
  } else {
    const newBook = new book(title, author, isbn);
    UI.addBookToList(newBook);

    UI.showAlert("Book added", "success");

    UI.clearfields();
  }
});
//Event: remove book
document.querySelector("#book-list").addEventListener("click", e => {
  UI.deleteBook(e.target);
  UI.showAlert("Book removed", "success");
});
