import React, { useEffect, useState } from 'react'
import {
  Switch,
  Route,
  Redirect,
  Link,
  useLocation,
  useParams

} from 'react-router-dom'
import { useSession, useLanguage, useOrder, Analytics, useConfig } from 'ordering-components'
// import { Header } from 'ordering-ui/theme_two'
import { Header } from '../src/components/Header'
import { Alert, SpinnerLoader, NotNetworkConnectivity, useOnlineStatus } from 'ordering-ui'

import { BusinessesList } from './pages/BusinessesList'
import { BusinessProductsList } from './pages/BusinessProductsList'
import { CheckoutPage } from './pages/Checkout'
import { Cms } from './pages/Cms'
import { ForgotPassword } from './pages/ForgotPassword'
import { HomePage } from './pages/Home'
import { MyOrders } from './pages/MyOrders'
import { OrderDetailsPage } from './pages/OrderDetails'
import { PageNotFound } from './pages/PageNotFound'
import { PagesList } from './pages/PagesList'
import { Profile } from './pages/Profile'
import { ResetPassword } from './pages/ResetPassword'
import { SignUp } from './pages/SignUp'

import { ScrollToTop } from './components/ScrollToTop'
import { ListenPageChanges } from './components/ListenPageChanges'
import { HelmetTags } from './components/HelmetTags'

import Cookies from 'js-cookie';

export const App = () => {
  const [{ auth, user, loading }] = useSession()
  const [orderStatus] = useOrder()
  const [{ configs }] = useConfig()
  const [languageState, t] = useLanguage()
  const [loaded, setLoaded] = useState(false)
  const onlineStatus = useOnlineStatus()
  const location = useLocation()
  const [alertState, setAlertState] = useState({ open: false, content: [] })

  const closeAlert = () => {
    setAlertState({
      open: false,
      content: []
    })
  }

  const acceptAlert = () => {
    window.localStorage.setItem('front_version', configs?.front_version?.value)
    window.location.reload()
  }

  const isHome = location.pathname === '/' || location.pathname === '/home'

  useEffect(() => {
    // Get the affiliate Shopback Transaction ID from the URL query string
    const urlParams = new URLSearchParams(window.location.search);
    const transaction_id  = urlParams.get('transaction_id');

    // Set the affiliate Shopback Transaction ID as a cookie with a 1-day expiration time
    if (transaction_id && urlParams.get('utm_source') == 'shopback') {
      Cookies.set('shopback_transaction_id', transaction_id , { expires: 1 });
    }
  }, []);

  useEffect(() => {
    if (!loaded && !orderStatus.loading) {
      setLoaded(true)
    }
  }, [orderStatus])

  useEffect(() => {
    if (!loading) {
      setLoaded(!auth)
    }
  }, [loading])

  useEffect(() => {
    if (configs?.front_version?.value && loaded) {
      const localStorageFrontVersion = window.localStorage.getItem('front_version')
      if (localStorageFrontVersion && localStorageFrontVersion !== configs?.front_version?.value) {
        setAlertState({
          open: true,
          content: [t('RELOAD_FRONT_QUESTION', 'There is a new version of Ordering! Do you want to update it?')]
        })
      }
    }
  }, [configs, loaded])

  return (
    <>
      {configs?.track_id_google_analytics?.value && (
        <Analytics trackId={configs?.track_id_google_analytics?.value} />
      )}
      <ListenPageChanges />
      {
        (!loaded || languageState.loading) && (
          <SpinnerLoader />
        )
      }
      {
        loaded && !languageState.loading && (
          <>
            {location?.pathname.includes('/orders') &&
              <Header
                isHome={isHome}
                location={location}
              />}

            <NotNetworkConnectivity />
            {onlineStatus && (
              <ScrollToTop>
                <HelmetTags />
                <Switch>
                  <Route exact path='/home'>
                    <HomePage />
                  </Route>
                  <Route exact path='/store/:store'>
                    <BusinessProductsList />
                  </Route>
                  <Route path='/checkout'>
                    <CheckoutPage />
                  </Route>
                  <Route exact path='/orders/:businessSlug/:orderId/:cellphone'>
                    <OrderDetailsPage />
                  </Route>
                  <Route exact path='/pages/:pageSlug'>
                    <Cms />
                  </Route>
                  <Route exact path='/pages'>
                    <PagesList />
                  </Route>
                  <Route exact path='/:store'>
                    <BusinessProductsList />
                  </Route>
                  <Route exact path='/:store/:orderTypeFromParams/:locationFromParams?'>
                    <BusinessProductsList />
                  </Route>
                  <Route path='*'>
                    <PageNotFound />
                  </Route>
                </Switch>
              </ScrollToTop>
            )}
            <Alert
              title={t('INFORMATION', 'Information')}
              content={alertState.content}
              acceptText={t('ACCEPT', 'Accept')}
              open={alertState.open}
              onClose={() => closeAlert()}
              onCancel={() => closeAlert()}
              onAccept={() => acceptAlert()}
              closeOnBackdrop={false}
            />
          </>
        )
      }
    </>
  )
}
