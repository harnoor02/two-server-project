const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 4000;

const filePath = path.join(__dirname, '../shared/data.txt');

app.use(express.json());

app.post('/receive', async (req, res) => {
  const { message } = req.body;

  try {
    await fs.writeFile(filePath, `Received: ${message}\n`, { flag: 'a' });
    res.json({ status: 'Message received and written to file' });
  } catch (error) {
    console.error('File write failed:', error);
    res.status(500).json({ error: 'Failed to write to file' });
  }
});

app.listen(PORT, () => {
  console.log(`Receiver Server running on http://localhost:${PORT}`);
});
