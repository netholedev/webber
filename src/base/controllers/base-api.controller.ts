import { Response } from "express";
import { injectable } from "inversify";
import { BaseHttpController } from "inversify-express-utils";

@injectable()
export abstract class BaseApiController extends BaseHttpController { }