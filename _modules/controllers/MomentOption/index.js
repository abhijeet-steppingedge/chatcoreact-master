"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MomentOption = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _dayjs = _interopRequireDefault(require("dayjs"));
var _moment2 = _interopRequireDefault(require("moment"));
var _isSameOrAfter = _interopRequireDefault(require("dayjs/plugin/isSameOrAfter"));
var _utc = _interopRequireDefault(require("dayjs/plugin/utc"));
var _orderingComponents = require("ordering-components");
var _reactRedux = require("react-redux");
var _hoursList = _interopRequireDefault(require("../../hoursList"));
var _orderingUi = require("ordering-ui");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
_dayjs.default.extend(_isSameOrAfter.default);
_dayjs.default.extend(_utc.default);
/**
 * Component to manage moment option behavior without UI component
 */
var MomentOption = function MomentOption(props) {
  var _orderStatus$options, _orderStatus$options4;
  var minDate = props.minDate,
    maxDate = props.maxDate,
    currentDate = props.currentDate,
    useOrderContext = props.useOrderContext,
    onChangeMoment = props.onChangeMoment,
    UIComponent = props.UIComponent,
    business = props.business;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    modalIsOpen = _useState2[0],
    setModalIsOpen = _useState2[1];
  var _useOrder = (0, _orderingComponents.useOrder)(),
    _useOrder2 = _slicedToArray(_useOrder, 2),
    orderStatus = _useOrder2[0],
    changeMoment = _useOrder2[1].changeMoment;
  var shop = (0, _reactRedux.useSelector)(function (state) {
    return state.shop;
  });
  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    selectedMenu = _useState4[0],
    setSelectedMenu = _useState4[1];

  /**
   * Method to valid if a date is same of after current date
   * @param {String} date
   */
  var validDate = function validDate(date) {
    if (!date) return;
    var _date = (0, _dayjs.default)(date, 'YYYY-MM-DD HH:mm').isSameOrAfter((0, _dayjs.default)(), 'day') ? (0, _dayjs.default)(date).format('YYYY-MM-DD HH:mm') : (0, _dayjs.default)().format('YYYY-MM-DD HH:mm');
    return _date;
  };

  /**
   * Method to calculate diferrence between 2 dates
   * @param {moment} start
   * @param {moment} end
   */
  var calculateDiffDay = function calculateDiffDay(start, end) {
    var endVal = end !== null && end !== void 0 ? end : (0, _dayjs.default)();
    var days = (0, _dayjs.default)(start).diff((0, _dayjs.default)(endVal), 'day');
    return days;
  };

  /**
   * This must be containt schedule selected by user
   */
  var _currentDate = useOrderContext ? (_orderStatus$options = orderStatus.options) === null || _orderStatus$options === void 0 ? void 0 : _orderStatus$options.moment : currentDate;
  var _useState5 = (0, _react.useState)(_currentDate ? (0, _dayjs.default)(validDate(_currentDate)).format('YYYY-MM-DD HH:mm') : null),
    _useState6 = _slicedToArray(_useState5, 2),
    scheduleSelected = _useState6[0],
    setScheduleSelected = _useState6[1];

  /**
   * Flag to know if user select asap time
   */
  var _useState7 = (0, _react.useState)(!scheduleSelected),
    _useState8 = _slicedToArray(_useState7, 2),
    isAsap = _useState8[0],
    setIsAsap = _useState8[1];

  /**
   * Arrays for save hours and dates lists
   */
  var _useState9 = (0, _react.useState)([]),
    _useState10 = _slicedToArray(_useState9, 2),
    hoursList = _useState10[0],
    setHourList = _useState10[1];
  var _useState11 = (0, _react.useState)([]),
    _useState12 = _slicedToArray(_useState11, 2),
    datesList = _useState12[0],
    setDatesList = _useState12[1];
  var dispatch = (0, _reactRedux.useDispatch)();
  var _useLanguage = (0, _orderingComponents.useLanguage)(),
    _useLanguage2 = _slicedToArray(_useLanguage, 2),
    t = _useLanguage2[1];
  var _useState13 = (0, _react.useState)((0, _dayjs.default)(validDate(_currentDate)).format('YYYY-MM-DD')),
    _useState14 = _slicedToArray(_useState13, 2),
    dateSelected = _useState14[0],
    setDateSelected = _useState14[1];
  var _useState15 = (0, _react.useState)(null),
    _useState16 = _slicedToArray(_useState15, 2),
    timeSelected = _useState16[0],
    setTimeSelected = _useState16[1];
  var _useState17 = (0, _react.useState)({
      open: false,
      content: null,
      handleOnAccept: null
    }),
    _useState18 = _slicedToArray(_useState17, 2),
    confirm = _useState18[0],
    setConfirm = _useState18[1];
  var _changeMoment = function _changeMoment(moment, asap) {
    var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    if (shop.cart.length > 0) {
      setConfirm({
        open: true,
        content: t('MOMENT_CHANGE_WARNING', 'Changing preorder time will clear cart. Do you want to proceed?'),
        handleOnAccept: function handleOnAccept() {
          dispatch({
            type: 'EMPTY_CART'
          });
          changeMoment(moment);
          setConfirm(_objectSpread(_objectSpread({}, confirm), {}, {
            open: false
          }));
        }
      });
      return;
    }
    if (!asap) {
      setTimeSelected(time);
    }
    setIsAsap(asap);
    changeMoment(moment);
  };
  var handleChangeDate = function handleChangeDate(date) {
    if (!date || date === dateSelected) return;
    setDateSelected(date);
    setTimeSelected(null);
    setIsAsap(false);
  };
  var handleChangeTime = function handleChangeTime(time) {
    if (!time || time === timeSelected) return;
    var _moment = (0, _dayjs.default)("".concat(dateSelected, " ").concat(time), 'YYYY-MM-DD HH:mm').toDate();
    if (useOrderContext) {
      _changeMoment(_moment, false, time);
    }
    onChangeMoment && onChangeMoment(_moment);
  };
  var handleAsap = function handleAsap() {
    if (isAsap) return;
    if (useOrderContext) {
      _changeMoment(null, true);
    }
    onChangeMoment && onChangeMoment(null);
  };
  (0, _react.useEffect)(function () {
    if (useOrderContext) {
      var _orderStatus$options2;
      if ((_orderStatus$options2 = orderStatus.options) !== null && _orderStatus$options2 !== void 0 && _orderStatus$options2.moment) {
        var _orderStatus$options3;
        var _currentDate2 = _dayjs.default.utc(validDate((_orderStatus$options3 = orderStatus.options) === null || _orderStatus$options3 === void 0 ? void 0 : _orderStatus$options3.moment)).local();
        setScheduleSelected(_currentDate2.format('YYYY-MM-DD HH:mm'));
        setDateSelected(_currentDate2.format('YYYY-MM-DD'));
        setTimeSelected(_currentDate2.format('HH:mm'));
        isAsap && setIsAsap(false);
      } else {
        dateSelected !== (0, _dayjs.default)().format('YYYY-MM-DD') && setDateSelected((0, _dayjs.default)().format('YYYY-MM-DD'));
        timeSelected !== null && setTimeSelected(null);
        scheduleSelected !== null && setScheduleSelected(null);
        !isAsap && setIsAsap(true);
      }
    } else {
      scheduleSelected !== null && setScheduleSelected(null);
      !isAsap && setIsAsap(true);
    }
  }, [(_orderStatus$options4 = orderStatus.options) === null || _orderStatus$options4 === void 0 ? void 0 : _orderStatus$options4.moment]);

  // useEffect(() => {
  //   if (!scheduleSelected) {
  //     return
  //   }
  //   const selected = dayjs(scheduleSelected, 'YYYY-MM-DD HH:mm')
  //   const now = dayjs()
  //   const secondsDiff = selected.diff(now, 'seconds')
  //   if (secondsDiff <= 0) {
  //     handleAsap()
  //     return
  //   }

  //   const checkTime = setTimeout(() => {
  //     handleAsap()
  //   }, secondsDiff * 1000)

  //   return () => {
  //     clearTimeout(checkTime)
  //   }
  // }, [scheduleSelected])

  (0, _react.useEffect)(function () {
    if (isAsap && datesList[0]) {
      setDateSelected(datesList[0]);
      setTimeSelected(null);
    }
  }, [isAsap, datesList]);

  /**
   * generate a list of available hours
   */

  var convertH2M = function convertH2M(timeInHour) {
    if (timeInHour) {
      var timeParts = timeInHour.split(":");
      return Number(timeParts[0]) * 60 + Number(timeParts[1]);
    }
    return 0;
  };
  var getStartEndTime = function getStartEndTime(menus) {
    var startTime = 0;
    var endTime = 0;
    var selectedDate = (0, _moment2.default)(dateSelected);
    var dayNo = selectedDate.day();
    var timeLapses = [];
    menus && Object.keys(menus).length > 0 && menus.forEach(function (menu) {
      if (menu.enabled && menu !== null && menu !== void 0 && menu.schedule[dayNo].enabled) {
        var _menu$schedule$dayNo;
        timeLapses = menu === null || menu === void 0 ? void 0 : (_menu$schedule$dayNo = menu.schedule[dayNo]) === null || _menu$schedule$dayNo === void 0 ? void 0 : _menu$schedule$dayNo.lapses.map(function (time) {
          var closeTime = "".concat(time.close.hour, ":").concat(time.close.minute);
          var openTime = "".concat(time.open.hour, ":").concat(time.open.minute);
          return {
            closeTime: closeTime,
            openTime: openTime
          };
        });
        timeLapses.forEach(function (timeLapse, i) {
          if (startTime != 0) {
            var newStartTime = (0, _moment2.default)(timeLapse.openTime, "HH:mm");
            if (startTime.diff(newStartTime) >= 0) {
              startTime = (0, _moment2.default)(timeLapse.openTime, "HH:mm");
            }
          } else {
            startTime = (0, _moment2.default)(timeLapse.openTime, "HH:mm");
          }
          if (endTime != 0) {
            var newEndTime = (0, _moment2.default)(timeLapse.closeTime, "HH:mm");
            if (startTime.diff(newEndTime) <= 0) {
              endTime = (0, _moment2.default)(timeLapse.closeTime, "HH:mm");
            }
          } else {
            endTime = (0, _moment2.default)(timeLapse.closeTime, "HH:mm");
          }
        });
      }
    });
    return {
      openTime: startTime,
      closeTime: endTime
    };
  };
  var generateHourList = function generateHourList() {
    var hoursAvailable = [];
    var isToday = dateSelected === (0, _dayjs.default)().format('YYYY-MM-DD');
    var isLastDate = dateSelected === (0, _dayjs.default)(maxDate).format('YYYY-MM-DD');
    var now = new Date();
    var minToAdd = orderStatus.options.type == 1 ? business.delivery_time : business.pickup_time;
    minToAdd = convertH2M(minToAdd);
    // now = new Date(now.getTime() + minToAdd * 60000);
    // for (let hour = 0; hour < 24; hour++) {
    //   /**
    //    * Continue if is today and hour is smaller than current hour
    //    */
    //   if (isToday && hour < now?.getHours()) continue
    //   /**
    //    * Continue if is max date and hour is greater than max date hour
    //    */
    //   if (isLastDate && hour > maxDate?.getHours()) continue
    //   for (let minute = 0; minute < 59; minute += 15) {
    //     /**
    //      * Continue if is today and hour is equal to current hour and minutes is smaller than current minute
    //      */
    //     if (isToday && hour === now?.getHours() && minute <= now.getMinutes()) continue
    //     /**
    //      * Continue if is today and hour is equal to max date hour and minutes is greater than max date minute
    //      */
    //     if (isLastDate && hour === maxDate?.getHours() && minute > maxDate.getMinutes()) continue
    //     const _hour = hour < 10 ? `0${hour}` : hour
    //     const startMinute = minute < 10 ? `0${minute}` : minute
    //     const endMinute = (minute + 14) < 10 ? `0${minute + 14}` : minute + 14
    //     const startTime = `${_hour}:${startMinute}`
    //     const endTime = `${_hour}:${endMinute}`
    //     hoursAvailable.push({
    //       startTime,
    //       endTime
    //     })
    //   }
    // }
    var timeLapse = getStartEndTime(business === null || business === void 0 ? void 0 : business.menus);
    var selectedDate = (0, _moment2.default)(dateSelected);
    var dayNo = selectedDate.day();
    // let dayNoIndex = dayNo
    // let timeLapses = [{ closeTime: 0, openTime: 0 }];
    // if (scheduleData) {
    //   if (scheduleData[dayNoIndex].enabled) {
    //     timeLapses = scheduleData[dayNoIndex].lapses.map(function (time) {
    //       let closeTime = `${time.close.hour}:${time.close.minute}`;
    //       let openTime = `${time.open.hour}:${time.open.minute}`;
    //       return {
    //         closeTime: closeTime,
    //         openTime: openTime
    //       };
    //     });
    //   }
    // }

    var from = (0, _moment2.default)(timeLapse.openTime, "HH:mm");
    var to = (0, _moment2.default)(timeLapse.closeTime, "HH:mm");
    var currentTimeWithMinToAdd = (0, _moment2.default)().add(minToAdd, 'minutes');
    if (from.diff(currentTimeWithMinToAdd) <= 0 && dayNo == (now === null || now === void 0 ? void 0 : now.getDay())) {
      from = currentTimeWithMinToAdd;
    }
    if (dayNo == (now === null || now === void 0 ? void 0 : now.getDay())) {
      hoursAvailable = _hoursList.default.hoursList.filter(function (interval) {
        var start = (0, _moment2.default)(interval.startTime, "HH:mm");
        var end = (0, _moment2.default)(interval.endTime, "HH:mm");
        if ((0, _moment2.default)(start).isAfter()) {
          return from <= start && end <= to;
        }
      });
    } else {
      hoursAvailable = _hoursList.default.hoursList.filter(function (interval) {
        var start = (0, _moment2.default)(interval.startTime, "HH:mm");
        var end = (0, _moment2.default)(interval.endTime, "HH:mm");
        return from <= start && end <= to;
      });
    }
    setHourList(hoursAvailable);
  };
  /**
   * Generate a list of available dates
   */
  var generateDatesList = function generateDatesList() {
    var datesList = [];
    var diff = parseInt(calculateDiffDay(validDate(maxDate)), validDate(minDate));
    for (var i = 0; i < diff + 1; i++) {
      datesList.push((0, _dayjs.default)(validDate(minDate)).add(i, 'd').format('YYYY-MM-DD'));
    }
    setDatesList(datesList);
  };
  (0, _react.useEffect)(function () {
    if (!dateSelected) return;
    generateHourList();
  }, [dateSelected, orderStatus, business, selectedMenu]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const diff = dayjs(dateSelected).diff(dayjs(currentDate), 'day')
  //     if (diff === 0) {
  //       generateHourList()
  //     }
  //   }, 1000)
  //   return () => clearInterval(interval)
  // }, [dateSelected])

  (0, _react.useEffect)(function () {
    generateDatesList();
  }, [maxDate, minDate]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, UIComponent && /*#__PURE__*/_react.default.createElement(UIComponent, _extends({}, props, {
    isAsap: isAsap,
    minDate: validDate(minDate),
    maxDate: validDate(maxDate),
    dateSelected: dateSelected,
    timeSelected: timeSelected,
    handleChangeDate: handleChangeDate,
    handleChangeTime: handleChangeTime,
    datesList: datesList,
    hoursList: hoursList,
    handleAsap: handleAsap,
    setSelectedMenu: setSelectedMenu,
    selectedMenu: selectedMenu,
    modalIsOpen: modalIsOpen,
    setModalIsOpen: setModalIsOpen
  })), /*#__PURE__*/_react.default.createElement(_orderingUi.Confirm, {
    title: t('INFORMATION', 'Information'),
    content: confirm.content,
    acceptText: t('ACCEPT', 'Accept'),
    open: confirm.open,
    onClose: function onClose() {
      return setConfirm(_objectSpread(_objectSpread({}, confirm), {}, {
        open: false
      }));
    },
    onCancel: function onCancel() {
      return setConfirm(_objectSpread(_objectSpread({}, confirm), {}, {
        open: false
      }));
    },
    onAccept: confirm.handleOnAccept,
    closeOnBackdrop: false
  }));
};
exports.MomentOption = MomentOption;
MomentOption.propTypes = {
  /**
   * UI Component, this must be containt all graphic elements and use parent props
   */
  UIComponent: _propTypes.default.elementType,
  /**
   * minDate, this must be contains a custom date selected
   */
  minDate: _propTypes.default.instanceOf(Date),
  /**
   * maxDate, this must be contains a custom date selected
   */
  maxDate: _propTypes.default.instanceOf(Date).isRequired,
  /**
   * currentDate, this must be contains a custom date selected
   */
  currentDate: _propTypes.default.instanceOf(Date),
  /**
   * currentDate, this must be contains a custom date selected
   */
  useOrderContext: _propTypes.default.bool,
  /**
   * Method to return moment selection
   */
  onChangeMoment: _propTypes.default.func,
  /**
   * Components types before [PUT HERE COMPONENT NAME]
   * Array of type components, the parent props will pass to these components
   */
  beforeComponents: _propTypes.default.arrayOf(_propTypes.default.elementType),
  /**
   * Components types after [PUT HERE COMPONENT NAME]
   * Array of type components, the parent props will pass to these components
   */
  afterComponents: _propTypes.default.arrayOf(_propTypes.default.elementType),
  /**
   * Elements before [PUT HERE COMPONENT NAME]
   * Array of HTML/Components elements, these components will not get the parent props
   */
  beforeElements: _propTypes.default.arrayOf(_propTypes.default.element),
  /**
   * Elements after [PUT HERE COMPONENT NAME]
   * Array of HTML/Components elements, these components will not get the parent props
   */
  afterElements: _propTypes.default.arrayOf(_propTypes.default.element)
};
MomentOption.defaultProps = {
  useOrderContext: true,
  beforeComponents: [],
  afterComponents: [],
  beforeElements: [],
  afterElements: []
};