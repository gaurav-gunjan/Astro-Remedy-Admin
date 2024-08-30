import { combineReducers } from "redux";

import staticPageReducer from "./staticPageReducer";

import dashboard from "./dashboard";
import review from "./review";
import customer from "./customer";
import astrologer from "./astrologer";
import experites from "./experties";
import skills from "./skills";
import remedies from "./remedies";
import banners from "./banner";
import notification from './notification'
import history from "./history";
import reports from "./reports";
import language from './language';
import recharge from "./recharge";
import gift from "./gift";
import pages from "./pages";
import appAstrokunj from "./appAstrokunj";
import astromallReducer from "./astromallReducer";
import astropujaReducer from "./astropujaReducer";
import blogs from "./astroBlog";

const rootReducer = combineReducers({
  staticPageReducer,

  dashboard,
  review,
  customer,
  astrologer,
  experites,
  skills,
  remedies,
  banners,
  notification,
  history,
  reports,
  language,
  recharge,
  gift,
  pages,
  appAstrokunj,
  astromallReducer,
  astropujaReducer,
  blogs
});

export default rootReducer;
