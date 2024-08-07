const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Ably = require('ably');
const items = require('./routes/items');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/crud-db', {
 useNewUrlParser: true,
 useUnifiedTopology: true
});

// Inicializar Ably
const ably = new Ably.Realtime('ynrGug.SXDJOg:aoStJmyUcLlpwgEzYsJt8CFDsTBCq-yMjqNn6_DkgvM');
const channel = ably.channels.get('crud-channel');

// Middleware para enviar notificações via Ably
app.use((req, res, next) => {
 res.sendNotification = (eventName, data) => {
  channel.publish(eventName, data, (err) => {
   if (err) {
    console.error('Failed to send notification:', err);
   }
  });
 };
 next();
});

// Rotas
app.use('/api/items', items);

// Iniciar servidor
app.listen(port, () => {
 console.log(`Servidor rodando em http://localhost:${port}`);
});