//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Perpustakaan {
    struct Buku {
        uint256 ISBN;
        string judul;
        uint256 tahun;
        string pengarang;
    }

    mapping(uint256 => Buku) public books;
    address public admin;
    uint256 private nonce = 0;

    constructor() {
        admin = msg.sender;
    }

    modifier hanyaAdmin() {
        require(msg.sender == admin, "Hanya admin yang dapat melakukan tindakan ini");
        _;
    }

    event BukuDitambahkan(uint256 ISBN, string judul, uint256 tahun, string pengarang);
    event BukuDiperbarui(uint256 ISBN, string judul, uint256 tahun, string pengarang);
    event BukuDihapus(uint256 ISBN, string judul, uint256 tahun, string pengarang);

    function tambahBuku(string memory _judul, uint256 _tahun, string memory _pengarang) public hanyaAdmin {
        uint256 _ISBN = generateAcakISBN();
        books[_ISBN] = Buku(_ISBN, _judul, _tahun, _pengarang);
        emit BukuDitambahkan(_ISBN, _judul, _tahun, _pengarang);
    }

    function updateBuku(uint256 _ISBN, string memory _judul, uint256 _tahun, string memory _pengarang) public hanyaAdmin {
        require(books[_ISBN].ISBN != 0, "Buku tidak ditemukan");
        books[_ISBN].judul = _judul;
        books[_ISBN].tahun = _tahun;
        books[_ISBN].pengarang = _pengarang;
        emit BukuDiperbarui(_ISBN, _judul, _tahun, _pengarang);
    }

    function hapusBuku(uint256 _ISBN) public hanyaAdmin {
        require(books[_ISBN].ISBN != 0, "Buku tidak ditemukan");
        Buku memory deletedBook = books[_ISBN];
        delete books[_ISBN];
        emit BukuDihapus(deletedBook.ISBN, deletedBook.judul, deletedBook.tahun, deletedBook.pengarang);
    }

    function dapatkanBukuDariISBN(uint256 _ISBN) public view returns (Buku memory) {
        require(books[_ISBN].ISBN != 0, "Buku tidak ditemukan");
        return books[_ISBN];
    }

    function generateAcakISBN() private returns (uint256) {
        uint256 _ISBN = uint256(keccak256(abi.encodePacked(nonce, msg.sender, block.timestamp)));
        while (books[_ISBN].ISBN != 0) {
            nonce++;
            _ISBN = uint256(keccak256(abi.encodePacked(nonce, msg.sender, block.timestamp)));
        }
        return _ISBN;
    }
}