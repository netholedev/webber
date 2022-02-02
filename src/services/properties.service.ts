import { inject, injectable } from 'inversify';
import { CreatePropertyDto } from '../dtos';
import { Property } from '../entities';
import { PropertiesRepository, TYPES } from '../repositories';

@injectable()
export class PropertiesService {
  constructor(
    @inject(TYPES.PropertiesRepository)
    private readonly propertiesRepository: PropertiesRepository
  ) { }

  async create(body: Record<string, any>) {
    const createPropertyDto = await (new CreatePropertyDto().fromJson(body));

    const property = new Property();

    property.name = createPropertyDto.name;

    const created = await this.propertiesRepository.insert(property);

    return property.fromArangodbNewResult(created.new)
  }

  async find() {
    return this.propertiesRepository.find();
  }
}
