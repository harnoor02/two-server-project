const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/send', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post('http://localhost:4000/receive', { message });
    res.json({ status: 'Forwarded to receiver', receiverResponse: response.data });
  } catch (error) {
    console.error('Error forwarding to receiver:', error.message);
    res.status(500).json({ error: 'Failed to forward message' });
  }
});

app.listen(PORT, () => {
  console.log(`Sender Server running on http://localhost:${PORT}`);
});
