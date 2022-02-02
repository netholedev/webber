import { AsyncContainerModule } from "inversify";
import { TYPES as REPOSITORY_TYPES, PropertiesRepository } from "./repositories";
import { TYPES as SERVICE_TYPES, ConfigService, PropertiesService } from "./services";
import { connectToArangodb } from "./storage";

export const bindings = new AsyncContainerModule(async (bind) => {
  await import("./controllers");

  // REPOSITORIES
  const db = await connectToArangodb();

  bind<PropertiesRepository>(REPOSITORY_TYPES.PropertiesRepository)
    .toDynamicValue(() => new PropertiesRepository(db));

  // SERVICES
  bind<ConfigService>(SERVICE_TYPES.ConfigService).to(ConfigService);
  bind<PropertiesService>(SERVICE_TYPES.PropertiesService).to(PropertiesService);
});
