import express from 'express';
import db from './config/connection.js';
import routes from './routes/index.js';

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db().then(() => {
  app.listen(PORT, () => {
    console.log(`API server for Social Networking, running on port ${PORT}!`);
  });
}).catch((err: Error) => {
  console.error('Failed to connect to the database:', err);
});
