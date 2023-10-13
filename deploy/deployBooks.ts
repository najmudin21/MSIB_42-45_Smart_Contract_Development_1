import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

const func: DeployFunction = async ({
  deployments,
  ethers,
}: HardhatRuntimeEnvironment) => {
  const { deploy } = deployments;
  const accounts = await ethers.getSigners();

  const deployer = accounts[0];
  console.log('deployer address', deployer.address);

  const library = await deploy('LibraryBookSmartContract', {
    contract: 'LibraryBookSmartContract',
    from: deployer.address,
    args: [],
    gasLimit: 1000000,
  });
  console.log('library deployed at ', library.address);
};
func.tags = ['LibraryBookSmartContract'];
export default func;

