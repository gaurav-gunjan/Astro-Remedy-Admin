import { all } from "redux-saga/effects";

import staticPageSaga from "./staticPageSaga";
import reviewSaga from "./reviewSaga";
import customerSaga from "./customerSaga";
import astrologerSaga from "./astrologerSaga";
import expertiesSaga from "./expertiesSaga";
import skillsSaga from "./skillsSaga";
import remediesSaga from "./remediesSaga";
import bannerSaga from './bannerSaga'
import notificationSaga from "./notificationSaga";
import historySaga from "./historySaga"
import dashboardSaga from "./dashboardSaga";
import reportSaga from "./reportsSaga";
import languageSaga from "./languageSaga"
import rechargeSaga from "./rechargeSaga";
import giftSaga from "./giftSaga";
import pageSaga from "./pageSaga";
import appAstrokunjSaga from "./appAstrokunjSaga";
//! New 
import astromallSaga from "./astromallSaga";
import astropujaSaga from "./astropujaSaga";
import astroBlogSaga from "./astroBlogSaga";

export default function* rootSaga() {
  yield all([
    staticPageSaga(),

    reviewSaga(),
    customerSaga(),
    astrologerSaga(),
    expertiesSaga(),
    skillsSaga(),
    remediesSaga(),
    bannerSaga(),
    notificationSaga(),
    historySaga(),
    dashboardSaga(),
    reportSaga(),
    languageSaga(),
    rechargeSaga(),
    giftSaga(),
    pageSaga(),
    appAstrokunjSaga(),
    astromallSaga(),
    astropujaSaga(),
    astroBlogSaga()
  ]);
}
