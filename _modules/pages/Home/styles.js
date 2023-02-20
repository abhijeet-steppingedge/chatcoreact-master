"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WrapTextContent = exports.TextContent = exports.StepsBlock = exports.SkeletonSide = exports.SkeletonInformation = exports.SkeletonHeader = exports.SkeletonContent = exports.SkeletonContainer = exports.Line = exports.ImageContent = exports.Icons = exports.HomeTitle = exports.HomeSection = exports.HomeFooter = exports.HomeContainer = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var HomeContainer = _styledComponents.default.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  background-color: ", ";\n  display: flex;\n  flex-direction: column;\n"])), function (props) {
  return props.theme.colors.backgroundPage;
});
exports.HomeContainer = HomeContainer;
var HomeSection = _styledComponents.default.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  display: flex;\n  width: 100%;\n  box-sizing: border-box;\n  background: #FFF;\n\n  flex-direction: column;\n  padding: 0px 10px 20px;\n  &.reverse {\n    flex-direction: column-reverse;\n  }\n\n  ", "\n\n  ", "\n\n  ", "\n\n  @media (min-width: 943px) {\n    padding: 0px 50px 20px;\n    flex-direction: ", ";\n    &.reverse {\n      flex-direction: row-reverse;\n    }\n  }\n"])), function (_ref) {
  var column = _ref.column;
  return column && (0, _styledComponents.css)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    flex-direction: column;\n  "])));
}, function (_ref2) {
  var bgColor = _ref2.bgColor;
  return bgColor && (0, _styledComponents.css)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n    background: ", ";\n  "])), bgColor);
}, function (_ref3) {
  var bgimage = _ref3.bgimage;
  return bgimage && (0, _styledComponents.css)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n    background-image: linear-gradient(\n      rgba(0, 0, 0, 0.5),\n      rgba(0, 0, 0, 0.5)\n    ), url(", ");\n    background-repeat: no-repeat, repeat;\n    width: 100%;\n    background-size: cover;\n    object-fit: cover;\n    background-position: center;\n    min-height: 350px;\n    justify-content: center;\n    align-items: center;\n  "])), bgimage);
}, function (_ref4) {
  var column = _ref4.column;
  return column ? 'column' : 'row';
});
exports.HomeSection = HomeSection;
var HomeTitle = _styledComponents.default.div(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  width: 100%;\n  h2 {\n    text-align: center;\n    font: normal normal normal 45px/79px Lobster;\n    font-size: 30px;\n    letter-spacing: 0px;\n    color: #263238;\n    font-weight: bold;\n    margin: 0px;\n  }\n  span {\n    color: ", ";\n  }\n  @media (min-width: 481px) {\n    h2 {\n      font: normal normal normal 45px/79px Lobster;\n    }\n  }\n"])), function (props) {
  return props.theme.colors.primary;
});
exports.HomeTitle = HomeTitle;
var StepsBlock = _styledComponents.default.div(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  position: relative;\n  display: grid;\n  grid-template-columns: auto;\n  grid-template-rows: auto;\n  justify-items: center;\n  align-items: center;\n  margin-top: 15px;\n  div {\n    width: auto;\n    margin-bottom: 20px;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    padding: 0px 30px;\n    svg {\n      font-size: 70px;\n    }\n    h3 {\n      font-weight: normal;\n      text-align: center;\n    }\n  }\n  @media (min-width: 790px) {\n    grid-template-columns: auto auto auto auto auto auto auto;\n  }\n"])));
exports.StepsBlock = StepsBlock;
var ImageContent = _styledComponents.default.div(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: center;\n  margin-top: 40px;\n  width: 100%;\n  div {\n    display: flex;\n    justify-content: center;\n    max-height: 400px;\n    max-width:100%;\n    img {\n      width: auto;\n      height : auto;\n      max-height: 100%;\n      max-width: 100%;\n    }\n  }\n  @media (min-width: 943px) {\n    width: 50%;\n  }\n"])));
exports.ImageContent = ImageContent;
var WrapTextContent = _styledComponents.default.div(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n  padding: 20px;\n  h2{\n    font: normal normal normal 64px/80px ", ";\n  }\n  div {\n    padding: 0px;\n  }\n  @media (min-width: 943px) {\n    div {\n      padding: 0px 70px;\n    }\n  }\n"])), function (props) {
  return props.theme.fonts.special || 'Georgia';
});
exports.WrapTextContent = WrapTextContent;
var TextContent = _styledComponents.default.div(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  width: 100%;\n  text-align: center;\n\n  div {\n    text-align: left;\n    margin-top: 25px;\n    h2 > span {\n      color: ", ";\n    }\n  }\n\n  h2 {\n    font-size: 24px;\n  }\n\n  &.center {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    height: 100%;\n    width: 100%;\n\n    h2 {\n      font-size: 24px;\n      color: #FFF;\n      text-align: center;\n    }\n\n    div {\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      align-items: center;\n      height: 100%;\n    }\n\n    button {\n      width: 122px;\n    }\n  }\n\n  @media (min-width: 943px) {\n    width: 50%;\n    text-align: left;\n  }\n\n  @media (min-width: 481px) {\n    div {\n      ", "\n    }\n  }\n"])), function (props) {
  return props.theme.colors.primary;
}, function (props) {
  var _props$theme;
  return ((_props$theme = props.theme) === null || _props$theme === void 0 ? void 0 : _props$theme.rtl) && (0, _styledComponents.css)(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["\n        text-align: right;\n    "])));
});
exports.TextContent = TextContent;
var Icons = _styledComponents.default.div(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: center;\n  > * {\n    margin: 0px 10px\n  }\n  svg {\n    font-size: 4em;\n    fill: ", ";\n  }\n"])), function (props) {
  return props.theme.colors.primary;
});
exports.Icons = Icons;
var HomeFooter = _styledComponents.default.div(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["\n  font: normal normal normal 128px/160px ", ";\n\n  @media (min-width: 768px) {\n    h2 {\n      font-size: 50px !important;\n    }\n  }\n"])), function (props) {
  return props.theme.fonts.special || 'Georgia';
});
exports.HomeFooter = HomeFooter;
var Line = _styledComponents.default.div(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["\n    position: relative;\n    border: 1px solid red;\n    align-self: center;\n    margin-bottom: 75px !important;\n    transform: rotate(90deg);\n    padding: 0 !important;\n    width: 30px !important;\n    &::after{\n      content: '';\n      position: absolute;\n      border: 3px solid red;\n      transform: translateY(-50%);\n      right: 100%;\n      border-radius: 50%\n    }\n    &::before{\n      content: '';\n      position: absolute;\n      border: 3px solid red;\n      left: 100%;\n      transform: translateY(-50%);\n      border-radius: 50%;\n    }\n    @media (min-width: 790px) {\n      transform: rotate(0deg);\n    }\n"])));
exports.Line = Line;
var SkeletonContainer = _styledComponents.default.div(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column\n"])));
exports.SkeletonContainer = SkeletonContainer;
var SkeletonHeader = _styledComponents.default.div(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["\n  width: 100%;\n  height: 100px;\n  margin: 20px auto;\n"])));
exports.SkeletonHeader = SkeletonHeader;
var SkeletonContent = _styledComponents.default.div(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["\n  width: 100%;\n  height: 500px;\n  display: flex;\n  margin-bottom: 10px;\n"])));
exports.SkeletonContent = SkeletonContent;
var SkeletonInformation = _styledComponents.default.div(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["\n  width: 70%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  margin-right: 10px;\n  ", "\n"])), function (props) {
  var _props$theme2;
  return ((_props$theme2 = props.theme) === null || _props$theme2 === void 0 ? void 0 : _props$theme2.rtl) && (0, _styledComponents.css)(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["\n    margin-left: 10px;\n    margin-right: 0;\n  "])));
});
exports.SkeletonInformation = SkeletonInformation;
var SkeletonSide = _styledComponents.default.div(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["\n  width: 30%;\n  height: 100%;\n  margin-left: 10px;\n  ", "\n"])), function (props) {
  var _props$theme3;
  return ((_props$theme3 = props.theme) === null || _props$theme3 === void 0 ? void 0 : _props$theme3.rtl) && (0, _styledComponents.css)(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["\n    margin-right: 10px;\n    margin-left: 0;\n  "])));
});
exports.SkeletonSide = SkeletonSide;