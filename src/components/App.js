import { createElement } from '../framework/createElement.js';
import { Component } from '../framework/Component.js';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { message: 'Welcome to My UI Framework' };
  }

  handleClick() {
    this.setState({ message: 'You clicked the button!' });
  }

  render() {
    return createElement(
      'div',
      { className: 'app-container' },
      createElement('h1', null, this.state.message),
      createElement(
        'button',
        { onClick: () => this.handleClick() },
        'Click Me'
      )
    );
  }
}



