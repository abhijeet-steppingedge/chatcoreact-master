"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Router = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
var _app = require("./app");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var Router = function Router() {
  return /*#__PURE__*/_react.default.createElement(_reactRouterDom.BrowserRouter, null, /*#__PURE__*/_react.default.createElement(_app.App, null));
};
exports.Router = Router;