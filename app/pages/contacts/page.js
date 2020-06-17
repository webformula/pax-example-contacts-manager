import { Page } from '@webformula/pax-core/index.js';
import fata from '../../fata.js';
import '../../components/contact-list.js';

export default class Contacts extends Page {
  constructor() {
    super();

    this.debounced_filter = window.MDWUtils.debounce(this.filter.bind(this), 100);
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

  get topAppBar() {
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
      // eslint-disable-next-line camelcase
      contacts = fata.contacts.filter(({ first_name, last_name, email }) => (
        // eslint-disable-next-line camelcase
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
    if (a.last_name < b.last_name) { return -1; }
    if (a.last_name > b.last_name) { return 1; }
    return 0;
  }

  onSelect(selectedIndexes) {
    if (!selectedIndexes || !selectedIndexes.length) return this.topAppBar.notContextual();

    this.selectedIndexesLength = selectedIndexes.length;
    this.topAppBar.contextual();
  }

  deselectAll() {
    this.contactList.deselectAll();
  }

  showChildScreen(contactEmail, target) {
    const contact = fata.contacts.find(({ email }) => email === contactEmail);

    window.MDWSurface.open({
      target,
      template: '/pages/contacts/contact-details.html',
      templateData: contact,

      // default animation config for panel
      animation: {
        type: 'height',
        origin: 'center',
        fullscreen: true
      },
    });
  }

  template() {
    return '/pages/contacts/template.html';
  }
}
