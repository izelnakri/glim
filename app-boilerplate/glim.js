import { ComponentManager, setPropertyDidChange } from '@glimmer/component';
import Application, { DOMBuilder, RuntimeCompilerLoader, SyncRenderer } from '@glimmer/application';
import Resolver, { BasicModuleRegistry } from '@glimmer/resolver';

const GlimmerApplication = Application;
const resolverConfiguration = {
  "types": { "application": { "definitiveCollection": "main" },
  "component": { "definitiveCollection": "components" },
  "component-test": { "unresolvable": true },
  "helper": { "definitiveCollection": "components" },
  "helper-test": { "unresolvable": true },
  "renderer": { "definitiveCollection": "main" },
  "template": { "definitiveCollection": "components" } },
  "collections": {
    "main": { "types": ["application", "renderer"] },
    "components": {
      "group": "ui",
      "types": ["component", "component-test", "template", "helper", "helper-test"],
      "defaultType": "component",
      "privateCollections": ["utils"]
    },
    "styles": { "group": "ui", "unresolvable": true },
    "utils": { "unresolvable": true }
  }
};

export default function(containerElement, moduleMap, ENV) {
  const resolverConfig = Object.assign(resolverConfiguration, {
    app: { name: ENV.modulePrefix, rootName: ENV.modulePrefix }
  });
  const moduleRegistry = new BasicModuleRegistry(moduleMap);
  const resolver = new Resolver(resolverConfig , moduleRegistry);
  const app = new GlimmerApplication({
    builder: new DOMBuilder({ element: document.body, nextSibling: null }),
    loader: new RuntimeCompilerLoader(resolver),
    renderer: new SyncRenderer(),
    resolver,
    rootName: resolverConfig.app.rootName
  });

  setPropertyDidChange(() => {
    app.scheduleRerender();
  });

  app.registerInitializer({
    initialize(registry) {
      registry.register(`component-manager:/${app.rootName}/component-managers/main`, ComponentManager);
    }
  });

  return app;
}
