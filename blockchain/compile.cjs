const solc = require("solc");
const fs = require("fs");
const path = require("path");

const fileName = "SecureBallot.sol";
const contractName = "SecureBallot";

const contractPath = path.join(__dirname, fileName);
const sourceCode = fs.readFileSync(contractPath, "utf8");

const input = {
  language: "Solidity",
  sources: {
    [fileName]: {
      content: sourceCode,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const compiledCode = JSON.parse(solc.compile(JSON.stringify(input)));

const bytecode =
  compiledCode.contracts[fileName][contractName].evm.bytecode.object;

const bytecodePath = path.join(__dirname, "SecureBallot.bin");
fs.writeFileSync(bytecodePath, bytecode);

const abi = compiledCode.contracts[fileName][contractName].abi;

const abiPath = path.join(__dirname, "SecureBallot.json");
fs.writeFileSync(abiPath, JSON.stringify(abi, null, "\t"));

console.log("Done");
