import HomePage from '../../HomePage/HomePage';
import ContactUs from '../../ContactUs/ContactUs';
import Register from '../../Register/Register';
import Login from '../../Login/Login';
import { MyTickets } from '../../tickets components/MyTickets/MyTickets';
import Prices from '../../Prices/Prices';
import Reservation from '../../tickets components/Reservation/Reservation';
import ServerError from '../../ServerError/ServerError';
import AutoLogout from '../../AutoLogout/AutoLogout';
import { IRoutingData, IRoutingList } from './types';

export const appName = '';

const routingData: IRoutingData[] = [
  { path: `/`, component: HomePage },
  { path: `/contact`, component: ContactUs },
  { path: `/register`, component: Register },
  { path: `/login`, component: Login },
  { path: `/mytickets`, component: MyTickets },
  { path: `/prices`, component: Prices },
  { path: `/reservation`, component: Reservation },
  { path: `/servererror`, component: ServerError },
  { path: `/autologout`, component: AutoLogout },
];

const routingList: IRoutingList[] = routingData.map(({ path, component }) => {
  return { path: `${appName}${path}`, exact: true, component };
});

export default routingList;
