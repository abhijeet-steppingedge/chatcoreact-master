"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListenPageChanges = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _orderingComponents = require("ordering-components");
var _orderingUi = require("ordering-ui");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var ListenPageChanges = function ListenPageChanges(_ref) {
  var _languageState$langua3;
  var children = _ref.children;
  var history = (0, _reactRouterDom.useHistory)();
  var _useEvent = (0, _orderingComponents.useEvent)(),
    _useEvent2 = _slicedToArray(_useEvent, 1),
    events = _useEvent2[0];
  var _useLanguage = (0, _orderingComponents.useLanguage)(),
    _useLanguage2 = _slicedToArray(_useLanguage, 1),
    languageState = _useLanguage2[0];
  var _useTheme = (0, _orderingUi.useTheme)(),
    _useTheme2 = _slicedToArray(_useTheme, 2),
    theme = _useTheme2[0],
    merge = _useTheme2[1].merge;
  var routes = {
    home: '/',
    delivery: '/delivery',
    pickup: '/pickup',
    eatin: '/eatin',
    curbside: '/curbside',
    drivethru: '/drivethru',
    // orders: '/profile/orders',
    order_detail: '/orders/:businessSlug/:orderId/:cellphone',
    checkout: '/checkout',
    business: '/store/:store',
    business_slug: '/:store',
    business_code: '/:store/:orderTypeFromParams/:locationFromParams?'
  };
  var handleGoToPage = function handleGoToPage(_ref2) {
    var page = _ref2.page,
      _ref2$params = _ref2.params,
      params = _ref2$params === void 0 ? {} : _ref2$params,
      search = _ref2.search,
      _ref2$replace = _ref2.replace,
      replace = _ref2$replace === void 0 ? false : _ref2$replace;
    var path = routes[page];
    if (path) {
      Object.entries(params).forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
          key = _ref4[0],
          value = _ref4[1];
        path = path.replace(":".concat(key), value);
      });
      if (search) {
        path = "".concat(path).concat(search);
      }
      history[replace ? 'replace' : 'push'](path);
    }
  };
  var getCurrentPage = function getCurrentPage(pathname) {
    Object.entries(routes).forEach(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
        key = _ref6[0],
        value = _ref6[1];
      var regex = RegExp(value.replace(/:[a-zA-Z]+/i, '(.+)') + '$', 'gi');
      if (regex.test(pathname)) {
        var pathParts = value.split('/');
        var currentParts = pathname.split('/');
        var params = {};
        var paramRegex = /:[a-zA-Z]+/i;
        pathParts.forEach(function (part, i) {
          if (paramRegex.test(part)) {
            params[part.replace(':', '')] = currentParts[i];
          }
        });
        var query = {};
        var searchParams = new URLSearchParams(history.location.search);
        var _iterator = _createForOfIteratorHelper(searchParams.entries()),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _step$value = _slicedToArray(_step.value, 2),
              _key = _step$value[0],
              _value = _step$value[1];
            query[_key] = _value;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        events.emit('change_view', {
          page: key,
          params: params,
          query: query
        });
      }
    });
  };
  var handleGetCurrentView = function handleGetCurrentView() {
    getCurrentPage(history.location.pathname);
  };
  (0, _react.useEffect)(function () {
    getCurrentPage(history.location.pathname);
    var unlisten = history.listen(function (data) {
      getCurrentPage(data.pathname);
    });
    events.on('go_to_page', handleGoToPage);
    events.on('get_current_view', handleGetCurrentView);
    return function () {
      unlisten();
      events.off('go_to_page', handleGoToPage);
      events.off('get_current_view', handleGetCurrentView);
    };
  }, []);
  (0, _react.useEffect)(function () {
    var _languageState$langua;
    if (theme.rtl !== (languageState === null || languageState === void 0 ? void 0 : (_languageState$langua = languageState.language) === null || _languageState$langua === void 0 ? void 0 : _languageState$langua.rtl)) {
      var _languageState$langua2;
      merge({
        rtl: languageState === null || languageState === void 0 ? void 0 : (_languageState$langua2 = languageState.language) === null || _languageState$langua2 === void 0 ? void 0 : _languageState$langua2.rtl
      });
    }
  }, [languageState === null || languageState === void 0 ? void 0 : (_languageState$langua3 = languageState.language) === null || _languageState$langua3 === void 0 ? void 0 : _languageState$langua3.rtl]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children);
};
exports.ListenPageChanges = ListenPageChanges;