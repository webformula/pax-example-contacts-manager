import { router } from '/node_modules/@webformula/pax-core/index.js';
import Home from './pages/home.js';

router.addPageClass(Home, 'home');
router.setRoot('home');
router.init();
