import { Page } from '/node_modules/@webformula/pax-core/index.js';
import fata from '../fata.js';
import '../components/contact-list.js';

export default class Contacts extends Page {
  constructor() {
    super();

    this.debounced_filter = MDWUtils.debounce(this.filter.bind(this), 100);
    this.bound_onSelect = this.onSelect.bind(this);
    this.selectedIndexesLength = 0;
  }

  connectedCallback() {
    this.contactList.contacts = this.alphabeticalGroup(fata.contacts);
    this.contactList.onSelect(this.bound_onSelect);
  }

  // page title. This returns from the page.build() method
  get title() {
    return 'Contacts';
  }

  get contactList() {
    return document.querySelector('contact-list');
  }

  get topAppBarElement() {
    return document.querySelector('mdw-top-app-bar');
  }

  filter(value = '') {
    if (value === this._lastValue) return;
    this._lastValue = value;

    let contacts;
    if (value === '') {
      contacts = fata.contacts;
    } else {
      value = value.toLowerCase();
      contacts = fata.contacts.filter(({ first_name, last_name, email }) => (
        `${first_name}${last_name}${email}`.toLowerCase().includes(value)
      ));
    }
    this.contactList.contacts = this.alphabeticalGroup(contacts);
  }

  alphabeticalGroup(arr) {
    return Object.values(arr
      .sort(this.alphabeticalSort)
      .reduce((group, value) => {
        const letter = value.last_name[0];
        if (!group[letter]) group[letter] = {
          header: letter,
          items: []
        };
        group[letter].items.push(value);
        return group;
      }, {}));
  }

  alphabeticalSort(a, b) {
    if(a.last_name < b.last_name) { return -1; }
    if(a.last_name > b.last_name) { return 1; }
    return 0;
  }

  onSelect(selectedIndexes) {
    if (!selectedIndexes || !selectedIndexes.length) return this.topAppBarElement.notContextual();

    this.selectedIndexesLength = selectedIndexes.length;
    this.topAppBarElement.contextual();
  }

  deselectAll() {
    this.contactList.deselectAll();
  }

  template() {
    return /* html */`
      <header>
        <mdw-top-app-bar mdw-prominent mdw-shrink>
          <section mdw-flex>
            <sub-section>
              <div
                mdw-not-contextual
                class="mdw-title"
                style="padding-left: 16px;"
                mdw-animation-property="transform: scale(#)"
                mdw-animation-start="1.25"
                mdw-animation-end="0.75"
              >Contacts</div>
            </sub-section>

            <sub-section>
              <div mdw-contextual class="mdw-title" style="padding-left: 16px">
                <mdw-bound-property>selectedIndexesLength</mdw-bound-property>
                Selected
              </div>

              <mdw-textfield mdw-not-contextual mdw-flex id="search" class="mdw-shaped mdw-density-compact mdw-on-background mdw-focused">
                <mdw-icon>search</mdw-icon>
                <input placeholder="contacts" oninput="activePage.debounced_filter(this.value);" />
                <mdw-icon class="post-icon" onclick="search.clear(); activePage.debounced_filter();">clear</mdw-icon>
              </mdw-textfield>
            </sub-section>
          </section>

          <section mdw-fixed>
            <sub-section>
              <mdw-button mdw-not-contextual class="mdw-icon">
                <mdw-icon>create</mdw-icon>
              </mdw-button>

              <mdw-button mdw-contextual class="mdw-icon">
                <mdw-icon>delete</mdw-icon>
              </mdw-button>

              <mdw-button mdw-contextual class="mdw-icon" onclick="activePage.deselectAll()">
                <mdw-icon>cancel</mdw-icon>
              </mdw-button>
            </sub-section>
          </section>
        </mdw-top-app-bar>
      </header>

      <mdw-content mdw-no-scroll>
        <contact-list></contact-list>
      </mdw-content>
    `;
  }
}
