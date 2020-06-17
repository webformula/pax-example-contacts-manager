import { Page, router } from '@webformula/pax-core/index.js';
import { authenticate } from '../../services/authentication.js';

export default class Login extends Page {
  constructor() {
    super();

    router.showPageOnly();
  }

  get title() {
    return 'title';
  }

  get form() {
    return document.querySelector('form');
  }

  get email() {
    return document.querySelector('input[name="email"]').value;
  }

  get password() {
    return document.querySelector('input[name="password"]').value;
  }

  login() {
    if (!this.form.checkValidity()) return;
    authenticate(this.email, this.password);
    router.hash = 'contacts';
  }

  template() {
    return '/pages/login/template.html';
  }
}
