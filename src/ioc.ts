import { AsyncContainerModule } from "inversify";
import { TYPES, ConfigService } from "./services";

export const bindings = new AsyncContainerModule(async (bind) => {
  await import("./controllers");

  // REPOSITORIES
  // TODO: Add repositories here...

  // SERVICES
  bind<ConfigService>(TYPES.ConfigService).to(ConfigService);
});
