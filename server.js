const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));

app.use(function(req, res) {
  // Use res.sendfile, as it streams instead of reading the file into memory.
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => console.log('listening on PORT:', PORT));