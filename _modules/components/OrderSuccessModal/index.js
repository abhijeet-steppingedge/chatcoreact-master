"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaymentOptions = exports.OrderSuccessModal = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = require("styled-components");
var _moment = _interopRequireDefault(require("moment"));
var _FiClock = _interopRequireDefault(require("@meronex/icons/fi/FiClock"));
var _HiOutlineLocationMarker = _interopRequireDefault(require("@meronex/icons/hi/HiOutlineLocationMarker"));
var _FaWhatsapp = _interopRequireDefault(require("@meronex/icons/fa/FaWhatsapp"));
var _orderingComponents = require("ordering-components");
var _utils = require("../../utils");
var _styles = require("./styles");
var _Buttons = require("../styles/Buttons");
var _reactRedux = require("react-redux");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var OrderSuccessModal = function OrderSuccessModal(props) {
  var _orderState$options4, _orderState$options5, _orderState$options6, _orderState$options7, _orderState$options8, _orderState$options9, _orderState$options10, _orderState$options11, _order$customer2, _order$customer3, _order$customer4;
  var cardData = props.cardData,
    businessData = props.businessData,
    isCheckOut = props.isCheckOut,
    products = props.products,
    order = props.order,
    isOrderDetail = props.isOrderDetail;
  var _useLanguage = (0, _orderingComponents.useLanguage)(),
    _useLanguage2 = _slicedToArray(_useLanguage, 2),
    t = _useLanguage2[1];
  var theme = (0, _styledComponents.useTheme)();
  var _useOrder = (0, _orderingComponents.useOrder)(),
    _useOrder2 = _slicedToArray(_useOrder, 1),
    orderState = _useOrder2[0];
  var _useEvent = (0, _orderingComponents.useEvent)(),
    _useEvent2 = _slicedToArray(_useEvent, 1),
    events = _useEvent2[0];
  var dispatch = (0, _reactRedux.useDispatch)();
  var _useUtils = (0, _orderingComponents.useUtils)(),
    _useUtils2 = _slicedToArray(_useUtils, 1),
    parseDate = _useUtils2[0].parseDate;
  var _useState = (0, _react.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    formattedTime = _useState2[0],
    setFormattedTime = _useState2[1];
  var businessAddress = function businessAddress() {
    if (isCheckOut && businessData) {
      return businessData === null || businessData === void 0 ? void 0 : businessData.address;
    }
    if (isOrderDetail) {
      return JSON.parse(window.localStorage.getItem('business-address'));
    }
    return JSON.parse(window.localStorage.getItem('user-customer'));
  };
  var getProducts = function getProducts() {
    if (businessData && products.length > 0) {
      return products.length;
    }
    return 1;
  };
  var orderType = function orderType() {
    var _orderState$options, _orderState$options2, _orderState$options3;
    var type = '';
    if ((orderState === null || orderState === void 0 ? void 0 : (_orderState$options = orderState.options) === null || _orderState$options === void 0 ? void 0 : _orderState$options.type) == 1) {
      type = t('DELIVERY', 'Delivery');
    }
    if ((orderState === null || orderState === void 0 ? void 0 : (_orderState$options2 = orderState.options) === null || _orderState$options2 === void 0 ? void 0 : _orderState$options2.type) == 2) {
      type = t('PICKUP', 'Pickup');
    }
    if ((orderState === null || orderState === void 0 ? void 0 : (_orderState$options3 = orderState.options) === null || _orderState$options3 === void 0 ? void 0 : _orderState$options3.type) == 3) {
      type = t('EAT_IN', 'Dine-In');
    }
    return type;
  };
  var convertH2M = function convertH2M(timeInHour) {
    if (timeInHour) {
      var timeParts = timeInHour.split(":");
      return Number(timeParts[0]) * 60 + Number(timeParts[1]);
    }
    return 0;
  };
  var formatCurrentTime = function formatCurrentTime(delivery_datetime) {
    var currentTime = (0, _moment.default)(delivery_datetime);
    var hours = orderState.options.type == 2 ? businessData === null || businessData === void 0 ? void 0 : businessData.pickup_time : businessData === null || businessData === void 0 ? void 0 : businessData.delivery_time;
    var minToAdd = convertH2M(hours);
    var formatted = currentTime;
    if ((order === null || order === void 0 ? void 0 : order.status) != 13) {
      formatted = currentTime.add(minToAdd, 'minutes');
    }
    if (formatted && (orderState.options.type == 1 || orderState.options.type == 2)) setFormattedTime(" (".concat(formatted.format('hh:mm A'), ")"));
  };
  var goToOrderDetails = function goToOrderDetails() {
    dispatch({
      type: 'EMPTY_CART'
    });
    events.emit('go_to_page', {
      page: 'order_detail',
      params: {
        orderId: order === null || order === void 0 ? void 0 : order.id
      },
      replace: true
    });
  };
  var gotToWhatsApp = function gotToWhatsApp() {
    var product_name = '';
    for (var i = 0; i < (order === null || order === void 0 ? void 0 : order.products.length); i++) {
      product_name = product_name + (order === null || order === void 0 ? void 0 : order.products[i].name) + ' ';
    }
    product_name = product_name.replace(/(.+),$/, '$1');
    var currentTime = (0, _moment.default)(order === null || order === void 0 ? void 0 : order.delivery_datetime);
    var hours = orderState.options.type == 2 ? businessData === null || businessData === void 0 ? void 0 : businessData.pickup_time : businessData === null || businessData === void 0 ? void 0 : businessData.delivery_time;
    var minToAdd = convertH2M(hours);
    var formatted = currentTime;
    if ((order === null || order === void 0 ? void 0 : order.status) != 13) {
      formatted = currentTime.add(minToAdd, 'minutes');
    }
    var time = '';
    if (formatted && (orderState.options.type == 1 || orderState.options.type == 2)) {
      // time = formatted.format('hh:mm A');
      time = formatted.format('DD MMM YYYY hh:mm A');
    }
    var url = "https://api.whatsapp.com/send/?phone=+6531294545&text=";
    if (order.delivery_type == 1) {
      var _order$business, _order$summary, _order$paymethod;
      url += "*Order%23%20".concat(order === null || order === void 0 ? void 0 : order.id, "*%20%F0%9F%9B%B5%0A%0A%F0%9F%8E%89%F0%9F%8E%8A%F0%9F%93%A3%20Congratulations%20your%20*").concat(orderType(), "*%20%F0%9F%9B%B5%20Order%20successfully%20placed%20with%20").concat(order === null || order === void 0 ? void 0 : (_order$business = order.business) === null || _order$business === void 0 ? void 0 : _order$business.name, "%0A%0A%E2%96%AA%20").concat(product_name, "%0A%0ATotal%3A%20%F0%9F%92%B0S%24%20").concat(order === null || order === void 0 ? void 0 : (_order$summary = order.summary) === null || _order$summary === void 0 ? void 0 : _order$summary.total, "%0A%0A%F0%9F%95%93%20Date%20%26%20Time%20%0A%20*").concat(time, "*%0A%0A----------------------------%0APayment%20by%20").concat(order === null || order === void 0 ? void 0 : (_order$paymethod = order.paymethod) === null || _order$paymethod === void 0 ? void 0 : _order$paymethod.name, "%0A%0A%F0%9F%93%92%20Note%20for%20kitchen%0A*").concat(order === null || order === void 0 ? void 0 : order.comment, "*");
    } else if (order.delivery_type == 2) {
      var _order$business2, _order$summary2, _order$paymethod2;
      url += "*Order%23%20".concat(order === null || order === void 0 ? void 0 : order.id, "*%20%F0%9F%8F%AC%0A%0A%F0%9F%8E%89%F0%9F%8E%8A%F0%9F%93%A3%20Congratulations%20your%20*").concat(orderType(), "*%20%F0%9F%8F%AC%20Order%20successfully%20placed%20with%20").concat(order === null || order === void 0 ? void 0 : (_order$business2 = order.business) === null || _order$business2 === void 0 ? void 0 : _order$business2.name, "%0A%0A%E2%96%AA%20").concat(product_name, "%0A%0ATotal%3A%20%F0%9F%92%B0S%24%20").concat(order === null || order === void 0 ? void 0 : (_order$summary2 = order.summary) === null || _order$summary2 === void 0 ? void 0 : _order$summary2.total, "%0A%0A%F0%9F%95%93%20Date%20%26%20Time%20%0A%20*").concat(time, "*%0A%0A----------------------------%0APayment%20by%20").concat(order === null || order === void 0 ? void 0 : (_order$paymethod2 = order.paymethod) === null || _order$paymethod2 === void 0 ? void 0 : _order$paymethod2.name, "%0A%0A%F0%9F%93%92%20Note%20for%20kitchen%0A*").concat(order === null || order === void 0 ? void 0 : order.comment, "*");
    } else if (order.delivery_type == 3) {
      var _order$business3, _order$customer, _order$summary3, _order$paymethod3;
      url += "*Order%23%20".concat(order === null || order === void 0 ? void 0 : order.id, "*%20%F0%9F%8F%AC%0A%0A%F0%9F%8E%89%F0%9F%8E%8A%F0%9F%93%A3%20Congratulations%20your%20*").concat(orderType(), "*%20%F0%9F%8F%AC%20Order%20successfully%20placed%20with%20").concat(order === null || order === void 0 ? void 0 : (_order$business3 = order.business) === null || _order$business3 === void 0 ? void 0 : _order$business3.name, "%0A%0AYour%20Table%23%3A%20").concat(order === null || order === void 0 ? void 0 : (_order$customer = order.customer) === null || _order$customer === void 0 ? void 0 : _order$customer.internal_number, "%0A%0A%E2%96%AA%20").concat(product_name, "%0A%0ATotal%3A%20%F0%9F%92%B0S%24%20").concat(order === null || order === void 0 ? void 0 : (_order$summary3 = order.summary) === null || _order$summary3 === void 0 ? void 0 : _order$summary3.total, "%0A%0A%F0%9F%95%93%20Date%20%26%20Time%20%0A%20*").concat(time, "*%0A%0A-----------------------------%0APayment%20by%20").concat(order === null || order === void 0 ? void 0 : (_order$paymethod3 = order.paymethod) === null || _order$paymethod3 === void 0 ? void 0 : _order$paymethod3.name, "%0A%0A%F0%9F%93%92%20Note%20for%20kitchen%0A*").concat(order === null || order === void 0 ? void 0 : order.comment, "*");
    }

    // let url = `https://api.whatsapp.com/send/?phone=+6531294545&text=
    // Order%23%20%7B${order?.id}%7D%20%F0%9F%8F%AC` +
    //   `%0A%0A` +
    //   `%F0%9F%8E%89%F0%9F%8E%8A%F0%9F%93%A3%20Congratulations%20your%20${orderType()}%20%F0%9F%8F%AC%20Order%20successfully%20placed%20with%20%7B${order.business?.name}%7D` +
    //   `%0A%0A` +
    //   `Your Table%23%3A%20%7B${order?.customer?.internal_number}%7D` +
    //   `%0A%0A` +
    //   `${product_name}` +
    //   `%0A` +
    //   `Total%3A%20%F0%9F%92%B0S%24%20%7B${order?.summary?.total}%7D` +
    //   `%0A%0A` +
    //   `-----------------------------` +
    //   `%0A` +
    //   `Payment by%20${order?.paymethod?.name}` +
    //   `%0A%0A
    //   +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //   ${orderType()}+Time+${time}+++++++++++++++
    //   ` +
    //   `%F0%9F%93%92%20Note%20for%20kitchen` +
    //   `%0A` +
    //   `%7B${order?.comment}%7D&app_absent=0`;

    // window.open(url, '_blank');
    window.location.href = url;
  };
  (0, _react.useEffect)(function () {
    if (businessData !== null && businessData !== void 0 && businessData.address) {
      localStorage.setItem('business-address', JSON.stringify(businessData === null || businessData === void 0 ? void 0 : businessData.address));
    }
  }, [businessData === null || businessData === void 0 ? void 0 : businessData.address]);
  (0, _react.useEffect)(function () {
    formatCurrentTime(order.delivery_datetime);
  }, []);
  (0, _react.useEffect)(function () {
    setTimeout(function () {
      gotToWhatsApp();
    }, 4000);
  }, []);
  return /*#__PURE__*/_react.default.createElement(_styles.Container, null, /*#__PURE__*/_react.default.createElement(_styles.Title, null, /*#__PURE__*/_react.default.createElement("h3", null, 'Your order successfully placed with ' + (businessData === null || businessData === void 0 ? void 0 : businessData.name))), /*#__PURE__*/_react.default.createElement(_styles.OrderContent, null, /*#__PURE__*/_react.default.createElement(_styles.OrderItem, null, /*#__PURE__*/_react.default.createElement("span", {
    className: "item-text"
  }, t('ORDER_NUMBER', 'Order Number'), " : ", order === null || order === void 0 ? void 0 : order.id)), /*#__PURE__*/_react.default.createElement(_styles.OrderItem, null, /*#__PURE__*/_react.default.createElement("span", {
    className: "item-text"
  }, t('ADDRESS', 'Address'), " : ", businessAddress())), isCheckOut && products && (orderState === null || orderState === void 0 ? void 0 : (_orderState$options4 = orderState.options) === null || _orderState$options4 === void 0 ? void 0 : _orderState$options4.type) && ((orderState === null || orderState === void 0 ? void 0 : (_orderState$options5 = orderState.options) === null || _orderState$options5 === void 0 ? void 0 : _orderState$options5.type) === 1 || (orderState === null || orderState === void 0 ? void 0 : (_orderState$options6 = orderState.options) === null || _orderState$options6 === void 0 ? void 0 : _orderState$options6.type) === 2) && /*#__PURE__*/_react.default.createElement(_styles.OrderItem, null, /*#__PURE__*/_react.default.createElement("span", {
    className: "item-text"
  }, (orderState === null || orderState === void 0 ? void 0 : (_orderState$options7 = orderState.options) === null || _orderState$options7 === void 0 ? void 0 : _orderState$options7.type) === 1 ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, t('DELIVERY_TIME', 'Delivery Time')) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, t('PICK_UP', 'Pick Time')), ":", formattedTime)), isCheckOut && cardData && (cardData === null || cardData === void 0 ? void 0 : cardData.card) && /*#__PURE__*/_react.default.createElement(PaymentOptions, {
    card: cardData === null || cardData === void 0 ? void 0 : cardData.card
  }), isCheckOut && /*#__PURE__*/_react.default.createElement(_styles.OrderItem, null, /*#__PURE__*/_react.default.createElement("span", {
    className: "item-text"
  }, " ", t('NO_OF_PRODUCTS', 'No of Products'), " : ", getProducts(), " ")), isCheckOut && Object.keys(order).length > 0 && ((orderState === null || orderState === void 0 ? void 0 : (_orderState$options8 = orderState.options) === null || _orderState$options8 === void 0 ? void 0 : _orderState$options8.type) === 1 || (orderState === null || orderState === void 0 ? void 0 : (_orderState$options9 = orderState.options) === null || _orderState$options9 === void 0 ? void 0 : _orderState$options9.type) === 2 || (orderState === null || orderState === void 0 ? void 0 : (_orderState$options10 = orderState.options) === null || _orderState$options10 === void 0 ? void 0 : _orderState$options10.type) === 1 || (orderState === null || orderState === void 0 ? void 0 : (_orderState$options11 = orderState.options) === null || _orderState$options11 === void 0 ? void 0 : _orderState$options11.type) === 3) && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, order.delivery_type != 3 && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_styles.OrderItem, null, /*#__PURE__*/_react.default.createElement("span", {
    className: "item-text"
  }, t('NAME', 'Customer Name'), " : ", order === null || order === void 0 ? void 0 : (_order$customer2 = order.customer) === null || _order$customer2 === void 0 ? void 0 : _order$customer2.name)), /*#__PURE__*/_react.default.createElement(_styles.OrderItem, null, /*#__PURE__*/_react.default.createElement("span", {
    className: "item-text"
  }, t('PHONE', 'Customer Phone'), " : ", order === null || order === void 0 ? void 0 : (_order$customer3 = order.customer) === null || _order$customer3 === void 0 ? void 0 : _order$customer3.cellphone)), /*#__PURE__*/_react.default.createElement(_styles.OrderItem, null, /*#__PURE__*/_react.default.createElement("span", {
    className: "item-text"
  }, t('EMAIL', 'Customer Email'), " : ", order === null || order === void 0 ? void 0 : (_order$customer4 = order.customer) === null || _order$customer4 === void 0 ? void 0 : _order$customer4.email))), /*#__PURE__*/_react.default.createElement(_styles.OrderItem, null, /*#__PURE__*/_react.default.createElement("span", {
    className: "item-text"
  }, t('SPECIAL_COMMENTS', 'Special Notes'), " : ", order === null || order === void 0 ? void 0 : order.comment)))));
};
exports.OrderSuccessModal = OrderSuccessModal;
var PaymentOptions = function PaymentOptions(props) {
  var card = props.card;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_styles.OrderItem, null, /*#__PURE__*/_react.default.createElement("span", {
    className: "item-icon card-icon"
  }, (0, _utils.getIconCard)(card === null || card === void 0 ? void 0 : card.brand)), /*#__PURE__*/_react.default.createElement("span", {
    className: "item-text"
  }, "XXXX-XXXX-XXXX-", card === null || card === void 0 ? void 0 : card.last4)));
};
exports.PaymentOptions = PaymentOptions;