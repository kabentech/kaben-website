import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import sendContactEmailHandler from './api/send-contact-email.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/send-contact-email', sendContactEmailHandler);

const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
