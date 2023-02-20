"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrderDetailsPage = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
var _HelmetTags = require("../../components/HelmetTags");
var _OrderDetails = require("../../components/OrderDetails");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var OrderDetailsPage = function OrderDetailsPage(props) {
  var _URLSearchParams, _useLocation;
  var history = (0, _reactRouterDom.useHistory)();
  var _useParams = (0, _reactRouterDom.useParams)(),
    orderId = _useParams.orderId;
  var hashKey = ((_URLSearchParams = new URLSearchParams((_useLocation = (0, _reactRouterDom.useLocation)()) === null || _useLocation === void 0 ? void 0 : _useLocation.search)) === null || _URLSearchParams === void 0 ? void 0 : _URLSearchParams.get('hash')) || null;
  var orderDetailsProps = _objectSpread(_objectSpread({}, props), {}, {
    orderId: orderId,
    hashKey: hashKey,
    urlToShare: function urlToShare(hashKey) {
      return hashKey ? "".concat(window.location.origin, "/orders/").concat(orderId, "?hash=").concat(hashKey) : null;
    },
    handleOrderRedirect: function handleOrderRedirect() {
      history.push('/profile/orders');
    },
    handleBusinessRedirect: function handleBusinessRedirect(slug) {
      history.push("/store/".concat(slug));
    }
  });
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_HelmetTags.HelmetTags, {
    page: "order_details",
    helmetTitle: "Order #".concat(orderId)
  }), /*#__PURE__*/_react.default.createElement(_OrderDetails.OrderDetails, orderDetailsProps));
};
exports.OrderDetailsPage = OrderDetailsPage;