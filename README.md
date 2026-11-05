# Centralized Blockchain Explorer

A simple blockchain implementation built with **Node.js** and **Express.js**. This project demonstrates the fundamental concepts of blockchain technology, including block creation, SHA-256 hashing, Proof of Work (PoW), and hash linking between blocks.

## Features

- **Block Creation:** Create new blocks containing custom data.
- **SHA-256 Hashing:** Generate a unique cryptographic hash for each block.
- **Proof of Work (PoW):** Mine blocks using a configurable difficulty level.
- **Chain Linking:** Each block stores the hash of the previous block, maintaining the blockchain structure.
- **Blockchain Explorer:** Retrieve and explore all blocks in the chain.
- **Block Retrieval:** Retrieve a specific block using its index.
- **REST API:** Interact with the blockchain through HTTP endpoints.

## Technologies Used

- **Node.js** – JavaScript runtime environment.
- **Express.js** – Web framework for building REST APIs.
- **Crypto** – Node.js built-in module used for SHA-256 hashing.

##  Project Structure

```text
centralized-blockchain/
│
├── server.js
├── package.json
└── README.md
```

##  Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Eman-Elejla/centralized-blockchain.git
```

### 2. Navigate to the Project Directory

```bash
cd centralized-blockchain
```

### 3. Install Dependencies

```bash
npm install express
```

### 4. Start the Server

```bash
node server.js
```

The server will start at:

```text
http://localhost:3000
```

##  API Endpoints

### 1. Get the Entire Blockchain

**Endpoint:**

```http
GET /explorer
```

Returns all blocks currently stored in the blockchain.

**Example:**

```bash
curl http://localhost:3000/explorer
```

### 2. Mine a New Block

**Endpoint:**

```http
POST /mine
```

Creates and mines a new block containing the submitted data.

**Request Body:**

```json
{
  "data": {
    "message": "Hello Blockchain!",
    "amount": 100
  }
}
```

**Example:**

```bash
curl -X POST http://localhost:3000/mine \
-H "Content-Type: application/json" \
-d '{"data":{"message":"Hello Blockchain!","amount":100}}'
```

### 3. Get a Specific Block

**Endpoint:**

```http
GET /block/:index
```

Retrieves a block using its index.

**Example:**

```bash
curl http://localhost:3000/block/1
```

Returns the requested block or an error message if the block does not exist.

##  How It Works

Each block contains the following properties:

| Property | Description |
|---|---|
| `index` | Position of the block in the chain. |
| `timestamp` | Date and time when the block was created. |
| `data` | Information stored inside the block. |
| `previousHash` | Hash of the previous block. |
| `nonce` | Number used during the mining process. |
| `hash` | SHA-256 hash of the current block. |

### Proof of Work

The mining process repeatedly changes the nonce until the block's hash starts with a specific number of leading zeros.

The difficulty is currently set to:

```javascript
this.difficulty = 2;
```

This means that a valid block hash must start with two zeros (`00`).

### Blockchain Structure

The blockchain starts with a special block called the **Genesis Block** (the first block).

Each subsequent block references the hash of the previous block, creating a linked structure.

##  Limitations

This project is an educational implementation designed to demonstrate basic blockchain concepts.

- The blockchain is stored in memory and is reset when the server restarts.
- It does not use a distributed peer-to-peer network.
- It does not implement digital signatures or transaction verification.
- It does not include persistent database storage.
- It does not implement full blockchain validation.

##  Learning Objectives

This project was developed to explore and understand:

- Object-Oriented Programming (OOP).
- Cryptographic hashing using SHA-256.
- Proof of Work consensus mechanism.
- Blockchain data structures.
- RESTful API development with Express.js.
- The relationship between blocks through cryptographic hashes.

##  License

This project is available for educational and learning purposes.
