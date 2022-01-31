import express, { Request, Response } from "express";
import dotenv from "dotenv";
import hbs from "hbs";

import { ErrorHandlerMiddleware } from "./middlewares";

dotenv.config();

const PORT = parseInt(process.env?.PORT || "8000");

const app = express();

app.set('view engine', 'html');
app.engine('html', hbs.__express);

app.use(express.static('public'))

app.get("/", (req: Request, res: Response) => {
  res.render('main');
});

// Middlewares
app.use(ErrorHandlerMiddleware)

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));