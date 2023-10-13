import { ethers } from 'hardhat';
import { LibraryBookSmartContract } from '../typechain';

async function main() {
  const library = await ethers.getContract<LibraryBookSmartContract>(
    'LibraryBookSmartContract'
  );

  const [admin] = await ethers.getSigners();

  const addBooks = await library
    .connect(admin)
    .addBooks('978-623-177-058-5', 'Machine Learning', 2022, 'Hanny Komalig');
  await addBooks.wait();
  const detailsBook = await library.Book('978-623-177-058-5');
  console.log('Berhasil Menambahkan Buku Baru!');
  console.log('ISBN :', detailsBook[0]);
  console.log('Judul :', detailsBook[1]);
  console.log('Tahun Dibuat :', detailsBook[2].toString());
  console.log('Penulis :', detailsBook[3]);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
