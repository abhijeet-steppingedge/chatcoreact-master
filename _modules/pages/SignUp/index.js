"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignUp = void 0;
var _react = _interopRequireDefault(require("react"));
var _theme_two = require("ordering-ui/theme_two");
var _HelmetTags = require("../../components/HelmetTags");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var SignUp = function SignUp(props) {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_HelmetTags.HelmetTags, {
    page: "signup"
  }), /*#__PURE__*/_react.default.createElement(_theme_two.SignUpForm, props));
};
exports.SignUp = SignUp;