import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from './router'
import { OrderingProvider } from 'ordering-components'
import { Alert, ThemeProvider } from 'ordering-ui'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import theme from './theme.json'
import settings from './config.json'

import { Provider } from "react-redux";

import store from './redux/store';
/**
 * Theme images
 */
import logotype from './assets/images/logotype.svg'
import logotypeInvert from './assets/images/logotype-invert.svg'
import isotype from './assets/images/isotype.svg'
import isotypeInvert from './assets/images/isotype-invert.svg'

import homeHero from './assets/images/home-hero.png'
import notFound from './assets/images/not-found.svg'
import notNetwork from './assets/images/not-network.svg'
import notFound404 from './assets/images/not-found-404.svg'
import notFoundLighting from './assets/images/not-found-lighting.svg'
import searchIcon from './assets/images/search-icon.svg'
import emptyActiveOrders from './assets/images/empty-active-orders.svg'
import emptyPastOrders from './assets/images/empty-past-orders.svg'
import businessEmptyCart from './assets/images/dummies/business-empty-cart.png'

import categoryFood from './assets/images/categories/category-food.png'
import categoryGroceries from './assets/images/categories/category-groceries.png'
import categoryAlcohol from './assets/images/categories/category-alcohol.png'
import categoryLaundry from './assets/images/categories/category-laundry.png'
import categoryAll from './assets/images/categories/category-all.png'

import productDummy from './assets/images/dummies/product.png'
import storeDummy from './assets/images/dummies/store.png'

Sentry.init({
  environment: window?.location?.hostname === 'localhost' ? 'development' : process.env.NODE_ENV,
  dsn: 'https://1904dfd2b286479aa150ab362dde5448@o460529.ingest.sentry.io/5772896',
  integrations: [
    new Integrations.BrowserTracing()
  ],
  release: "react-template-2@" + process.env.npm_package_version,
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0
})

const logos = {
  logotype,
  logotypeInvert,
  isotype,
  isotypeInvert
}

theme.images = {
  logos,
  general: {
    homeHero,
    notFound,
    notFound404,
    notFoundLighting,
    searchIcon,
    notNetwork,
    emptyActiveOrders,
    emptyPastOrders,
    businessEmptyCart
  },

  categories: {
    food: categoryFood,
    groceries: categoryGroceries,
    alcohol: categoryAlcohol,
    laundry: categoryLaundry,
    all: categoryAll
  },
  dummies: {
    product: productDummy,
    driverPhoto: 'https://res.cloudinary.com/demo/image/fetch/c_thumb,g_face,r_max/https://www.freeiconspng.com/thumbs/driver-icon/driver-icon-14.png',
    businessLogo: storeDummy,
    customerPhoto: 'https://res.cloudinary.com/demo/image/upload/c_thumb,g_face,r_max/d_avatar.png/non_existing_id.png'
  }
}

const wrapper = document.getElementById('app')
ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <OrderingProvider Alert={Alert} settings={settings}>
        <Router />
      </OrderingProvider>
    </ThemeProvider>
  </Provider>
  , wrapper)
