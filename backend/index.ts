import App from "./app";
import PostsController from "./controllers/posts";
import dotenv from "dotenv";
import {
  cleanEnv, str,
  num
} from 'envalid';

// import env var
dotenv.config();

// validate env variables, error if missing
cleanEnv(process.env, {
  MONGO_PASSWORD: str(),
  MONGO_PATH: str(),
  MONGO_USER: str(),
  PORT: num(),
});

// init app
const app = new App(
  [
    new PostsController(),
  ],
  5000,
);

// listen
app.listen();