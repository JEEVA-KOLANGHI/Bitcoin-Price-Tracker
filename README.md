# 💱 Cryptocurrency Converter & Price Chart

A simple web application that shows the **current Bitcoin (BTC) price** in any currency and displays its **historical price chart** (7 days or 30 days).  

Built with **Node.js, Express.js, EJS, Chart.js, and public APIs (Blockchain & CoinGecko).**

---

## 🚀 Features
- Convert **Bitcoin to any currency** (USD, INR, EUR, etc.)
- Live price fetched from **Blockchain API**
- Interactive **line chart** of BTC price for:
  - Last **7 days**
  - Last **30 days**
- Responsive & clean UI with EJS templates + CSS
- Backend powered by **Express.js**

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js  
- **Frontend:** EJS, CSS, Chart.js  
- **APIs:**  
  - [Blockchain API](https://blockchain.info/ticker) → Live BTC price  
  - [CoinGecko API](https://www.coingecko.com/en/api) → Historical BTC data  

---

## 📊 How it Works
1. User enters a currency code (example: USD, INR).  
2. Backend fetches **current BTC price** using Blockchain API.  
3. Result page displays the price and an empty chart.  
4. JavaScript fetches data from our `/history` route (which uses CoinGecko API).  
5. Chart.js renders a **line chart** of BTC value for last 7 or 30 days.  

### Home Page  
*(User selects currency)*  

### Result Page  
*(Shows BTC price + chart for 7 days / 30 days)*  

## 📦 Installation
```bash
# Clone repo
eg: git clone https://github.com/your-username/crypto-converter.git

# Install dependencies
npm install

# Run server
node index.js
