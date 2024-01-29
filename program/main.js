// Array untuk menyimpan daftar buku
const books = [];

// Konstanta untuk event perubahan buku
const EVENT_CHANGE = "change-books";

// Konstanta untuk event penyimpanan data
const SAVED_EVENT = "saved-books";

// Key untuk menyimpan data di local storage
const STORAGE_KEY = "BOOKSELF_APPS";

// Saat DOM sudah dimuat
document.addEventListener("DOMContentLoaded", function () {
  // Menangkap form submit
  const submitForm = document.getElementById("form");
  submitForm.addEventListener("submit", function (e) {
    e.preventDefault();
    addBook();
    alert("Buku Ditambahkan");
    e.target.reset();
  });

  // Memeriksa apakah local storage tersedia
  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

// Fungsi untuk menyimpan data ke local storage
function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

// Fungsi untuk memeriksa ketersediaan local storage
function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}

// Fungsi untuk menambahkan buku baru
function addBook() {
  // Mengambil nilai input dari form
  const inputTitle = document.getElementById("title").value;
  const inputAuthor = document.getElementById("author").value;
  const inputYear = document.getElementById("date").value;

  // Membuat ID unik untuk buku
  const generatedID = generateId();
  // Membuat objek buku baru
  const newBook = generateNewBook(generatedID, inputTitle, inputAuthor, inputYear, false);
  // Menambahkan buku ke array
  books.push(newBook);

  // Memicu event perubahan data
  document.dispatchEvent(new Event(EVENT_CHANGE));
  // Menyimpan data ke local storage
  saveData();
}

// Fungsi untuk menghasilkan ID unik
function generateId() {
  return +new Date();
}

// Fungsi untuk menghasilkan objek buku baru
function generateNewBook(id, bookTitle, inputAuthor, inputYear, isReaded) {
  return {
    id,
    bookTitle,
    inputAuthor,
    inputYear,
    isReaded,
  };
}

// Fungsi untuk membuat elemen HTML buku
function makeBook(newBook) {
  // Membuat elemen judul buku
  const bookTitle = document.createElement("h2");
  bookTitle.innerText = newBook.bookTitle;

  // Membuat elemen penulis buku
  const authorName = document.createElement("p");
  authorName.innerText = newBook.inputAuthor;

  // Membuat elemen tahun terbit buku
  const bookYear = document.createElement("p");
  bookYear.innerText = newBook.inputYear;

  // Membuat container untuk teks
  const textContainer = document.createElement("div");
  textContainer.classList.add("inner");
  textContainer.append(bookTitle, authorName, bookYear);

  // Membuat container untuk buku
  const container = document.createElement("div");
  container.classList.add("item", "list-item", "shadow");
  container.append(textContainer);
  container.setAttribute("id", `book-${newBook.id}`);

  // Menambahkan tombol-tombol aksi sesuai status buku
  if (newBook.isReaded) {
    const undoButton = document.createElement("img");
    undoButton.setAttribute("src", "assets/undo-outline.svg");
    undoButton.classList.add("undo-button");

    undoButton.addEventListener("click", function () {
      if (confirm("Anda Yakin Mengembalikan Buku ke Daftar Belum DIKemabilikan?")) {
        undoBookTitleFromReaded(newBook.id);
        alert("Buku Dikembalikan ke List Belum Dikembalikan");
      }
    });

    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-button");

    trashButton.addEventListener("click", function () {
      if (confirm("Anda Yakin Menghapus Buku Dari Bookshelf?")) {
        removeBookTitleFromReaded(newBook.id);
        alert("Buku Dihapus Dari Bookshelf");
      }
    });

    container.append(undoButton, trashButton);
  } else {
    const checkButton = document.createElement("button");
    checkButton.classList.add("check-button");

    checkButton.addEventListener("click", function () {
      if (confirm("Anda Yakin Buku Telah Dikembalikan?")) {
        addBookTitleToReadList(newBook.id);
        alert("Buku Dipindahkan ke List Sudah Dikkembalikan");
      }
    });

    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-button");

    trashButton.addEventListener("click", function () {
      if (confirm("Anda Yakin Menghapus Buku Dari Bookshelf?")) {
        removeBookTitleFromReaded(newBook.id);
        alert("Buku Dihapus Dari Bookshelf");
      }
    });

    container.append(checkButton, trashButton);
  }

  return container;
}

// Event listener untuk perubahan data
document.addEventListener(EVENT_CHANGE, function () {
  // Menghitung jumlah buku
  const list = books.length;

  // Array untuk menyimpan buku yang sudah dan belum dikembalikan
  const read = [];
  const unRead = [];

  // Mengambil elemen container buku yang belum dikembalikan
  const unReadBooksList = document.getElementById("books");
  unReadBooksList.innerHTML = "";

  // Mengambil elemen container buku yang sudah dikembalikan
  const readBookList = document.getElementById("books-items");
  readBookList.innerHTML = "";

  // Mengambil elemen untuk menampilkan jumlah buku belum dikembalikan
  const unReadBook = document.getElementById("unread-book");
  unReadBook.innerText = "";

  // Mengambil elemen untuk menampilkan jumlah buku sudah dikembalikan
  const readBook = document.getElementById("read-book");
  readBook.innerText = "";

  // Iterasi melalui array buku
  for (const bookItem of books) {
    // Membuat elemen buku
    const bookList = makeBook(bookItem);

    // Memisahkan buku yang sudah dan belum dikembalikan
    if (bookItem.isReaded) {
      readBookList.append(bookList);
      read.push(readBookList);
      readBook.innerText = read.length;
    } else {
      unReadBooksList.append(bookList);
      unRead.push(bookList);
      unReadBook.innerText = unRead.length;
    }
  }

  // Menjalankan fungsi jika tidak ada daftar buku
  ifNoList();

  // Menampilkan total jumlah buku
  totalOfBooks();
});

// Fungsi untuk menampilkan pesan jika tidak ada daftar buku
function ifNoList() {
  const list = books.length;
  const container = document.querySelector(".no-list");
  if (list == 0) {
    container.classList.add("picture");
  } else {
    container.classList.remove("picture");
  }
}

// Event listener untuk tombol reset daftar buku
const resetList = document.getElementById("btn-reset");
resetList.addEventListener("click", function () {
  const reset = books.length;
  if (reset == 0) {
    alert("List Kosong");
  } else {
    if (confirm("Anda Yakin Menghapus Semua List data peminjaman?")) {
      resetBookList(reset);
      alert("Semua List peminjaman Dihapus");
    }
  }
});

// Fungsi untuk menampilkan total jumlah buku
function totalOfBooks() {
  const totalBooks = document.getElementById("total-books");
  totalBooks.innerHTML = books.length;
}

// Fungsi untuk memindahkan buku ke daftar sudah dikembalikan
function addBookTitleToReadList(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isReaded = true;
  document.dispatchEvent(new Event(EVENT_CHANGE));
  saveData();
}

// Event listener untuk pencarian buku
document.getElementById("bookTitle").addEventListener("keyup", function () {
  const inputValue = document.getElementById("bookTitle").value;
  const listBooks = document.querySelectorAll(".list-item");

  for (let i = 0; i < listBooks.length; i++) {
    if (!inputValue || listBooks[i].textContent.toLowerCase().indexOf(inputValue) > -1) {
      listBooks[i].classList.remove("hide");
    } else {
      listBooks[i].classList.add("hide");
    }
  }
});

// Fungsi untuk mencari buku berdasarkan ID
function findBook(bookId) {
  for (const todoItem of books) {
    if (todoItem.id === bookId) {
      return todoItem;
    }
  }
  return null;
}

// Fungsi untuk menghapus buku dari daftar sudah dikembalikan
function removeBookTitleFromReaded(bookId) {
  const bookTarget = findBookIndex(bookId);

  if (bookTarget === -1) return;

  books.splice(bookTarget, 1);
  document.dispatchEvent(new Event(EVENT_CHANGE));
  saveData();
}

// Fungsi untuk mereset seluruh daftar buku
function resetBookList(newBook) {
  const resetAll = bookIndex(newBook);

  if (resetAll) return;

  books.splice(resetAll);
  document.dispatchEvent(new Event(EVENT_CHANGE));
  saveData();
}

// Fungsi untuk membatalkan status sudah dikembalikan
function undoBookTitleFromReaded(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isReaded = false;
  document.dispatchEvent(new Event(EVENT_CHANGE));
  saveData();
}

// Fungsi untuk mencari indeks buku berdasarkan ID
function findBookIndex(bookId) {
  for (const index in books) {
    if (books[index].id === bookId) {
      return index;
    }
  }

  return -1;
}

// Fungsi untuk mencari indeks buku dalam array
function bookIndex(newBook) {
  for (const index in books) {
    if (books[index] === newBook) {
      return index;
    }
  }
}

// Event listener untuk menampilkan data yang disimpan di local storage
document.addEventListener(SAVED_EVENT, function () {
  console.log(localStorage.getItem(STORAGE_KEY));
});

// Fungsi untuk memuat data dari local storage saat aplikasi dimuat
function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const book of data) {
      books.push(book);
    }
  }

  document.dispatchEvent(new Event(EVENT_CHANGE));
}
