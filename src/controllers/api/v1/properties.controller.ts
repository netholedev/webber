import { Response } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPost, requestBody, response } from 'inversify-express-utils';
import { BaseApiController } from '../../../base';
import { CreatePropertyDto } from '../../../dtos';
import { PropertiesService, TYPES } from '../../../services';

@controller('/api/v1/properties')
export class PropertiesV1Controller extends BaseApiController {
  constructor(
    @inject(TYPES.PropertiesService) private readonly propertiesService: PropertiesService
  ) {
    super();
  }

  @httpPost('/')
  public create(@requestBody() body: Record<string, any>) {
    return this.propertiesService.create(body);
  }

  @httpGet('/')
  public find() {
    return this.propertiesService.find();
  }
}