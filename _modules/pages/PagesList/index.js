"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PagesList = void 0;
var _react = _interopRequireDefault(require("react"));
var _orderingUi = require("ordering-ui");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var PagesList = function PagesList(props) {
  var routes = [
  // { name: 'Home', slug: '/home' },
  // { name: 'Sign Up', slug: '/signup' },
  // { name: 'Login', slug: '/login' },
  // { name: 'Sign In', slug: '/signin' },
  // { name: 'Forgot Password', slug: '/password/forgot' },
  // { name: 'Profile', slug: '/profile' },
  // { name: 'My Orders', slug: '/profile/orders' },
  // { name: 'Main Businesses', slug: '/search' },
  {
    name: 'Pickup Businesses',
    slug: '/pickup'
  }, {
    name: 'filter Businesses',
    slug: '/filter'
  }, {
    name: 'Checkout',
    slug: '/checkout'
  }
  // { name: 'Pages', slug: '/pages' }
  ];

  return /*#__PURE__*/_react.default.createElement(_orderingUi.PagesList, _extends({}, props, {
    routes: routes
  }));
};
exports.PagesList = PagesList;