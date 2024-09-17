import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json({}));
app.use(
  express.urlencoded({
    extended: true,
  })
);

//routes import

//routes declaration

// home route
app.get('/', (req, res) => {
  res.json({hello: 'world'});
});

export {app};
