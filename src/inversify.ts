import { AsyncContainerModule } from "inversify";
import { TYPES, ConfigService } from "./services";

export const bindings = new AsyncContainerModule(async (bind) => {
  await import("./controllers");

  bind<ConfigService>(TYPES.ConfigService).to(ConfigService);
});