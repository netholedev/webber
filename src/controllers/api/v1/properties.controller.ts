import { Response } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, response } from 'inversify-express-utils';
import { BaseApiController } from '../../../base';
import { PropertiesService, TYPES } from '../../../services';

@controller('/api/v1/properties')
export class PropertiesV1Controller extends BaseApiController {
  constructor(
    @inject(TYPES.PropertiesService) private readonly propertiesService: PropertiesService
  ) {
    super();
  }

  @httpGet('/')
  public find(@response() res: Response) {
    return this.propertiesService.find();
  }
}