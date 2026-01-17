# 🏎️ BoxMachiBox

**"Predicting podiums before the lights go out."**

AI-powered Formula 1 podium prediction system with 93.89% accuracy. Built with machine learning precision and deployed for real-world race forecasting.

[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115.6-009688.svg)](https://fastapi.tiangolo.com/)
[![XGBoost](https://img.shields.io/badge/XGBoost-2.1.3-orange.svg)](https://xgboost.readthedocs.io/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

🌐 **Live Application:** [https://boxmachibox.vercel.app/](https://boxmachibox.vercel.app/)  
📊 **API Endpoint:** [boxmachibox.onrender.com](https://boxmachibox.onrender.com)  
📖 **API Docs:** [boxmachibox.onrender.com/docs](https://boxmachibox.onrender.com/docs)

---

## 📊 What is BoxMachiBox?

BoxMachiBox is a machine learning system that predicts Formula 1 race podium finishers by analyzing qualifying results, driver form, constructor performance, and circuit-specific factors. The model considers various race dynamics to forecast the top 3 finishers with probabilities, providing insights into championship standings and driver momentum.

### Why "BoxMachiBox"?
In F1, "Box Box Box" is the iconic radio call for pit stops. BoxMachiBox combines this with "machine" — representing the fusion of motorsport strategy and machine learning intelligence.

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| **🎯 93.89% Accuracy** | Validated on complete 2025 season data (R21-R24 test set) |
| **🧠 47 Engineered Features** | Qualifying intelligence, driver momentum, constructor strength, circuit mastery |
| **⚡ Real-time API** | FastAPI backend deployed on Render with interactive Swagger docs |
| **🎨 Modern Web Interface** | Next.js frontend with dark F1 aesthetic and responsive design |
| **📈 Live Standings** | Current 2025 championship standings integrated |
| **💡 Race Insights** | Driver analysis, team performance, and strategic predictions |

---

## 🚀 Live Application

**Frontend (Next.js):** [https://boxmachibox.vercel.app/](https://boxmachibox.vercel.app/)
- 🏠 Home - Project overview and introduction
- 🎯 Predict - Interactive race prediction form
- 📊 Standings - 2025 championship leaderboard
- 👤 Drivers - Driver profiles and statistics
- 💡 Insights - Race analysis and trends

**Backend API:** [boxmachibox.onrender.com](https://boxmachibox.onrender.com)
- `POST /api/predict` - Generate podium predictions
- `GET /api/drivers` - List all F1 drivers
- `GET /api/circuits` - List all race circuits
- `GET /api/standings/2025` - Championship standings
- `GET /api/model/info` - Model metadata

**⚠️ Note:** Backend runs on Render's free tier - first request after 15min inactivity may take ~30s (cold start).

---

## 🎯 Model Performance

### Metrics (2025 R21-R24 Test Set)
```
Accuracy:       93.89%
Precision:      91.2%  (podium predictions)
Recall:         89.7%  (actual podiums caught)
F1-Score:       90.4%
```

### Training Details
- **Algorithm:** XGBoost Ensemble (multi-seed)
- **Training Data:** 1,558 samples (2022-2024 + 2025 R1-R20)
- **Test Data:** 180 samples (2025 R21-R24)
- **Features:** 47 engineered features
- **Model File:** `f1_PRODUCTION_READY.pkl` (XGBoost)

### Feature Categories
1. **Qualifying Intelligence** (10 features)
   - Grid position, Q1/Q2/Q3 lap times, gap to pole
   - Front row start indicator, qualifying performance score

2. **Driver Performance** (10 features)
   - Last 3/5 races average points/position
   - Season points, podium count, DNF rate, championship position

3. **Constructor Performance** (8 features)
   - Team form, constructor standings, reliability
   - Average qualifying position, top team indicator

4. **Circuit-Specific** (11 features)
   - Driver wins/podiums at circuit, average finish
   - Circuit experience, constructor track record

5. **Advanced Metrics** (8 features)
   - Driver momentum, points gap to leader, must-win pressure
   - Teammate comparison, consistency score

---

## 🛠️ Tech Stack

### Machine Learning & Backend
- **Python 3.10+** - Core language
- **XGBoost 2.1.3** - Gradient boosting model
- **FastAPI 0.115.6** - RESTful API framework
- **Pandas & NumPy** - Data processing
- **Scikit-learn 1.8.0** - ML utilities
- **FastF1** - F1 telemetry and race data
- **Uvicorn** - ASGI server

### Frontend
- **Next.js 15** - React framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vercel** - Deployment platform

### Data Sources
- **FastF1 Library** - Complete 2022-2025 season data (R1-R24)
- **502KB** race results dataset
- **34KB** qualifying results dataset

---

## 📁 Repository Structure

```
BoxMachiBox/
│
├── src/                          # Next.js Frontend
│   ├── app/                      # App router pages
│   ├── components/               # React components
│   ├── lib/                      # Utilities and API
│   └── types/                    # TypeScript types
│
├── public/                       # Static assets
│
├── package.json                  # Frontend dependencies
├── next.config.mjs              # Next.js configuration
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
├── .gitignore
├── LICENSE
└── README.md
```

**Note:** Backend code (FastAPI + ML models) is maintained in a [separate repository](https://github.com/sarva-20/BoxMachiBox-) by [@sarva-20](https://github.com/sarva-20).

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Prabakaransr19/BoxMachiBox.git
cd BoxMachiBox

# Install dependencies
npm install
# or
yarn install

# Set up environment variables
# Create .env.local file
echo "NEXT_PUBLIC_API_URL=https://boxmachibox.onrender.com" > .env.local

# Run development server
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:3000`

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## 🎮 Using the Web App

1. **Visit** [https://boxmachibox.vercel.app/](https://boxmachibox.vercel.app/)
2. **Navigate** to "Predict" page
3. **Select** qualifying grid (P1-P10 drivers)
4. **Choose** race circuit
5. **Click** "Predict Podium"
6. **View** top 3 predicted finishers with probabilities

**Pro Tip:** Check "Insights" page for detailed driver analysis and championship trends!

---

## 🧠 How It Works

### Prediction Pipeline
```
Qualifying Data → Feature Engineering → XGBoost Model → Podium Probabilities
```

1. **Input:** Qualifying grid positions (P1-P10) + circuit selection
2. **Feature Calculation:** 47 features computed from historical data
3. **Model Inference:** XGBoost ensemble predicts podium likelihood
4. **Output:** Top 3 drivers ranked by probability + confidence scores

### Key Insights
- **Grid Position** has 16% feature importance (strongest predictor)
- **Constructor Form** contributes 7.9% (team strength matters)
- **Recent Driver Form** (last 5 races) adds 4.8% predictive power
- Model achieves **93.89% accuracy** on standard race conditions

### Known Limitations
⚠️ **Over-reliance on qualifying** - 16% importance on grid position  
⚠️ **No weather integration** - Planned for V4  
⚠️ **No race strategy modeling** - Pit stops, tire choice not included  
⚠️ **Chaos race underperformance** - Struggles with unpredictable races (e.g., Brazil 2024: Verstappen P17→P1)