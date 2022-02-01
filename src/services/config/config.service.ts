import { injectable } from 'inversify';

@injectable()
export class ConfigService {
  public getConfig(): Record<string, any> {
    return { name: 'world!' };
  }
}
