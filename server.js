import express from 'express';
import next from 'next';
import deepgram from 'deepgram';

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Initialize Deepgram client
  const deepgramClient = deepgram.createClient({
    apiKey: 'DG_KEY'
  });

  // Define route to handle speech-to-text request
  server.post('/stt', (req, res) => {
    // Use Deepgram client to transcribe speech
    deepgramClient.transcribe(req.body.audio, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(result);
      }
    });
  });

  // Handle all other requests using Next.js
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
