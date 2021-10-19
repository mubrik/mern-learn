import * as express from 'express';
// types
import IController, {IPost} from "./base";
// model
import postModel from '../models/postModel';
// error handler 
import { PostNotFoundException, MongooseCastException } from '../exceptions/HttpException';
import {body, validationResult} from "express-validator";

/* controller instance, extends base controller */
class PostsController implements IController {

  public path = '/posts';
  public router = express.Router();
 
  // super and initializing routes
  public constructor() {
    this.intializeRoutes();
  };
  // sets the route to controller instance
  public intializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.post(this.path, body("title").exists(), this.createAPost);
    this.router.patch(`${this.path}/:id`, this.modifyPost);
    this.router.delete(`${this.path}/:id`, this.deletePost);
  };
 
  public getAllPosts = (request: express.Request, response: express.Response) => {
    // get all posts
    postModel.find()
      .then( allPosts => {
        // send response
        response.status(200).json(allPosts);
      });
  };
 
  public createAPost = (request: express.Request, response: express.Response) => {
    // validate request
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.json({error: "Title must be present"});
    }
    // get body data
    const postData: IPost = request.body;
    // create post using model
    const createdPost = new postModel(postData);
    // save
    createdPost.save()
      .then(savedPost => {
        response.status(201).send(savedPost);
      });
  };

  private getPostById = (request: express.Request, response: express.Response, next: express.NextFunction) => {
    // get id from query string parameter
    const id = request.params.id;
    // find post by id
    postModel.findById(id)
      .then((post) => {
        if (post) {
          response.send(post);
        } else {
          next(new PostNotFoundException(id));
        }
      })
      .catch(err => {
        console.log(err);
        next(new MongooseCastException(err));
      });
  };
 
  private modifyPost = (request: express.Request, response: express.Response, next: express.NextFunction) => {
    // get id from query string parameter
    const id = request.params.id;
    // updated post data
    const postData: IPost = request.body;
    // find and update
    postModel.findByIdAndUpdate(id, postData, { new: true })
      .then((post) => {
        if (post) {
          response.send(post);
        } else {
          next(new PostNotFoundException(id));
        }
      })
      .catch(err => {
        next(new MongooseCastException(err));
      });
  };

  private createPost = (request: express.Request, response: express.Response) => {
    // get new post data
    const postData: IPost = request.body;
    // create
    const createdPost = new postModel(postData);
    createdPost.save()
      .then((savedPost) => {
        response.send(savedPost);
      });
  };
 
  private deletePost = (request: express.Request, response: express.Response, next: express.NextFunction) => {
    // get id from query string parameter
    const id = request.params.id;
    // find and delete
    postModel.findByIdAndDelete(id)
      .then((successResponse) => {
        if (successResponse) {
          response.sendStatus(200);
        } else {
          next(new PostNotFoundException(id));
        }
      })
      .catch(err => {
        next(new MongooseCastException(err));
      });
  };
}
 
export default PostsController;