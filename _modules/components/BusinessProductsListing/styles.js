"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WrapperSearch = exports.WrapperBusinessLogo = exports.WrappLayout = exports.WrapContent = exports.TrackOrderSection = exports.ToTitle = exports.SkeletonItem = exports.ProductsNotFound = exports.ProductsHeader = exports.ProductsContainer = exports.ProductLoading = exports.Preorder = exports.FormInput = exports.DeliveryTime = exports.DeliveryPrice = exports.DeliveryInfo = exports.Container = exports.BusinessLogo = exports.BusinessInfoItem = exports.BusinessInfo = exports.BusinessHeader = exports.BusinessContent = exports.BusinessCartInnerContainer = exports.BusinessCartContainer = exports.ActionsForm = void 0;
var _react = _interopRequireDefault(require("react"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28, _templateObject29, _templateObject30, _templateObject31, _templateObject32, _templateObject33, _templateObject34, _templateObject35, _templateObject36, _templateObject37, _templateObject38, _templateObject39, _templateObject40, _templateObject41, _templateObject42, _templateObject43, _templateObject44, _templateObject45, _templateObject46, _templateObject47, _templateObject48, _templateObject49, _templateObject50;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var Container = _styledComponents.default.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  width: 95%;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n\n  @media (min-width: 1024px) {\n    width: 100%;\n    flex-direction: row;\n  }\n"])));
exports.Container = Container;
var ProductsContainer = _styledComponents.default.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  width: 100%;\n  padding: 0px 0px;\n  box-sizing: border-box;\n  display: flex;\n  justify-content: center;\n\n  @media (min-width: 1024px) {\n    width: calc(100% - 450px);\n    padding: 0px 15px;\n  }\n"])));
exports.ProductsContainer = ProductsContainer;
var BusinessCartContainer = _styledComponents.default.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  width: 100%;\n  padding: 0px 5px 30px 0px;\n  box-sizing: border-box;\n\n  ", "\n\n  @media (min-width: 1024px) {\n    width: 450px;\n    border-top: none;\n    ", "\n  }\n"])), function (props) {
  var _props$theme;
  return ((_props$theme = props.theme) === null || _props$theme === void 0 ? void 0 : _props$theme.rtl) && (0, _styledComponents.css)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n    padding: 0px 20px 30px 10px;\n  "])));
}, function (props) {
  var _props$theme2;
  return (_props$theme2 = props.theme) !== null && _props$theme2 !== void 0 && _props$theme2.rtl ? (0, _styledComponents.css)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n      border-right: 1px solid #CCC;\n    "]))) : (0, _styledComponents.css)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n      border-left: 1px solid #CCC;\n    "])));
});
exports.BusinessCartContainer = BusinessCartContainer;
var BusinessCartInnerContainer = _styledComponents.default.div(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  position: sticky;\n  top: 20px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 100%;\n  box-sizing: border-box;\n\n  > div.cart {\n    border-bottom: none;\n    width: 100%;\n    box-sizing: border-box;\n\n    > div {\n      box-shadow: none;\n    }\n  }\n\n  img {\n    width: 200px;\n  }\n\n  > span {\n    width: 100%;\n  }\n\n  p {\n    color: ", ";\n    margin: 0px 0;\n  }\n\n  @media (min-width: 1024px) {\n    max-height: calc(100vh - 60px);\n    overflow: auto;\n  }\n"])), function (props) {
  var _props$theme$colors;
  return (_props$theme$colors = props.theme.colors) === null || _props$theme$colors === void 0 ? void 0 : _props$theme$colors.darkGray;
});
exports.BusinessCartInnerContainer = BusinessCartInnerContainer;
var WrapContent = _styledComponents.default.div(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  padding: 5px;\n  background: ", ";\n\n  @media (min-width: 381px) {\n    padding: 0px;\n  }\n"])), function (props) {
  return props.theme.colors.backgroundPage;
});
exports.WrapContent = WrapContent;
var WrapperSearch = _styledComponents.default.div(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: left;\n  justify-content: left;\n  width: 100%;\n  margin-top:10px;\n  > div:first-child {\n    ", "\n  }\n\n  input{\n    height: 34px;\n  }\n  .search-bar {\n    width:80%;\n    margin-right: 10px;\n    height: 34px !important;\n    ", "\n  }\n\n  @media (min-width: 768px) {\n    /* width: inherit; */\n  }\n"])), function (props) {
  var _props$theme3;
  return (_props$theme3 = props.theme) !== null && _props$theme3 !== void 0 && _props$theme3.rtl ? (0, _styledComponents.css)(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["\n      margin-left: 15px;\n    "]))) : (0, _styledComponents.css)(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["\n      margin-right: 15px;\n    "])));
}, function (props) {
  var _props$theme4;
  return ((_props$theme4 = props.theme) === null || _props$theme4 === void 0 ? void 0 : _props$theme4.rtl) && (0, _styledComponents.css)(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["\n      margin-left: 10px;\n      margin-right: 0;\n    "])));
});
exports.WrapperSearch = WrapperSearch;
var ProductsNotFound = _styledComponents.default.div(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  width: 80%;\n  height: calc(100vh - 45px);\n  margin: auto;\n\n  h1 {\n    font-size: 20px;\n    opacity: 0.5;\n    text-align: center;\n  }\n\n  @media (min-width: 411px) {\n    h1 {\n      font-size: 24px;\n    }\n  }\n"])));
exports.ProductsNotFound = ProductsNotFound;
var ProductLoading = _styledComponents.default.div(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n"])));
exports.ProductLoading = ProductLoading;
var SkeletonItem = _styledComponents.default.div(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["\n  width: 80%;\n  margin: 30px auto;\n\n  span {\n    margin-bottom: 10px;\n  }\n"])));
exports.SkeletonItem = SkeletonItem;
var WrappLayout = _styledComponents.default.div(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["\n  max-width: 1200px;\n  width: 100%;\n  ", "\n"])), function (_ref) {
  var isCartOnProductsList = _ref.isCartOnProductsList;
  return isCartOnProductsList && (0, _styledComponents.css)(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["\n    display: flex;\n    flex-direction: column;\n\n    .bp-list,\n    .cart {\n      width: 100%;\n    }\n\n    @media (min-width: 870px) {\n      flex-direction: row;\n      .bp-list {\n        width: 55%;\n      }\n      .cart {\n        width: calc(45% - 20px);\n        margin-left: 20px;\n      }\n    }\n\n    @media (min-width: 1024px) {\n      .bp-list {\n        width: 60%;\n      }\n      .cart {\n        width: calc(40% - 20px);\n      }\n    }\n\n    @media (min-width: 1200px) {\n      .bp-list {\n        width: 70%;\n      }\n      .cart {\n        width: calc(30% - 20px);\n      }\n    }\n  "])));
});
exports.WrappLayout = WrappLayout;
var ProductsHeader = _styledComponents.default.div(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  align-items: flex-end;\n  margin: 0px;\n"])));
exports.ProductsHeader = ProductsHeader;
var DeliveryInfo = _styledComponents.default.div(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["\n  border: 1px solid #E7E7E7;\n  box-sizing: border-box;\n  border-radius: 8px;\n  padding: 0px 0;\n  display: flex;\n  width: 100%;\n  max-width: 520px;\n  min-width: 300px;\n  ", "\n  box-sizing: border-box;\n  ", "\n"])), function (_ref2) {
  var isDelivery = _ref2.isDelivery;
  return !isDelivery && (0, _styledComponents.css)(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["\n    max-width: 370px;\n    min-width: 310px;\n  "])));
}, function (props) {
  var _props$theme5;
  return (_props$theme5 = props.theme) !== null && _props$theme5 !== void 0 && _props$theme5.rtl ? (0, _styledComponents.css)(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["\n    margin-left: 10px;\n  "]))) : (0, _styledComponents.css)(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["\n    margin-right: 10px;\n  "])));
});
exports.DeliveryInfo = DeliveryInfo;
var DeliveryTime = _styledComponents.default.div(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 0 10px;\n  width: 100%;\n  background-color:#ffffff9c;\n  h2,\n  p {\n    margin: 0px;\n  }\n\n  h2 {\n    font-size: 16px;\n  }\n\n  p {\n    font-size: 14px;\n  text-align: center;\n    color: ", ";\n  }\n  @media (max-width: 490px) {\n    h2 {\n      font-size: 11px;\n    }\n    p {\n      font-size: 11px;\n    }\n  }\n"])), function (props) {
  return props.theme.colors.darkGray;
});
exports.DeliveryTime = DeliveryTime;
var Preorder = _styledComponents.default.div(_templateObject24 || (_templateObject24 = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 0 10px;\n  width: 106%;\n  border-left: 1px solid #E7E7E7;\n  background-color:#ffffff9c;\n  h2,\n  p {\n    margin: 0px;\n  }\n\n  h2 {\n    font-size: 14px;\n    svg{\n      display:none;\n    }\n  }\n\n  p {\n    font-size: 13px;\n  text-align: center;\n    color: ", ";\n  }\n  @media (max-width: 490px) {\n    h2 {\n      font-size: 9px;\n    }\n    p {\n      font-size: 12px;\n    }\n  }\n"])), function (props) {
  return props.theme.colors.darkGray;
});
exports.Preorder = Preorder;
var DeliveryPrice = (0, _styledComponents.default)(DeliveryTime)(_templateObject25 || (_templateObject25 = _taggedTemplateLiteral(["\n  width: 54%;\n  background-color:#ffffff9c;\n  ", "\n  @media (max-width: 490px) {\n    h2 {\n      font-size: 11px;\n    }\n    p {\n      font-size: 11px;\n    }\n  }\n"])), function (props) {
  var _props$theme6;
  return (_props$theme6 = props.theme) !== null && _props$theme6 !== void 0 && _props$theme6.rtl ? (0, _styledComponents.css)(_templateObject26 || (_templateObject26 = _taggedTemplateLiteral(["\n    border-left: 1px solid #E7E7E7;\n  "]))) : (0, _styledComponents.css)(_templateObject27 || (_templateObject27 = _taggedTemplateLiteral(["\n    border-right: 1px solid #E7E7E7;\n  "])));
});
exports.DeliveryPrice = DeliveryPrice;
var ToTitle = _styledComponents.default.span(_templateObject28 || (_templateObject28 = _taggedTemplateLiteral(["\n  color: #191919;\n  text-transform: lowercase;\n  ", "\n"])), function (_ref3) {
  var home = _ref3.home;
  return home && (0, _styledComponents.css)(_templateObject29 || (_templateObject29 = _taggedTemplateLiteral(["\n    color: #FFF;\n  "])));
});
exports.ToTitle = ToTitle;
var BusinessHeader = _styledComponents.default.div(_templateObject30 || (_templateObject30 = _taggedTemplateLiteral(["\n  display: flex;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n  position: relative;\n  max-height: 170px;\n  height: 170px;\n  background-repeat: no-repeat, repeat;\n  background-size: cover;\n  object-fit: cover;\n  background-position: center;\n  min-height: 170px;\n  justify-content: center;\n  align-items: flex-end;\n  border-radius: 5px;\n\n  ", "\n\n  ", "\n\n  ", "\n\n  h1 {\n    color: #FFF;\n    opacity: 0.5;\n    position: absolute;\n    top: 0;\n    right: 0;\n    margin: 0 10px;\n    padding: 0;\n  }\n\n  @media (min-width: 490px) {\n    justify-content: flex-start;\n  }\n\n  @media (min-width: 768px) {\n    max-height: 180px;\n    height: 180px;\n  }\n"])), function (props) {
  return props.isSkeleton && (0, _styledComponents.css)(_templateObject31 || (_templateObject31 = _taggedTemplateLiteral(["\n    background-color: #F8F8F8;\n  "])));
}, function (props) {
  return props.bgimage && !props.isClosed && (0, _styledComponents.css)(_templateObject32 || (_templateObject32 = _taggedTemplateLiteral(["\n    background-image: url(", ");\n  "])), props.bgimage);
}, function (props) {
  return props.bgimage && props.isClosed && (0, _styledComponents.css)(_templateObject33 || (_templateObject33 = _taggedTemplateLiteral(["\n    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(", ");\n  "])), props.bgimage);
});
exports.BusinessHeader = BusinessHeader;
var WrapperBusinessLogo = _styledComponents.default.div(_templateObject34 || (_templateObject34 = _taggedTemplateLiteral(["\n  max-width: 60px;\n  max-height: 45px;\n  height: 45px;\n  width: 60px;\n  ", "\n\n  span {\n    border-radius: 15%;\n  }\n\n  @media (min-width: 768px) {\n    ", "\n  }\n"])), function (props) {
  var _props$theme7;
  return (_props$theme7 = props.theme) !== null && _props$theme7 !== void 0 && _props$theme7.rtl ? (0, _styledComponents.css)(_templateObject35 || (_templateObject35 = _taggedTemplateLiteral(["\n    right: 25px;\n  "]))) : (0, _styledComponents.css)(_templateObject36 || (_templateObject36 = _taggedTemplateLiteral(["\n    left: 25px;\n  "])));
}, function (props) {
  var _props$theme8;
  return (_props$theme8 = props.theme) !== null && _props$theme8 !== void 0 && _props$theme8.rtl ? (0, _styledComponents.css)(_templateObject37 || (_templateObject37 = _taggedTemplateLiteral(["\n      right: 45px;\n    "]))) : (0, _styledComponents.css)(_templateObject38 || (_templateObject38 = _taggedTemplateLiteral(["\n      left: 45px;\n    "])));
});
exports.WrapperBusinessLogo = WrapperBusinessLogo;
var BusinessLogo = function BusinessLogo(props) {
  var style = {};
  if (props.bgimage) {
    style.backgroundImage = "url(".concat(props.bgimage, ")");
  }
  return /*#__PURE__*/_react.default.createElement(BusinessLogoStyled, _extends({}, props, {
    style: style
  }), props.children);
};
exports.BusinessLogo = BusinessLogo;
var BusinessLogoStyled = _styledComponents.default.div(_templateObject39 || (_templateObject39 = _taggedTemplateLiteral(["\n  display: flex;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n  position: relative;\n  background-repeat: no-repeat, repeat;\n  background-size: cover;\n  object-fit: cover;\n  background-position: center;\n  min-height: 45px;\n  border-radius: 15%;\n  box-shadow: 0px 3px 6px #00000029;\n  margin-top:10px;\n  @media (min-width: 900px) {\n    margin-top:0px;\n  }\n"])));
var BusinessContent = _styledComponents.default.div(_templateObject40 || (_templateObject40 = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction:row;\n  background-color: #FFF;\n  border-radius: 10px;\n  padding: 10px 10px;\n  max-height: 90px;\n  width:70%;\n"])));
exports.BusinessContent = BusinessContent;
var BusinessInfo = _styledComponents.default.div(_templateObject41 || (_templateObject41 = _taggedTemplateLiteral(["\n  display: flex;\n  width: 100%;\n"])));
exports.BusinessInfo = BusinessInfo;
var BusinessInfoItem = _styledComponents.default.div(_templateObject42 || (_templateObject42 = _taggedTemplateLiteral(["\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  ", "\n\n  div {\n    font-size: 14px;\n    display: flex;\n\n    span {\n      margin: 0 5px;\n    }\n\n    h5 {\n      font-weight: 300;\n      svg{\n        margin-bottom: 1px;\n      }\n    }\n\n    h5,\n    p {\n      display: flex;\n      flex-wrap: wrap;\n      align-items: center;\n      margin: 5px;\n      overflow: hidden;\n      /* white-space: nowrap; */\n      text-overflow: ellipsis;\n      color: ", ";\n\n      svg {\n        margin-right: 4px;\n\n        ", "\n\n        &.popup {\n          color: ", ";\n          cursor: pointer;\n          transform: rotate(180deg);\n        }\n      }\n\n      &.bold {\n        font-weight: 600;\n        font-size: 4vw;\n        color: #191919;\n      }\n\n\n  @media (min-width: 900px) {\n    &.bold {\n      font-weight: 600;\n      font-size: 23px;\n      color: #191919;\n    }\n  }\n\n      &.type {\n        font-weight: 300;\n      }\n\n      ", "\n    }\n\n    @media (min-width: 481px) {\n      font-size: 16px;\n      width: 100%;\n    }\n    @media (min-width: 768px) {\n      font-size: 11px;\n      width: 100%;\n    }\n    @media (min-width: 1024px) {\n      font-size: 13px;\n      width: 100%;\n    }\n  }\n"])), function (props) {
  var _props$theme9;
  return ((_props$theme9 = props.theme) === null || _props$theme9 === void 0 ? void 0 : _props$theme9.rtl) && (0, _styledComponents.css)(_templateObject43 || (_templateObject43 = _taggedTemplateLiteral(["\n    padding: 0px 16px 0px 5px;\n  "])));
}, function (props) {
  return props.theme.colors.darkGray;
}, function (props) {
  var _props$theme10;
  return ((_props$theme10 = props.theme) === null || _props$theme10 === void 0 ? void 0 : _props$theme10.rtl) && (0, _styledComponents.css)(_templateObject44 || (_templateObject44 = _taggedTemplateLiteral(["\n          margin-left: 4px;\n          margin-right: 0px;\n        "])));
}, function (props) {
  return props.theme.colors.primary;
}, function (props) {
  var _props$theme11;
  return (_props$theme11 = props.theme) !== null && _props$theme11 !== void 0 && _props$theme11.rtl ? (0, _styledComponents.css)(_templateObject45 || (_templateObject45 = _taggedTemplateLiteral(["\n        margin-left: 15px;\n      "]))) : (0, _styledComponents.css)(_templateObject46 || (_templateObject46 = _taggedTemplateLiteral(["\n        margin-right: 15px;\n      "])));
});
exports.BusinessInfoItem = BusinessInfoItem;
var FormInput = _styledComponents.default.form(_templateObject47 || (_templateObject47 = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 100%;\n  margin: 0 auto;\n  input.form {\n    padding: 10px 15px;\n    width: 100%;\n    margin-bottom: 20px;\n    box-sizing: border-box;\n    &:disabled {\n      background-color: rgba(239, 239, 239, 0.3);\n      cursor: not-allowed;\n    }\n  }\n  button {\n    width: 100%;\n    padding: 7px 0;\n  }\n  @media (min-width: 769px) {\n    flex-wrap: wrap;\n    flex-direction: row;\n    justify-content: space-between;\n    input.form {\n      width: 49%;\n    }\n  }\n"])));
exports.FormInput = FormInput;
var ActionsForm = _styledComponents.default.div(_templateObject48 || (_templateObject48 = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n\n  button {\n    flex: 1;\n    margin-top: 10px;\n    padding: 7px 0px;\n    width: 49%;\n    box-sizing: border-box;\n\n    &:disabled {\n      cursor: not-allowed;\n    }\n\n    &:nth-child(2) {\n      margin-left: 10px;\n    }\n  }\n\n  ", "\n"])), function (props) {
  var _props$theme12;
  return ((_props$theme12 = props.theme) === null || _props$theme12 === void 0 ? void 0 : _props$theme12.rtl) && (0, _styledComponents.css)(_templateObject49 || (_templateObject49 = _taggedTemplateLiteral(["\n    button {\n      &:nth-child(1) {\n        margin-right: 0px;\n      }\n      &:last-child {\n        margin-right: 5px;\n      }\n    }\n  "])));
});
exports.ActionsForm = ActionsForm;
var TrackOrderSection = _styledComponents.default.div(_templateObject50 || (_templateObject50 = _taggedTemplateLiteral(["\nwidth: 20%;\n\nmargin: 10px;\ncursor: pointer;\nfont-size:4vw;\nfont-weight: 500;\n\n@media (min-width: 425px) {\n  margin: 20px;\n  font-size:17px;\n}\n"])));
exports.TrackOrderSection = TrackOrderSection;