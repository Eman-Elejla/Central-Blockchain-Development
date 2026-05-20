const express = require('express');
const crypto = require('crypto');
const app = express();
app.use(express.json());

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return crypto.createHash('sha256')
            .update(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce)
            .digest('hex');
    }

    mine(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
    }
}

class CentralBlockchain {
    constructor() {
        this.chain = [new Block(0, new Date().toISOString(), "Genesis Block", "0")];
        this.difficulty = 2;
    }

    setBlock(data) {
        const lastBlock = this.chain[this.chain.length - 1];
        const newBlock = new Block(this.chain.length, new Date().toISOString(), data, lastBlock.hash);
        newBlock.mine(this.difficulty);
        this.chain.push(newBlock);
        return newBlock;
    }

    getBlock(index) {
        return this.chain[index];
    }
}

const myBlockchain = new CentralBlockchain();


app.get('/explorer', (req, res) => {
    res.json(myBlockchain.chain);
});

app.post('/mine', (req, res) => {
    const block = myBlockchain.setBlock(req.body.data);
    res.send({ message: "Block Mined & Added Successfully!", block });
});


app.get('/block/:index', (req, res) => {
    const block = myBlockchain.getBlock(req.params.index);
    res.json(block || { error: "Block not found" });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Blockchain Server running on http://localhost:${PORT}`));