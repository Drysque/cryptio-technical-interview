import express from 'express';
import cors from 'cors';
import * as env from 'env-var';

const PORT = env.get('PORT').asPortNumber() || 8080;
const NODE_ENV = env.get('NODE_ENV').asEnum(['development', 'production']) ?? 'unknown environment';

const app = express();

// Enable CORS for *
app.use(cors());

app.get('/ping', (_, res) => {
  res.send('pong');
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT} (${NODE_ENV})`));
