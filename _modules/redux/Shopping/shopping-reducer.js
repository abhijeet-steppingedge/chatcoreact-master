"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var actionTypes = _interopRequireWildcard(require("./shopping-types"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var INITIAL_STATE = {
  cart: [],
  currentItem: null,
  totalPrice: 0,
  offerPrice: 0,
  offerRate: 0,
  orderType: 0,
  offerRateType: null,
  couponCode: null,
  business: {},
  taxPercentage: 0,
  serviceFeePrice: 0,
  menu: {},
  firstProduct: {},
  paymethodSelected: null
};
var shopReducer = function shopReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      var item = state.cart.find(function (product) {
        return product.code === action.payload.code;
      });
      if (item) {
        return _objectSpread(_objectSpread({}, state), {}, {
          cart: state.cart.map(function (item) {
            return item.code === action.payload.code ? _objectSpread(_objectSpread({}, item), {}, {
              qty: item.qty + 1
            }) : item;
          }),
          totalPrice: state.totalPrice + action.payload.product.total_price
        });
      } else {
        return _objectSpread(_objectSpread({}, state), {}, {
          cart: [].concat(_toConsumableArray(state.cart), [_objectSpread(_objectSpread({}, action.payload.product), {}, {
            qty: 1
          })]),
          totalPrice: state.totalPrice + action.payload.product.total_price,
          business: action.payload.business
        });
      }
    case actionTypes.REMOVE_FROM_CART:
      return _objectSpread(_objectSpread({}, state), {}, {
        cart: state.cart.filter(function (item) {
          return item.code !== action.payload.code;
        }),
        totalPrice: state.totalPrice - action.payload.productPrice
      });
    case actionTypes.ADJUST_ITEM_QTY:
      return _objectSpread(_objectSpread({}, state), {}, {
        cart: state.cart.map(function (item) {
          return item.code === action.payload.code ? _objectSpread(_objectSpread({}, item), {}, {
            qty: action.payload.qty
          }) : item;
        }),
        totalPrice: action.payload.operation == 'plus' ? state.totalPrice + action.payload.productPrice : state.totalPrice - action.payload.productPrice
      });
    case actionTypes.LOAD_CURRENT_ITEM:
      return _objectSpread(_objectSpread({}, state), {}, {
        currentItem: action.payload
      });
    case actionTypes.ADD_OFFER_PRICE:
      return _objectSpread(_objectSpread({}, state), {}, {
        offerPrice: action.payload
      });
    case actionTypes.ADD_OFFER_ID:
      return _objectSpread(_objectSpread({}, state), {}, {
        offerId: action.payload
      });
    case actionTypes.ADD_OFFER_RATE:
      return _objectSpread(_objectSpread({}, state), {}, {
        offerRate: action.payload
      });
    case actionTypes.ADD_OFFER_RATE_TYPE:
      return _objectSpread(_objectSpread({}, state), {}, {
        offerRate: action.payload
      });
    case actionTypes.EMPTY_CART:
      return INITIAL_STATE;
    case actionTypes.ADD_BUSINESS:
      return _objectSpread(_objectSpread({}, state), {}, {
        business: action.payload
      });
    case actionTypes.ADD_COUPON_CODE:
      return _objectSpread(_objectSpread({}, state), {}, {
        couponCode: action.payload
      });
    case actionTypes.ADD_TAX:
      return _objectSpread(_objectSpread({}, state), {}, {
        taxPercentage: action.payload
      });
    case actionTypes.ADD_SERVICE_FEE:
      return _objectSpread(_objectSpread({}, state), {}, {
        serviceFeePrice: action.payload
      });
    case actionTypes.ADD_MENU:
      return _objectSpread(_objectSpread({}, state), {}, {
        menu: action.payload
      });
    case actionTypes.ADD_FIRST_PRODUCT:
      return _objectSpread(_objectSpread({}, state), {}, {
        firstProduct: action.payload
      });
    case actionTypes.ADD_ORDER_TYPE:
      return _objectSpread(_objectSpread({}, state), {}, {
        orderType: action.payload
      });
    case actionTypes.ADD_SELECTED_PAYMETHOD:
      return _objectSpread(_objectSpread({}, state), {}, {
        paymethodSelected: action.payload
      });
    default:
      return state;
  }
};
var _default = shopReducer;
exports.default = _default;