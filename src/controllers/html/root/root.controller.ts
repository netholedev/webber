import { Response } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, response } from 'inversify-express-utils';
import { BaseHtmlController } from '../../../base';
import { ConfigService, TYPES } from '../../../services';

@controller('/')
export class RootController extends BaseHtmlController {
  constructor(
    @inject(TYPES.ConfigService) private readonly configService: ConfigService
  ) {
    super();
  }

  @httpGet('/')
  public root(@response() res: Response) {
    const rootConfig = this.configService.getConfig();
    return this.render(res, "root", rootConfig);
  }
}