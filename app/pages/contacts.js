import { Page } from '/node_modules/@webformula/pax-core/index.js';
import fata from '../fata.js';

export default class Contacts extends Page {
  constructor() {
    super();

    this.debounced_filter = MDWUtils.debounce(this.filter.bind(this), 100);
    this.contacts = fata.contacts.sort(this.alphabetical);
  }

  // page title. This returns from the page.build() method
  get title() {
    return 'Contacts';
  }

  get contactList() {
    return document.querySelector('contact-list');
  }

  filter(value = '') {
    let contacts;
    if (value === '') {
      contacts = fata.contacts;
    } else {
      value = value.toLowerCase();
      contacts = fata.contacts.filter(({ first_name, last_name, email }) => (
        `${first_name}${last_name}${email}`.toLowerCase().includes(value)
      ));
    }
    this.contacts = contacts.sort(this.alphabetical);
    this.render();
  }

  alphabetical(a, b) {
    if(a.last_name < b.last_name) { return -1; }
    if(a.last_name > b.last_name) { return 1; }
    return 0;
  }

  template() {
    return /* html */`
      <header>
        <mdw-top-app-bar class="mdw-prominent">
          <div mdw-column mdw-flex>
            <div mdw-flex mdw-row>
              <div class="mdw-title">Contacts</div>
            </div>

            <div mdw-flex mdw-row>
              <mdw-textfield id="search" class="mdw-shaped mdw-no-animation" style="width: 90%; margin-left: 5%;">
                <mdw-icon class="pre-icon">search</mdw-icon>
                <input placeholder="search" style="color: white" oninput="activePage.debounced_filter(this.value);" />
                <mdw-icon class="post-icon" onclick="search.clear(); activePage.debounced_filter();">clear</mdw-icon>
              </mdw-textfield>
            </div>
          </div>
        </mdw-top-app-bar>
      </header>

      <mdw-content>
        <mdw-list class="mdw-two-line">
          ${this.contacts.map(({ first_name, last_name, email, phone1, address, city, state, zip }) => /* html */`<mdw-list-item onclick="this.expand()">
            <mdw-icon style="font-size: 42px;">account_circle</mdw-icon>
            ${first_name}&nbsp;<b>${last_name}</b>

          </mdw-list-item>`).join('')}
        </mdw-list>
      </mdw-content>
    `;
  }
}
