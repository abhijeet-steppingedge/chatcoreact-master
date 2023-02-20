"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _react = _interopRequireDefault(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _router = require("./router");
var _orderingComponents = require("ordering-components");
var _orderingUi = require("ordering-ui");
var Sentry = _interopRequireWildcard(require("@sentry/react"));
var _tracing = require("@sentry/tracing");
var _theme = _interopRequireDefault(require("./theme.json"));
var _config = _interopRequireDefault(require("./config.json"));
var _reactRedux = require("react-redux");
var _store = _interopRequireDefault(require("./redux/store"));
var _logotype = _interopRequireDefault(require("./assets/images/logotype.svg"));
var _logotypeInvert = _interopRequireDefault(require("./assets/images/logotype-invert.svg"));
var _isotype = _interopRequireDefault(require("./assets/images/isotype.svg"));
var _isotypeInvert = _interopRequireDefault(require("./assets/images/isotype-invert.svg"));
var _homeHero = _interopRequireDefault(require("./assets/images/home-hero.png"));
var _notFound = _interopRequireDefault(require("./assets/images/not-found.svg"));
var _notNetwork = _interopRequireDefault(require("./assets/images/not-network.svg"));
var _notFound2 = _interopRequireDefault(require("./assets/images/not-found-404.svg"));
var _notFoundLighting = _interopRequireDefault(require("./assets/images/not-found-lighting.svg"));
var _searchIcon = _interopRequireDefault(require("./assets/images/search-icon.svg"));
var _emptyActiveOrders = _interopRequireDefault(require("./assets/images/empty-active-orders.svg"));
var _emptyPastOrders = _interopRequireDefault(require("./assets/images/empty-past-orders.svg"));
var _businessEmptyCart = _interopRequireDefault(require("./assets/images/dummies/business-empty-cart.png"));
var _categoryFood = _interopRequireDefault(require("./assets/images/categories/category-food.png"));
var _categoryGroceries = _interopRequireDefault(require("./assets/images/categories/category-groceries.png"));
var _categoryAlcohol = _interopRequireDefault(require("./assets/images/categories/category-alcohol.png"));
var _categoryLaundry = _interopRequireDefault(require("./assets/images/categories/category-laundry.png"));
var _categoryAll = _interopRequireDefault(require("./assets/images/categories/category-all.png"));
var _product = _interopRequireDefault(require("./assets/images/dummies/product.png"));
var _store2 = _interopRequireDefault(require("./assets/images/dummies/store.png"));
var _window, _window$location;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
Sentry.init({
  environment: ((_window = window) === null || _window === void 0 ? void 0 : (_window$location = _window.location) === null || _window$location === void 0 ? void 0 : _window$location.hostname) === 'localhost' ? 'development' : process.env.NODE_ENV,
  dsn: 'https://1904dfd2b286479aa150ab362dde5448@o460529.ingest.sentry.io/5772896',
  integrations: [new _tracing.Integrations.BrowserTracing()],
  release: "react-template-2@" + process.env.npm_package_version,
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0
});
var logos = {
  logotype: _logotype.default,
  logotypeInvert: _logotypeInvert.default,
  isotype: _isotype.default,
  isotypeInvert: _isotypeInvert.default
};
_theme.default.images = {
  logos: logos,
  general: {
    homeHero: _homeHero.default,
    notFound: _notFound.default,
    notFound404: _notFound2.default,
    notFoundLighting: _notFoundLighting.default,
    searchIcon: _searchIcon.default,
    notNetwork: _notNetwork.default,
    emptyActiveOrders: _emptyActiveOrders.default,
    emptyPastOrders: _emptyPastOrders.default,
    businessEmptyCart: _businessEmptyCart.default
  },
  categories: {
    food: _categoryFood.default,
    groceries: _categoryGroceries.default,
    alcohol: _categoryAlcohol.default,
    laundry: _categoryLaundry.default,
    all: _categoryAll.default
  },
  dummies: {
    product: _product.default,
    driverPhoto: 'https://res.cloudinary.com/demo/image/fetch/c_thumb,g_face,r_max/https://www.freeiconspng.com/thumbs/driver-icon/driver-icon-14.png',
    businessLogo: _store2.default,
    customerPhoto: 'https://res.cloudinary.com/demo/image/upload/c_thumb,g_face,r_max/d_avatar.png/non_existing_id.png'
  }
};
var wrapper = document.getElementById('app');
_reactDom.default.render( /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
  store: _store.default
}, /*#__PURE__*/_react.default.createElement(_orderingUi.ThemeProvider, {
  theme: _theme.default
}, /*#__PURE__*/_react.default.createElement(_orderingComponents.OrderingProvider, {
  Alert: _orderingUi.Alert,
  settings: _config.default
}, /*#__PURE__*/_react.default.createElement(_router.Router, null)))), wrapper);