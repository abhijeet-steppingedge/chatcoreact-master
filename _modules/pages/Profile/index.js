"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Profile = void 0;
var _react = _interopRequireDefault(require("react"));
var _theme_two = require("ordering-ui/theme_two");
var _HelmetTags = require("../../components/HelmetTags");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var Profile = function Profile(props) {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_HelmetTags.HelmetTags, {
    page: "profile"
  }), /*#__PURE__*/_react.default.createElement(_theme_two.UserProfileForm, props));
};
exports.Profile = Profile;