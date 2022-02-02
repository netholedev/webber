export * from './config.service';
export * from './properties.service';

export const TYPES = {
  ConfigService: Symbol.for('ConfigService'),
  PropertiesService: Symbol.for('PropertiesService'),
};
