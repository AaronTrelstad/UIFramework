import { App } from './components/App.js';
import { render } from './framework/render.js';

const app = new App();
const container = document.getElementById('root'); 
render(app.render(), container);


