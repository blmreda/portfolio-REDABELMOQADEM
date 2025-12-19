const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/config/database");

dotenv.config();

const app = express();

// Configuration CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL || 'https://your-app-name.vercel.app'] // Will use env variable or default Vercel URL
    : ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5174'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Connexion à la base de données
connectDB();

// Routes
app.use("/api/projects", require("./src/routes/projectRoutes"));
app.use("/api/skills", require("./src/routes/skillRoutes"));
app.use("/api/contacts", require("./src/routes/contactRoutes"));

// Route de test pour vérifier que l'API fonctionne
app.get('/api', (req, res) => {
  res.json({ 
    message: '✅ API Portfolio fonctionne!',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Route de santé pour vérifier MongoDB
app.get('/api/health', (req, res) => {
  const mongoose = require('mongoose');
  res.json({ 
    status: 'OK',
    mongodb: mongoose.connection.readyState === 1 ? '✅ Connected' : '❌ Disconnected',
    timestamp: new Date().toISOString()
  });
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route non trouvée',
    path: req.path 
  });
});

// IMPORTANT: Export pour Vercel (serverless)
module.exports = app;

// Serveur local uniquement (pas en production Vercel)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5002;
  app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
    console.log(`📡 API disponible sur http://localhost:${PORT}/api`);
  });
}