// critical
import express from 'express';
import mongoose from 'mongoose';
// middlewares
import bodyParser from 'body-parser';
import loggerMiddleware from "./middlewares/loggerMiddleware";
import errorMiddleware from './middlewares/errorMiddleware';
import cors from "cors";
// controller for types
import IController from './controllers/base';

/* Main app instance, takes an array of controllers and a port number to host
* middlewares include bodyparsr, logger and cors
*/
class App {
  public app: express.Application;
  public port: number;
 
  public constructor(controllers: IController[], port:number) {
    this.app = express();
    this.port = port;
    
    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorMiddleware();
  };
  /* initialize express to listen */
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  };
  /* middlewares */
  private initializeMiddlewares() {
    this.app.use(loggerMiddleware);
    this.app.use(bodyParser.json());
    this.app.use(cors());
  };
  /* initialized last */
  private initializeErrorMiddleware() {
    this.app.use(errorMiddleware);
  };
  /* array of controllers to initialize to app */
  private initializeControllers(controllers: IController[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  };
  /* connects to mongo */
  private connectToTheDatabase() {
    const {
      MONGO_USER,
      MONGO_PASSWORD,
      MONGO_PATH,
    } = process.env;
    return mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
  }
};
 
export default App;