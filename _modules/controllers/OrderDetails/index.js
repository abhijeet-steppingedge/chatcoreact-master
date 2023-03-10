"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrderDetails = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _orderingComponents = require("ordering-components");
var _config = _interopRequireDefault(require("../../config.json"));
var _reactRouterDom = require("react-router-dom");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var OrderDetails = function OrderDetails(props) {
  var _props$order, _props$order2, _props$order2$driver, _orderState$order, _orderState$order$dri;
  var order_id = props.order_id,
    cell_phone = props.cell_phone,
    business_slug = props.business_slug,
    hashKey = props.hashKey,
    UIComponent = props.UIComponent,
    userCustomerId = props.userCustomerId,
    isFetchDrivers = props.isFetchDrivers,
    driverAndBusinessId = props.driverAndBusinessId,
    sendCustomMessage = props.sendCustomMessage,
    isDisabledOrdersRoom = props.isDisabledOrdersRoom;
  var user = _config.default.ordering_customer;
  var token = _config.default.ordering_customer.session.access_token;
  var accessToken = props.accessToken || token;
  var _useApi = (0, _orderingComponents.useApi)(),
    _useApi2 = _slicedToArray(_useApi, 1),
    ordering = _useApi2[0];
  var _useLanguage = (0, _orderingComponents.useLanguage)(),
    _useLanguage2 = _slicedToArray(_useLanguage, 2),
    t = _useLanguage2[1];
  var _useEvent = (0, _orderingComponents.useEvent)(),
    _useEvent2 = _slicedToArray(_useEvent, 1),
    events = _useEvent2[0];
  var _useParams = (0, _reactRouterDom.useParams)(),
    orderId = _useParams.orderId,
    cellphone = _useParams.cellphone,
    businessSlug = _useParams.businessSlug;
  var _useState = (0, _react.useState)({
      order: (_props$order = props.order) !== null && _props$order !== void 0 ? _props$order : null,
      businessData: {},
      loading: !props.order,
      error: null
    }),
    _useState2 = _slicedToArray(_useState, 2),
    orderState = _useState2[0],
    setOrderState = _useState2[1];
  var _useState3 = (0, _react.useState)({
      drivers: [],
      loadingDriver: false,
      error: null
    }),
    _useState4 = _slicedToArray(_useState3, 2),
    drivers = _useState4[0],
    setDrivers = _useState4[1];
  var _useState5 = (0, _react.useState)({
      status: null,
      loading: false,
      error: null
    }),
    _useState6 = _slicedToArray(_useState5, 2),
    messageErrors = _useState6[0],
    setMessageErrors = _useState6[1];
  var _useState7 = (0, _react.useState)({
      loading: true,
      error: null,
      messages: []
    }),
    _useState8 = _slicedToArray(_useState7, 2),
    messages = _useState8[0],
    setMessages = _useState8[1];
  var socket = (0, _orderingComponents.useWebsocket)();
  var _useState9 = (0, _react.useState)(((_props$order2 = props.order) === null || _props$order2 === void 0 ? void 0 : (_props$order2$driver = _props$order2.driver) === null || _props$order2$driver === void 0 ? void 0 : _props$order2$driver.location) || ((_orderState$order = orderState.order) === null || _orderState$order === void 0 ? void 0 : (_orderState$order$dri = _orderState$order.driver) === null || _orderState$order$dri === void 0 ? void 0 : _orderState$order$dri.location) || null),
    _useState10 = _slicedToArray(_useState9, 2),
    driverLocation = _useState10[0],
    setDriverLocation = _useState10[1];
  var _useState11 = (0, _react.useState)(false),
    _useState12 = _slicedToArray(_useState11, 2),
    messagesReadList = _useState12[0],
    setMessagesReadList = _useState12[1];
  var _useState13 = (0, _react.useState)({
      loading: false,
      error: null,
      newLocation: null
    }),
    _useState14 = _slicedToArray(_useState13, 2),
    driverUpdateLocation = _useState14[0],
    setDriverUpdateLocation = _useState14[1];
  var _useState15 = (0, _react.useState)(null),
    _useState16 = _slicedToArray(_useState15, 2),
    forceUpdate = _useState16[0],
    setForceUpdate = _useState16[1];
  var propsToFetch = [];
  var deliveryMessages = {
    delivery: {
      text: 'outside delivery area, insert reasons to force update',
      value: 11
    },
    pickup: {
      text: 'outside pickup area, insert reasons to force update',
      value: 9
    }
  };
  var requestsState = {};

  /**
   * Method to format a price number
   * @param {Number} price
   */
  var formatPrice = function formatPrice(price) {
    return price && "$ ".concat(price.toFixed(2));
  };

  /**
   * Method to Load message for first time
   */
  // const loadMessages = async () => {
  //   try {
  //     setMessages({ ...messages, loading: true })
  //     const url = (userCustomerId || driverAndBusinessId)
  //       ? `${ordering.root}/orders/${orderState.order?.id}/messages?mode=dashboard`
  //       : `${ordering.root}/orders/${orderState.order?.id}/messages`
  //     const response = await fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` } })
  //     const { error, result } = await response.json()
  //     if (!error) {
  //       setMessages({
  //         messages: result,
  //         loading: false,
  //         error: null
  //       })
  //     } else {
  //       setMessages({
  //         ...messages,
  //         loading: false,
  //         error: result
  //       })
  //     }
  //   } catch (error) {
  //     setMessages({ ...messages, loading: false, error: [error.Messages] })
  //   }
  // }

  /**
   * Method to send a message
   * @param {string} spot
   */
  var sendMessage = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(spot) {
      var _orderState$order2, _orderState$order3, _yield$fetch, status;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!sendCustomMessage) {
              _context.next = 2;
              break;
            }
            return _context.abrupt("return", sendCustomMessage(spot));
          case 2:
            _context.prev = 2;
            setMessageErrors(_objectSpread(_objectSpread({}, messageErrors), {}, {
              loading: true
            }));
            _context.next = 6;
            return fetch("".concat(ordering.root, "/orders/").concat((_orderState$order2 = orderState.order) === null || _orderState$order2 === void 0 ? void 0 : _orderState$order2.id, "/messages"), {
              method: 'post',
              headers: {
                Authorization: "Bearer ".concat(token),
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                can_see: '0,2,3',
                comment: "I am on the parking number: ".concat(spot),
                order_id: (_orderState$order3 = orderState.order) === null || _orderState$order3 === void 0 ? void 0 : _orderState$order3.id,
                type: 2
              })
            });
          case 6:
            _yield$fetch = _context.sent;
            status = _yield$fetch.status;
            setMessageErrors(_objectSpread(_objectSpread({}, messageErrors), {}, {
              loading: false,
              status: status
            }));
            _context.next = 14;
            break;
          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](2);
            setMessageErrors(_objectSpread(_objectSpread({}, messageErrors), {}, {
              loading: false,
              error: [_context.t0.message]
            }));
          case 14:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[2, 11]]);
    }));
    return function sendMessage(_x2) {
      return _ref.apply(this, arguments);
    };
  }();

  /**
   * Method to update differents orders status
  */
  var handleChangeOrderStatus = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(status) {
      var isAcceptOrReject,
        _orderState$order$id,
        _orderState$order4,
        bodyToSend,
        _yield$ordering$setAc,
        _yield$ordering$setAc2,
        result,
        error,
        selected,
        message,
        defaultMessage,
        _args2 = arguments;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            isAcceptOrReject = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
            _context2.prev = 1;
            bodyToSend = Object.keys(isAcceptOrReject || {}).length > 0 ? isAcceptOrReject : {
              status: status
            };
            setOrderState(_objectSpread(_objectSpread({}, orderState), {}, {
              loading: true
            }));
            _context2.next = 6;
            return ordering.setAccessToken(token).orders((_orderState$order$id = (_orderState$order4 = orderState.order) === null || _orderState$order4 === void 0 ? void 0 : _orderState$order4.id) !== null && _orderState$order$id !== void 0 ? _orderState$order$id : order_id).save(bodyToSend);
          case 6:
            _yield$ordering$setAc = _context2.sent;
            _yield$ordering$setAc2 = _yield$ordering$setAc.content;
            result = _yield$ordering$setAc2.result;
            error = _yield$ordering$setAc2.error;
            if (!error) {
              setOrderState(_objectSpread(_objectSpread({}, orderState), {}, {
                order: result,
                loading: false
              }));
            }
            if (error) {
              selected = result.includes(deliveryMessages.delivery.text) ? deliveryMessages.delivery : result.includes(deliveryMessages.pickup.text) ? deliveryMessages.pickup : null;
              if (selected) {
                setForceUpdate(null);
                setOrderState(_objectSpread(_objectSpread({}, orderState), {}, {
                  loading: false
                }));
                setForceUpdate(selected.value);
              } else {
                message = Array.isArray(result) ? result[0] : typeof result === 'string' ? result : 'INTERNAL_ERROR';
                defaultMessage = message !== 'INTERNAL_ERROR' ? message : t('INTERNAL_ERROR', 'Internal Error');
                setOrderState(_objectSpread(_objectSpread({}, orderState), {}, {
                  error: [defaultMessage],
                  loading: false
                }));
              }
            }
            _context2.next = 17;
            break;
          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](1);
            setOrderState(_objectSpread(_objectSpread({}, orderState), {}, {
              loading: false,
              error: [(_context2.t0 === null || _context2.t0 === void 0 ? void 0 : _context2.t0.message) || t('NETWORK_ERROR', 'Network Error')]
            }));
          case 17:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[1, 14]]);
    }));
    return function handleChangeOrderStatus(_x3) {
      return _ref2.apply(this, arguments);
    };
  }();
  var updateDriverPosition = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var newLocation,
        _yield$ordering$setAc3,
        _yield$ordering$setAc4,
        error,
        result,
        _args3 = arguments;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            newLocation = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
            _context3.prev = 1;
            setDriverLocation(_objectSpread(_objectSpread({}, driverUpdateLocation), {}, {
              loading: true
            }));
            _context3.next = 5;
            return ordering.setAccessToken(token).users(user === null || user === void 0 ? void 0 : user.id).driverLocations().save(newLocation);
          case 5:
            _yield$ordering$setAc3 = _context3.sent;
            _yield$ordering$setAc4 = _yield$ordering$setAc3.content;
            error = _yield$ordering$setAc4.error;
            result = _yield$ordering$setAc4.result;
            if (error) {
              setDriverUpdateLocation(_objectSpread(_objectSpread({}, driverUpdateLocation), {}, {
                loading: false,
                error: [result[0] || result || t('ERROR_UPDATING_POSITION', 'Error updating position')]
              }));
            } else {
              setDriverUpdateLocation(_objectSpread(_objectSpread({}, driverUpdateLocation), {}, {
                loading: false,
                newLocation: _objectSpread(_objectSpread({}, newLocation), result)
              }));
            }
            _context3.next = 15;
            break;
          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](1);
            setDriverUpdateLocation(_objectSpread(_objectSpread({}, driverUpdateLocation), {}, {
              loading: false,
              error: [(_context3.t0 === null || _context3.t0 === void 0 ? void 0 : _context3.t0.message) || t('NETWORK_ERROR', 'Network Error')]
            }));
          case 15:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[1, 12]]);
    }));
    return function updateDriverPosition() {
      return _ref3.apply(this, arguments);
    };
  }();

  /**
     * Method to assign a driver for order
  */
  var handleAssignDriver = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(driverId) {
      var _orderState$order$id2, _orderState$order5, bodyToSend, _yield$ordering$setAc5, _yield$ordering$setAc6, error, result, _drivers$error;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            bodyToSend = {
              driver_id: driverId
            };
            setOrderState(_objectSpread(_objectSpread({}, orderState), {}, {
              loading: true
            }));
            _context4.next = 5;
            return ordering.setAccessToken(token).orders((_orderState$order$id2 = orderState === null || orderState === void 0 ? void 0 : (_orderState$order5 = orderState.order) === null || _orderState$order5 === void 0 ? void 0 : _orderState$order5.id) !== null && _orderState$order$id2 !== void 0 ? _orderState$order$id2 : order_id).save(bodyToSend);
          case 5:
            _yield$ordering$setAc5 = _context4.sent;
            _yield$ordering$setAc6 = _yield$ordering$setAc5.content;
            error = _yield$ordering$setAc6.error;
            result = _yield$ordering$setAc6.result;
            setOrderState(_objectSpread(_objectSpread({}, orderState), {}, {
              loading: false,
              order: result,
              error: error ? result : null
            }));
            _context4.next = 15;
            break;
          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](0);
            setOrderState(_objectSpread(_objectSpread({}, orderState), {}, {
              loading: false,
              error: _context4.t0 !== null && _context4.t0 !== void 0 && _context4.t0.message ? (_drivers$error = drivers.error) === null || _drivers$error === void 0 ? void 0 : _drivers$error.push(_context4.t0 === null || _context4.t0 === void 0 ? void 0 : _context4.t0.message) : ['ERROR']
            }));
          case 15:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 12]]);
    }));
    return function handleAssignDriver(_x4) {
      return _ref4.apply(this, arguments);
    };
  }();

  /**
   * handler send message with spot info
   * @param {number} param0
   */
  // const handlerSubmitSpotNumber = ({ spot }) => {
  //   sendMessage(spot)
  // }

  /**
   * Method to get order from API
   */
  var getOrder = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
      var source, options, _result$customer, _businessData, _options, response, _yield$response$json, error, result, order, err, businessData, _yield$ordering$setAc7, content, phone, slug, _orderState$error;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            source = {};
            requestsState.order = source;
            requestsState.business = source;
            options = {};
            if (hashKey) {
              options.headers = {
                'X-uuid-access-X': hashKey
              };
            }
            if (userCustomerId || driverAndBusinessId) {
              options.query = {
                mode: 'dashboard'
              };
            }
            _context5.prev = 6;
            // const { content: { error, result } } = await ordering.setAccessToken(token).orders(order_id).get({ ...options, cancelToken: source })
            _options = {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'x-api-key': _config.default.api.key
              }
            };
            _context5.next = 10;
            return fetch("https://apiv4.ordering.co/".concat(_config.default.api.version, "/").concat(_config.default.api.language, "/").concat(_config.default.project, "/orders/").concat(orderId || order_id, "?mode=dashboard"), _options);
          case 10:
            response = _context5.sent;
            _context5.next = 13;
            return response.json();
          case 13:
            _yield$response$json = _context5.sent;
            error = _yield$response$json.error;
            result = _yield$response$json.result;
            order = error ? null : result;
            err = error ? result : [];
            businessData = null;
            _context5.prev = 19;
            _context5.next = 22;
            return ordering.setAccessToken(token).businesses(order.business_id).select(propsToFetch).get({
              cancelToken: source
            });
          case 22:
            _yield$ordering$setAc7 = _context5.sent;
            content = _yield$ordering$setAc7.content;
            businessData = content.result;
            content.error && err.push(content.result[0]);
            _context5.next = 31;
            break;
          case 28:
            _context5.prev = 28;
            _context5.t0 = _context5["catch"](19);
            err.push(_context5.t0.message);
          case 31:
            phone = cellphone || cell_phone;
            slug = businessSlug || business_slug;
            if ((result === null || result === void 0 ? void 0 : (_result$customer = result.customer) === null || _result$customer === void 0 ? void 0 : _result$customer.cellphone) != phone || ((_businessData = businessData) === null || _businessData === void 0 ? void 0 : _businessData.slug) != slug) {
              err.push(t('REQUESTED_ORDER_WAS_NOT_FOUND', 'Sorry, Requested order was not found'));
              businessData = null;
              order = null;
            }

            // if (isFetchDrivers) {
            //   getDrivers(order?.id ?? order_id)
            // }

            setOrderState(_objectSpread(_objectSpread({}, orderState), {}, {
              loading: false,
              order: order,
              businessData: businessData,
              error: err.length > 0 ? err : null
            }));
            _context5.next = 40;
            break;
          case 37:
            _context5.prev = 37;
            _context5.t1 = _context5["catch"](6);
            setOrderState(_objectSpread(_objectSpread({}, orderState), {}, {
              loading: false,
              error: _context5.t1.message ? (_orderState$error = orderState.error) === null || _orderState$error === void 0 ? void 0 : _orderState$error.push(_context5.t1 === null || _context5.t1 === void 0 ? void 0 : _context5.t1.message) : ['ERROR']
            }));
          case 40:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[6, 37], [19, 28]]);
    }));
    return function getOrder() {
      return _ref5.apply(this, arguments);
    };
  }();
  var readMessages = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
      var _messages$messages, _messages$messages2;
      var messageId, _orderState$order6, response, _yield$response$json2, result;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            messageId = messages === null || messages === void 0 ? void 0 : (_messages$messages = messages.messages[(messages === null || messages === void 0 ? void 0 : (_messages$messages2 = messages.messages) === null || _messages$messages2 === void 0 ? void 0 : _messages$messages2.length) - 1]) === null || _messages$messages === void 0 ? void 0 : _messages$messages.id;
            if (messageId) {
              _context6.next = 3;
              break;
            }
            return _context6.abrupt("return");
          case 3:
            _context6.prev = 3;
            _context6.next = 6;
            return fetch("".concat(ordering.root, "/orders/").concat((_orderState$order6 = orderState.order) === null || _orderState$order6 === void 0 ? void 0 : _orderState$order6.id, "/messages/").concat(messageId, "/read"), {
              method: 'GET',
              headers: {
                Authorization: "Bearer ".concat(token),
                'Content-Type': 'application/json'
              }
            });
          case 6:
            response = _context6.sent;
            _context6.next = 9;
            return response.json();
          case 9:
            _yield$response$json2 = _context6.sent;
            result = _yield$response$json2.result;
            setMessagesReadList(result);
            _context6.next = 17;
            break;
          case 14:
            _context6.prev = 14;
            _context6.t0 = _context6["catch"](3);
            console.log(_context6.t0.message);
          case 17:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[3, 14]]);
    }));
    return function readMessages() {
      return _ref6.apply(this, arguments);
    };
  }();
  var getDrivers = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(order_id) {
      var _yield$ordering$setAc8, _yield$ordering$setAc9, error, result, _drivers$error2;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            setDrivers(_objectSpread(_objectSpread({}, drivers), {}, {
              loadingDriver: true
            }));
            _context7.next = 4;
            return ordering.setAccessToken(token).controls(order_id).get();
          case 4:
            _yield$ordering$setAc8 = _context7.sent;
            _yield$ordering$setAc9 = _yield$ordering$setAc8.content;
            error = _yield$ordering$setAc9.error;
            result = _yield$ordering$setAc9.result;
            setDrivers(_objectSpread(_objectSpread({}, drivers), {}, {
              loadingDriver: false,
              drivers: result.drivers,
              error: error ? result : null
            }));
            _context7.next = 14;
            break;
          case 11:
            _context7.prev = 11;
            _context7.t0 = _context7["catch"](0);
            setDrivers(_objectSpread(_objectSpread({}, drivers), {}, {
              loadingDriver: false,
              error: _context7.t0 !== null && _context7.t0 !== void 0 && _context7.t0.message ? (_drivers$error2 = drivers.error) === null || _drivers$error2 === void 0 ? void 0 : _drivers$error2.push(_context7.t0 === null || _context7.t0 === void 0 ? void 0 : _context7.t0.message) : ['ERROR']
            }));
          case 14:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[0, 11]]);
    }));
    return function getDrivers(_x5) {
      return _ref7.apply(this, arguments);
    };
  }();

  // useEffect(() => {
  //   !orderState.loading && loadMessages()
  // }, [order_id, orderState?.order?.status, orderState.loading])

  (0, _react.useEffect)(function () {
    if (props.order) {
      setOrderState(_objectSpread(_objectSpread({}, orderState), {}, {
        loading: false,
        order: props.order
      }));
    } else {
      getOrder();
    }
    return function () {
      if (requestsState.orders) {
        requestsState.orders.cancel();
      }
      if (requestsState.business) {
        requestsState.business.cancel();
      }
    };
  }, [props.order]);

  // useEffect(() => {
  //   if (orderState.loading || loading) return
  //   const handleUpdateOrder = (order) => {
  //     if (order?.id !== orderState.order?.id) return
  //     showToast(ToastType.Info, t('UPDATING_ORDER', 'Updating order...'), 1000)
  //     delete order.total
  //     delete order.subtotal
  //     setOrderState({
  //       ...orderState,
  //       order: Object.assign(orderState.order, order)
  //     })

  //     // loadMessages()
  //   }
  //   const handleTrackingDriver = ({ location }) => {
  //     const newLocation = location ?? { lat: -37.9722342, lng: 144.7729561 }
  //     setDriverLocation(newLocation)
  //   }
  //   const ordersRoom = user?.level === 0 ? 'orders' : `orders_${userCustomerId || user?.id}`
  //   if (!isDisabledOrdersRoom) socket.join(ordersRoom)
  //   socket.join(`drivers_${orderState.order?.driver_id}`)
  //   socket.on('tracking_driver', handleTrackingDriver)
  //   socket.on('update_order', handleUpdateOrder)
  //   return () => {
  //     if (!isDisabledOrdersRoom) socket.leave(ordersRoom)
  //     socket.leave(`drivers_${orderState.order?.driver_id}`)
  //     socket.off('update_order', handleUpdateOrder)
  //     socket.off('tracking_driver', handleTrackingDriver)
  //   }
  // }, [orderState.order, socket, loading, userCustomerId])

  // useEffect(() => {
  //   if (messages.loading) return
  //   const handleNewMessage = (message) => {
  //     const found = messages.messages.find(_message => _message.id === message.id)
  //     if (!found) {
  //       setMessages({
  //         ...messages,
  //         messages: [...messages.messages, message]
  //       })
  //     }
  //   }
  //   socket.on('message', handleNewMessage)
  //   return () => {
  //     socket.off('message', handleNewMessage)
  //   }
  // }, [messages, socket, orderState.order?.status, userCustomerId])

  // useEffect(() => {
  //   const messagesOrdersRoom = user?.level === 0 ? 'messages_orders' : `messages_orders_${userCustomerId || user?.id}`
  //   socket.join(messagesOrdersRoom)
  //   return () => {
  //     // neccesary refactor
  //     if (!isDisabledOrdersRoom) socket.leave(messagesOrdersRoom)
  //   }
  // }, [socket, userCustomerId])

  (0, _react.useEffect)(function () {
    var handleCustomerReviewed = function handleCustomerReviewed(review) {
      setOrderState(_objectSpread(_objectSpread({}, orderState), {}, {
        order: _objectSpread(_objectSpread({}, orderState.order), {}, {
          user_review: review
        })
      }));
    };
    events.on('customer_reviewed', handleCustomerReviewed);
    return function () {
      events.off('customer_reviewed', handleCustomerReviewed);
    };
  }, [orderState]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, UIComponent && /*#__PURE__*/_react.default.createElement(UIComponent, _extends({}, props, {
    order: orderState,
    updateDriverPosition: updateDriverPosition,
    driverLocation: driverLocation,
    messageErrors: messageErrors,
    formatPrice: formatPrice,
    handleAssignDriver: handleAssignDriver
    // handlerSubmit={handlerSubmitSpotNumber}
    ,
    handleChangeOrderStatus: handleChangeOrderStatus
    // messages={messages}
    ,
    drivers: drivers,
    setMessages: setMessages
    // readMessages={readMessages}
    // messagesReadList={messagesReadList}
    ,
    driverUpdateLocation: driverUpdateLocation,
    setDriverUpdateLocation: setDriverUpdateLocation,
    forceUpdate: forceUpdate
  })));
};
exports.OrderDetails = OrderDetails;
OrderDetails.propTypes = {
  /**
   * UI Component, this must be containt all graphic elements and use parent props
   */
  UIComponent: _propTypes.default.elementType,
  /**
   * This must be contains order_id to fetch
   */
  order_id: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  /**
   * Order, this must be contains an object with all order info
   */
  order: _propTypes.default.object,
  /**
   * Components types before order details
   * Array of type components, the parent props will pass to these components
   */
  beforeComponents: _propTypes.default.arrayOf(_propTypes.default.elementType),
  /**
   * Components types after order details
   * Array of type components, the parent props will pass to these components
   */
  afterComponents: _propTypes.default.arrayOf(_propTypes.default.elementType),
  /**
   * Elements before order details
   * Array of HTML/Components elements, these components will not get the parent props
   */
  beforeElements: _propTypes.default.arrayOf(_propTypes.default.element),
  /**
   * Elements after order details
   * Array of HTML/Components elements, these components will not get the parent props
   */
  afterElements: _propTypes.default.arrayOf(_propTypes.default.element)
};
OrderDetails.defaultProps = {
  beforeComponents: [],
  afterComponents: [],
  beforeElements: [],
  afterElements: []
};