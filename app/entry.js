import { isAuthenticated } from './services/authentication.js';
import { router } from '../node_modules/@webformula/pax-core/index.js';
import './pax-entry.js';

router.interceptRouteChange((newUrl) => {
  // block route changing from login if not authenticated
  if (!isAuthenticated() && newUrl && newUrl.split('#')[1] !== 'login') return false;
  return true;
});

document.addEventListener('DOMContentLoaded', () => {
  if (!isAuthenticated()) router.hash = 'login';
})
