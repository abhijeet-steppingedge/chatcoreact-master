"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductQuantity = exports.Container = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var Container = _styledComponents.default.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n\n&.error {\n  background-color: orange;\n}\n  display: flex;\n  justify-content: right;\n  padding: 0px 0px;\n  margin-top:0px;\n  margin-left: auto;\n  div.incdec-control {\n    background-color:", ";\n    border-radius: 50px;\n    box-shadow: 0 3px 9px #eb593369;\n    svg {\n      width: 30px;\n      height: 18px;\n      cursor: pointer;\n      margin-top:-3px;\n    }\n    svg path{\n      fill: ", ";\n    }\n  }\n  div:last-child {\n    width: 100%;\n    display: flex;\n    align-items: right;\n  }\n\n  button:disabled,\n  button.disabled,\n  svg.disabled {\n    opacity: 0.5;\n  }\n\n  svg.disabled {\n    pointer-events: none;\n  }\n\n  svg.icon {\n    padding-top:6px;\n  }\n\n  button.add {\n    padding: 5px 15px;\n    margin: 10px 0px 0px;\n    width: 91%;\n\n    &.soldout {\n      position: relative;\n      pointer-events: none;\n    }\n\n    > span.total {\n      ", "\n    }\n  }\n\n  @media (min-width: 577px) {\n    flex-direction: row;\n\n    div:last-child {\n      width: 75%;\n    }\n    button.add {\n      width: initial;\n      margin: 0 10px;\n\n      &.soldout {\n        width: 100%;\n      }\n    }\n\n    button {\n      position: absolute;\n\n      ", "\n    }\n  }\n\n  @media (min-width: 769px) {\n    position: sticky;\n    bottom: 0px;\n    right: initial;\n  }\n\n  @media (min-width: 1201px) {\n    padding: 5px 0px;\n\n    div:last-child {\n      width: 70%;\n      button {\n        width: 100%;\n      }\n    }\n  }\n  @media (max-width: 450px) {\n    div:last-child {\n      width: 70%;\n    }\n  }\n"])), function (props) {
  return props.backgroundColor;
}, function (props) {
  return props.color;
}, function (props) {
  var _props$theme;
  return (_props$theme = props.theme) !== null && _props$theme !== void 0 && _props$theme.rtl ? (0, _styledComponents.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n        padding-right: 20px;\n      "]))) : (0, _styledComponents.css)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n        padding-left: 20px;\n      "])));
}, function (props) {
  var _props$theme2;
  return (_props$theme2 = props.theme) !== null && _props$theme2 !== void 0 && _props$theme2.rtl ? (0, _styledComponents.css)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n        left: 0px;\n      "]))) : (0, _styledComponents.css)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n        right: 0px;\n      "])));
});
exports.Container = Container;
var ProductQuantity = _styledComponents.default.span(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  background: ", ";\n  border-radius: 8px;\n  width: 26px;\n  height: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 7px 3px;\n  color:", "\n"])), function (props) {
  return props.theme.colors.primary;
}, function (props) {
  return props.color;
});
exports.ProductQuantity = ProductQuantity;