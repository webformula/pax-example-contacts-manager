import { Page } from '/node_modules/@webformula/pax-core/index.js';

export default class Recent extends Page {
  constructor() {
    super();
  }

  // page title. This returns from the page.build() method
  get title() {
    return 'Recent';
  }

  template() {
    return `
      <h2>recent</h2>
    `;
  }
}
