import { Page } from '/node_modules/@webformula/pax-core/index.js';
import fata from '../fata.js';

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
    return /* html */`
      <h6>Favorites</h6>

      <mdw-list class="mdw-two-line">
        ${this.contacts.map(({first_name, last_name, phone1, email}) => `
          <mdw-list-item>
            <div class="mdw-list-item__text">
               <div class="mdw-list-item__primary-text">
                 ${first_name} ${last_name}
               </div>
               <div class="mdw-list-item__secondary-text">
                 ${phone1}
               </div>
             </div>
             <span class="mdw-list-item__meta material-icons">info_outlined</span>
          </mdw-list-item>
        `).join('\n')}
      </mdw-list>
    `;
  }
}
