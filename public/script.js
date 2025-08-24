let chart;
const canvas = document.getElementById("priceChart");
const chartNote = document.getElementById("chartNote");
const timeRange = document.getElementById("timeRange");

// --- Fetch data ---
async function fetchData(days) {
  try {
    const res = await fetch(`/history?currency=${selectedCurrency}&days=${days}`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

// --- Format Helpers ---
function formatTooltip(val) {
  return val ? `${val.toLocaleString()} ${selectedCurrency.toUpperCase()}` : "";
}
function formatTick(val) {
  return val >= 1000 ? val.toLocaleString() : val;
}
function createGradient(ctx) {
  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, "rgba(0,255,204,0.4)");
  gradient.addColorStop(1, "rgba(0,255,204,0)");
  return gradient;
}

// --- Render Chart ---
async function renderChart(days) {
  const result = await fetchData(days);
  if (!result) {
    if (chart) chart.destroy();
    chartNote.textContent = "Unable to load chart data. Please try again.";
    return;
  }

  const { labels, prices } = result;
  if (!labels.length || !prices.length) {
    if (chart) chart.destroy();
    chartNote.textContent = "No data returned for this range.";
    return;
  }

  if (chart) chart.destroy();
  const ctx = canvas.getContext("2d");

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: `BTC → ${selectedCurrency.toUpperCase()}`,
        data: prices,
        borderWidth: 2,
        borderColor: "rgba(0,255,204,1)",
        backgroundColor: createGradient(ctx),
        fill: true,
        tension: 0.3,
        pointRadius: 0,
        pointHoverRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          mode: "index",
          intersect: false,
          callbacks: { label: (ctx) => formatTooltip(ctx.raw) }
        }
      },
      interaction: { intersect: false, mode: "nearest" },
      scales: {
        x: {
          ticks: {
            color: "#fff",
            autoSkip: true,
            maxTicksLimit: 8
          },
          grid: { color: "rgba(255,255,255,0.08)" }
        },
        y: {
          ticks: {
            color: "#fff",
            callback: (val) => formatTick(val),
            maxTicksLimit: 6
          },
          grid: { color: "rgba(255,255,255,0.08)" }
        }
      }
    }
  });

  chartNote.textContent = days <= 7
    ? "Hourly BTC prices for the last 7 days."
    : "Daily BTC prices for the last 30 days.";
}

// --- Init ---
timeRange.addEventListener("change", (e) => renderChart(+e.target.value));
renderChart(+timeRange.value);
