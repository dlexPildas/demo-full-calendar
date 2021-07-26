const express = require('express');
const app = express();

const PORT = process.env.PORT || 5656;

app.use(express.static(__dirname + '/dist/demo-to-use-calendar'));

app.get('/*', (req, res) => {
  res.sendFile(__dirname + 'dist/demo-to-use-calendar/index.html')
});

app.listen(PORT, () => {
  console.log('Server was started in port ' + PORT);
});
