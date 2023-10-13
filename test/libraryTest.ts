import chai from 'chai';
import { LibraryBookSmartContract } from '../typechain';
import { ethers } from 'hardhat';
import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';

const { expect } = chai;

describe('Testing Library Contract', async () => {
  let Library: LibraryBookSmartContract;
  let Admin: HardhatEthersSigner;
  let NotAdmin: HardhatEthersSigner;

  beforeEach(async () => {
    try {
      const accounts = await ethers.getSigners();
      Admin = accounts[0];
      NotAdmin = accounts[1];

      Library = await (
        await ethers.getContractFactory('LibraryBookSmartContract')
      )
        .connect(Admin)
        .deploy();
    } catch (error) {
      console.error('Error during setup:', error);
      throw error;
    }
  });

  it('Admin Ingin Menambah Buku', async () => {
    await Library.connect(Admin).addBooks(
      '978-623-177-058-11',
      'Machine Learning',
      2022,
      'Hanny Komalig'
    );
  });
  it('Jika Bukan Admin Ingin Menambah Buku', async () => {
    await expect(
      Library.connect(NotAdmin).addBooks(
        '978-623-177-058-11',
        'Machine Learning',
        2022,
        'Hanny Komalig'
      )
    ).to.be.revertedWith('Anda bukan seorang Admin!');
  });
  it('Admin Ingin Update Buku', async () => {
    await Library.connect(Admin).addBooks(
      '978-623-177-058-11',
      'Machine Learning',
      2022,
      'Hanny Komalig'
    );
    await Library.connect(Admin).editBooks(
      '978-623-177-058-11',
      'Blockchain for everything',
      2023,
      'Bima Jadiva'
    );
  });
  it('Jika Bukan Admin Ingin Update Buku', async () => {
    await Library.connect(NotAdmin).addBooks(
      '978-623-177-058-11',
      'Machine Learning',
      2022,
      'Hanny Komalig'
    );
    await expect(
      Library.connect(NotAdmin).editBooks(
        '978-623-177-058-11',
        'Machine Learning',
        2022,
        'Bima Jadivaa'
      )
    ).to.be.revertedWith('Anda bukan seorang Admin!');
  });
  it('Admin Ingin Menghapus Buku', async () => {
    await Library.connect(Admin).addBooks(
      '978-623-177-058-11',
      'Machine Learning',
      2022,
      'Hanny Komalig'
    );
    await Library.connect(Admin).deleteBooks('978-623-177-058-11');
  });
  it('Jika Bukan Admin Ingin Menghapus Buku', async () => {
    await Library.connect(NotAdmin).addBooks(
      '978-623-177-058-11',
      'Machine Learning',
      2022,
      'Hanny Komalig'
    );
    await expect(
      Library.connect(NotAdmin).deleteBooks('978-623-177-058-11')
    ).to.be.revertedWith('Anda bukan seorang Admin!');
  });
  it('Jika Admin dan Bukan Admin ingin melihat Buku', async () => {
    await Library.connect(Admin).addBooks(
      '978-623-177-058-11',
      'Machine Learning',
      2022,
      'Hanny Komalig'
    );
    await Library.connect(Admin).getBooksByISBN('978-623-177-058-11');
    await Library.connect(NotAdmin).getBooksByISBN('978-623-177-058-11');
  });
});
