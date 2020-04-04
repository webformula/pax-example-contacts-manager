import { Page, router } from '../../node_modules/@webformula/pax-core/index.js';
import { authenticate } from '../services/authentication.js';

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
    return /* html */`
      <form name="loginForm">
        <mdw-card class="mdw-margin">
          <div class="mdw-card__content">
            <div class="mdw-title">Contacts login</div>
          </div>

          <div class="mdw-card__content">
            <mdw-textfield class="mdw-spacer">
              <input name="email" placeholder="Email" required onkeyup="event.code === 'Enter' && activePage.login()" />
              <mdw-textfield-helper>
                <mdw-helper-text validation>Requires valid email</mdw-helper-text>
              </mdw-textfield-helper>
            </mdw-textfield>

            <mdw-textfield>
              <input name="password" placeholder="Password" type="password" required onkeyup="event.code === 'Enter' && activePage.login()" />
              <mdw-textfield-helper>
                <mdw-helper-text validation>Required</mdw-helper-text>
              </mdw-textfield-helper>
            </mdw-textfield>
          </div>

          <div class="mdw-card__actions">
            <mdw-button class="mdw-primary" onclick="activePage.login()">Login</mdw-button>
            <mdw-button>Register</mdw-button>
          </div>
        </mdw-card>
      </form>
    `;
  }
}
