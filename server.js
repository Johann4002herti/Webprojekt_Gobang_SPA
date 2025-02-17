const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'src')));//,'spa'))); // Passe den Pfad zum dist-Ordner an

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src','index.html')); // Passe den Pfad an
});

app.listen(process.env.PORT || 8080, () => {
  console.log('Server is running');
});
