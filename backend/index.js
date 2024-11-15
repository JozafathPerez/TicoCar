const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor Backend Activo');
});

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});
