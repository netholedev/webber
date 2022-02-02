import { inject, injectable } from 'inversify';
import { PropertiesRepository, TYPES } from '../repositories';

@injectable()
export class PropertiesService {
  constructor(
    @inject(TYPES.PropertiesRepository)
    private readonly propertiesRepository: PropertiesRepository
  ) { }

  async find() {
    return this.propertiesRepository.find();
  }
}
