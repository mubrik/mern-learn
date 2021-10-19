/* base types */
import express from 'express';
import mongoose from "mongoose";
/* just a base controller to use as base type */
interface IController {
  path: string;
  router: express.Router;
};
 
export interface IPost {
  title: string;
  author: string;
  content: string;
  tags?: string[];
  selectedFiles?: String;
  likeCount?: {
    type: Number;
    default: 0;
  };
  createdAt?: {
    type: Date;
    default: Date;
  };
}
export default IController;