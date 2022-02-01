import { Response } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, response } from 'inversify-express-utils';
import { BaseApiController } from '../../../base';
import { ConfigService, TYPES } from '../../../services';

@controller('/api/v1/config')
export class ConfigV1Controller extends BaseApiController {
  constructor(
    @inject(TYPES.ConfigService) private readonly configService: ConfigService
  ) {
    super();
  }

  @httpGet('/')
  public root(@response() res: Response) {
    const config = this.configService.getConfig();
    return {
      hello: config.name,
    }
  }
}