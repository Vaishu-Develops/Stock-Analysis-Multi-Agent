# 📊 Stock Analysis Multi-Agent System

<div align="center">

![Python](https://img.shields.io/badge/Python-3.9+-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-green.svg)
![React](https://img.shields.io/badge/React-19.0+-61DAFB.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)
![Status](https://img.shields.io/badge/Status-Active-success.svg)

**🤖 AI-Powered Financial Analysis Dashboard with Multi-Agent Architecture**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Usage](#-usage) • [Architecture](#-architecture)

</div>

---

## 🌟 Overview

A cutting-edge financial analysis platform that leverages **Microsoft AutoGen** multi-agent AI system to provide comprehensive stock market insights. Each specialized agent analyzes different aspects of a stock, coordinated by an intelligent orchestrator to deliver professional-grade investment reports.

### ✨ Key Highlights

- 🤖 **Multi-Agent AI System** - Specialized agents for different analysis types
- 📈 **Real-Time Market Data** - Live stock prices and technical indicators
- 🎨 **Modern Glassmorphic UI** - Beautiful cyber-themed interface
- ⚡ **Lightning Fast** - Redis caching for optimal performance
- 📊 **Comprehensive Analysis** - Fundamental, Technical, Risk, and Peer comparison
- 🔄 **Live Updates** - WebSocket support for real-time data streaming

---

## 🎯 Features

### 🔍 Analysis Capabilities

| Feature | Description |
|---------|-------------|
| **📊 Fundamental Analysis** | Financial ratios, revenue trends, profit margins, growth metrics |
| **📈 Technical Analysis** | Moving averages, RSI, MACD, Bollinger Bands, candlestick patterns |
| **⚖️ Risk Assessment** | Beta, volatility, drawdown analysis, risk-adjusted returns |
| **👥 Peer Comparison** | Industry benchmarking and competitor analysis |
| **📝 AI Reports** | Natural language summaries powered by LLMs |
| **💹 Live Charts** | Interactive price charts with technical overlays |

### 🎨 UI/UX Features

- ✅ Responsive glassmorphic design
- ✅ Dark/Cyber theme with neon accents
- ✅ Smooth animations and transitions
- ✅ Real-time data updates
- ✅ Loading skeletons and process animations
- ✅ Custom scrollbars and hover effects

---

## 🛠️ Tech Stack

### Backend
```
🐍 Python 3.9+          - Core language
⚡ FastAPI              - High-performance API framework
🔴 Redis                - Caching and session storage
🤖 AutoGen              - Multi-agent orchestration
📊 yfinance             - Market data fetching
🐼 Pandas               - Data manipulation
📈 TA-Lib               - Technical analysis indicators
🔐 python-dotenv        - Environment management
```

### Frontend
```
⚛️ React 19             - UI framework
⚡ Vite 7               - Build tool and dev server
🎨 Tailwind CSS         - Utility-first styling
📦 pnpm                 - Fast package manager
📊 Recharts             - Charting library
🔤 Lucide React         - Icon library
✨ PostCSS              - CSS processing
```

### AI/LLM
```
🌐 OpenRouter API       - Multi-model LLM gateway
🤖 Google Gemini 2.0    - Primary AI model
💬 AutoGen              - Agent orchestration
```

---

## 📦 Installation

### Prerequisites

- Python 3.9+
- Node.js 18+
- pnpm
- Redis Server
- Git

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Vaishu-Develops/Stock-Analysis-Multi-Agent.git
cd Stock-Analysis-Multi-Agent
```

### 2️⃣ Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
.\venv\Scripts\Activate.ps1
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo "OPENROUTER_API_KEY=your_api_key_here" > .env
echo "MODEL_NAME=google/gemini-2.0-flash-exp:free" >> .env
echo "OPENAI_BASE_URL=https://openrouter.ai/api/v1" >> .env
```

### 3️⃣ Frontend Setup

```bash
cd ../frontend

# Install dependencies
pnpm install
```

### 4️⃣ Start Redis

```bash
# Windows (with Redis installed)
redis-server

# Linux/Mac
sudo systemctl start redis

# Docker
docker run -d -p 6379:6379 redis
```

---

## 🚀 Usage

### Start Backend

```bash
cd backend
.\venv\Scripts\Activate.ps1  # Windows
python -m uvicorn main:app --reload
```

Backend runs on: `http://localhost:8000`

### Start Frontend

```bash
cd frontend
pnpm dev
```

Frontend runs on: `http://localhost:5173`

### 📊 Analyze a Stock

1. Open browser to `http://localhost:5173`
2. Enter stock ticker (e.g., AAPL, TSLA, GOOGL)
3. Click "Analyze"
4. Watch AI agents process different analysis types
5. View comprehensive report with charts and insights

---

## 🏗️ Architecture

### Multi-Agent System

```
┌─────────────────┐
│  User Request   │
│   (Stock: AAPL) │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│   Orchestrator Agent    │ ◄── Coordinates all agents
└────────┬────────────────┘
         │
         ├──────┬──────┬──────┬──────┐
         │      │      │      │      │
         ▼      ▼      ▼      ▼      ▼
    ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
    │Funda-│ │Tech- │ │Risk  │ │Peers │ │Report│
    │mental│ │nical │ │Assess│ │Comp. │ │Writer│
    │Agent │ │Agent │ │Agent │ │Agent │ │Agent │
    └───┬──┘ └───┬──┘ └───┬──┘ └───┬──┘ └───┬──┘
        │        │        │        │        │
        └────────┴────────┴────────┴────────┘
                         │
                         ▼
                ┌────────────────┐
                │ Aggregated     │
                │ Analysis Report│
                └────────────────┘
```

### Project Structure

```
MultiAgent/
├── backend/
│   ├── main.py                 # FastAPI server
│   ├── requirements.txt        # Python dependencies
│   ├── agents/
│   │   ├── orchestrator.py     # Main coordinator
│   │   └── report_agent.py     # Report generation
│   ├── tools/
│   │   ├── fundamental_tools.py
│   │   ├── technical_tools.py
│   │   ├── risk_tools.py
│   │   └── peer_tools.py
│   └── utils/
│       └── cache.py            # Redis caching
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ProfileSection.jsx
│   │   │   ├── FundamentalSection.jsx
│   │   │   ├── TechnicalSection.jsx
│   │   │   ├── RiskSection.jsx
│   │   │   ├── PeersSection.jsx
│   │   │   └── ReportSection.jsx
│   │   ├── App.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## 🎨 UI Preview

### Main Dashboard
- Glassmorphic cards with backdrop blur
- Gradient text effects
- Smooth hover animations
- Real-time loading states

### Analysis Sections
- 📊 **Profile** - Company overview and key metrics
- 💰 **Fundamentals** - Financial ratios and growth
- 📈 **Technical** - Charts and indicators
- ⚠️ **Risk** - Volatility and risk metrics
- 👥 **Peers** - Industry comparison
- 📝 **Report** - AI-generated summary

---

## 🔑 Environment Variables

### Backend (.env)
```env
OPENROUTER_API_KEY=sk-or-v1-xxxxx
MODEL_NAME=google/gemini-2.0-flash-exp:free
OPENAI_BASE_URL=https://openrouter.ai/api/v1
REDIS_HOST=localhost
REDIS_PORT=6379
```

---

## 📝 API Endpoints

### Health Check
```http
GET /health
```

### Stock Analysis
```http
POST /analyze-stock
Content-Type: application/json

{
  "symbol": "AAPL"
}
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [AutoGen](https://github.com/microsoft/autogen) - Multi-agent framework
- [OpenRouter](https://openrouter.ai/) - LLM API gateway
- [yfinance](https://github.com/ranaroussi/yfinance) - Market data
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [React](https://react.dev/) - UI library

---

## 📧 Contact

**Vaishu-Develops**

- GitHub: [@Vaishu-Develops](https://github.com/Vaishu-Develops)
- Repository: [Stock-Analysis-Multi-Agent](https://github.com/Vaishu-Develops/Stock-Analysis-Multi-Agent)

---

<div align="center">

### ⭐ Star this repo if you find it useful!

Made with ❤️ and 🤖 by Vaishu-Develops

</div>
