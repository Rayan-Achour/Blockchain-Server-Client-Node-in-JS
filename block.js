const crypto = require("crypto"); // Used for encryption algorithms; Built-in
// Define a SHA256 hash function from our crypto library
function SHA256(message) {
    return crypto
        .createHash("sha256") // Set the hashing algorithm to SHA256
        .update(message) // Update the hash with the message
        .digest("hex"); // Return the hash as a hexadecimal string
}
class Block {
    constructor(prevHash = "", transactions = []) {
        this.timestamp = Date.now(); // Set the timestamp to now
        this.transactions = transactions; // Transaction list
        this.hash = this.getHash(); // Current block's hash
        this.prevHash = prevHash; // Previous block's hash
        this.nonce = 0; // Some random value for mining purposes
        // Mine the block
        this.mine();

    }

// Returns the hash of the current block

getHash() {
    // Combine all transactions into strings
    let txStr = "";

    for (let i = 0; i < this.transactions.length; i++) {

        txStr += JSON.stringify(this.transactions[i]);

    }



    // Hash together...

    return SHA256(

        this.prevHash + // The previous hash,
            this.timestamp + // The timestamp of the block,
            txStr + // And all transactions,
            this.nonce // And let's toss in some random nonce for fun
    );

    }
     // Pretty prints the block

     prettify() {
        // Add basic block parameters
        let blockStr = `<div><b>Block</b> #${this.hash}</div>`;
        blockStr += `<div><b>Timestamp:</b> ${this.timestamp}</div>`;
        blockStr += `<div><b>Previous Hash:</b> ${this.prevHash}</div>`;
        blockStr += "<div><b>Transactions:</b></div><div>";

        // Iterate through all transactions

        for (let i = 0; i < this.transactions.length; i++) {
            blockStr += "    " + this.transactions[i].prettify();
        }
        blockStr += "</div>";
        return blockStr;

    }

}
module.exports = Block;
