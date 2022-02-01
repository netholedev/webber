import { Response } from "express";
import { injectable } from "inversify";
import { BaseHttpController } from "inversify-express-utils";

@injectable()
export abstract class BaseHtmlController extends BaseHttpController {
  public render(res: Response, template: string, options = {}): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      res.render(template, options, (err, compiled) => {
        if (err) {
          reject(err);
        }
        resolve(compiled);
      });
    });
  }

  /*
    // TODO: exception handler
    exception(res, err) {
      return this.render(res, "error-page", { error: err.message });
    }
  */
}