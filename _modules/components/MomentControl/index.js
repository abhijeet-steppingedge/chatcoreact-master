"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MomentControl = void 0;
var _react = _interopRequireWildcard(require("react"));
var _moment = _interopRequireDefault(require("moment"));
var _BiRadioCircleMarked = _interopRequireDefault(require("@meronex/icons/bi/BiRadioCircleMarked"));
var _BiRadioCircle = _interopRequireDefault(require("@meronex/icons/bi/BiRadioCircle"));
var _orderingComponents = require("ordering-components");
var _MomentOption = require("../../controllers/MomentOption");
var _styles = require("./styles");
var _orderingUi = require("ordering-ui");
var _Modal = require("../Modal");
var _Modal2 = _interopRequireDefault(require("../CustomModal/Modal"));
var _FaRegClock = _interopRequireDefault(require("@meronex/icons/fa/FaRegClock"));
var _reactRedux = require("react-redux");
var _isSameOrAfter = _interopRequireDefault(require("dayjs/plugin/isSameOrAfter"));
var _utc = _interopRequireDefault(require("dayjs/plugin/utc"));
var _dayjs = _interopRequireDefault(require("dayjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
_dayjs.default.extend(_isSameOrAfter.default);
_dayjs.default.extend(_utc.default);
var MomentControlUI = function MomentControlUI(props) {
  var _props$beforeElements, _props$beforeComponen, _orderState$options, _orderState$options2, _configs$dates_moment, _props$afterComponent, _props$afterElements;
  var isAsap = props.isAsap,
    datesList = props.datesList,
    hoursList = props.hoursList,
    dateSelected = props.dateSelected,
    timeSelected = props.timeSelected,
    handleAsap = props.handleAsap,
    handleChangeDate = props.handleChangeDate,
    handleChangeTime = props.handleChangeTime,
    business = props.business,
    setSelectedMenu = props.setSelectedMenu,
    selectedMenu = props.selectedMenu,
    isCustomStyle = props.isCustomStyle,
    setModalIsOpen = props.setModalIsOpen,
    modalIsOpen = props.modalIsOpen,
    disableOnClickMoment = props.disableOnClickMoment,
    isModalBehavior = props.isModalBehavior;
  var shop = (0, _reactRedux.useSelector)(function (state) {
    return state.shop;
  });
  var dispatch = (0, _reactRedux.useDispatch)();
  var _useConfig = (0, _orderingComponents.useConfig)(),
    _useConfig2 = _slicedToArray(_useConfig, 1),
    configs = _useConfig2[0].configs;
  var _useUtils = (0, _orderingComponents.useUtils)(),
    _useUtils2 = _slicedToArray(_useUtils, 1),
    _useUtils2$ = _useUtils2[0],
    parseTime = _useUtils2$.parseTime,
    parseDate = _useUtils2$.parseDate;
  var _useLanguage = (0, _orderingComponents.useLanguage)(),
    _useLanguage2 = _slicedToArray(_useLanguage, 2),
    t = _useLanguage2[1];
  var windowSize = (0, _orderingUi.useWindowSize)();
  var _useOrder = (0, _orderingComponents.useOrder)(),
    _useOrder2 = _slicedToArray(_useOrder, 1),
    orderState = _useOrder2[0];
  var _useOrder3 = (0, _orderingComponents.useOrder)(),
    _useOrder4 = _slicedToArray(_useOrder3, 1),
    options = _useOrder4[0].options;
  var theme = (0, _orderingUi.useTheme)();
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    menusModalIsOpen = _useState2[0],
    setMenusModalIsOpen = _useState2[1];
  var _useState3 = (0, _react.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    formattedTime = _useState4[0],
    setFormattedTime = _useState4[1];
  var _useState5 = (0, _react.useState)(''),
    _useState6 = _slicedToArray(_useState5, 2),
    estimatedTime = _useState6[0],
    setEstimatedTime = _useState6[1];
  var _useState7 = (0, _react.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    refresh = _useState8[0],
    setRefresh = _useState8[1];
  var _useEvent = (0, _orderingComponents.useEvent)(),
    _useEvent2 = _slicedToArray(_useEvent, 1),
    events = _useEvent2[0];
  var Content = function Content() {
    var _configs$max_days_pre;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_styles.Title, null, t('SELECT_A_DELIVERY_DATE', 'Select a Delivery Date')), /*#__PURE__*/_react.default.createElement(_styles.Days, {
      name: "days"
    }, datesList.slice(0, Number((configs === null || configs === void 0 ? void 0 : (_configs$max_days_pre = configs.max_days_preorder) === null || _configs$max_days_pre === void 0 ? void 0 : _configs$max_days_pre.value) || 6, 10)).map(function (date) {
      var dateParts = date.split('-');
      var _date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
      var dayName = t('DAY' + (_date.getDay() >= 1 ? _date.getDay() : 7)).substring(0, 3).toUpperCase();
      var dayNumber = (_date.getDate() < 10 ? '0' : '') + _date.getDate();
      return /*#__PURE__*/_react.default.createElement(_styles.Day, {
        key: dayNumber,
        selected: dateSelected === date,
        onClick: function onClick() {
          return handleChangeDate(date);
        }
      }, /*#__PURE__*/_react.default.createElement(_styles.ContentDay, {
        className: "content-day"
      }, /*#__PURE__*/_react.default.createElement(_styles.DayName, null, dayName), /*#__PURE__*/_react.default.createElement(_styles.DayNumber, null, dayNumber)));
    })), /*#__PURE__*/_react.default.createElement(_styles.Title, null, t('DESIRED_DELIVERY_TIME', 'Desired Delivery Time')), /*#__PURE__*/_react.default.createElement(_styles.Hours, {
      name: "hours"
    }, /*#__PURE__*/_react.default.createElement(_styles.Hour, {
      selected: isAsap,
      onClick: function onClick() {
        return !orderState.loading && handleAsap();
      },
      isLoading: orderState === null || orderState === void 0 ? void 0 : orderState.loading
    }, windowSize.width > 410 ? t('ASAP', 'As soon as possible') : t('ASAP_ABBREVIATION', 'ASAP')), hoursList.map(function (hour, i) {
      var _configs$format_time;
      return /*#__PURE__*/_react.default.createElement(_styles.Hour, {
        key: i,
        selected: timeSelected === hour.startTime,
        onClick: function onClick() {
          return !orderState.loading && handleChangeTime(hour.startTime);
        },
        isLoading: orderState === null || orderState === void 0 ? void 0 : orderState.loading
      }, (configs === null || configs === void 0 ? void 0 : (_configs$format_time = configs.format_time) === null || _configs$format_time === void 0 ? void 0 : _configs$format_time.value) === '12' ? hour.startTime.includes('12') ? "".concat(hour.startTime, "PM") : parseTime((0, _moment.default)(hour.startTime, 'HH:mm'), {
        outputFormat: 'hh:mma'
      }) : parseTime((0, _moment.default)(hour.startTime, 'HH:mm'), {
        outputFormat: 'HH:mm'
      }));
    })));
  };
  var convertH2M = function convertH2M(timeInHour) {
    if (timeInHour) {
      var timeParts = timeInHour.split(":");
      return Number(timeParts[0]) * 60 + Number(timeParts[1]);
    }
    return 0;
  };
  var formatCurrentTime = function formatCurrentTime() {
    var isToday = dateSelected === (0, _dayjs.default)().format('YYYY-MM-DD');
    if (isToday) {
      var _configs$format_time2;
      var currentTime = (0, _moment.default)();
      var hours = orderState.options.type == 2 ? business === null || business === void 0 ? void 0 : business.pickup_time : business === null || business === void 0 ? void 0 : business.delivery_time;
      var minToAdd = convertH2M(hours);
      // let formatted = currentTime.add(minToAdd, 'minutes');
      if (minToAdd && (options.type == 1 || options.type == 2)) setFormattedTime(" (".concat((0, _moment.default)().format((configs === null || configs === void 0 ? void 0 : (_configs$format_time2 = configs.format_time) === null || _configs$format_time2 === void 0 ? void 0 : _configs$format_time2.value) === '12' ? 'hh:mm A' : 'HH:mm A'), " +").concat(minToAdd, " Min)"));
      setTimeout(function () {
        setRefresh(!refresh);
      }, 60000);
    } else {
      setFormattedTime("");
    }
  };

  // const onClickMoment = () => {
  //   if (business?.menus && business?.menus?.length === 1) {
  //     onClickMenu(business?.menus[0])
  //     setModalIsOpen(true);
  //   } else {
  //     setMenusModalIsOpen(true)
  //   }
  // }

  // const onClickMenu = (menu) => {
  //   setSelectedMenu(menu)
  //   dispatch({ type: 'ADD_MENU', payload: menu })
  //   setModalIsOpen(true)
  // }

  var handleCloseModal = function handleCloseModal() {
    setModalIsOpen(false);
  };
  (0, _react.useEffect)(function () {
    formatCurrentTime();
  }, [refresh, business, dateSelected]);
  return /*#__PURE__*/_react.default.createElement("div", {
    id: "moment_control",
    style: {
      cursor: 'pointer',
      justifyContent: 'center',
      fontSize: windowSize.width < 410 ? 13 : 15
    }
  }, (_props$beforeElements = props.beforeElements) === null || _props$beforeElements === void 0 ? void 0 : _props$beforeElements.map(function (BeforeElement, i) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: i
    }, BeforeElement);
  }), (_props$beforeComponen = props.beforeComponents) === null || _props$beforeComponen === void 0 ? void 0 : _props$beforeComponen.map(function (BeforeComponent, i) {
    return /*#__PURE__*/_react.default.createElement(BeforeComponent, _extends({
      key: i
    }, props));
  }), isModalBehavior && /*#__PURE__*/_react.default.createElement(_styles.MomentContainer, {
    isCustomStyle: isCustomStyle,
    onClick: function onClick() {
      if (!disableOnClickMoment) setModalIsOpen(true);
      try {
        document.getElementById('cat-container').style.zIndex = "-1";
        document.getElementById('search-bar-id').style.zIndex = "0";
        document.getElementById('search-bar-id').style.position = "relative";
      } catch (error) {
        console.log('error', error);
      }
    },
    style: {
      justifyContent: 'center',
      cursor: disableOnClickMoment ? 'default' : 'pointer'
    }
  }, /*#__PURE__*/_react.default.createElement(_FaRegClock.default, {
    id: "icon"
  }), orderState !== null && orderState !== void 0 && (_orderState$options = orderState.options) !== null && _orderState$options !== void 0 && _orderState$options.moment ? parseDate(orderState === null || orderState === void 0 ? void 0 : (_orderState$options2 = orderState.options) === null || _orderState$options2 === void 0 ? void 0 : _orderState$options2.moment, {
    outputFormat: configs === null || configs === void 0 ? void 0 : (_configs$dates_moment = configs.dates_moment_format) === null || _configs$dates_moment === void 0 ? void 0 : _configs$dates_moment.value
  }) : t('ASAP_ABBREVIATION', 'ASAP') + formattedTime), isModalBehavior ? modalIsOpen && /*#__PURE__*/_react.default.createElement(_Modal2.default, {
    setOpenModal: setModalIsOpen
  }, /*#__PURE__*/_react.default.createElement(Content, null))
  // <Modal
  //   open={modalIsOpen}
  //   onClose={() => setModalIsOpen(false)}
  //   width='70%'
  // >
  //   <Content />
  // </Modal>
  : /*#__PURE__*/_react.default.createElement(Content, null), (_props$afterComponent = props.afterComponents) === null || _props$afterComponent === void 0 ? void 0 : _props$afterComponent.map(function (AfterComponent, i) {
    return /*#__PURE__*/_react.default.createElement(AfterComponent, _extends({
      key: i
    }, props));
  }), (_props$afterElements = props.afterElements) === null || _props$afterElements === void 0 ? void 0 : _props$afterElements.map(function (AfterElement, i) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: i
    }, AfterElement);
  }));
};
var MomentControl = function MomentControl(props) {
  var _configs$max_days_pre2;
  var _useConfig3 = (0, _orderingComponents.useConfig)(),
    _useConfig4 = _slicedToArray(_useConfig3, 1),
    configs = _useConfig4[0].configs;
  var limitDays = parseInt(configs === null || configs === void 0 ? void 0 : (_configs$max_days_pre2 = configs.max_days_preorder) === null || _configs$max_days_pre2 === void 0 ? void 0 : _configs$max_days_pre2.value, 10);
  var currentDate = new Date();
  var time = limitDays > 1 ? currentDate.getTime() + (limitDays - 1) * 24 * 60 * 60 * 1000 : limitDays === 1 ? currentDate.getTime() : currentDate.getTime() + 6 * 24 * 60 * 60 * 1000;
  currentDate.setTime(time);
  currentDate.setHours(23);
  currentDate.setMinutes(59);
  var dateProps = {
    maxDate: currentDate
  };
  var momentProps = _objectSpread(_objectSpread(_objectSpread({}, props), dateProps), {}, {
    UIComponent: MomentControlUI
  });
  return /*#__PURE__*/_react.default.createElement(_MomentOption.MomentOption, momentProps);
};
exports.MomentControl = MomentControl;