"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _orderingComponents = require("ordering-components");
var _Header = require("../src/components/Header");
var _orderingUi = require("ordering-ui");
var _BusinessesList = require("./pages/BusinessesList");
var _BusinessProductsList = require("./pages/BusinessProductsList");
var _Checkout = require("./pages/Checkout");
var _Cms = require("./pages/Cms");
var _ForgotPassword = require("./pages/ForgotPassword");
var _Home = require("./pages/Home");
var _MyOrders = require("./pages/MyOrders");
var _OrderDetails = require("./pages/OrderDetails");
var _PageNotFound = require("./pages/PageNotFound");
var _PagesList = require("./pages/PagesList");
var _Profile = require("./pages/Profile");
var _ResetPassword = require("./pages/ResetPassword");
var _SignUp = require("./pages/SignUp");
var _ScrollToTop = require("./components/ScrollToTop");
var _ListenPageChanges = require("./components/ListenPageChanges");
var _HelmetTags = require("./components/HelmetTags");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var App = function App() {
  var _configs$track_id_goo, _configs$track_id_goo2;
  var _useSession = (0, _orderingComponents.useSession)(),
    _useSession2 = _slicedToArray(_useSession, 1),
    _useSession2$ = _useSession2[0],
    auth = _useSession2$.auth,
    user = _useSession2$.user,
    loading = _useSession2$.loading;
  var _useOrder = (0, _orderingComponents.useOrder)(),
    _useOrder2 = _slicedToArray(_useOrder, 1),
    orderStatus = _useOrder2[0];
  var _useConfig = (0, _orderingComponents.useConfig)(),
    _useConfig2 = _slicedToArray(_useConfig, 1),
    configs = _useConfig2[0].configs;
  var _useLanguage = (0, _orderingComponents.useLanguage)(),
    _useLanguage2 = _slicedToArray(_useLanguage, 2),
    languageState = _useLanguage2[0],
    t = _useLanguage2[1];
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    loaded = _useState2[0],
    setLoaded = _useState2[1];
  var onlineStatus = (0, _orderingUi.useOnlineStatus)();
  var location = (0, _reactRouterDom.useLocation)();
  var _useState3 = (0, _react.useState)({
      open: false,
      content: []
    }),
    _useState4 = _slicedToArray(_useState3, 2),
    alertState = _useState4[0],
    setAlertState = _useState4[1];
  var closeAlert = function closeAlert() {
    setAlertState({
      open: false,
      content: []
    });
  };
  var acceptAlert = function acceptAlert() {
    var _configs$front_versio;
    window.localStorage.setItem('front_version', configs === null || configs === void 0 ? void 0 : (_configs$front_versio = configs.front_version) === null || _configs$front_versio === void 0 ? void 0 : _configs$front_versio.value);
    window.location.reload();
  };
  var isHome = location.pathname === '/' || location.pathname === '/home';
  (0, _react.useEffect)(function () {
    if (!loaded && !orderStatus.loading) {
      setLoaded(true);
    }
  }, [orderStatus]);
  (0, _react.useEffect)(function () {
    if (!loading) {
      setLoaded(!auth);
    }
  }, [loading]);
  (0, _react.useEffect)(function () {
    var _configs$front_versio2;
    if (configs !== null && configs !== void 0 && (_configs$front_versio2 = configs.front_version) !== null && _configs$front_versio2 !== void 0 && _configs$front_versio2.value && loaded) {
      var _configs$front_versio3;
      var localStorageFrontVersion = window.localStorage.getItem('front_version');
      if (localStorageFrontVersion && localStorageFrontVersion !== (configs === null || configs === void 0 ? void 0 : (_configs$front_versio3 = configs.front_version) === null || _configs$front_versio3 === void 0 ? void 0 : _configs$front_versio3.value)) {
        setAlertState({
          open: true,
          content: [t('RELOAD_FRONT_QUESTION', 'There is a new version of Ordering! Do you want to update it?')]
        });
      }
    }
  }, [configs, loaded]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, (configs === null || configs === void 0 ? void 0 : (_configs$track_id_goo = configs.track_id_google_analytics) === null || _configs$track_id_goo === void 0 ? void 0 : _configs$track_id_goo.value) && /*#__PURE__*/_react.default.createElement(_orderingComponents.Analytics, {
    trackId: configs === null || configs === void 0 ? void 0 : (_configs$track_id_goo2 = configs.track_id_google_analytics) === null || _configs$track_id_goo2 === void 0 ? void 0 : _configs$track_id_goo2.value
  }), /*#__PURE__*/_react.default.createElement(_ListenPageChanges.ListenPageChanges, null), (!loaded || languageState.loading) && /*#__PURE__*/_react.default.createElement(_orderingUi.SpinnerLoader, null), loaded && !languageState.loading && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, (location === null || location === void 0 ? void 0 : location.pathname.includes('/orders')) && /*#__PURE__*/_react.default.createElement(_Header.Header, {
    isHome: isHome,
    location: location
  }), /*#__PURE__*/_react.default.createElement(_orderingUi.NotNetworkConnectivity, null), onlineStatus && /*#__PURE__*/_react.default.createElement(_ScrollToTop.ScrollToTop, null, /*#__PURE__*/_react.default.createElement(_HelmetTags.HelmetTags, null), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Switch, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "/home"
  }, /*#__PURE__*/_react.default.createElement(_Home.HomePage, null)), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "/store/:store"
  }, /*#__PURE__*/_react.default.createElement(_BusinessProductsList.BusinessProductsList, null)), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/checkout"
  }, /*#__PURE__*/_react.default.createElement(_Checkout.CheckoutPage, null)), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "/orders/:businessSlug/:orderId/:cellphone"
  }, /*#__PURE__*/_react.default.createElement(_OrderDetails.OrderDetailsPage, null)), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "/pages/:pageSlug"
  }, /*#__PURE__*/_react.default.createElement(_Cms.Cms, null)), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "/pages"
  }, /*#__PURE__*/_react.default.createElement(_PagesList.PagesList, null)), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "/:store"
  }, /*#__PURE__*/_react.default.createElement(_BusinessProductsList.BusinessProductsList, null)), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "/:store/:orderTypeFromParams/:locationFromParams?"
  }, /*#__PURE__*/_react.default.createElement(_BusinessProductsList.BusinessProductsList, null)), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "*"
  }, /*#__PURE__*/_react.default.createElement(_PageNotFound.PageNotFound, null)))), /*#__PURE__*/_react.default.createElement(_orderingUi.Alert, {
    title: t('INFORMATION', 'Information'),
    content: alertState.content,
    acceptText: t('ACCEPT', 'Accept'),
    open: alertState.open,
    onClose: function onClose() {
      return closeAlert();
    },
    onCancel: function onCancel() {
      return closeAlert();
    },
    onAccept: function onAccept() {
      return acceptAlert();
    },
    closeOnBackdrop: false
  })));
};
exports.App = App;