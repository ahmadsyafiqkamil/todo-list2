```markdown
# 📝 Note dApp — Blockchain-Based Note Application

A decentralized application (dApp) for writing and managing personal notes tied to your Ethereum wallet. Built using Next.js, FastAPI, and Solidity smart contracts deployed on the Sepolia testnet.

---

## 🚀 Features

- ✏️ Create, update, delete, and complete personal notes
- 🔐 Notes are scoped per user wallet address
- 📡 Transactions are signed and sent directly from the user's wallet
- 🔄 Notes auto-refresh after transactions are confirmed
- 💻 Modern stack: Next.js + wagmi + FastAPI + Foundry

---

## 🧱 Tech Stack

| Layer         | Technology                             |
|---------------|-----------------------------------------|
| Frontend      | Next.js, TailwindCSS, wagmi, shadcn/ui  |
| Backend       | FastAPI, Python, web3.py                |
| Smart Contract| Solidity, Foundry                       |
| Blockchain    | Ethereum Sepolia Testnet                |

---

## 📁 Project Structure

```
note-dapp/
├── frontend/              # Next.js frontend
│   ├── app/               # Pages & components
│   └── components/ui/     # Shadcn-based UI
├── backend/               # FastAPI backend
│   ├── app/               # routes, services, utils
│   └── abi/Note.json      # Compiled contract ABI
├── contract/              # Foundry smart contract
│   └── src/Note.sol
├── README.md
└── .env / .env.local
```

---

## ⚙️ Getting Started

### 1. Deploy Smart Contract (Sepolia)

```bash
cd contract
forge create \
  --rpc-url https://sepolia.infura.io/v3/YOUR_INFURA_KEY \
  --private-key YOUR_PRIVATE_KEY \
  src/Note.sol:Note --broadcast
```

Save the deployed contract address for later.

---

### 2. Start Backend (FastAPI)

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

`.env` example:

```
RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
CONTRACT_ADDRESS_SEPOLIA=0xYourContractAddress
```

---

### 3. Start Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

`.env.local` example:

```
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000
NEXT_PUBLIC_CHAIN_ID=11155111
```

---

## 🔗 API Endpoints

| Method | Endpoint                    | Description                             |
|--------|-----------------------------|------------------------------------------|
| GET    | `/notes?address=0x...`      | Fetch notes for a given wallet address   |
| POST   | `/notes`                    | Prepare transaction to add a note        |
| PUT    | `/notes/{task_id}`          | Prepare transaction to update a note     |
| PATCH  | `/notes/{task_id}/complete` | Mark note as completed                   |
| DELETE | `/notes/{task_id}`          | Prepare transaction to delete a note     |

---

## 🔒 Security Design

- The backend **builds** transactions, but does **not sign or send**
- The frontend signs transactions via the user's wallet (e.g., MetaMask)
- No sensitive user data is stored on the backend

---

## 🧪 Testing

- Use MetaMask or WalletConnect to test with real wallets
- Use `curl` or Postman to test backend APIs
- Use `cast call` / `cast send` (from Foundry) to interact with the contract

---

## 👨‍💻 Author

- Developed by: [Ahmad Syafiq Kamil](https://github.com/ahmadsyafiqkamil)
- Powered by OpenAI, wagmi, Foundry, and FastAPI

---

## 📄 License

MIT — feel free to fork, use, and build upon this project.
```

---

Let me know if you want this formatted as a downloadable file or if you'd like to internationalize it.