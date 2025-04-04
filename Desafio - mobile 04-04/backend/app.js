const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const plansRoutes = require('./routes/plansRoutes');
const turismRoutes = require('./routes/turismRoutes');
const app = express();
const PORT = process.env.PORT || 2309;
const uri = "mongodb+srv://JoaoMatheus:ffhdyC1TXu5NtRq0@cluster0.vmfyddf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Middleware para parse de JSON
app.use(express.json());
app.use(cors());

// Conectando ao MongoDB
mongoose.connect(uri).then(() => {
    console.log('Conectado ao MongoDB!');
}).catch(err => {
    console.log('Erro ao conectar ao MongoDB:', err);
});

// Usando rotas
app.use('/api/plans', plansRoutes);
app.use('/api/turism', turismRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
