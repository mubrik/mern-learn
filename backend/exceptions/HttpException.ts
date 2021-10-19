import { CastError } from 'mongoose';

/* base exception class fro throwing errors */
class HttpException extends Error {
  public status: number;
  public message: string;
  public constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

/* extended http exception for item not found, takes an id */
class PostNotFoundException extends HttpException {
  public constructor(id: string) {
    super(404, `Post with id ${id} not found`);
  }
}

class MongooseCastException extends HttpException {
  public constructor(err: CastError) {
    super(404, `Post id ${err.value} ${err.reason}`);
  }
}
 
export {PostNotFoundException, MongooseCastException};
export default HttpException;