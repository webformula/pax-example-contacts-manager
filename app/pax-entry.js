import './components/contact-list.js';
import './pax-templates.js';

import { router } from '@webformula/pax-core';
import Contacts from './pages/contacts/page.js';
import Favorites from './pages/favorites/page.js';
import Login from './pages/login/page.js';
import Recent from './pages/recent.js';

router.addPageClass(Contacts, 'contacts');
router.addPageClass(Favorites, 'favorites');
router.addPageClass(Login, 'login');
router.addPageClass(Recent, 'recent');
router.setRoot('contacts');
router.init();
window.router = router;

export {
  router
};
