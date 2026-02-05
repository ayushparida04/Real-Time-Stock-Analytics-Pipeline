# Azure Stream Analytics Showcase

## 🚀 Overview
This application serves as a comprehensive interactive dashboard demonstrating a **Real-Time Stock Analysis Pipeline**. It bridges the gap between backend Data Engineering and frontend visualization, simulating a modern architecture using **Azure Cloud Services**, **Databricks**, and **React**.

It simulates the flow of high-frequency financial data through a "Medallion Architecture" (Bronze/Silver/Gold layers) and provides AI-powered insights into market trends.

## ⚡ Features

### 1. Real-Time Data Simulation
- Simulates a high-throughput **C# Producer** pushing stock ticks to **Azure Event Hubs**.
- Generates realistic price movements, volatility, and volume for multiple assets (AAPL, MSFT, BTC, etc.).
- Visualizes the data stream latency and processing stages in a live log drawer.

### 2. Medallion Architecture Visualization
- **Ingestion (Bronze):** Raw data capture via Event Hubs.
- **Processing (Silver):** Streaming aggregations (5-minute windows) using **PySpark/Databricks**.
- **Storage (Gold):** Refined, business-level data stored in **Delta Lake**.
- **Interactive Diagram:** Clickable architecture nodes powered by **Gemini AI** to explain technical concepts on demand.

### 3. Live Dashboard
- **Dynamic Charts:** Real-time updating Area and Line charts using `recharts`.
- **Technical Indicators:** Live calculation of RSI (Relative Strength Index) and Moving Averages.
- **Multi-Asset Support:** Toggle between different stocks/crypto with unique volatility profiles and price points.

### 4. AI Market Analyst
- Integrated **Google Gemini 3 Flash** model.
- Acts as a "Senior Financial Analyst" to parse the simulated data window.
- Provides concise, context-aware summaries of current trends, volatility, and RSI indicators in natural language.

### 5. Engineering Implementation View
- Dedicated section for "Infrastructure as Code".
- Displays the actual **C# Event Hub Producer** logic and **PySpark Structured Streaming** jobs that theoretically power the backend.
- Syntax highlighting and copy functionality for code snippets.

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 (TypeScript)
- **Styling:** Tailwind CSS
- **Visualization:** Recharts
- **Icons:** Lucide React
- **Build Tool:** Vite / ESBuild

### Simulated Backend Architecture
- **Ingestion:** Azure Event Hubs
- **Processing:** Azure Databricks (Spark Structured Streaming)
- **Storage:** Azure Data Lake Storage Gen2 (Delta Format)
- **AI:** Google GenAI SDK (`@google/genai`)

## 🎯 How It Works
1.  **Selection:** Choose a stock (e.g., AAPL) from the dropdown in the dashboard header.
2.  **Stream:** Click "Start Stream" to begin the data simulation.
3.  **Observe:** Watch the "System Logs" drawer to see data moving from Ingestion -> Processing -> Storage stages.
4.  **Analyze:** Click "AI Insight" to generate a market report based on the live chart data.
5.  **Learn:** Switch to the "Implementation" view to read the C# and Python code that defines the pipeline logic.
