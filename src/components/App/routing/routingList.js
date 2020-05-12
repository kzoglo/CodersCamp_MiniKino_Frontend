import HomePage from '../../HomePage/HomePage';
import ContactUs from '../../ContactUs/ContactUs';
import Register from '../../Register/Register';
import Login from '../../Login/Login';
import { MyTickets } from '../../tickets_components/MyTickets/MyTickets';
import Prices from '../../Prices/Prices';
import Reservation from '../../tickets_components/Reservation/Reservation';
import ServerError from '../../ServerError/ServerError';
import AutoLogout from '../../AutoLogout/AutoLogout';

export const appName = '/CodersCamp_MiniKino_Frontend';

const routingData = [
  { path: ``, component: HomePage },
  { path: `/contact`, component: ContactUs },
  { path: `/register`, component: Register },
  { path: `/login`, component: Login },
  { path: `/mytickets`, component: MyTickets },
  { path: `/prices`, component: Prices },
  { path: `/reservation`, component: Reservation },
  { path: `/servererror`, component: ServerError },
  { path: `/autologout`, component: AutoLogout },
];

const routingList = routingData.map(({ path, component }) => {
  return { path: `${appName}${path}`, exact: true, component };
});

export default routingList;
