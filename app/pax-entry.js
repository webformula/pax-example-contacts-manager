import { router } from '/node_modules/@webformula/pax-core/index.js';
import Contacts from './pages/contacts.js';
import Recent from './pages/recent.js';
import Favorites from './pages/favorites.js';
import Login from './pages/login.js';

router.addPageClass(Contacts, 'contacts');
router.setRoot('contacts');

router.addPageClass(Recent, 'recent');
router.addPageClass(Favorites, 'favorites');
router.addPageClass(Login, 'login');

router.init();
