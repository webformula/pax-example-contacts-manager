import { Page } from '@webformula/pax-core/index.js';
import fata from '../../fata.js';

export default class Favorites extends Page {
  constructor() {
    super();
    this.contacts = fata.favorites;
  }

  connectedCallback() {
    this.contacts = fata.favorites;
  }

  // page title. This returns from the page.build() method
  get title() {
    return 'Favorites';
  }

  template() {
    return '/pages/favorites/template.html';
  }
}
