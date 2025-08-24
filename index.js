import express from "express";
import axios from "axios";

const app = express();
const port = 3001;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Home page-Input form
app.get("/", (req, res) => {
  res.render("index");
});

// shows output page
app.post("/price", async (req, res) => {
  const currency = req.body.currency.toUpperCase(); //convert user input to uppercase
  const url = "https://blockchain.info/ticker";
  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data[currency]) {
      const price = data[currency].last;
      res.render("result", { currency, price });
    } else {
      res.render("result", { currency: null, price: null });
    }
  } catch (error) {
    res.render("result", { currency: null, price: null });
  }
});

// ✅ New route: returns chart history data
app.get("/history", async (req, res) => {
  const { currency, days } = req.query;
  try {
    // use CoinGecko for historical chart
    const url = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${currency}&days=${days}`;
    const response = await axios.get(url);
    const data = response.data;

    if (!data.prices) {
      return res.json({ labels: [], prices: [] });
    }

    const labels = data.prices.map(p => new Date(p[0]).toLocaleDateString());
    const prices = data.prices.map(p => p[1]);

    res.json({ labels, prices });
  } catch (err) {
    console.error("Chart API error:", err.message);
    res.json({ labels: [], prices: [] });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
