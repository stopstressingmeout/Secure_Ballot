const { Web3 } = require("web3");
const fs = require("fs");
const path = require("path");

const provider = new Web3("http://127.0.0.1:8545");

const bytecodePath = path.join(__dirname, "SecureBallot.bin");
const bytecode = fs.readFileSync(bytecodePath, "utf8");

const abi = require("./SecureBallot.json");

const adminKey =
  "0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63";
console.log(adminKey);

async function deploy() {
  const wallet = provider.eth.wallet.add(adminKey);

  const myContract = new provider.eth.Contract(abi);

  const deployer = myContract.deploy({
    data: "0x" + bytecode,
    arguments: ["Election"],
  });

  const txReceipt = await deployer.send({
    from: wallet[0].address,
    gas: "500000",
    gasPrice: "0",
  });

  console.log(txReceipt.options.address);
}

deploy();
