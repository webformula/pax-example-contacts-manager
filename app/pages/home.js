import { Page } from '/node_modules/@webformula/pax-core/index.js';

export default class Home extends Page {
  constructor() {
    super();
  }

  // page title. This returns from the page.build() method
  get title() {
    return 'Hello World';
  }

  template() {
    return `
      <h2>Hello World</h2>
    `;
  }
}
