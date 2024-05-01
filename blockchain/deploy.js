const { Web3 } = require("web3");

// Loading the contract ABI and Bytecode
// (the results of a previous compilation step)
const fs = require("fs");
const { abi, bytecode } = JSON.parse(fs.readFileSync("SecureBallot.json"));

async function main() {
  // Configuring the connection to an Ethereum node
  const web3 = new Web3(
    new Web3.providers.HttpProvider(`HTTP://127.0.0.1:8545`)
  );
  // Creating a signing account from a private key
  const signer = web3.eth.accounts.privateKeyToAccount(
    "0x" + "8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63"
  );
  web3.eth.accounts.wallet.add(signer);

  // Using the signing account to deploy the contract
  const contract = new web3.eth.Contract(abi);
  contract.options.data = bytecode;
  const deployTx = contract.deploy();
  const deployedContract = await deployTx
    .send({
      from: signer.address,
      gas: await deployTx.estimateGas(),
    })
    .once("transactionHash", (txhash) => {
      console.log(`Mining deployment transaction ...`);
      console.log(`https://${network}.etherscan.io/tx/${txhash}`);
    });
  // The contract is now deployed on chain!
  console.log(`Contract deployed at ${deployedContract.options.address}`);
  console.log(
    `Add DEMO_CONTRACT to the.env file to store the contract address: ${deployedContract.options.address}`
  );
}

main();
