import { appName } from '../../App/routing/routingList';
import { getAnyItem as getUserId } from '../../../services/localStorage';

const linksList = [
  { to: `${appName}/`, content: 'Oferta' },
  { to: `${appName}/prices`, content: 'Cennik' },
  { to: `${appName}/mytickets`, content: 'Moje bilety' },
  { to: `${appName}/register`, content: 'Rejestracja' },
  {
    to: `${appName}/login`,
    content: getUserId('userId') ? 'Wyloguj' : 'Zaloguj',
  },
];

export const loginLink = linksList[4].to;

export default linksList;
