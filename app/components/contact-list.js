import { HTMLElementExtended } from '/node_modules/@webformula/pax-core/index.js';

customElements.define('contact-list', class extends HTMLElementExtended {
  constructor() {
    super();
    this._contacts = [];
    this.cloneTemplate();
  }

  set contacts(value = []) {
    this._contacts = value;
    this.render();
  }

  styles() {
    return /* css */`
      @import url('../node_modules/@webformula/pax-components/local-dist/theme.css');
      @import url('../node_modules/@webformula/pax-components/local-dist/entry.css');
    `;
  }

  template() {
    return /* html */`
      <mdw-list id="listOne">
        ${this._contacts.map(({ first_name, last_name, email, phone1, address, city, state, zip }) => /* html */`<mdw-list-item onclick="this.expand()">
          ${first_name} ${last_name}

          <!--
          <mdw-list-item-expanded>
            <div class="mdw-list-item-expanded_header">
              <mdw-button class="mdw-icon" onclick="this.dispatchEvent(new Event('MDWPanel:close', { bubbles: true }))">
                <mdw-icon>close</mdw-icon>
              </mdw-button>

              <span class="mdw-title">${first_name} ${last_name}</span>
            </div>

            <div mdw-column mdw-flex-position="center center" style="height: 140px; background-color: #DDD">
              <mdw-icon style="color: #494b58; font-size: 120px;">account_circle</mdw-icon>
            </div>

            <div mdw-column style="padding: 16px">
              <div mdw-row>
                <h6 style="margin-top: 8px; margin-bottom: 12px;">Info</h6>
              </div>

              <div mdw-row>
                <mdw-icon style="margin-right: 12px; color: #666; line-height: 56px">person</mdw-icon>
                <mdw-textfield mdw-flex>
                  <input placeholder="name" value="${first_name} ${last_name}" required />
                </mdw-textfield>
              </div>

              <div mdw-row>
                <mdw-icon style="margin-right: 12px; color: #666; line-height: 56px">email</mdw-icon>
                <mdw-textfield mdw-flex>
                  <input placeholder="Email" value="${email}" type="email" required />
                </mdw-textfield>
              </div>

              <div mdw-row>
                <mdw-icon style="margin-right: 12px; color: #666; line-height: 56px">phone</mdw-icon>
                <mdw-textfield mdw-flex>
                  <input placeholder="Phone" value="${phone1}" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required />
                </mdw-textfield>
              </div>

              <mdw-divider style="margin-bottom: 24px; margin-top: 8px;"></mdw-divider>

              <div mdw-row>
                <mdw-icon style="margin-right: 12px; color: #666; line-height: 56px">place</mdw-icon>
                <mdw-textfield mdw-flex>
                  <input placeholder="Address" value="${address}" />
                </mdw-textfield>
              </div>

              <div mdw-row>
                <div style="width: 36px;"></div>
                <mdw-textfield mdw-flex>
                  <input placeholder="City" value="${city}" />
                </mdw-textfield>
              </div>

              <div mdw-row>
                <div style="width: 36px;"></div>
                <mdw-select mdw-flex style="margin-right: 12px">
                  <select>
                    <option value="" disabled selected>State</option>
                    <option value="2">Pensylvania</option>
                    <option value="3">Texas</option>
                    <option value="4">Florida</option>
                    <option value="5">New jersey</option>
                  </select>
                </mdw-select>

                <mdw-textfield style="width: 120px">
                  <input placeholder="Zip" value="${zip}" />
                </mdw-textfield>
              </div>

              <mdw-divider style="margin-bottom: 24px; margin-top: 8px;"></mdw-divider>

              <div mdw-column mdw-flex-position="start">
                <mdw-button class="mdw-secondary">add to favorites</mdw-button>
                <mdw-button class="mdw-secondary">share contact</mdw-button>
              </div>
            </div>
          </mdw-list-item-expanded>
          -->

        </mdw-list-item>`).join('\n')}
      </mdw-list>
    `;
  }
});
