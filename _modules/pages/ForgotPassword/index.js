"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForgotPassword = void 0;
var _react = _interopRequireDefault(require("react"));
var _theme_two = require("ordering-ui/theme_two");
var _HelmetTags = require("../../components/HelmetTags");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var ForgotPassword = function ForgotPassword(props) {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_HelmetTags.HelmetTags, {
    page: "forgotpassword"
  }), /*#__PURE__*/_react.default.createElement(_theme_two.ForgotPasswordForm, props));
};
exports.ForgotPassword = ForgotPassword;