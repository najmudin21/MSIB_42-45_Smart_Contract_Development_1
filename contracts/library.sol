// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract LibraryBookSmartContract {
    address public admin;
    struct Books {
        //record ISBN, judul, tahun dibuat, & penulis
        string isbn;
        string title;
        uint year;
        string author;
    }

    mapping(string => Books) public Book;

    //add event for logging
    event addBook(string isbn, string title, uint year, string author);
    event updateBook(
        string isbn,
        string newTitle,
        uint newYear,
        string newAuthor
    );
    event deleteBook(string isbn);

    //validation isAdmin
    modifier onlyAdmin() {
        require(msg.sender == admin, 'Hanya admin yang boleh melakukan');
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    //Menambah isi buku.
    function addBooks(
        string memory _isbn,
        string memory _title,
        uint _year,
        string memory _author
    ) public onlyAdmin {
        require(
            bytes(Book[_isbn].isbn).length == 0,
            'Buku dengan ISBN tersebut Sudah ada'
        );
        Book[_isbn] = Books(_isbn, _title, _year, _author);
        emit addBook(_isbn, _title, _year, _author);
    }

    //Edit isi buku berdasarkan ID.
    function editBooks(
        string memory _isbn,
        string memory _newTitle,
        uint _newYear,
        string memory _newAuthor
    ) public onlyAdmin {
        require(
            bytes(Book[_isbn].isbn).length != 0,
            'Buku dengan ISBN tersebut tidak ada'
        );
        Book[_isbn].title = _newTitle;
        Book[_isbn].year = _newYear;
        Book[_isbn].author = _newAuthor;
        emit updateBook(_isbn, _newTitle, _newYear, _newAuthor);
    }

    //Menghapus buku berdasarkan ID.
    function deleteBooks(string memory _isbn) public onlyAdmin {
        require(
            bytes(Book[_isbn].isbn).length != 0,
            'Buku dengan ISBN tersebut tidak ada'
        );
        delete Book[_isbn];
        emit deleteBook(_isbn);
    }

    //Melihat isi buku.
    function getBooksByISBN(
        string memory _isbn
    ) public view returns (string memory, string memory, uint, string memory) {
        require(
            bytes(Book[_isbn].isbn).length != 0,
            'Buku dengan ISBN tersebut tidak ada'
        );
        return (
            Book[_isbn].isbn,
            Book[_isbn].title,
            Book[_isbn].year,
            Book[_isbn].author
        );
    }
}
