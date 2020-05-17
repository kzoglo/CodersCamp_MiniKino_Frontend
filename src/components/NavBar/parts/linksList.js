import { appName } from '../../App/routing/routingList';

const linksList = [
  { to: `${appName}/`, content: 'Oferta', name: 'Homepage' },
  { to: `${appName}/prices`, content: 'Cennik', name: 'PriceList' },
  { to: `${appName}/mytickets`, content: 'Moje bilety', name: 'MyTickets' },
  { to: `${appName}/register`, content: 'Rejestracja', name: 'Register' },
  {
    to: `${appName}/login`,
    content: 'Zaloguj',
    name: 'Login',
  },
];

export default linksList;
