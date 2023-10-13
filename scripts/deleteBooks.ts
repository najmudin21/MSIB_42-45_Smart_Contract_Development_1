import { ethers } from 'hardhat';
import { LibraryBookSmartContract } from '../typechain';

async function main() {
  const library = await ethers.getContract<LibraryBookSmartContract>(
    'LibraryBookSmartContract'
  );

  const [admin] = await ethers.getSigners();

  const deleteBooks = await library
    .connect(admin)
    .deleteBooks('978-623-177-058-5');
  await deleteBooks.wait();
  // const detailsBook = await library.Book('978-623-177-058-5');
  // console.log('buku detail :', bukuDetail);
  console.log('Berhasil Menghapus Buku!');
  console.log('Data buku sekarang tidak ada.');
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
