"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactLoadingSkeleton = _interopRequireDefault(require("react-loading-skeleton"));
var _reactRouterDom = require("react-router-dom");
var _moment = _interopRequireDefault(require("moment"));
var _momentRange = require("moment-range");
var _FaRegClock = _interopRequireDefault(require("@meronex/icons/fa/FaRegClock"));
var _orderingUi = require("ordering-ui");
var _config = _interopRequireDefault(require("../../config.json"));
var _orderingComponents = require("ordering-components");
var _BusinessAndProductList = require("../../controllers/BusinessAndProductList");
var _styles = require("./styles");
var _BusinessBasicInformation = require("../BusinessBasicInformation");
var _BusinessProductsCategories = require("../BusinessProductsCategories");
var _BusinessProductsList = require("../BusinessProductsList");
var _AddressForm = require("../AddressForm");
var _ProductForm = _interopRequireDefault(require("../ProductForm"));
var _Modal = require("../Modal");
var _theme_two = require("ordering-ui/theme_two");
var _Cart = _interopRequireDefault(require("../Cart"));
var _MomentControl = require("../MomentControl");
var _styledComponents = require("styled-components");
var _reactRedux = require("react-redux");
var _UserFormDetails = require("../UserFormDetails");
var _Buttons = require("../styles/Buttons");
var _Inputs = require("../styles/Inputs");
var _utils = require("../../utils");
var _OrderTypeSelectorHeader = require("../OrderTypeSelectorHeader");
var _CustomStyleAddressDetails = require("../CustomStyleAddressDetails");
var _useIntersection = _interopRequireDefault(require("../../hooks/useIntersection"));
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
var PIXELS_TO_SCROLL = 300;
var moment = (0, _momentRange.extendMoment)(_moment.default);
var BusinessProductsListingUI = function BusinessProductsListingUI(props) {
  var _configState$configs, _configState$configs$, _Object$values$find, _configState$configs2, _configState$configs3, _props$beforeElements, _props$beforeComponen, _theme$images, _theme$images$dummies, _currentCart$products, _options$address3, _businessState$busine, _businessState$busine2, _businessState$busine3, _configState$configs4, _configState$configs5, _business$categories, _businessState$busine4, _currentCart$products2, _options$address4, _theme$images2, _theme$images2$dummie, _configState$configs6, _configState$configs7, _options$address5, _configState$configs8, _configState$configs9, _orderState$options, _props$afterComponent, _props$afterElements;
  var errors = props.errors,
    isInitialRender = props.isInitialRender,
    businessState = props.businessState,
    categorySelected = props.categorySelected,
    searchValue = props.searchValue,
    sortByValue = props.sortByValue,
    categoryState = props.categoryState,
    categoryId = props.categoryId,
    productId = props.productId,
    productModal = props.productModal,
    getNextProducts = props.getNextProducts,
    handleChangeCategory = props.handleChangeCategory,
    handleUpdateInitialRender = props.handleUpdateInitialRender,
    updateProductModal = props.updateProductModal,
    onProductRedirect = props.onProductRedirect,
    onCheckoutRedirect = props.onCheckoutRedirect,
    handleChangeSearch = props.handleChangeSearch,
    handleSearchRedirect = props.handleSearchRedirect,
    featuredProducts = props.featuredProducts,
    handleChangeSortBy = props.handleChangeSortBy,
    isCartOnProductsList = props.isCartOnProductsList,
    errorQuantityProducts = props.errorQuantityProducts;
  var shop = (0, _reactRedux.useSelector)(function (state) {
    return state.shop;
  });
  var cart = shop.cart;
  var business = businessState.business,
    loading = businessState.loading,
    error = businessState.error;
  var _useLanguage = (0, _orderingComponents.useLanguage)(),
    _useLanguage2 = _slicedToArray(_useLanguage, 2),
    t = _useLanguage2[1];
  var _useOrder = (0, _orderingComponents.useOrder)(),
    _useOrder2 = _slicedToArray(_useOrder, 1),
    options = _useOrder2[0].options;
  var _useOrder3 = (0, _orderingComponents.useOrder)(),
    _useOrder4 = _slicedToArray(_useOrder3, 1),
    orderState = _useOrder4[0];
  var _useOrder5 = (0, _orderingComponents.useOrder)(),
    _useOrder6 = _slicedToArray(_useOrder5, 2),
    _useOrder6$ = _useOrder6[1],
    changeAddress = _useOrder6$.changeAddress,
    setStateValues = _useOrder6$.setStateValues,
    changeMoment = _useOrder6$.changeMoment,
    changeType = _useOrder6$.changeType;
  var _useUtils = (0, _orderingComponents.useUtils)(),
    _useUtils2 = _slicedToArray(_useUtils, 1),
    _useUtils2$ = _useUtils2[0],
    parsePrice = _useUtils2$.parsePrice,
    optimizeImage = _useUtils2$.optimizeImage;
  var _useEvent = (0, _orderingComponents.useEvent)(),
    _useEvent2 = _slicedToArray(_useEvent, 1),
    events = _useEvent2[0];
  var _useConfig = (0, _orderingComponents.useConfig)(),
    _useConfig2 = _slicedToArray(_useConfig, 1),
    configState = _useConfig2[0];
  var dispatch = (0, _reactRedux.useDispatch)();
  var location = (0, _reactRouterDom.useLocation)();
  var theme = (0, _styledComponents.useTheme)();
  var windowSize = (0, _orderingUi.useWindowSize)();
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    openAddressForm = _useState2[0],
    setOpenAddressForm = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    runChangeMoment = _useState4[0],
    setRunChangeMoment = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    runChanges = _useState6[0],
    setRunChanges = _useState6[1];
  var _useState7 = (0, _react.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    openProduct = _useState8[0],
    setModalIsOpen = _useState8[1];
  var _useState9 = (0, _react.useState)(props.product),
    _useState10 = _slicedToArray(_useState9, 2),
    curProduct = _useState10[0],
    setCurProduct = _useState10[1];
  var _useState11 = (0, _react.useState)({
      product: null,
      hasOptions: false
    }),
    _useState12 = _slicedToArray(_useState11, 2),
    firstProduct = _useState12[0],
    setFirstProduct = _useState12[1];
  var _useState13 = (0, _react.useState)(false),
    _useState14 = _slicedToArray(_useState13, 2),
    openUpselling = _useState14[0],
    setOpenUpselling = _useState14[1];
  var _useState15 = (0, _react.useState)(false),
    _useState16 = _slicedToArray(_useState15, 2),
    canOpenUpselling = _useState16[0],
    setCanOpenUpselling = _useState16[1];
  var _useState17 = (0, _react.useState)(false),
    _useState18 = _slicedToArray(_useState17, 2),
    openBusinessInformation = _useState18[0],
    setOpenBusinessInformation = _useState18[1];
  var _useState19 = (0, _react.useState)({
      open: false,
      content: [],
      onAccept: function onAccept() {},
      onClose: function onClose() {}
    }),
    _useState20 = _slicedToArray(_useState19, 2),
    alertState = _useState20[0],
    setAlertState = _useState20[1];
  var _useState21 = (0, _react.useState)(false),
    _useState22 = _slicedToArray(_useState21, 2),
    isCartOpen = _useState22[0],
    setIsCartOpen = _useState22[1];
  var _useState23 = (0, _react.useState)(false),
    _useState24 = _slicedToArray(_useState23, 2),
    trackOrderModal = _useState24[0],
    showTrackOrderModal = _useState24[1];
  var _useState25 = (0, _react.useState)(true),
    _useState26 = _slicedToArray(_useState25, 2),
    isFirstRender = _useState26[0],
    setIsFirstRender = _useState26[1];
  var _useState27 = (0, _react.useState)(false),
    _useState28 = _slicedToArray(_useState27, 2),
    orderOptionsModalIsOpen = _useState28[0],
    setOrderOptionsModalIsOpen = _useState28[1];
  var _useState29 = (0, _react.useState)(),
    _useState30 = _slicedToArray(_useState29, 2),
    inputOrderId = _useState30[0],
    setInputOrderId = _useState30[1];
  var _useState31 = (0, _react.useState)(null),
    _useState32 = _slicedToArray(_useState31, 2),
    userPhoneNumber = _useState32[0],
    setUserPhoneNumber = _useState32[1];
  var _useState33 = (0, _react.useState)(false),
    _useState34 = _slicedToArray(_useState33, 2),
    cartModalOpen = _useState34[0],
    setCartModalOpen = _useState34[1];
  var _useState35 = (0, _react.useState)(false),
    _useState36 = _slicedToArray(_useState35, 2),
    submitting = _useState36[0],
    setSubmitting = _useState36[1];
  var businessCartContainerRef = /*#__PURE__*/(0, _react.createRef)();
  var _useParams = (0, _reactRouterDom.useParams)(),
    orderTypeFromParams = _useParams.orderTypeFromParams,
    locationFromParams = _useParams.locationFromParams;
  var history = (0, _reactRouterDom.useHistory)();
  var inViewPort = businessCartContainerRef ? (0, _useIntersection.default)(businessCartContainerRef, '0px') : false;
  var isPreOrderSetting = (configState === null || configState === void 0 ? void 0 : (_configState$configs = configState.configs) === null || _configState$configs === void 0 ? void 0 : (_configState$configs$ = _configState$configs.preorder_status_enabled) === null || _configState$configs$ === void 0 ? void 0 : _configState$configs$.value) === '1';
  var currentCart = (_Object$values$find = Object.values(cart).find(function (cart) {
    var _cart$business;
    return (cart === null || cart === void 0 ? void 0 : (_cart$business = cart.business) === null || _cart$business === void 0 ? void 0 : _cart$business.slug) === (business === null || business === void 0 ? void 0 : business.slug);
  })) !== null && _Object$values$find !== void 0 ? _Object$values$find : {};
  var configTypes = ((_configState$configs2 = configState.configs) === null || _configState$configs2 === void 0 ? void 0 : (_configState$configs3 = _configState$configs2.order_types_allowed) === null || _configState$configs3 === void 0 ? void 0 : _configState$configs3.value.split('|').map(function (value) {
    return Number(value);
  })) || [];
  var _useState37 = (0, _react.useState)({
      isGetting: false,
      configTypes: configTypes
    }),
    _useState38 = _slicedToArray(_useState37, 2),
    customConfigTypes = _useState38[0],
    setCustomConfigTypes = _useState38[1];
  var _useState39 = (0, _react.useState)({
      price: 0,
      applicable: false
    }),
    _useState40 = _slicedToArray(_useState39, 2),
    offer = _useState40[0],
    setOffer = _useState40[1];
  var sortByOptions = [{
    value: null,
    content: t('SORT_BY', 'Sort By'),
    showOnSelected: t('SORT_BY', 'Sort By')
  }, {
    value: 'rank',
    content: t('RANK', 'Rank'),
    showOnSelected: t('RANK', 'Rank')
  }, {
    value: 'a-z',
    content: t('A_to_Z', 'A-Z'),
    showOnSelected: t('A_to_Z', 'A-Z')
  }];
  var handler = function handler() {
    setOpenBusinessInformation(true);
  };
  var closeAlert = function closeAlert() {
    setAlertState({
      open: false,
      content: [],
      onAccept: closeAlert,
      onClose: closeAlert
    });
  };
  var getCustomConfigTypes = function getCustomConfigTypes(menus) {
    if (!menus || Object.keys(menus).length === 0) {
      return;
    }
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
      if (isFirstRender && !orderTypeFromParams) {
        setIsFirstRender(false);
        if (shop.orderType) {
          // changeType(shop.orderType)
        } else {
          // changeType(array[0])
          options.type = array[0];
          setStateValues({
            options: options
          });
        }
      }
    });
    setCustomConfigTypes({
      isGetting: false,
      configTypes: array
    });
  };
  var onProductClick = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(product, hasOptions) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!(cart.length === 0 && !orderTypeFromParams)) {
              _context.next = 7;
              break;
            }
            _context.next = 3;
            return setFirstProduct({
              product: product,
              hasOptions: hasOptions
            });
          case 3:
            _context.next = 5;
            return setOrderOptionsModalIsOpen(true);
          case 5:
            dispatch({
              type: 'ADD_FIRST_PRODUCT',
              payload: {
                product: product,
                hasOptions: hasOptions
              }
            });

            // orderState.address = ''
            // orderState.location = {}
            // await changeAddress({ ...orderState })
            return _context.abrupt("return");
          case 7:
            if (hasOptions) {
              onProductRedirect({
                slug: business === null || business === void 0 ? void 0 : business.slug,
                product: product.id,
                category: product.category_id
              });
              setCurProduct(product);
              setModalIsOpen(true);
              events.emit('product_clicked', product);
            } else {
              product['selected_ingredients'] = {};
              product['options'] = {};
              dispatch({
                type: 'ADD_TO_CART',
                payload: {
                  product: product,
                  code: product.code,
                  business: business
                }
              });
            }
          case 8:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function onProductClick(_x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
  var onProductClickCustom = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(product, hasOptions) {
      var _options$address, _options$address2;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            if (!(options.type == 1 && (!(options !== null && options !== void 0 && (_options$address = options.address) !== null && _options$address !== void 0 && _options$address.location) || !(options !== null && options !== void 0 && (_options$address2 = options.address) !== null && _options$address2 !== void 0 && _options$address2.address)))) {
              _context2.next = 3;
              break;
            }
            setAlertState({
              open: true,
              content: ['Address Field is Required For Delivery Type'],
              onAccept: closeAlert,
              onClose: closeAlert
            });
            return _context2.abrupt("return");
          case 3:
            setFirstProduct({
              product: null,
              hasOptions: false
            });
            setOrderOptionsModalIsOpen(false);
            dispatch({
              type: 'ADD_FIRST_PRODUCT',
              payload: {}
            });
            if (!product) {
              _context2.next = 18;
              break;
            }
            if (!hasOptions) {
              _context2.next = 15;
              break;
            }
            _context2.next = 10;
            return onProductRedirect({
              slug: business === null || business === void 0 ? void 0 : business.slug,
              product: product.id,
              category: product.category_id
            });
          case 10:
            setCurProduct(product);
            setModalIsOpen(true);
            events.emit('product_clicked', product);
            _context2.next = 18;
            break;
          case 15:
            product['selected_ingredients'] = {};
            product['options'] = {};
            dispatch({
              type: 'ADD_TO_CART',
              payload: {
                product: product,
                code: product.code,
                business: business
              }
            });
          case 18:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function onProductClickCustom(_x4, _x5) {
      return _ref2.apply(this, arguments);
    };
  }();
  var handlerProductAction = function handlerProductAction(product) {
    if (Object.keys(product).length) {
      setModalIsOpen(false);
      onProductRedirect({
        slug: business === null || business === void 0 ? void 0 : business.slug
      });
    }
  };
  var closeModalProductForm = function closeModalProductForm() {
    setModalIsOpen(false);
    handleUpdateInitialRender(false);
    updateProductModal(null);
    setCurProduct(null);
    onProductRedirect({
      slug: business === null || business === void 0 ? void 0 : business.slug
    });
  };
  var handleScroll = (0, _react.useCallback)(function () {
    var _document$documentEle, _document$documentEle2;
    var innerHeightScrolltop = window.innerHeight + ((_document$documentEle = document.documentElement) === null || _document$documentEle === void 0 ? void 0 : _document$documentEle.scrollTop) + PIXELS_TO_SCROLL;
    var badScrollPosition = innerHeightScrolltop < ((_document$documentEle2 = document.documentElement) === null || _document$documentEle2 === void 0 ? void 0 : _document$documentEle2.offsetHeight);
    var hasMore = !(categoryState.pagination.totalPages === categoryState.pagination.currentPage);
    if (badScrollPosition || categoryState.loading || !hasMore) return;
    getNextProducts();
  }, [categoryState]);
  var handleChangePage = function handleChangePage(data) {
    if (Object.entries(data.query).length === 0 && openProduct) {
      setModalIsOpen(false);
    }
  };
  var handleUpsellingPage = function handleUpsellingPage() {
    onCheckoutRedirect(currentCart === null || currentCart === void 0 ? void 0 : currentCart.uuid);
    setOpenUpselling(false);
    setCanOpenUpselling(false);
  };
  var closeOrderOptionsModal = function closeOrderOptionsModal() {
    setOrderOptionsModalIsOpen(false);
  };
  var getOfferPrice = function getOfferPrice() {
    if (loading) return;
    if (business !== null && business !== void 0 && business.offers && !shop.couponCode) {
      var flag = false;
      business.offers.forEach(function (bOffer) {
        var validDate = (0, _utils.dateCheck)(moment(bOffer.start), moment(bOffer.end), moment());
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
  var handleChangeInput = function handleChangeInput(e) {
    if (e.target.name == 'order_id') {
      setInputOrderId(e.target.value);
    }
    if (e.target.name == 'cellphone') {
      setUserPhoneNumber(e.target.value);
    }
  };
  var handleGoToDetailsPage = function handleGoToDetailsPage() {
    events.emit('go_to_page', {
      page: 'order_detail',
      params: {
        orderId: inputOrderId,
        cellphone: userPhoneNumber,
        businessSlug: business === null || business === void 0 ? void 0 : business.slug
      },
      replace: true
    });
  };
  var handleViewOrderAction = function handleViewOrderAction() {
    setCartModalOpen(true);
    // businessCartContainerRef.current.scrollIntoView({ behavior: "smooth" });
  };

  var checkOrderExist = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(e) {
      var _result$customer, _options, response, _yield$response$json, _error, result;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            e.preventDefault();
            _context3.prev = 1;
            setSubmitting(true);
            _options = {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'x-api-key': _config.default.api.key
              }
            };
            _context3.next = 6;
            return fetch("https://apiv4.ordering.co/".concat(_config.default.api.version, "/").concat(_config.default.api.language, "/").concat(_config.default.project, "/orders/").concat(inputOrderId, "?mode=dashboard"), _options);
          case 6:
            response = _context3.sent;
            _context3.next = 9;
            return response.json();
          case 9:
            _yield$response$json = _context3.sent;
            _error = _yield$response$json.error;
            result = _yield$response$json.result;
            setSubmitting(false);
            if (!_error) {
              _context3.next = 16;
              break;
            }
            setAlertState({
              open: true,
              content: result,
              onAccept: closeAlert,
              onClose: closeAlert
            });
            return _context3.abrupt("return");
          case 16:
            if (!((result === null || result === void 0 ? void 0 : (_result$customer = result.customer) === null || _result$customer === void 0 ? void 0 : _result$customer.cellphone) != userPhoneNumber)) {
              _context3.next = 19;
              break;
            }
            setAlertState({
              open: true,
              content: [t('REQUESTED_ORDER_WAS_NOT_FOUND', 'Requested order was not found')],
              onAccept: closeAlert,
              onClose: closeAlert
            });
            return _context3.abrupt("return");
          case 19:
            handleGoToDetailsPage();
            _context3.next = 26;
            break;
          case 22:
            _context3.prev = 22;
            _context3.t0 = _context3["catch"](1);
            setSubmitting(false);
            console.log(_context3.t0);
          case 26:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[1, 22]]);
    }));
    return function checkOrderExist(_x6) {
      return _ref3.apply(this, arguments);
    };
  }();
  (0, _react.useEffect)(function () {
    !loading ? getOfferPrice() : null;
  }, [orderState, businessState, shop.totalPrice]);
  (0, _react.useEffect)(function () {
    if (categoryId && productId && isInitialRender) {
      var _productModal$product;
      if (productModal !== null && productModal !== void 0 && (_productModal$product = productModal.product) !== null && _productModal$product !== void 0 && _productModal$product.id) {
        setCurProduct(productModal.product);
      }
      setModalIsOpen(true);
    }
  }, [productModal]);
  (0, _react.useEffect)(function () {
    window.scrollTo(0, 0);
    if (categoryId && productId) {
      handleUpdateInitialRender(true);
    }
    events.emit('get_current_view');
  }, []);
  (0, _react.useEffect)(function () {
    events.on('change_view', handleChangePage);
    return function () {
      events.off('change_view', handleChangePage);
    };
  }, [openProduct]);
  (0, _react.useEffect)(function () {
    window.addEventListener('scroll', handleScroll);
    return function () {
      return window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
  (0, _react.useEffect)(function () {
    !loading ? getCustomConfigTypes(business === null || business === void 0 ? void 0 : business.menus) : null;
    if (!loading && business !== null && business !== undefined && Object.keys(business).length > 0) {
      dispatch({
        type: 'ADD_BUSINESS',
        payload: business
      });
      dispatch({
        type: 'ADD_TAX',
        payload: business === null || business === void 0 ? void 0 : business.tax
      });
      dispatch({
        type: 'ADD_SERVICE_FEE',
        payload: business === null || business === void 0 ? void 0 : business.service_fee
      });
    }
  }, [business]);
  var redirectToBusinessSlug = function redirectToBusinessSlug() {
    closeAlert();
    history.push('/' + (business === null || business === void 0 ? void 0 : business.slug));
  };
  var handleChanges = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
      var intOrderType, err;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            if (!(orderState.loading || loading)) {
              _context4.next = 3;
              break;
            }
            setRunChanges(!runChanges);
            return _context4.abrupt("return");
          case 3:
            if (!orderTypeFromParams) {
              _context4.next = 13;
              break;
            }
            intOrderType = (0, _utils.getOrderTypeInt)(orderTypeFromParams);
            if (!(intOrderType === 0 || intOrderType === 1 && !locationFromParams)) {
              _context4.next = 11;
              break;
            }
            err = [];
            if (intOrderType === 0) {
              err.push('Order type is not valid!');
            }
            if (intOrderType === 1 && !locationFromParams) {
              err.push('No Delivery Location Provided!');
            }
            setAlertState({
              open: true,
              content: err,
              onAccept: redirectToBusinessSlug,
              onClose: redirectToBusinessSlug
            });
            return _context4.abrupt("return");
          case 11:
            // changeType(intOrderType);
            options.type = intOrderType;
            setStateValues({
              options: options
            });
          case 13:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    return function handleChanges() {
      return _ref4.apply(this, arguments);
    };
  }();
  (0, _react.useEffect)(function () {
    if (orderState.loading) {
      setRunChangeMoment(!runChangeMoment);
      return;
    }
    if (options !== null && options !== void 0 && options.moment && shop.cart.length === 0) {
      setTimeout(function () {
        changeMoment(null);
      }, 1000);
    }
  }, [runChangeMoment]);
  (0, _react.useEffect)(function () {
    if (orderTypeFromParams) {
      handleChanges();
    }
  }, [runChanges]);
  (0, _react.useEffect)(function () {
    if (firstProduct.product) {
      var product = categoryState.products.find(function (prod) {
        var _firstProduct$product;
        return prod.id === (firstProduct === null || firstProduct === void 0 ? void 0 : (_firstProduct$product = firstProduct.product) === null || _firstProduct$product === void 0 ? void 0 : _firstProduct$product.id);
      });
      var hasOptions = (product === null || product === void 0 ? void 0 : product.ingredients) && Object.keys(product === null || product === void 0 ? void 0 : product.ingredients).length > 0 || (product === null || product === void 0 ? void 0 : product.options) && Object.keys(product === null || product === void 0 ? void 0 : product.options).length > 0;
      setFirstProduct({
        product: product,
        hasOptions: hasOptions
      });
    }
  }, [categoryState]);
  (0, _react.useEffect)(function () {
    if (business && Object.keys(business).length) {
      localStorage.setItem('previous-business', business === null || business === void 0 ? void 0 : business.slug);
    }
  }, [business]);
  (0, _react.useEffect)(function () {
    var _props$shop, _props$shop$firstProd, _props$shop2, _props$shop2$firstPro;
    if (props !== null && props !== void 0 && (_props$shop = props.shop) !== null && _props$shop !== void 0 && (_props$shop$firstProd = _props$shop.firstProduct) !== null && _props$shop$firstProd !== void 0 && _props$shop$firstProd.product && Object.keys(props === null || props === void 0 ? void 0 : (_props$shop2 = props.shop) === null || _props$shop2 === void 0 ? void 0 : (_props$shop2$firstPro = _props$shop2.firstProduct) === null || _props$shop2$firstPro === void 0 ? void 0 : _props$shop2$firstPro.product).length) {
      var _props$shop3;
      setFirstProduct(props === null || props === void 0 ? void 0 : (_props$shop3 = props.shop) === null || _props$shop3 === void 0 ? void 0 : _props$shop3.firstProduct);
      setOrderOptionsModalIsOpen(true);
    }
  }, []);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, (_props$beforeElements = props.beforeElements) === null || _props$beforeElements === void 0 ? void 0 : _props$beforeElements.map(function (BeforeElement, i) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: i
    }, BeforeElement);
  }), (_props$beforeComponen = props.beforeComponents) === null || _props$beforeComponen === void 0 ? void 0 : _props$beforeComponen.map(function (BeforeComponent, i) {
    return /*#__PURE__*/_react.default.createElement(BeforeComponent, _extends({
      key: i
    }, props));
  }), (!business || Object.keys(business).length === 0) && !loading ? /*#__PURE__*/_react.default.createElement(_orderingUi.NotFoundSource, {
    content: t('BUSINESS_NOT_FOUND', 'Business not found, pleas try another one!')
  }) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: windowSize.width < 450 ? '90%' : '100%',
      display: 'flex',
      flexDirection: 'row'
    }
  }, /*#__PURE__*/_react.default.createElement(_styles.BusinessContent, null, /*#__PURE__*/_react.default.createElement(_styles.WrapperBusinessLogo, null, !loading ? /*#__PURE__*/_react.default.createElement(_styles.BusinessLogo, {
    bgimage: optimizeImage((business === null || business === void 0 ? void 0 : business.logo) || ((_theme$images = theme.images) === null || _theme$images === void 0 ? void 0 : (_theme$images$dummies = _theme$images.dummies) === null || _theme$images$dummies === void 0 ? void 0 : _theme$images$dummies.businessLogo), 'h_200,c_limit')
  }) : /*#__PURE__*/_react.default.createElement(_reactLoadingSkeleton.default, {
    height: 45,
    width: 60
  })), /*#__PURE__*/_react.default.createElement(_styles.BusinessInfo, {
    className: "info"
  }, /*#__PURE__*/_react.default.createElement(_styles.BusinessInfoItem, null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginLeft: '5px'
    }
  }, !loading ? /*#__PURE__*/_react.default.createElement("p", {
    className: "bold"
  }, business === null || business === void 0 ? void 0 : business.name) : /*#__PURE__*/_react.default.createElement(_reactLoadingSkeleton.default, {
    width: 100
  }))))), /*#__PURE__*/_react.default.createElement(_styles.TrackOrderSection, {
    onClick: function onClick() {
      return showTrackOrderModal(true);
    }
  }, 'Track Order'), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '10%',
      margin: '10px',
      marginBottom: '0px',
      textAlign: 'right',
      justifyContent: 'right',
      alignItems: 'right'
    }
  }, /*#__PURE__*/_react.default.createElement(_orderingUi.LanguageSelector, null))), /*#__PURE__*/_react.default.createElement(_styles.Container, {
    style: windowSize.width < 1024 && !inViewPort ? {
      marginBottom: 20
    } : {}
  }, /*#__PURE__*/_react.default.createElement(_styles.ProductsContainer, null, !loading && (business === null || business === void 0 ? void 0 : business.id) && /*#__PURE__*/_react.default.createElement(_styles.WrappLayout, {
    isCartOnProductsList: isCartOnProductsList && (currentCart === null || currentCart === void 0 ? void 0 : (_currentCart$products = currentCart.products) === null || _currentCart$products === void 0 ? void 0 : _currentCart$products.length) > 0
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      maxHeight: '175px'
    }
  }, /*#__PURE__*/_react.default.createElement(_styles.BusinessHeader, {
    bgimage: business === null || business === void 0 ? void 0 : business.header,
    isSkeleton: loading && !error,
    isClosed: false
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: windowSize.width < 400 ? '95%' : '100%',
      position: 'absolute',
      bottom: '10px',
      left: '10px'
    }
  }, /*#__PURE__*/_react.default.createElement(_styles.DeliveryInfo, {
    isDelivery: options.type === 1
  }, options.type === 1 && (options === null || options === void 0 ? void 0 : (_options$address3 = options.address) === null || _options$address3 === void 0 ? void 0 : _options$address3.address) != '' && (options === null || options === void 0 ? void 0 : options.address) && Object.keys(options === null || options === void 0 ? void 0 : options.address).length > 0 && /*#__PURE__*/_react.default.createElement(_styles.DeliveryPrice, null, !(businessState !== null && businessState !== void 0 && businessState.loading) ? /*#__PURE__*/_react.default.createElement("h2", null, (businessState === null || businessState === void 0 ? void 0 : businessState.business) && parsePrice((businessState === null || businessState === void 0 ? void 0 : (_businessState$busine = businessState.business) === null || _businessState$busine === void 0 ? void 0 : _businessState$busine.delivery_price) || 0)) : /*#__PURE__*/_react.default.createElement(_reactLoadingSkeleton.default, {
    width: 70
  }), /*#__PURE__*/_react.default.createElement("p", null, t('DELIVERY_FEE', 'Delivery fee'))), ((options === null || options === void 0 ? void 0 : options.type) == 1 || (options === null || options === void 0 ? void 0 : options.type) == 2) && /*#__PURE__*/_react.default.createElement(_styles.DeliveryTime, {
    isDelivery: options.type === 1
  }, !(businessState !== null && businessState !== void 0 && businessState.loading) ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, (options === null || options === void 0 ? void 0 : options.type) === 1 ? /*#__PURE__*/_react.default.createElement("h2", null, parseInt((0, _orderingUi.convertHoursToMinutes)(businessState === null || businessState === void 0 ? void 0 : (_businessState$busine2 = businessState.business) === null || _businessState$busine2 === void 0 ? void 0 : _businessState$busine2.delivery_time))) : /*#__PURE__*/_react.default.createElement("h2", null, parseInt((0, _orderingUi.convertHoursToMinutes)(businessState === null || businessState === void 0 ? void 0 : (_businessState$busine3 = businessState.business) === null || _businessState$busine3 === void 0 ? void 0 : _businessState$busine3.pickup_time)))) : /*#__PURE__*/_react.default.createElement(_reactLoadingSkeleton.default, {
    width: 70
  }), /*#__PURE__*/_react.default.createElement("p", null, (options === null || options === void 0 ? void 0 : options.type) === 1 ? t('DELIVERY_APPROX_MINUTES', 'Delivery Approx Minutes') : t('PICKUP_APPROX_MINUTES', 'Pickup Approx Minutes'))), (isPreOrderSetting || (configState === null || configState === void 0 ? void 0 : (_configState$configs4 = configState.configs) === null || _configState$configs4 === void 0 ? void 0 : (_configState$configs5 = _configState$configs4.preorder_status_enabled) === null || _configState$configs5 === void 0 ? void 0 : _configState$configs5.value) === undefined) && /*#__PURE__*/_react.default.createElement(_styles.Preorder, {
    isDelivery: options.type === 1
  }, !(businessState !== null && businessState !== void 0 && businessState.loading) ? /*#__PURE__*/_react.default.createElement("h2", null, /*#__PURE__*/_react.default.createElement(_MomentControl.MomentControl, {
    isModalBehavior: true,
    business: businessState === null || businessState === void 0 ? void 0 : businessState.business
  })) : /*#__PURE__*/_react.default.createElement(_reactLoadingSkeleton.default, {
    width: 70
  }), /*#__PURE__*/_react.default.createElement("p", null, t('PREORDER', 'Preorder'))))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "bp-list"
  }, !((business === null || business === void 0 ? void 0 : (_business$categories = business.categories) === null || _business$categories === void 0 ? void 0 : _business$categories.length) === 0 && !categoryId) && /*#__PURE__*/_react.default.createElement(_BusinessProductsCategories.BusinessProductsCategories, {
    categories: [{
      id: null,
      name: t('ALL', 'All')
    }, {
      id: 'featured',
      name: t('FEATURED', 'Featured')
    }].concat(_toConsumableArray(business === null || business === void 0 ? void 0 : business.categories.sort(function (a, b) {
      return a.rank - b.rank;
    }))),
    categorySelected: categorySelected,
    onClickCategory: handleChangeCategory,
    featured: featuredProducts,
    openBusinessInformation: openBusinessInformation
  }), (categoryState.products.length !== 0 || searchValue) && !errorQuantityProducts && /*#__PURE__*/_react.default.createElement(_styles.WrapperSearch, {
    isDelivery: options.type === 1,
    id: "search-bar-id"
  }, /*#__PURE__*/_react.default.createElement(_theme_two.SearchBar, {
    isCustomLayout: true,
    onSearch: handleChangeSearch,
    search: searchValue,
    placeholder: t('SEARCH', 'Search'),
    lazyLoad: businessState === null || businessState === void 0 ? void 0 : (_businessState$busine4 = businessState.business) === null || _businessState$busine4 === void 0 ? void 0 : _businessState$busine4.lazy_load_products_recommended
  }), /*#__PURE__*/_react.default.createElement(_orderingUi.Select, {
    notAsync: true,
    notReload: true,
    options: sortByOptions,
    defaultValue: sortByValue,
    onChange: function onChange(val) {
      return handleChangeSortBy && handleChangeSortBy(val);
    },
    width: '10vw',
    style: {
      position: 'relative',
      zIndex: 0
    }
  })), /*#__PURE__*/_react.default.createElement(_styles.WrapContent, null, /*#__PURE__*/_react.default.createElement(_BusinessProductsList.BusinessProductsList, {
    categories: [{
      id: null,
      name: t('ALL', 'All')
    }, {
      id: 'featured',
      name: t('FEATURED', 'Featured')
    }].concat(_toConsumableArray(business === null || business === void 0 ? void 0 : business.categories.sort(function (a, b) {
      return a.rank - b.rank;
    }))),
    category: categorySelected,
    categoryState: categoryState,
    businessId: business.id,
    business: business,
    errors: errors,
    onProductClick: onProductClick,
    handleSearchRedirect: handleSearchRedirect,
    featured: featuredProducts,
    searchValue: searchValue,
    isCartOnProductsList: isCartOnProductsList && (currentCart === null || currentCart === void 0 ? void 0 : (_currentCart$products2 = currentCart.products) === null || _currentCart$products2 === void 0 ? void 0 : _currentCart$products2.length) > 0,
    handleClearSearch: handleChangeSearch,
    errorQuantityProducts: errorQuantityProducts,
    configTypes: customConfigTypes.configTypes.length > 0 ? customConfigTypes.configTypes : configTypes
  })))), loading && !error && /*#__PURE__*/_react.default.createElement(_styles.WrappLayout, null, /*#__PURE__*/_react.default.createElement(_BusinessBasicInformation.BusinessBasicInformation, {
    businessState: {
      business: {},
      loading: true
    },
    isSkeleton: true,
    handler: handler,
    openBusinessInformation: openBusinessInformation
  }), /*#__PURE__*/_react.default.createElement(_BusinessProductsCategories.BusinessProductsCategories, {
    categories: [],
    isSkeleton: true,
    openBusinessInformation: openBusinessInformation
  }), /*#__PURE__*/_react.default.createElement(_styles.WrapContent, null, /*#__PURE__*/_react.default.createElement(_BusinessProductsList.BusinessProductsList, {
    categories: [],
    category: categorySelected,
    categoryState: categoryState,
    isBusinessLoading: loading,
    errorQuantityProducts: errorQuantityProducts,
    configTypes: customConfigTypes.configTypes.length > 0 ? customConfigTypes.configTypes : configTypes
  })))), windowSize.width >= 440 && /*#__PURE__*/_react.default.createElement(_styles.BusinessCartContainer, {
    ref: businessCartContainerRef
  }, /*#__PURE__*/_react.default.createElement(_styles.BusinessCartInnerContainer, null, loading ? /*#__PURE__*/_react.default.createElement(_reactLoadingSkeleton.default, {
    height: 250
  }) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Cart.default, {
    isForceOpenCart: true,
    isCheckout: false,
    cart: currentCart,
    isCartPending: (currentCart === null || currentCart === void 0 ? void 0 : currentCart.status) === 2,
    isProducts: true,
    business: business,
    isCartOnProductsList: isCartOnProductsList,
    handleCartOpen: function handleCartOpen(val) {
      return setIsCartOpen(val);
    },
    configTypes: customConfigTypes.configTypes.length > 0 ? customConfigTypes.configTypes : configTypes
  }))))), /*#__PURE__*/_react.default.createElement(_Modal.Modal, {
    width: "70%",
    open: cartModalOpen,
    onClose: function onClose() {
      return setCartModalOpen(false);
    },
    padding: "10px"
  }, /*#__PURE__*/_react.default.createElement(_styles.BusinessCartContainer, {
    ref: businessCartContainerRef
  }, /*#__PURE__*/_react.default.createElement(_styles.BusinessCartInnerContainer, null, loading ? /*#__PURE__*/_react.default.createElement(_reactLoadingSkeleton.default, {
    height: 250
  }) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Cart.default, {
    isForceOpenCart: true,
    isCheckout: false,
    cart: currentCart,
    isCartPending: (currentCart === null || currentCart === void 0 ? void 0 : currentCart.status) === 2,
    isProducts: true,
    business: business,
    isCartOnProductsList: isCartOnProductsList,
    handleCartOpen: function handleCartOpen(val) {
      return setIsCartOpen(val);
    },
    configTypes: customConfigTypes.configTypes.length > 0 ? customConfigTypes.configTypes : configTypes
  }))))), !inViewPort && (cart === null || cart === void 0 ? void 0 : cart.length) > 0 && windowSize.width < 1024 && /*#__PURE__*/_react.default.createElement(_orderingUi.FloatingButton, {
    btnText: !loading ? t('VIEW_ORDER', 'View Order') : t('LOADING', 'Loading'),
    isSecondaryBtn: false,
    btnValue: cart === null || cart === void 0 ? void 0 : cart.length,
    handleClick: function handleClick() {
      return handleViewOrderAction();
    },
    disabled: cart.length <= 0 || orderState.loading
  }), /*#__PURE__*/_react.default.createElement(_Modal.Modal, {
    width: "70%",
    open: openProduct,
    closeOnBackdrop: true,
    onClose: function onClose() {
      return closeModalProductForm();
    },
    padding: "10",
    isProductForm: true
  }, productModal.loading && !productModal.error && /*#__PURE__*/_react.default.createElement(_styles.ProductLoading, null, /*#__PURE__*/_react.default.createElement(_styles.SkeletonItem, null, /*#__PURE__*/_react.default.createElement(_reactLoadingSkeleton.default, {
    height: 45,
    count: 8
  }))), (productModal.product || curProduct) && /*#__PURE__*/_react.default.createElement(_ProductForm.default, {
    businessSlug: business === null || business === void 0 ? void 0 : business.slug,
    business: business,
    product: productModal.product || curProduct,
    businessId: business === null || business === void 0 ? void 0 : business.id,
    onSave: handlerProductAction
  })), /*#__PURE__*/_react.default.createElement(_Modal.Modal, {
    width: "70%",
    padding: "30px",
    closeOnBackdrop: false,
    open: orderOptionsModalIsOpen,
    onClose: function onClose() {
      return closeOrderOptionsModal();
    },
    disableOnAccept: options.type == 1 && ((options === null || options === void 0 ? void 0 : (_options$address4 = options.address) === null || _options$address4 === void 0 ? void 0 : _options$address4.address) == '' || (options === null || options === void 0 ? void 0 : options.address) && Object.keys(options === null || options === void 0 ? void 0 : options.address).length == 0),
    onAccept: function onAccept() {
      return onProductClickCustom(firstProduct.product, firstProduct.hasOptions);
    }
  }, loading && !error ? /*#__PURE__*/_react.default.createElement(_styles.SkeletonItem, {
    style: {
      width: windowSize.width < 400 ? '95%' : '100%',
      padding: '20px',
      alignItems: 'left',
      justifyContent: 'left',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/_react.default.createElement(_reactLoadingSkeleton.default, {
    height: 70,
    width: 250,
    count: 1
  }), /*#__PURE__*/_react.default.createElement(_reactLoadingSkeleton.default, {
    height: 140,
    width: 400,
    count: 1
  }), /*#__PURE__*/_react.default.createElement(_reactLoadingSkeleton.default, {
    height: 90,
    width: 270,
    count: 1
  })) : /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: windowSize.width < 400 ? '95%' : '100%'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: windowSize.width < 400 ? '95%' : '100%',
      paddingBottom: '10px'
    }
  }, /*#__PURE__*/_react.default.createElement("h4", {
    style: {
      margin: '7px'
    }
  }, "1. ", t('SELECT_YOUR_ORDER_TYPE', 'Select your order type')), /*#__PURE__*/_react.default.createElement(_OrderTypeSelectorHeader.OrderTypeSelectorHeader, {
    configTypes: customConfigTypes.configTypes.length > 0 ? customConfigTypes.configTypes : configTypes
  })), options.type == 1 && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_CustomStyleAddressDetails.CustomStyleAddressDetails, {
    location: business === null || business === void 0 ? void 0 : business.location,
    businessLogo: (business === null || business === void 0 ? void 0 : business.logo) || ((_theme$images2 = theme.images) === null || _theme$images2 === void 0 ? void 0 : (_theme$images2$dummie = _theme$images2.dummies) === null || _theme$images2$dummie === void 0 ? void 0 : _theme$images2$dummie.businessLogo),
    isCartPending: false,
    businessId: business === null || business === void 0 ? void 0 : business.id,
    apiKey: (_configState$configs6 = configState.configs) === null || _configState$configs6 === void 0 ? void 0 : (_configState$configs7 = _configState$configs6.google_maps_api_key) === null || _configState$configs7 === void 0 ? void 0 : _configState$configs7.value,
    mapConfigs: mapConfigs,
    isCustomerMode: true,
    business: business
  }), ((options === null || options === void 0 ? void 0 : (_options$address5 = options.address) === null || _options$address5 === void 0 ? void 0 : _options$address5.address) == '' || (options === null || options === void 0 ? void 0 : options.address) && Object.keys(options === null || options === void 0 ? void 0 : options.address).length == 0) && /*#__PURE__*/_react.default.createElement("div", {
    style: {
      textAlign: 'center',
      color: theme.colors.primary
    }
  }, t('INVALID_ADDRESS', 'Invalid address details.'))), (isPreOrderSetting || (configState === null || configState === void 0 ? void 0 : (_configState$configs8 = configState.configs) === null || _configState$configs8 === void 0 ? void 0 : (_configState$configs9 = _configState$configs8.preorder_status_enabled) === null || _configState$configs9 === void 0 ? void 0 : _configState$configs9.value) === undefined) && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("h4", {
    style: {
      margin: '7px'
    }
  }, "3. ", t('SELECT_ORDER_TIME', 'Select order time')), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '20%'
    }
  }, /*#__PURE__*/_react.default.createElement(_MomentControl.MomentControl, {
    isModalBehavior: true,
    business: businessState === null || businessState === void 0 ? void 0 : businessState.business
  }))))), /*#__PURE__*/_react.default.createElement(_Modal.Modal, {
    width: "70%",
    open: trackOrderModal,
    onClose: function onClose() {
      return showTrackOrderModal(false);
    },
    padding: "20px"
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/_react.default.createElement(_styles.FormInput, {
    onSubmit: checkOrderExist
  }, /*#__PURE__*/_react.default.createElement(_Inputs.Input, {
    style: {
      width: '100%'
    },
    type: 'number',
    name: 'order_id',
    className: "form",
    disabled: submitting,
    placeholder: t('ORDER_ID', 'Order ID'),
    onChange: handleChangeInput,
    autoComplete: "off"
  }), /*#__PURE__*/_react.default.createElement(_Inputs.Input, {
    style: {
      width: '100%'
    },
    type: 'phone',
    name: 'cellphone',
    className: "form",
    disabled: submitting,
    placeholder: t('CELLPHONE', 'Phone'),
    onChange: handleChangeInput,
    autoComplete: "off"
  }), /*#__PURE__*/_react.default.createElement(_styles.ActionsForm, null, /*#__PURE__*/_react.default.createElement(_Buttons.Button, {
    id: "form-btn",
    color: "primary",
    type: "button",
    disabled: inputOrderId == null || !inputOrderId || submitting || !userPhoneNumber,
    onClick: checkOrderExist
  }, t('TRACK_ORDER', 'Track Order')))))), /*#__PURE__*/_react.default.createElement(_Modal.Modal, {
    width: "70%",
    open: openAddressForm,
    onClose: function onClose() {
      return setOpenAddressForm(false);
    },
    padding: "20px"
  }, /*#__PURE__*/_react.default.createElement(_AddressForm.AddressForm, {
    business: business,
    useValidationFileds: true,
    address: (orderState === null || orderState === void 0 ? void 0 : (_orderState$options = orderState.options) === null || _orderState$options === void 0 ? void 0 : _orderState$options.address) || {},
    onCancel: function onCancel() {
      return setOpenAddressForm(false);
    },
    onSaveAddress: function onSaveAddress() {
      return setOpenAddressForm(false);
    }
  })), /*#__PURE__*/_react.default.createElement(_orderingUi.Alert, {
    title: t('INFORMATION', 'Information'),
    content: alertState.content,
    acceptText: t('ACCEPT', 'Accept'),
    open: alertState.open,
    onClose: alertState.onClose,
    onAccept: alertState.onAccept,
    closeOnBackdrop: false
  })), (_props$afterComponent = props.afterComponents) === null || _props$afterComponent === void 0 ? void 0 : _props$afterComponent.map(function (AfterComponent, i) {
    return /*#__PURE__*/_react.default.createElement(AfterComponent, _extends({
      key: i
    }, props));
  }), (_props$afterElements = props.afterElements) === null || _props$afterElements === void 0 ? void 0 : _props$afterElements.map(function (AfterElement, i) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: i
    }, AfterElement);
  }));
};
var BusinessProductsListing = function BusinessProductsListing(props) {
  var _useState41 = (0, _react.useState)(false),
    _useState42 = _slicedToArray(_useState41, 2),
    isInitialRender = _useState42[0],
    setIsInitialRender = _useState42[1];
  var businessProductslistingProps = _objectSpread(_objectSpread({}, props), {}, {
    UIComponent: BusinessProductsListingUI,
    isInitialRender: isInitialRender,
    handleUpdateInitialRender: function handleUpdateInitialRender(val) {
      return setIsInitialRender(val);
    }
  });
  return /*#__PURE__*/_react.default.createElement(_BusinessAndProductList.BusinessAndProductList, businessProductslistingProps);
};
var _default = BusinessProductsListing;
exports.default = _default;