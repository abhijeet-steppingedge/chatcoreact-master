"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Checkout = void 0;
var _react = _interopRequireWildcard(require("react"));
var _VscWarning = _interopRequireDefault(require("@meronex/icons/vsc/VscWarning"));
var _BsInfoCircle = _interopRequireDefault(require("@meronex/icons/bs/BsInfoCircle"));
var _BsChevronDown = _interopRequireDefault(require("@meronex/icons/bs/BsChevronDown"));
var _BsChevronUp = _interopRequireDefault(require("@meronex/icons/bs/BsChevronUp"));
var _reactLoadingSkeleton = _interopRequireDefault(require("react-loading-skeleton"));
var _styledComponents = require("styled-components");
var _orderingComponents = require("ordering-components");
var _Checkout = require("../../controllers/Checkout");
var _orderingUi = require("ordering-ui");
var _libphonenumberJs = _interopRequireDefault(require("libphonenumber-js"));
var _Buttons = require("../styles/Buttons");
var _AddressDetails = require("../AddressDetails");
var _UserDetails = require("../UserDetails");
var _PaymentOptions = require("../PaymentOptions");
var _Cart = _interopRequireDefault(require("../Cart"));
var _OrderTypeSelectorHeader = require("../OrderTypeSelectorHeader");
var _CouponControl = require("../CouponControl");
var _Inputs = require("../styles/Inputs");
var _Select = require("../styles/Select");
var _moment = _interopRequireDefault(require("moment"));
var _utils = require("../../utils");
var _BiArrowBack = _interopRequireDefault(require("@meronex/icons/bi/BiArrowBack"));
var _styles = require("./styles");
var _reactRedux = require("react-redux");
var _config = _interopRequireDefault(require("../../config.json"));
var _reactRouterDom = require("react-router-dom");
var _validationFields = _interopRequireDefault(require("../../validationFields"));
var _OrderSuccessModal = require("../OrderSuccessModal");
var _Checkbox = require("../styles/Checkbox");
var _FaWhatsapp = _interopRequireDefault(require("@meronex/icons/fa/FaWhatsapp"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var mapConfigs = {
  mapZoom: 16,
  mapSize: {
    width: 640,
    height: 190
  }
};
var CUSTOMER_JSON = {
  id: -1,
  name: '',
  lastname: '',
  email: '',
  cellphone: '',
  address: '',
  location: '',
  internal_number: '',
  zipcode: '',
  tag: 'DineIn'
};
var CheckoutUI = function CheckoutUI(props) {
  var _validationFields$fie, _validationFields$fie2, _validationFields$fie3, _configState$configs, _configState$configs$, _configState$configs2, _configState$configs3, _configState$configs4, _configState$configs5, _configState$configs6, _configState$configs7, _props$beforeElements, _props$beforeComponen, _props$beforeElements2, _props$beforeComponen2, _theme$images, _theme$images$dummies, _configState$configs8, _configState$configs9, _options$address10, _props$beforeElements3, _props$beforeComponen3, _props$beforeElements4, _props$beforeComponen4, _Object$values, _businessDetails$erro, _businessDetails$erro2, _props$beforeElements5, _props$beforeComponen5, _props$beforeElements6, _props$beforeComponen6, _props$beforeElements7, _props$beforeComponen7, _props$beforeElements8, _props$beforeComponen8, _configState$configs10, _configState$configs11, _configState$configs12, _configState$configs13, _options$address11, _openTaxModal$data, _openTaxModal$data2, _openTaxModal$data3, _openTaxModal$data$fi, _openTaxModal$data4, _openTaxModal$data5, _props$afterComponent, _props$afterElements;
  var errors = props.errors,
    cartState = props.cartState,
    paymethodSelected = props.paymethodSelected,
    handlePaymethodChange = props.handlePaymethodChange,
    handleOrderRedirect = props.handleOrderRedirect,
    isCustomerMode = props.isCustomerMode,
    isResetPaymethod = props.isResetPaymethod,
    setIsResetPaymethod = props.setIsResetPaymethod,
    commentState = props.commentState;
  var shop = (0, _reactRedux.useSelector)(function (state) {
    return state.shop;
  });
  var cart = shop.cart;
  var businessDetails = shop === null || shop === void 0 ? void 0 : shop.business;
  var theme = (0, _styledComponents.useTheme)();
  var _useOrder = (0, _orderingComponents.useOrder)(),
    _useOrder2 = _slicedToArray(_useOrder, 1),
    options = _useOrder2[0].options;
  var _useOrder3 = (0, _orderingComponents.useOrder)(),
    _useOrder4 = _slicedToArray(_useOrder3, 1),
    orderState = _useOrder4[0];
  var _useLanguage = (0, _orderingComponents.useLanguage)(),
    _useLanguage2 = _slicedToArray(_useLanguage, 2),
    t = _useLanguage2[1];
  var _useUtils = (0, _orderingComponents.useUtils)(),
    _useUtils2 = _slicedToArray(_useUtils, 1),
    _useUtils2$ = _useUtils2[0],
    parsePrice = _useUtils2$.parsePrice,
    optimizeImage = _useUtils2$.optimizeImage,
    parseNumber = _useUtils2$.parseNumber;
  var userFromLocal = localStorage.getItem('user');
  var user = userFromLocal ? JSON.parse(userFromLocal) : null;
  var _useConfig = (0, _orderingComponents.useConfig)(),
    _useConfig2 = _slicedToArray(_useConfig, 1),
    configState = _useConfig2[0];
  var _useCustomer = (0, _orderingComponents.useCustomer)(),
    _useCustomer2 = _slicedToArray(_useCustomer, 1),
    customerState = _useCustomer2[0];
  var _useApi = (0, _orderingComponents.useApi)(),
    _useApi2 = _slicedToArray(_useApi, 1),
    ordering = _useApi2[0];
  var history = (0, _reactRouterDom.useHistory)();
  var dispatch = (0, _reactRedux.useDispatch)();
  var isCouponEnabled = _validationFields.default === null || _validationFields.default === void 0 ? void 0 : (_validationFields$fie = _validationFields.default.fields) === null || _validationFields$fie === void 0 ? void 0 : (_validationFields$fie2 = _validationFields$fie.checkout) === null || _validationFields$fie2 === void 0 ? void 0 : (_validationFields$fie3 = _validationFields$fie2.coupon) === null || _validationFields$fie3 === void 0 ? void 0 : _validationFields$fie3.enabled;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    errorCash = _useState2[0],
    setErrorCash = _useState2[1];
  var _useState3 = (0, _react.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    userErrors = _useState4[0],
    setUserErrors = _useState4[1];
  var _useState5 = (0, _react.useState)({
      open: false,
      content: []
    }),
    _useState6 = _slicedToArray(_useState5, 2),
    alertState = _useState6[0],
    setAlertState = _useState6[1];
  var _useState7 = (0, _react.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    isUserDetailsEdit = _useState8[0],
    setIsUserDetailsEdit = _useState8[1];
  var _useState9 = (0, _react.useState)(false),
    _useState10 = _slicedToArray(_useState9, 2),
    updatingUser = _useState10[0],
    setUpdatingUser = _useState10[1];
  var _useState11 = (0, _react.useState)(false),
    _useState12 = _slicedToArray(_useState11, 2),
    isValid = _useState12[0],
    setIsValid = _useState12[1];
  var _useState13 = (0, _react.useState)({
      open: false,
      data: null
    }),
    _useState14 = _slicedToArray(_useState13, 2),
    openTaxModal = _useState14[0],
    setOpenTaxModal = _useState14[1];
  var _useState15 = (0, _react.useState)(true),
    _useState16 = _slicedToArray(_useState15, 2),
    isShow = _useState16[0],
    setIsShow = _useState16[1];
  var _useState17 = (0, _react.useState)(false),
    _useState18 = _slicedToArray(_useState17, 2),
    placing = _useState18[0],
    setPlacing = _useState18[1];
  var _useState19 = (0, _react.useState)([]),
    _useState20 = _slicedToArray(_useState19, 2),
    tableNumbers = _useState20[0],
    setTableNumbers = _useState20[1];
  var _useState21 = (0, _react.useState)(null),
    _useState22 = _slicedToArray(_useState21, 2),
    selectedTableNumber = _useState22[0],
    setSelectedTableNumber = _useState22[1];
  var _useState23 = (0, _react.useState)(false),
    _useState24 = _slicedToArray(_useState23, 2),
    openOrderSuccessModal = _useState24[0],
    setOpenOrderSuccessModal = _useState24[1];
  var _useState25 = (0, _react.useState)(false),
    _useState26 = _slicedToArray(_useState25, 2),
    agreed = _useState26[0],
    setAgreed = _useState26[1];
  var _useState27 = (0, _react.useState)(''),
    _useState28 = _slicedToArray(_useState27, 2),
    comments = _useState28[0],
    handleChangeComment = _useState28[1];
  var _useState29 = (0, _react.useState)({}),
    _useState30 = _slicedToArray(_useState29, 2),
    newCreatedOrder = _useState30[0],
    setNewCreatedOrder = _useState30[1];
  var _useState31 = (0, _react.useState)({}),
    _useState32 = _slicedToArray(_useState31, 2),
    deliveryPrice = _useState32[0],
    setDeliveryPrice = _useState32[1];
  var configTypes = ((_configState$configs = configState.configs) === null || _configState$configs === void 0 ? void 0 : (_configState$configs$ = _configState$configs.order_types_allowed) === null || _configState$configs$ === void 0 ? void 0 : _configState$configs$.value.split('|').map(function (value) {
    return Number(value);
  })) || [];
  var _useState33 = (0, _react.useState)({
      isGetting: false,
      configTypes: configTypes
    }),
    _useState34 = _slicedToArray(_useState33, 2),
    customConfigTypes = _useState34[0],
    setCustomConfigTypes = _useState34[1];
  var driverTipsOptions = typeof ((_configState$configs2 = configState.configs) === null || _configState$configs2 === void 0 ? void 0 : (_configState$configs3 = _configState$configs2.driver_tip_options) === null || _configState$configs3 === void 0 ? void 0 : _configState$configs3.value) === 'string' ? JSON.parse((_configState$configs4 = configState.configs) === null || _configState$configs4 === void 0 ? void 0 : (_configState$configs5 = _configState$configs4.driver_tip_options) === null || _configState$configs5 === void 0 ? void 0 : _configState$configs5.value) || [] : ((_configState$configs6 = configState.configs) === null || _configState$configs6 === void 0 ? void 0 : (_configState$configs7 = _configState$configs6.driver_tip_options) === null || _configState$configs7 === void 0 ? void 0 : _configState$configs7.value) || [];
  var getCustomConfigTypes = function getCustomConfigTypes(menus) {
    if (Object.keys(menus).length === 0) return;
    var array = [];
    setCustomConfigTypes({
      isGetting: true,
      configTypes: configTypes
    });
    menus.forEach(function (menu) {
      if (menu.enabled) {
        if (menu.delivery && !array.includes(1)) {
          array.push(1);
        }
        if (menu.pickup && !array.includes(2)) {
          array.push(2);
        }
        if (menu.eatin && !array.includes(3)) {
          array.push(3);
        }
        if (menu.curbside && !array.includes(4)) {
          array.push(4);
        }
        if (menu.driver_thru && !array.includes(5)) {
          array.push(5);
        }
      }
    });
    setCustomConfigTypes({
      isGetting: false,
      configTypes: array
    });
  };
  var getCloseTime = function getCloseTime(today) {
    if (today.enabled) {
      var index = Object.keys(today.lapses).length - 1;
      var lapse = today.lapses[index];
      var closeTime = "".concat(lapse.close.hour, ":").concat(lapse.close.minute);
      return (0, _moment.default)(closeTime, "HH:mm");
    }
    return (0, _moment.default)().add('minutes', 10);
  };
  var handlerClickPlaceOrder = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var _paymethodSelected$da, _options$address6, _response$data, _response$data4;
      var closeTime, formattedProducts, _options$address, _options$address2, _options$address3, _options$address4, _options$address5, body, _paymethodSelected$da2, _paymethodSelected$pa, _totalPrice, raw, _response, pay_data, _yield$ordering$order, response, _response$data2, _response$data3, order;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            closeTime = getCloseTime(businessDetails === null || businessDetails === void 0 ? void 0 : businessDetails.today);
            if (!closeTime.isBefore()) {
              _context.next = 4;
              break;
            }
            setAlertState({
              open: true,
              content: [t('BUSINESS_CLOSED_AT_THE_MOMENT', 'Business is Closed at the moment!')]
            });
            return _context.abrupt("return");
          case 4:
            _context.next = 6;
            return formatProducts(cart);
          case 6:
            formattedProducts = _context.sent;
            setPlacing(true);
            if (options.type == 3) {
              user = CUSTOMER_JSON;
              user['internal_number'] = selectedTableNumber;
              user['address'] = businessDetails.address;
              user['location'] = businessDetails.location;
              user['zipcode'] = businessDetails.zipcode;
            } else {
              user['address'] = options === null || options === void 0 ? void 0 : (_options$address = options.address) === null || _options$address === void 0 ? void 0 : _options$address.address;
              user['location'] = options === null || options === void 0 ? void 0 : (_options$address2 = options.address) === null || _options$address2 === void 0 ? void 0 : _options$address2.location;
              user['zipcode'] = options === null || options === void 0 ? void 0 : (_options$address3 = options.address) === null || _options$address3 === void 0 ? void 0 : _options$address3.zipcode;
              user['address_notes'] = options === null || options === void 0 ? void 0 : (_options$address4 = options.address) === null || _options$address4 === void 0 ? void 0 : _options$address4.address_notes;
              user['internal_number'] = options === null || options === void 0 ? void 0 : (_options$address5 = options.address) === null || _options$address5 === void 0 ? void 0 : _options$address5.internal_number;
            }
            body = {
              'paymethod_id': paymethodSelected.id,
              'pay_data': paymethodSelected === null || paymethodSelected === void 0 ? void 0 : (_paymethodSelected$da = paymethodSelected.data) === null || _paymethodSelected$da === void 0 ? void 0 : _paymethodSelected$da.id,
              'business_id': businessDetails.id,
              'customer_id': _config.default.ordering_customer.id,
              'delivery_datetime': options.moment ? _moment.default.utc(options.moment).local().format('YYYY-MM-DD HH:mm:ss') : (0, _moment.default)().format('YYYY-MM-DD HH:mm:ss'),
              'delivery_type': options.type,
              'location': options.address.address == '' || Object.keys(options.address).length > 0 ? options === null || options === void 0 ? void 0 : (_options$address6 = options.address) === null || _options$address6 === void 0 ? void 0 : _options$address6.location : businessDetails.location,
              'products': JSON.stringify(formattedProducts),
              'customer': user,
              'comment': comments
            };
            if (!(paymethodSelected.id == 28)) {
              _context.next = 24;
              break;
            }
            _totalPrice = (shop === null || shop === void 0 ? void 0 : shop.totalPrice) + getIncludedTaxes() + getServiceFee() + (shop === null || shop === void 0 ? void 0 : shop.serviceFeePrice) + (businessDetails !== null && businessDetails !== void 0 && businessDetails.delivery_price ? businessDetails.delivery_price : 0) - (shop === null || shop === void 0 ? void 0 : shop.offerPrice) >= 0 ? (shop === null || shop === void 0 ? void 0 : shop.totalPrice) + getIncludedTaxes() + getServiceFee() + (businessDetails !== null && businessDetails !== void 0 && businessDetails.delivery_price ? businessDetails.delivery_price : 0) - (shop === null || shop === void 0 ? void 0 : shop.offerPrice) : 0;
            raw = JSON.stringify({
              "source_id": paymethodSelected === null || paymethodSelected === void 0 ? void 0 : (_paymethodSelected$da2 = paymethodSelected.data) === null || _paymethodSelected$da2 === void 0 ? void 0 : _paymethodSelected$da2.id,
              "customer": JSON.stringify(user),
              "amount": _totalPrice,
              "subtotal": shop === null || shop === void 0 ? void 0 : shop.totalPrice,
              "gateway": paymethodSelected === null || paymethodSelected === void 0 ? void 0 : (_paymethodSelected$pa = paymethodSelected.paymethod) === null || _paymethodSelected$pa === void 0 ? void 0 : _paymethodSelected$pa.gateway,
              "currency": "SGD",
              "description": "Order to ".concat(businessDetails === null || businessDetails === void 0 ? void 0 : businessDetails.name, ": Order Details: Subtotal: ").concat(parsePrice(shop === null || shop === void 0 ? void 0 : shop.totalPrice), " Delivery Fee: ").concat(parsePrice(businessDetails !== null && businessDetails !== void 0 && businessDetails.delivery_price ? businessDetails.delivery_price : 0), " Packing Charges: ").concat(parsePrice(getServiceFee() || 0), " Discount: -").concat(parsePrice((shop === null || shop === void 0 ? void 0 : shop.offerPrice) || 0), " Total: ").concat(parsePrice(_totalPrice)),
              "business_id": businessDetails.id
            });
            _context.next = 15;
            return fetch("".concat(_config.default.api.url, "/").concat(_config.default.api.version, "/").concat(_config.default.api.language, "/").concat(_config.default.project, "/payments/stripe_direct"), {
              method: 'POST',
              headers: {
                "x-api-key": _config.default.api.key,
                "Content-Type": "application/json"
              },
              body: raw
            });
          case 15:
            _response = _context.sent;
            _context.next = 18;
            return _response.json();
          case 18:
            pay_data = _context.sent;
            if (!pay_data.error) {
              _context.next = 23;
              break;
            }
            setPlacing(false);
            setAlertState({
              open: true,
              content: pay_data === null || pay_data === void 0 ? void 0 : pay_data.result
            });
            return _context.abrupt("return");
          case 23:
            body.pay_data = pay_data === null || pay_data === void 0 ? void 0 : pay_data.result;
          case 24:
            if (shop.offerId) {
              body.offer_id = shop.offerId;
            }
            if (businessDetails.delivery_zone) {
              body.delivery_zone_id = businessDetails.delivery_zone;
            }
            _context.next = 28;
            return ordering.orders().save(body);
          case 28:
            _yield$ordering$order = _context.sent;
            response = _yield$ordering$order.response;
            setPlacing(false);
            if (!(response !== null && response !== void 0 && (_response$data = response.data) !== null && _response$data !== void 0 && _response$data.error)) {
              _context.next = 35;
              break;
            }
            setAlertState({
              open: true,
              content: response === null || response === void 0 ? void 0 : (_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.result
            });
            console.log('error while creating order', response === null || response === void 0 ? void 0 : (_response$data3 = response.data) === null || _response$data3 === void 0 ? void 0 : _response$data3.result);
            return _context.abrupt("return");
          case 35:
            order = response === null || response === void 0 ? void 0 : (_response$data4 = response.data) === null || _response$data4 === void 0 ? void 0 : _response$data4.result;
            setNewCreatedOrder(order);
            localStorage.removeItem('user');
          case 38:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function handlerClickPlaceOrder() {
      return _ref.apply(this, arguments);
    };
  }();
  var handlePlaceOrder = function handlePlaceOrder() {
    if (!userErrors.length) {
      handlerClickPlaceOrder && handlerClickPlaceOrder();
      return;
    }
    setAlertState({
      open: true,
      content: Object.values(userErrors).map(function (error) {
        return error;
      })
    });
    setIsUserDetailsEdit(true);
  };
  var closeAlert = function closeAlert() {
    setAlertState({
      open: false,
      content: []
    });
    setIsUserDetailsEdit(false);
  };
  var checkValidationFields = function checkValidationFields() {
    var _validationFields$fie4, _validationFields$fie5, _validationFields$fie6, _validationFields$fie7, _validationFields$fie8, _validationFields$fie9, _validationFields$fie10;
    setUserErrors([]);
    var errors = [];
    var notFields = ['coupon', 'driver_tip', 'mobile_phone', 'address', 'zipcode', 'address_notes', options.type != 3 ? 'table_no' : ''];
    var userFromLocal = localStorage.getItem('user');
    var newUser = userFromLocal ? JSON.parse(userFromLocal) : user;
    var userSelected = newUser;
    Object.values(_validationFields.default === null || _validationFields.default === void 0 ? void 0 : (_validationFields$fie4 = _validationFields.default.fields) === null || _validationFields$fie4 === void 0 ? void 0 : _validationFields$fie4.checkout).map(function (field) {
      if (field !== null && field !== void 0 && field.enabled && field !== null && field !== void 0 && field.required && !notFields.includes(field.code)) {
        if (userSelected && !userSelected[field === null || field === void 0 ? void 0 : field.code]) {
          var _field$code;
          errors.push(t("VALIDATION_ERROR_".concat(field !== null && field !== void 0 && field.code ? field === null || field === void 0 ? void 0 : (_field$code = field.code) === null || _field$code === void 0 ? void 0 : _field$code.toUpperCase() : '', "_REQUIRED"), "The field ".concat(field === null || field === void 0 ? void 0 : field.name, " is required")));
        }
      }
    });
    if (userSelected && !(userSelected !== null && userSelected !== void 0 && userSelected.cellphone) && _validationFields.default !== null && _validationFields.default !== void 0 && (_validationFields$fie5 = _validationFields.default.fields) !== null && _validationFields$fie5 !== void 0 && (_validationFields$fie6 = _validationFields$fie5.checkout) !== null && _validationFields$fie6 !== void 0 && (_validationFields$fie7 = _validationFields$fie6.cellphone) !== null && _validationFields$fie7 !== void 0 && _validationFields$fie7.enabled && _validationFields.default !== null && _validationFields.default !== void 0 && (_validationFields$fie8 = _validationFields.default.fields) !== null && _validationFields$fie8 !== void 0 && (_validationFields$fie9 = _validationFields$fie8.checkout) !== null && _validationFields$fie9 !== void 0 && (_validationFields$fie10 = _validationFields$fie9.cellphone) !== null && _validationFields$fie10 !== void 0 && _validationFields$fie10.required) {
      errors.push(t('VALIDATION_ERROR_MOBILE_PHONE_REQUIRED', 'The field Phone number is required'));
    }
    if (!userSelected && options.type != 3) {
      errors.push(t('INVALID_CUSTOMER_FIELDS', 'Invalid Customer Fields'));
    }
    if (!selectedTableNumber && options.type === 3) {
      errors.push(t('TABLE_NUMBER_IS_REQUIRED_FOR_EAT_IN', 'Table number is required for Eat In'));
    }
    if (!agreed) {
      errors.push(t('AGREE_TO_TERMS_AND_CONDITIONS', 'Please Accept Terms and Conditions'));
    }
    if (userSelected && userSelected !== null && userSelected !== void 0 && userSelected.cellphone) {
      if (userSelected !== null && userSelected !== void 0 && userSelected.country_phone_code) {
        var phone = null;
        phone = "+".concat(userSelected === null || userSelected === void 0 ? void 0 : userSelected.country_phone_code).concat(userSelected === null || userSelected === void 0 ? void 0 : userSelected.cellphone);
        var phoneNumber = (0, _libphonenumberJs.default)(phone);
        if (!(phoneNumber !== null && phoneNumber !== void 0 && phoneNumber.isValid())) {
          errors.push(t('VALIDATION_ERROR_MOBILE_PHONE_INVALID', 'The field Phone number is invalid.'));
        }
      } else {
        errors.push(t('INVALID_ERROR_COUNTRY_CODE_PHONE_NUMBER', 'The country code of the phone number is invalid'));
      }
    }
    setUserErrors(errors);
  };
  var handleCloseOrderSuccessModal = function handleCloseOrderSuccessModal() {
    setOpenOrderSuccessModal(false);
    dispatch({
      type: 'EMPTY_CART'
    });
  };
  var formatTableNumbers = function formatTableNumbers(tabNos) {
    var arr = [];
    var testArray = [];
    if (tabNos !== undefined) {
      var tablenumbersArr = tabNos.split(',');
      tablenumbersArr.forEach(function (no) {
        testArray[no] = no;
      });
    }
    Object.values(testArray).forEach(function (no) {
      var newObject = {
        'value': no,
        'content': no
      };
      arr.push(newObject);
    });
    setTableNumbers(arr);
  };
  var formatIngredients = function formatIngredients(ingredients, selected_ingredients) {
    var array = [];
    if (Object.keys(selected_ingredients).length > 0) {
      var keys = Object.keys(selected_ingredients);
      var values = Object.values(selected_ingredients);
      var ing_values = Object.values(ingredients);
      keys.forEach(function (ing, index) {
        var id = ing.split(':')[1];
        var name = ing_values[index].name;
        if (!values[index].selected) {
          array.push(Number(id));
        }
      });
    }
    return array;
  };
  var formatOptions = function formatOptions(options) {
    var array = [];
    if (Object.keys(options).length > 0) {
      var values = Object.values(options);
      values.forEach(function (option, index) {
        var id = option.id;
        var suboptions = formatSuboptions(option.suboptions);
        var obj = {
          id: id,
          suboptions: suboptions
        };
        array.push(obj);
      });
    }
    return array;
  };
  var formatSuboptions = function formatSuboptions(suboptions) {
    var array = [];
    suboptions = Object.values(suboptions);
    suboptions.forEach(function (sub) {
      array.push(Number(sub.id));
    });
    return array;
  };
  var formatProducts = function formatProducts(products) {
    products.forEach(function (product) {
      product['ingredients'] = formatIngredients(product.ingredients, product.selected_ingredients);
      product['options'] = formatOptions(product.options);
      product['quantity'] = product.qty;
      delete product.barcode;
      delete product.barcode_alternative;
      delete product.calories;
      delete product.category;
      delete product.category_id;
      delete product.cost_offer_price;
      delete product.cost_price;
      delete product.description;
      delete product.estimated_person;
      delete product.enabled;
      delete product.external_id;
      delete product.extras;
      delete product.featured;
      delete product.fee_id;
      delete product.gallery;
      delete product.hide_special_instructions;
      delete product.in_offer;
      delete product.inventoried;
      delete product.maximum_per_order;
      delete product.minimum_per_order;
      delete product.offer_include_options;
      delete product.offer_price;
      delete product.offer_rate;
      delete product.offer_rate_type;
      delete product.price;
      delete product.total_price;
      delete product.pricecheck;
      delete product.qty;
      delete product.rank;
      delete product.selected_ingredients;
      delete product.seo_description;
      delete product.seo_image;
      delete product.seo_title;
      delete product.sku;
      delete product.slug;
      delete product.tags;
      delete product.tax_id;
      delete product.upselling;
      delete product.weight;
      delete product.weight_unit;
      delete product.images;
      delete product.name;
    });
    return products;
  };
  var updateBusinessDetails = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var _options$address7, _options$address8, _options$address8$loc, _options$address9, _options$address9$loc, parameters, _yield$ordering$busin, _yield$ordering$busin2, result, error;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            parameters = {
              type: options.type,
              location: options !== null && options !== void 0 && (_options$address7 = options.address) !== null && _options$address7 !== void 0 && _options$address7.location ? "".concat(options === null || options === void 0 ? void 0 : (_options$address8 = options.address) === null || _options$address8 === void 0 ? void 0 : (_options$address8$loc = _options$address8.location) === null || _options$address8$loc === void 0 ? void 0 : _options$address8$loc.lat, ",").concat(options === null || options === void 0 ? void 0 : (_options$address9 = options.address) === null || _options$address9 === void 0 ? void 0 : (_options$address9$loc = _options$address9.location) === null || _options$address9$loc === void 0 ? void 0 : _options$address9$loc.lng) : ''
            };
            _context2.next = 4;
            return ordering.businesses(businessDetails.slug).parameters(parameters).get();
          case 4:
            _yield$ordering$busin = _context2.sent;
            _yield$ordering$busin2 = _yield$ordering$busin.content;
            result = _yield$ordering$busin2.result;
            error = _yield$ordering$busin2.error;
            if (!error) {
              dispatch({
                type: 'ADD_BUSINESS',
                payload: result
              });
              dispatch({
                type: 'ADD_TAX',
                payload: result === null || result === void 0 ? void 0 : result.tax
              });
              dispatch({
                type: 'ADD_SERVICE_FEE',
                payload: result === null || result === void 0 ? void 0 : result.service_fee
              });
            }
            _context2.next = 13;
            break;
          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);
          case 13:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 11]]);
    }));
    return function updateBusinessDetails() {
      return _ref2.apply(this, arguments);
    };
  }();
  var getOfferPrice = function getOfferPrice() {
    if (orderState.loading) return;
    if (businessDetails !== null && businessDetails !== void 0 && businessDetails.offers && !shop.couponCode) {
      var flag = false;
      businessDetails.offers.forEach(function (bOffer) {
        var validDate = (0, _utils.dateCheck)((0, _moment.default)(bOffer.start), (0, _moment.default)(bOffer.end), (0, _moment.default)());
        var allowed = bOffer.order_types_allowed === null || bOffer.order_types_allowed !== null && Object.values(bOffer.order_types_allowed).length && Object.values(bOffer.order_types_allowed).includes(options.type);
        if (allowed && validDate && bOffer.enabled && shop.totalPrice >= bOffer.minimum) {
          var price = bOffer.rate_type == 1 ? bOffer.rate / 100 * shop.totalPrice : bOffer.rate;
          dispatch({
            type: 'ADD_OFFER_RATE_TYPE',
            payload: bOffer.rate_type
          });
          dispatch({
            type: 'ADD_OFFER_RATE',
            payload: bOffer.rate
          });
          dispatch({
            type: 'ADD_OFFER_PRICE',
            payload: price
          });
          dispatch({
            type: 'ADD_OFFER_ID',
            payload: bOffer.id
          });
          flag = true;
        }
      });
      if (!flag) {
        dispatch({
          type: 'ADD_OFFER_RATE_TYPE',
          payload: null
        });
        dispatch({
          type: 'ADD_OFFER_RATE',
          payload: 0
        });
        dispatch({
          type: 'ADD_OFFER_PRICE',
          payload: 0
        });
        dispatch({
          type: 'ADD_OFFER_ID',
          payload: null
        });
      }
    }
  };
  var getServiceFee = function getServiceFee() {
    return (shop === null || shop === void 0 ? void 0 : shop.serviceFeePrice) / 100 * (shop === null || shop === void 0 ? void 0 : shop.totalPrice);
  };
  var getIncludedTaxes = function getIncludedTaxes() {
    if ((businessDetails === null || businessDetails === void 0 ? void 0 : businessDetails.tax_type) == 2) {
      return (shop === null || shop === void 0 ? void 0 : shop.taxPercentage) / 100 * (shop === null || shop === void 0 ? void 0 : shop.totalPrice);
    }
    return 0;
  };
  var goBack = function goBack() {
    var slug = localStorage.getItem('previous-business');
    history.push('/' + slug);
  };
  (0, _react.useEffect)(function () {
    var _validationFields$fie11;
    if (_validationFields.default && _validationFields.default !== null && _validationFields.default !== void 0 && (_validationFields$fie11 = _validationFields.default.fields) !== null && _validationFields$fie11 !== void 0 && _validationFields$fie11.checkout) {
      checkValidationFields();
    }
  }, [_validationFields.default, updatingUser, selectedTableNumber, agreed]);
  (0, _react.useEffect)(function () {
    if (errors) {
      setAlertState({
        open: true,
        content: errors
      });
    }
  }, [errors]);
  (0, _react.useEffect)(function () {
    if (isResetPaymethod) {
      handlePaymethodChange(null);
      setIsResetPaymethod(true);
    }
  }, [isResetPaymethod]);
  (0, _react.useEffect)(function () {
    if (Object.keys(newCreatedOrder).length > 0) {
      setOpenOrderSuccessModal(true);
    } else {
      setOpenOrderSuccessModal(false);
    }
  }, [newCreatedOrder]);
  (0, _react.useEffect)(function () {
    Object.keys(businessDetails).length > 0 ? getCustomConfigTypes(businessDetails === null || businessDetails === void 0 ? void 0 : businessDetails.menus) : null;
  }, [businessDetails]);
  (0, _react.useEffect)(function () {
    !orderState.loading && options.type == 3 ? formatTableNumbers(businessDetails === null || businessDetails === void 0 ? void 0 : businessDetails.tablenumbers) : null;
    updateBusinessDetails();
  }, [options]);
  (0, _react.useEffect)(function () {
    var price = (options === null || options === void 0 ? void 0 : options.type) === 1 && businessDetails !== null && businessDetails !== void 0 && businessDetails.delivery_price ? businessDetails.delivery_price : 0;
    setDeliveryPrice(price);
  }, [options, businessDetails]);
  (0, _react.useEffect)(function () {
    getOfferPrice();
  }, [options, businessDetails, shop.totalPrice, shop.couponCode]);
  (0, _react.useEffect)(function () {
    if (options.type != 3 && (!user || user && (!user.name || !user.email || !user.cellphone))) {
      setIsUserDetailsEdit(true);
    } else {
      setIsUserDetailsEdit(false);
    }
  }, [user, updatingUser]);
  var toggleIsShow = function toggleIsShow() {
    setIsShow(!isShow);
  };
  (0, _react.useEffect)(function () {
    if (businessDetails && Object.keys(businessDetails).length) {
      localStorage.setItem('previous-business', businessDetails === null || businessDetails === void 0 ? void 0 : businessDetails.slug);
    }
  }, [businessDetails]);
  (0, _react.useEffect)(function () {
    dispatch({
      type: 'ADD_ORDER_TYPE',
      payload: options.type
    });
  }, [options]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, (_props$beforeElements = props.beforeElements) === null || _props$beforeElements === void 0 ? void 0 : _props$beforeElements.map(function (BeforeElement, i) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: i
    }, BeforeElement);
  }), (_props$beforeComponen = props.beforeComponents) === null || _props$beforeComponen === void 0 ? void 0 : _props$beforeComponen.map(function (BeforeComponent, i) {
    return /*#__PURE__*/_react.default.createElement(BeforeComponent, _extends({
      key: i
    }, props));
  }), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      borderBottom: '1px solid #cccccc'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '50%',
      display: 'flex',
      flexDirection: 'row',
      cursor: 'pointer',
      justifyContent: 'left',
      textAlign: 'left',
      alignItems: 'center',
      paddingLeft: '10px'
    },
    onClick: function onClick() {
      return goBack();
    }
  }, /*#__PURE__*/_react.default.createElement(_BiArrowBack.default, {
    color: '#000000',
    size: 20,
    style: {
      paddingTop: '2px'
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      color: '#000000',
      paddingLeft: '3px'
    }
  }, 'Back')), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '50%',
      margin: '10px',
      textAlign: 'right',
      justifyContent: 'right',
      alignItems: 'right'
    }
  }, /*#__PURE__*/_react.default.createElement(_orderingUi.LanguageSelector, null))), /*#__PURE__*/_react.default.createElement(_styles.Container, null, /*#__PURE__*/_react.default.createElement(_styles.LeftContainer, null, /*#__PURE__*/_react.default.createElement(_styles.WrappContainer, null, (cart === null || cart === void 0 ? void 0 : cart.status) === 2 && /*#__PURE__*/_react.default.createElement(_styles.WarningMessage, null, /*#__PURE__*/_react.default.createElement(_VscWarning.default, null), /*#__PURE__*/_react.default.createElement("h1", null, t('CART_STATUS_PENDING_MESSAGE', 'Your order is being processed, please wait a little more. if you\'ve been waiting too long, please reload the page'))), (_props$beforeElements2 = props.beforeElementsSectionOne) === null || _props$beforeElements2 === void 0 ? void 0 : _props$beforeElements2.map(function (BeforeElement, i) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: i
    }, BeforeElement);
  }), (_props$beforeComponen2 = props.beforeComponentsSectionOne) === null || _props$beforeComponen2 === void 0 ? void 0 : _props$beforeComponen2.map(function (BeforeComponent, i) {
    return /*#__PURE__*/_react.default.createElement(BeforeComponent, _extends({
      key: i
    }, props));
  }), !props.isHideSectionOne && options.type == 1 && (businessDetails !== null && businessDetails !== void 0 && businessDetails.loading ? /*#__PURE__*/_react.default.createElement(_styles.WrapOrderType, null, /*#__PURE__*/_react.default.createElement("h1", null, /*#__PURE__*/_react.default.createElement(_reactLoadingSkeleton.default, {
    width: 150,
    height: 30,
    style: {
      marginBottom: '10px'
    }
  })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactLoadingSkeleton.default, {
    height: 150,
    style: {
      marginBottom: '10px'
    }
  }))) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_AddressDetails.AddressDetails, {
    location: businessDetails === null || businessDetails === void 0 ? void 0 : businessDetails.location,
    businessLogo: (businessDetails === null || businessDetails === void 0 ? void 0 : businessDetails.logo) || ((_theme$images = theme.images) === null || _theme$images === void 0 ? void 0 : (_theme$images$dummies = _theme$images.dummies) === null || _theme$images$dummies === void 0 ? void 0 : _theme$images$dummies.businessLogo),
    isCartPending: (cart === null || cart === void 0 ? void 0 : cart.status) === 2,
    businessId: cart === null || cart === void 0 ? void 0 : cart.business_id,
    apiKey: (_configState$configs8 = configState.configs) === null || _configState$configs8 === void 0 ? void 0 : (_configState$configs9 = _configState$configs8.google_maps_api_key) === null || _configState$configs9 === void 0 ? void 0 : _configState$configs9.value,
    mapConfigs: mapConfigs,
    isCustomerMode: isCustomerMode,
    business: businessDetails
  }), ((options === null || options === void 0 ? void 0 : (_options$address10 = options.address) === null || _options$address10 === void 0 ? void 0 : _options$address10.address) == '' || (options === null || options === void 0 ? void 0 : options.address) && Object.keys(options === null || options === void 0 ? void 0 : options.address).length == 0) && /*#__PURE__*/_react.default.createElement(_styles.WarningText, {
    style: {
      textAlign: 'center',
      color: theme.colors.primary
    }
  }, t('INVALID_ADDRESS', 'Invalid address details.')))), (_props$beforeElements3 = props.beforeElementsSectionTwo) === null || _props$beforeElements3 === void 0 ? void 0 : _props$beforeElements3.map(function (BeforeElement, i) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: i
    }, BeforeElement);
  }), (_props$beforeComponen3 = props.beforeComponentsSectionTwo) === null || _props$beforeComponen3 === void 0 ? void 0 : _props$beforeComponen3.map(function (BeforeComponent, i) {
    return /*#__PURE__*/_react.default.createElement(BeforeComponent, _extends({
      key: i
    }, props));
  }), !orderState.loading && options.type != 3 && /*#__PURE__*/_react.default.createElement(_styles.UserDetailsContainer, null, /*#__PURE__*/_react.default.createElement(_styles.WrapperUserDetails, null, /*#__PURE__*/_react.default.createElement(_UserDetails.UserDetails, {
    isUserDetailsEdit: isUserDetailsEdit,
    cartStatus: cart === null || cart === void 0 ? void 0 : cart.status,
    businessId: cart === null || cart === void 0 ? void 0 : cart.business_id,
    useValidationFields: true,
    useDefualtSessionManager: true,
    useSessionUser: !isCustomerMode,
    isCustomerMode: true,
    isCheckout: true,
    setUpdatingUser: setUpdatingUser
  })), options.type != 3 && (!user || user && (!user.name || !user.email || !user.cellphone)) && /*#__PURE__*/_react.default.createElement(_styles.WarningText, {
    style: {
      textAlign: 'center'
    }
  }, t('INVALID_CUSTOMER_DETAILS', 'Invalid customer details.'))), (_props$beforeElements4 = props.beforeElementsSectionThree) === null || _props$beforeElements4 === void 0 ? void 0 : _props$beforeElements4.map(function (BeforeElement, i) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: i
    }, BeforeElement);
  }), (_props$beforeComponen4 = props.beforeComponentsSectionThree) === null || _props$beforeComponen4 === void 0 ? void 0 : _props$beforeComponen4.map(function (BeforeComponent, i) {
    return /*#__PURE__*/_react.default.createElement(BeforeComponent, _extends({
      key: i
    }, props));
  }), /*#__PURE__*/_react.default.createElement(_styles.BusinessDetailsContainer, null, ((businessDetails === null || businessDetails === void 0 ? void 0 : businessDetails.loading) || false) && !(businessDetails !== null && businessDetails !== void 0 && businessDetails.error) && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactLoadingSkeleton.default, {
    height: 35,
    style: {
      marginBottom: '10px'
    }
  }), /*#__PURE__*/_react.default.createElement(_reactLoadingSkeleton.default, {
    height: 35,
    style: {
      marginBottom: '10px'
    }
  }), /*#__PURE__*/_react.default.createElement(_reactLoadingSkeleton.default, {
    height: 35,
    style: {
      marginBottom: '10px'
    }
  }), /*#__PURE__*/_react.default.createElement(_reactLoadingSkeleton.default, {
    height: 35,
    style: {
      marginBottom: '10px'
    }
  }), /*#__PURE__*/_react.default.createElement(_reactLoadingSkeleton.default, {
    height: 35,
    style: {
      marginBottom: '10px'
    }
  }))), shop.business && ((_Object$values = Object.values(shop.business)) === null || _Object$values === void 0 ? void 0 : _Object$values.length) > 0 && /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/_react.default.createElement("h1", null, t('BUSINESS_DETAILS', 'Business Details')), isShow && /*#__PURE__*/_react.default.createElement("div", null, businessDetails.name && /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("strong", null, t('NAME', 'Name'), ":"), " ", businessDetails.name), businessDetails.email && /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("strong", null, t('EMAIL', 'Email'), ":"), " ", businessDetails.email), businessDetails.cellphone && /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("strong", null, t('CELLPHONE', 'Cellphone'), ":"), " ", businessDetails.cellphone), businessDetails.address && /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("strong", null, t('ADDRESS', 'Address'), ":"), " ", businessDetails.address))), options.type === 3 && tableNumbers.length > 0 && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      fontSize: '24px',
      fontWeight: 'bolder'
    }
  }, t('SELECT_TABLE_NO', 'Select Table No.')), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginLeft: 'auto',
      paddingRight: '10px'
    }
  }, /*#__PURE__*/_react.default.createElement(_Select.Select, {
    notAsync: true,
    notReload: true,
    placeholder: t('SELECT_TABLE_NO', 'Please Select Table No.'),
    options: tableNumbers,
    onChange: function onChange(val) {
      return setSelectedTableNumber(val);
    }
  }))), !selectedTableNumber && options.type === 3 && /*#__PURE__*/_react.default.createElement(_styles.WarningText, {
    style: {
      textAlign: 'center'
    }
  }, t('WARNING_NOT_TABLE_NUMBER_SELECTED', 'Please, select a table number.'))), (businessDetails === null || businessDetails === void 0 ? void 0 : businessDetails.error) && (businessDetails === null || businessDetails === void 0 ? void 0 : (_businessDetails$erro = businessDetails.error) === null || _businessDetails$erro === void 0 ? void 0 : _businessDetails$erro.length) > 0 && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h1", null, t('BUSINESS_DETAILS', 'Business Details')), /*#__PURE__*/_react.default.createElement(_orderingUi.NotFoundSource, {
    content: (businessDetails === null || businessDetails === void 0 ? void 0 : (_businessDetails$erro2 = businessDetails.error[0]) === null || _businessDetails$erro2 === void 0 ? void 0 : _businessDetails$erro2.message) || (businessDetails === null || businessDetails === void 0 ? void 0 : businessDetails.error[0])
  }))), (_props$beforeElements5 = props.beforeElementsSectionFour) === null || _props$beforeElements5 === void 0 ? void 0 : _props$beforeElements5.map(function (BeforeElement, i) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: i
    }, BeforeElement);
  }), (_props$beforeComponen5 = props.beforeComponentsSectionFour) === null || _props$beforeComponen5 === void 0 ? void 0 : _props$beforeComponen5.map(function (BeforeComponent, i) {
    return /*#__PURE__*/_react.default.createElement(BeforeComponent, _extends({
      key: i
    }, props));
  }), cart && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_styles.PaymentMethodContainer, null, /*#__PURE__*/_react.default.createElement("h1", null, t('PAYMENT_METHODS', 'Payment Methods')), (cart === null || cart === void 0 ? void 0 : cart.status) === 4 && /*#__PURE__*/_react.default.createElement(_styles.WarningMessage, {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/_react.default.createElement(_VscWarning.default, null), /*#__PURE__*/_react.default.createElement("h1", null, t('CART_STATUS_CANCEL_MESSAGE', 'The payment has not been successful, please try again'))), /*#__PURE__*/_react.default.createElement(_PaymentOptions.PaymentOptions, {
    cart: cart,
    isDisabled: (cart === null || cart === void 0 ? void 0 : cart.status) === 2,
    businessId: businessDetails === null || businessDetails === void 0 ? void 0 : businessDetails.id,
    isLoading: false,
    paymethods: businessDetails === null || businessDetails === void 0 ? void 0 : businessDetails.paymethods,
    onPaymentChange: handlePaymethodChange,
    errorCash: errorCash,
    setErrorCash: setErrorCash,
    handleOrderRedirect: handleOrderRedirect,
    isCustomerMode: isCustomerMode,
    paySelected: paymethodSelected
  })), !paymethodSelected && (cart === null || cart === void 0 ? void 0 : cart.status) !== 2 && /*#__PURE__*/_react.default.createElement(_styles.WarningText, {
    style: {
      textAlign: 'center'
    }
  }, t('WARNING_NOT_PAYMENT_SELECTED', 'Please, select a payment method to place order.'))), (_props$beforeElements6 = props.beforeElementsSectionFive) === null || _props$beforeElements6 === void 0 ? void 0 : _props$beforeElements6.map(function (BeforeElement, i) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: i
    }, BeforeElement);
  }), (_props$beforeComponen6 = props.beforeComponentsSectionFive) === null || _props$beforeComponen6 === void 0 ? void 0 : _props$beforeComponen6.map(function (BeforeComponent, i) {
    return /*#__PURE__*/_react.default.createElement(BeforeComponent, _extends({
      key: i
    }, props));
  }))), /*#__PURE__*/_react.default.createElement(_styles.RightContainer, null, /*#__PURE__*/_react.default.createElement(_styles.RightInnerContainer, null, (_props$beforeElements7 = props.beforeElementsSectionSix) === null || _props$beforeElements7 === void 0 ? void 0 : _props$beforeElements7.map(function (BeforeElement, i) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: i
    }, BeforeElement);
  }), (_props$beforeComponen7 = props.beforeComponentsSectionSix) === null || _props$beforeComponen7 === void 0 ? void 0 : _props$beforeComponen7.map(function (BeforeComponent, i) {
    return /*#__PURE__*/_react.default.createElement(BeforeComponent, _extends({
      key: i
    }, props));
  }), (_props$beforeElements8 = props.beforeElementsSectionSeven) === null || _props$beforeElements8 === void 0 ? void 0 : _props$beforeElements8.map(function (BeforeElement, i) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: i
    }, BeforeElement);
  }), (_props$beforeComponen8 = props.beforeComponentsSectionSeven) === null || _props$beforeComponen8 === void 0 ? void 0 : _props$beforeComponen8.map(function (BeforeComponent, i) {
    return /*#__PURE__*/_react.default.createElement(BeforeComponent, _extends({
      key: i
    }, props));
  }), !props.isHideSectionSeven && cart && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null), /*#__PURE__*/_react.default.createElement(_Cart.default, {
    isCartPending: (cart === null || cart === void 0 ? void 0 : cart.status) === 2,
    isCheckout: true,
    business: businessDetails,
    isProducts: (cart === null || cart === void 0 ? void 0 : cart.length) || 0,
    configTypes: customConfigTypes.configTypes.length > 0 ? customConfigTypes.configTypes : configTypes
  }), cart.length > 0 && /*#__PURE__*/_react.default.createElement(_styles.OrderBill, null, /*#__PURE__*/_react.default.createElement("table", null, /*#__PURE__*/_react.default.createElement("tbody", null, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", null, t('SUBTOTAL', 'Subtotal')), /*#__PURE__*/_react.default.createElement("td", null, parsePrice(shop === null || shop === void 0 ? void 0 : shop.totalPrice))), getServiceFee() > 0 && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", null, t('SERVICE_FEE', 'Service fee'), /*#__PURE__*/_react.default.createElement("span", null, "(".concat((0, _orderingUi.verifyDecimals)(shop === null || shop === void 0 ? void 0 : shop.serviceFeePrice, parseNumber), "%)"))), /*#__PURE__*/_react.default.createElement("td", null, parsePrice(getServiceFee() || 0)))), getIncludedTaxes() > 0 && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", null, t('TAX', 'Tax'), /*#__PURE__*/_react.default.createElement("span", null, "(".concat((0, _orderingUi.verifyDecimals)(shop === null || shop === void 0 ? void 0 : shop.taxPercentage, parseNumber), "%)"))), /*#__PURE__*/_react.default.createElement("td", null, parsePrice(getIncludedTaxes() || 0)))), (cart === null || cart === void 0 ? void 0 : cart.driver_tip) > 0 && /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", null, t('DRIVER_TIP', 'Driver tip'), (cart === null || cart === void 0 ? void 0 : cart.driver_tip_rate) > 0 && parseInt((_configState$configs10 = configState.configs) === null || _configState$configs10 === void 0 ? void 0 : (_configState$configs11 = _configState$configs10.driver_tip_type) === null || _configState$configs11 === void 0 ? void 0 : _configState$configs11.value, 10) === 2 && !parseInt((_configState$configs12 = configState.configs) === null || _configState$configs12 === void 0 ? void 0 : (_configState$configs13 = _configState$configs12.driver_tip_use_custom) === null || _configState$configs13 === void 0 ? void 0 : _configState$configs13.value, 10) && /*#__PURE__*/_react.default.createElement("span", null, "(".concat((0, _orderingUi.verifyDecimals)(cart === null || cart === void 0 ? void 0 : cart.driver_tip_rate, parseNumber), "%)"))), /*#__PURE__*/_react.default.createElement("td", null, parsePrice(cart === null || cart === void 0 ? void 0 : cart.driver_tip))), (options === null || options === void 0 ? void 0 : options.type) === 1 && (businessDetails === null || businessDetails === void 0 ? void 0 : businessDetails.delivery_price) > 0 && /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", null, t('DELIVERY_FEE', 'Delivery Fee')), /*#__PURE__*/_react.default.createElement("td", null, parsePrice(businessDetails === null || businessDetails === void 0 ? void 0 : businessDetails.delivery_price))), (shop === null || shop === void 0 ? void 0 : shop.offerPrice) > 0 && (shop === null || shop === void 0 ? void 0 : shop.totalPrice) >= 0 && /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", null, t('DISCOUNT', 'Discount'), shop.offerRateType == 1 && /*#__PURE__*/_react.default.createElement("span", null, "(".concat((0, _orderingUi.verifyDecimals)(shop === null || shop === void 0 ? void 0 : shop.offerRate, parseNumber), "%)"))), /*#__PURE__*/_react.default.createElement("td", null, "- ", parsePrice((shop === null || shop === void 0 ? void 0 : shop.offerPrice) || 0))))), /*#__PURE__*/_react.default.createElement("table", {
    className: "total"
  }, /*#__PURE__*/_react.default.createElement("tbody", null, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", null, t('TOTAL', 'Total')), /*#__PURE__*/_react.default.createElement("td", null, parsePrice((shop === null || shop === void 0 ? void 0 : shop.totalPrice) + getIncludedTaxes() + getServiceFee() + (shop === null || shop === void 0 ? void 0 : shop.serviceFeePrice) + (businessDetails !== null && businessDetails !== void 0 && businessDetails.delivery_price ? businessDetails.delivery_price : 0) - (shop === null || shop === void 0 ? void 0 : shop.offerPrice) >= 0 ? (shop === null || shop === void 0 ? void 0 : shop.totalPrice) + getIncludedTaxes() + getServiceFee() + (businessDetails !== null && businessDetails !== void 0 && businessDetails.delivery_price ? businessDetails.delivery_price : 0) - (shop === null || shop === void 0 ? void 0 : shop.offerPrice) : 0))))), isCouponEnabled && /*#__PURE__*/_react.default.createElement(_styles.CouponContainer, null, /*#__PURE__*/_react.default.createElement(_CouponControl.CouponControl, {
    businessId: businessDetails === null || businessDetails === void 0 ? void 0 : businessDetails.id,
    price: shop.totalPrice + deliveryPrice - shop.offerPrice
  })), /*#__PURE__*/_react.default.createElement("table", {
    className: "comments"
  }, /*#__PURE__*/_react.default.createElement("tbody", null, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", null, t('COMMENTS', 'Comments'))), /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement(_styles.CommentContainer, null, /*#__PURE__*/_react.default.createElement(_Inputs.TextArea, {
    defaultValue: cart === null || cart === void 0 ? void 0 : cart.comment,
    placeholder: t('SPECIAL_COMMENTS', 'Special Comments'),
    onChange: function onChange(e) {
      return handleChangeComment(e.target.value);
    }
  }), (commentState === null || commentState === void 0 ? void 0 : commentState.loading) && /*#__PURE__*/_react.default.createElement(_styles.Spinner, null, /*#__PURE__*/_react.default.createElement(_orderingUi.SpinnerLoader, {
    style: {
      height: 100
    }
  }))))))), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'row'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginRight: '8px'
    }
  }, agreed ? /*#__PURE__*/_react.default.createElement(_Checkbox.Checkbox, {
    active: true,
    onClick: function onClick() {
      return setAgreed(false);
    }
  }) : /*#__PURE__*/_react.default.createElement(_Checkbox.Checkbox, {
    onClick: function onClick() {
      return setAgreed(true);
    }
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      cursor: 'pointer'
    },
    onClick: function onClick() {
      return window.open('https://chatco.myfood.sg/assets/TC-PDPA.html', '_blank');
    }
  }, 'Agreed to Terms and Conditions')), !agreed && /*#__PURE__*/_react.default.createElement(_styles.WarningText, {
    style: {
      textAlign: 'left'
    }
  }, t('AGREE_TO_TERMS_AND_CONDITIONS', 'Please Accept Terms and Conditions')), /*#__PURE__*/_react.default.createElement(_styles.WrapperPlaceOrderButton, null, /*#__PURE__*/_react.default.createElement(_Buttons.Button, {
    style: {
      background: '#25D366'
    },
    disabled: !paymethodSelected || options.type != 3 && (!user || user && (!user.name || !user.email || !user.cellphone)) || placing || !agreed || !selectedTableNumber && options.type === 3 || errorCash || !(shop !== null && shop !== void 0 && shop.totalPrice) || options.type === 1 && ((options === null || options === void 0 ? void 0 : (_options$address11 = options.address) === null || _options$address11 === void 0 ? void 0 : _options$address11.address) == '' || Object.keys(options === null || options === void 0 ? void 0 : options.address).length == 0) || (options === null || options === void 0 ? void 0 : options.type) == 1 && shop.totalPrice < (businessDetails === null || businessDetails === void 0 ? void 0 : businessDetails.minimum)
    // disabled={!cart?.valid || !paymethodSelected || placing || errorCash || !cart?.valid_maximum || !cart?.valid_minimum}
    ,
    onClick: function onClick() {
      return handlePlaceOrder();
    }
  }, !((shop === null || shop === void 0 ? void 0 : shop.totalPrice) + deliveryPrice - shop.offerPrice) ? "".concat(t('Total Price:'), " ").concat(parsePrice((shop === null || shop === void 0 ? void 0 : shop.totalPrice) + deliveryPrice - shop.offerPrice)) : placing ? t('PLACING', 'Placing') : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'row'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      paddingTop: '7px',
      marginRight: '10px'
    }
  }, /*#__PURE__*/_react.default.createElement(_FaWhatsapp.default, {
    className: "span-svg",
    size: 20
  })), t('PLACE_ORDER_ON_WHATSAPP', 'Place Order On Whatsapp'))))))), /*#__PURE__*/_react.default.createElement(_orderingUi.Alert, {
    title: t('CUSTOMER_DETAILS', 'Customer Details'),
    content: alertState.content,
    acceptText: t('ACCEPT', 'Accept'),
    open: alertState.open,
    onClose: function onClose() {
      return closeAlert();
    },
    onAccept: function onAccept() {
      return closeAlert();
    },
    closeOnBackdrop: false
  }), /*#__PURE__*/_react.default.createElement(_orderingUi.Modal, {
    width: "80%",
    open: openTaxModal.open,
    padding: "20px",
    closeOnBackdrop: true,
    title: "".concat(((_openTaxModal$data = openTaxModal.data) === null || _openTaxModal$data === void 0 ? void 0 : _openTaxModal$data.name) || t('INHERIT_FROM_BUSINESS', 'Inherit from business'), " (").concat(typeof ((_openTaxModal$data2 = openTaxModal.data) === null || _openTaxModal$data2 === void 0 ? void 0 : _openTaxModal$data2.rate) === 'number' ? "".concat((_openTaxModal$data3 = openTaxModal.data) === null || _openTaxModal$data3 === void 0 ? void 0 : _openTaxModal$data3.rate, "%") : "".concat(parsePrice((_openTaxModal$data$fi = (_openTaxModal$data4 = openTaxModal.data) === null || _openTaxModal$data4 === void 0 ? void 0 : _openTaxModal$data4.fixed) !== null && _openTaxModal$data$fi !== void 0 ? _openTaxModal$data$fi : 0), " + ").concat((_openTaxModal$data5 = openTaxModal.data) === null || _openTaxModal$data5 === void 0 ? void 0 : _openTaxModal$data5.percentage, "%"), ") "),
    onClose: function onClose() {
      return setOpenTaxModal({
        open: false,
        tax: null
      });
    },
    modalTitleStyle: {
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(_orderingUi.TaxInformation, {
    data: openTaxModal.data,
    products: cart === null || cart === void 0 ? void 0 : cart.products
  })), /*#__PURE__*/_react.default.createElement(_orderingUi.Modal, {
    width: "60%",
    open: openOrderSuccessModal,
    padding: "20px",
    onClose: function onClose() {
      return handleCloseOrderSuccessModal();
    },
    modalTitleStyle: {
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(_OrderSuccessModal.OrderSuccessModal, {
    products: cart,
    businessData: businessDetails,
    isCheckOut: true,
    order: newCreatedOrder
  }))), (_props$afterComponent = props.afterComponents) === null || _props$afterComponent === void 0 ? void 0 : _props$afterComponent.map(function (AfterComponent, i) {
    return /*#__PURE__*/_react.default.createElement(AfterComponent, _extends({
      key: i
    }, props));
  }), (_props$afterElements = props.afterElements) === null || _props$afterElements === void 0 ? void 0 : _props$afterElements.map(function (AfterElement, i) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: i
    }, AfterElement);
  }));
};
var Checkout = function Checkout(props) {
  var _Object$values2, _cartState$cart;
  var errors = props.errors,
    clearErrors = props.clearErrors,
    handleOrderRedirect = props.handleOrderRedirect,
    handleCheckoutRedirect = props.handleCheckoutRedirect,
    handleSearchRedirect = props.handleSearchRedirect,
    handleCheckoutListRedirect = props.handleCheckoutListRedirect;
  var _useOrder5 = (0, _orderingComponents.useOrder)(),
    _useOrder6 = _slicedToArray(_useOrder5, 1),
    orderState = _useOrder6[0];
  var _useLanguage3 = (0, _orderingComponents.useLanguage)(),
    _useLanguage4 = _slicedToArray(_useLanguage3, 2),
    t = _useLanguage4[1];
  var _useState35 = (0, _react.useState)({
      loading: true,
      error: null,
      cart: null
    }),
    _useState36 = _slicedToArray(_useState35, 2),
    cartState = _useState36[0],
    setCartState = _useState36[1];
  var _useState37 = (0, _react.useState)(false),
    _useState38 = _slicedToArray(_useState37, 2),
    openUpselling = _useState38[0],
    setOpenUpselling = _useState38[1];
  var _useState39 = (0, _react.useState)(false),
    _useState40 = _slicedToArray(_useState39, 2),
    canOpenUpselling = _useState40[0],
    setCanOpenUpselling = _useState40[1];
  var _useState41 = (0, _react.useState)(null),
    _useState42 = _slicedToArray(_useState41, 2),
    currentCart = _useState42[0],
    setCurrentCart = _useState42[1];
  var _useState43 = (0, _react.useState)({
      open: false,
      content: []
    }),
    _useState44 = _slicedToArray(_useState43, 2),
    alertState = _useState44[0],
    setAlertState = _useState44[1];
  var _useState45 = (0, _react.useState)(false),
    _useState46 = _slicedToArray(_useState45, 2),
    isResetPaymethod = _useState46[0],
    setIsResetPaymethod = _useState46[1];
  var _useState47 = (0, _react.useState)(false),
    _useState48 = _slicedToArray(_useState47, 2),
    isValid = _useState48[0],
    setIsValid = _useState48[1];
  var shop = (0, _reactRedux.useSelector)(function (state) {
    return state.shop;
  });
  var cart = shop.cart;
  var businessDetails = shop === null || shop === void 0 ? void 0 : shop.business;
  var cartsWithProducts = (orderState === null || orderState === void 0 ? void 0 : orderState.carts) && (((_Object$values2 = Object.values(orderState === null || orderState === void 0 ? void 0 : orderState.carts)) === null || _Object$values2 === void 0 ? void 0 : _Object$values2.filter(function (cart) {
    var _cart$products;
    return cart === null || cart === void 0 ? void 0 : (_cart$products = cart.products) === null || _cart$products === void 0 ? void 0 : _cart$products.length;
  })) || null);
  var closeAlert = function closeAlert() {
    setAlertState({
      open: false,
      content: []
    });
    clearErrors && clearErrors();
  };
  var handleUpsellingPage = function handleUpsellingPage() {
    setOpenUpselling(false);
    setCurrentCart(null);
    setCanOpenUpselling(false);
    handleCheckoutRedirect(currentCart.uuid);
  };
  (0, _react.useEffect)(function () {
    if (!orderState.loading && currentCart !== null && currentCart !== void 0 && currentCart.business_id) {
      var _Object$values3;
      setCurrentCart.apply(void 0, _toConsumableArray((_Object$values3 = Object.values(orderState.carts)) === null || _Object$values3 === void 0 ? void 0 : _Object$values3.filter(function (cart) {
        return (cart === null || cart === void 0 ? void 0 : cart.business_id) === (currentCart === null || currentCart === void 0 ? void 0 : currentCart.business_id);
      })));
    }
  }, [orderState.loading]);
  (0, _react.useEffect)(function () {
    if (currentCart !== null && currentCart !== void 0 && currentCart.products) {
      setOpenUpselling(true);
    }
  }, [currentCart]);
  (0, _react.useEffect)(function () {
    if (errors !== null && errors !== void 0 && errors.length) {
      setAlertState({
        open: true,
        content: errors
      });
    }
  }, [errors]);
  var checkValidity = function checkValidity() {
    Object.keys(businessDetails).length == 0 || cart.length === 0 ? setIsValid(false) : setIsValid(true);
  };
  (0, _react.useEffect)(function () {
    checkValidity();
  }, [cart, businessDetails]);
  var checkoutProps = _objectSpread(_objectSpread({}, props), {}, {
    UIComponent: CheckoutUI,
    cartState: cartState,
    businessId: (_cartState$cart = cartState.cart) === null || _cartState$cart === void 0 ? void 0 : _cartState$cart.business_id,
    isResetPaymethod: isResetPaymethod,
    setIsResetPaymethod: setIsResetPaymethod
  });
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !isValid && /*#__PURE__*/_react.default.createElement(_orderingUi.NotFoundSource, {
    content: t('NOT_FOUND_CARTS', 'Sorry, You don\'t seem to have any carts.'),
    btnTitle: t('GO_BACK', 'Go Back'),
    onClickButton: function onClickButton() {
      return history.back();
    }
  }), !(window.location.pathname === '/checkout') && /*#__PURE__*/_react.default.createElement(_styles.Container, null, /*#__PURE__*/_react.default.createElement(_styles.LeftContainer, null, _toConsumableArray(Array(5).keys()).map(function (i) {
    return /*#__PURE__*/_react.default.createElement(_styles.WrapOrderType, {
      key: i
    }, /*#__PURE__*/_react.default.createElement("h1", null, /*#__PURE__*/_react.default.createElement(_reactLoadingSkeleton.default, {
      width: 150,
      height: 30,
      style: {
        marginBottom: '10px'
      }
    })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactLoadingSkeleton.default, {
      height: 150,
      style: {
        marginBottom: '10px'
      }
    })));
  })), /*#__PURE__*/_react.default.createElement(_styles.RightContainer, null, /*#__PURE__*/_react.default.createElement(_styles.RightInnerContainer, null, /*#__PURE__*/_react.default.createElement(_reactLoadingSkeleton.default, {
    height: 35,
    count: 2,
    style: {
      marginBottom: '10px'
    }
  }), /*#__PURE__*/_react.default.createElement(_reactLoadingSkeleton.default, {
    height: 150,
    style: {
      marginBottom: '10px'
    }
  }), /*#__PURE__*/_react.default.createElement(_reactLoadingSkeleton.default, {
    height: 35,
    count: 5,
    style: {
      marginBottom: '10px'
    }
  })))), isValid && /*#__PURE__*/_react.default.createElement(_Checkout.Checkout, checkoutProps), (currentCart === null || currentCart === void 0 ? void 0 : currentCart.products) && /*#__PURE__*/_react.default.createElement(_orderingUi.UpsellingPage, {
    businessId: currentCart === null || currentCart === void 0 ? void 0 : currentCart.business_id,
    cartProducts: currentCart === null || currentCart === void 0 ? void 0 : currentCart.products,
    business: currentCart === null || currentCart === void 0 ? void 0 : currentCart.business,
    handleUpsellingPage: handleUpsellingPage,
    openUpselling: openUpselling,
    canOpenUpselling: canOpenUpselling,
    setCanOpenUpselling: setCanOpenUpselling
  }), /*#__PURE__*/_react.default.createElement(_orderingUi.Alert, {
    title: t('CHECKOUT ', 'Checkout'),
    content: alertState.content,
    acceptText: t('ACCEPT', 'Accept'),
    open: alertState.open,
    onClose: function onClose() {
      return closeAlert();
    },
    onAccept: function onAccept() {
      return closeAlert();
    },
    closeOnBackdrop: false
  }));
};
exports.Checkout = Checkout;