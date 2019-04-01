// import hbs from '@glimmer/inline-precompile';
import initializeCustomElements from '@glimmer/web-component';
import moduleMap from './components';
import Glim from './glim';

// window.hbs = hbs;
// window.iz = hbs`<div><h1>Welcome to Glimmer!</h1></div>`; // TODO: investigate this as last resort

const element = document.getElementById('app');
const app = Glim(element, moduleMap, { modulePrefix: 'my-app' });

app.boot().then(() => {
  app.renderComponent('MyApp', element, null); // Dynamically adding component
  initializeCustomElements(app, { 'my-app': 'MyApp', 'anan-got': 'MyApp' }); // supporting web components
});

// TODO: to build an ember app we need to register initializers, AMD/modules for resolver, custom routing system
// TODO: investigate if service DI works for current glimmer components(with decorators)
