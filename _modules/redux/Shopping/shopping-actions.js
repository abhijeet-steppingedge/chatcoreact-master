"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeFromCart = exports.loadCurrentItem = exports.emptyCart = exports.adjustItemQty = exports.addToCart = exports.addOfferPrice = exports.addBusiness = void 0;
var actionTypes = _interopRequireWildcard(require("./shopping-types"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var addToCart = function addToCart(itemID, business) {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: {
      id: itemID,
      business: business
    }
  };
};
exports.addToCart = addToCart;
var removeFromCart = function removeFromCart(itemID, productPrice) {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payload: {
      id: itemID,
      productPrice: productPrice
    }
  };
};
exports.removeFromCart = removeFromCart;
var adjustItemQty = function adjustItemQty(itemID, qty, operation, productPrice) {
  return {
    type: actionTypes.ADJUST_ITEM_QTY,
    payload: {
      id: itemID,
      qty: qty,
      operation: operation,
      productPrice: productPrice
    }
  };
};
exports.adjustItemQty = adjustItemQty;
var loadCurrentItem = function loadCurrentItem(item) {
  return {
    type: actionTypes.LOAD_CURRENT_ITEM,
    payload: item
  };
};
exports.loadCurrentItem = loadCurrentItem;
var emptyCart = function emptyCart() {
  return {
    type: actionTypes.EMPTY_CART
  };
};
exports.emptyCart = emptyCart;
var addBusiness = function addBusiness(business) {
  return {
    type: actionTypes.ADD_BUSINESS,
    payload: business
  };
};
exports.addBusiness = addBusiness;
var addOfferPrice = function addOfferPrice(price) {
  return {
    type: actionTypes.ADD_OFFER_PRICE,
    payload: price
  };
};
exports.addOfferPrice = addOfferPrice;