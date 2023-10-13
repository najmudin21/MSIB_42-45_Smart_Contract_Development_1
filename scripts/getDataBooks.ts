import { LibraryBookSmartContract } from '../typechain';
import { ethers } from 'hardhat';

async function main() {
  const LibraryBookSmartContract =
    await ethers.getContract<LibraryBookSmartContract>(
      'LibraryBookSmartContract'
    );

  const detailsBook = await LibraryBookSmartContract.getBooksByISBN(
    '978-623-177-058-5'
  );

  console.log('Data buku saat ini adalah :');
  console.log('ISBN :', detailsBook[0]);
  console.log('Judul :', detailsBook[1]);
  console.log('Tahun Dibuat :', detailsBook[2].toString());
  console.log('Penulis :', detailsBook[3]);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
