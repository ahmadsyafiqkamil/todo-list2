# Todo List DApp

A decentralized Todo List application built with Next.js, Python backend, and Ethereum smart contracts.

## 🌟 Features

- Create, read, update, and delete todo items
- Blockchain-based data persistence using smart contracts
- Modern and responsive user interface
- Secure authentication
- Real-time updates

## 🏗 Project Structure

```
todo-list2/
├── frontend/          # Next.js frontend application
├── backend/           # Python backend server
└── contract/          # Solidity smart contracts
```

## 🔧 Technology Stack

- **Frontend**:
  - Next.js
  - TypeScript
  - TailwindCSS
  - Web3.js/Ethers.js

- **Backend**:
  - Python
  - FastAPI

- **Blockchain**:
  - Solidity
  - Foundry (Development Framework)

## 📦 Prerequisites

- Node.js (v18 or higher)
- Python (v3.8 or higher)
- Foundry
- MetaMask wallet

## 🚀 Getting Started

### Smart Contract Deployment

```bash
cd contract
forge install
forge build
forge test
forge deploy
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

## 🔑 Environment Variables

Create `.env` files in respective directories:

### Frontend (.env.local)
```
NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

### Backend (.env)
```
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

## 📝 Usage

1. Connect your MetaMask wallet
2. Create a new todo item
3. Mark items as complete
4. Edit or delete existing items

## 🤝 Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name (@your-github)

## 🙏 Acknowledgments

- Thanks to the Web3 community
- All contributors and supporters

![Application Screenshot](/images/Screenshot%202025-04-11%20at%2010.01.10.png)
![Application Screenshot](/images/Screenshot%202025-04-11%20at%2010.02.05.png)
![Application Screenshot](/images/Screenshot%202025-04-11%20at%2010.02.34.png)
![Application Screenshot](/images/Screenshot%202025-04-11%20at%2010.03.00.png)
![Application Screenshot](/images/Screenshot%202025-04-11%20at%2010.14.29.png)

