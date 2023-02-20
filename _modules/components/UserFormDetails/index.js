"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserFormDetailsUI = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactLoadingSkeleton = _interopRequireDefault(require("react-loading-skeleton"));
var _orderingComponents = require("ordering-components");
var _reactHookForm = require("react-hook-form");
var _libphonenumberJs = _interopRequireDefault(require("libphonenumber-js"));
var _styles = require("./styles");
var _Inputs = require("../styles/Inputs");
var _Buttons = require("../styles/Buttons");
var _InputPhoneNumber = require("../InputPhoneNumber");
var _orderingUi = require("ordering-ui");
var _utils = require("../../utils");
var _validationFields = _interopRequireDefault(require("../../validationFields"));
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
var UserFormDetailsUI = function UserFormDetailsUI(props) {
  var _validationFields$fie, _validationFields$fie2, _validationFields$fie3, _validationFields$fie4, _props$beforeElements, _props$beforeComponen, _props$beforeMidEleme, _props$beforeMidCompo, _validationFields$fie11, _props$afterMidElemen, _props$afterMidCompon, _props$afterComponent, _props$afterElements;
  var isEdit = props.isEdit,
    formState = props.formState,
    onCancel = props.onCancel,
    cleanFormState = props.cleanFormState,
    onCloseProfile = props.onCloseProfile,
    handleChangeInput = props.handleChangeInput,
    toggleIsEdit = props.toggleIsEdit,
    isCheckout = props.isCheckout,
    userData = props.userData,
    setUpdatingUser = props.setUpdatingUser,
    isCustomerMode = props.isCustomerMode;
  var formMethods = (0, _reactHookForm.useForm)();
  var _useLanguage = (0, _orderingComponents.useLanguage)(),
    _useLanguage2 = _slicedToArray(_useLanguage, 2),
    t = _useLanguage2[1];
  var userFromStorage = localStorage.getItem('user');
  var localUser = userFromStorage ? JSON.parse(userFromStorage) : null;
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    isValidPhoneNumber = _useState2[0],
    setIsValidPhoneNumber = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    userPhoneNumber = _useState4[0],
    setUserPhoneNumber = _useState4[1];
  var _useState5 = (0, _react.useState)({
      open: false,
      content: []
    }),
    _useState6 = _slicedToArray(_useState5, 2),
    alertState = _useState6[0],
    setAlertState = _useState6[1];
  var emailInput = (0, _react.useRef)(null);
  var nameInput = (0, _react.useRef)(null);
  var user = userData || localUser;
  var closeAlert = function closeAlert() {
    setAlertState({
      open: false,
      content: []
    });
    cleanFormState && cleanFormState({
      result: {
        error: false
      }
    });
  };
  var showInputPhoneNumber = (_validationFields$fie = _validationFields.default === null || _validationFields.default === void 0 ? void 0 : (_validationFields$fie2 = _validationFields.default.fields) === null || _validationFields$fie2 === void 0 ? void 0 : (_validationFields$fie3 = _validationFields$fie2.checkout) === null || _validationFields$fie3 === void 0 ? void 0 : (_validationFields$fie4 = _validationFields$fie3.cellphone) === null || _validationFields$fie4 === void 0 ? void 0 : _validationFields$fie4.enabled) !== null && _validationFields$fie !== void 0 ? _validationFields$fie : false;
  var setUserCellPhone = function setUserCellPhone() {
    var isEdit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    setUpdatingUser && setUpdatingUser(true);
    if (userPhoneNumber && !userPhoneNumber.includes('null') && !isEdit) {
      setUserPhoneNumber(userPhoneNumber);
      setUpdatingUser && setUpdatingUser(false);
      return;
    }
    if (user !== null && user !== void 0 && user.cellphone) {
      var _formState$changes, _formState$changes2;
      var phone = null;
      if (formState.result.error && (_formState$changes = formState.changes) !== null && _formState$changes !== void 0 && _formState$changes.cellphone && (_formState$changes2 = formState.changes) !== null && _formState$changes2 !== void 0 && _formState$changes2.country_phone_code) {
        var _formState$changes3, _formState$changes4;
        phone = "+".concat((_formState$changes3 = formState.changes) === null || _formState$changes3 === void 0 ? void 0 : _formState$changes3.country_phone_code, " ").concat((_formState$changes4 = formState.changes) === null || _formState$changes4 === void 0 ? void 0 : _formState$changes4.cellphone);
        setUserPhoneNumber(phone);
        setUpdatingUser && setUpdatingUser(false);
        return;
      }
      if (user !== null && user !== void 0 && user.country_phone_code) {
        phone = "+".concat(user === null || user === void 0 ? void 0 : user.country_phone_code, " ").concat(user === null || user === void 0 ? void 0 : user.cellphone);
      } else {
        phone = user === null || user === void 0 ? void 0 : user.cellphone;
      }
      setUserPhoneNumber(phone);
      setUpdatingUser && setUpdatingUser(false);
      return;
    }
    setUserPhoneNumber((user === null || user === void 0 ? void 0 : user.cellphone) || '');
    setUpdatingUser && setUpdatingUser(false);
  };
  var onSubmit = function onSubmit() {
    var _validationFields$fie5, _validationFields$fie6, _validationFields$fie7, _validationFields$fie8, _validationFields$fie9, _validationFields$fie10;
    setUpdatingUser && setUpdatingUser(true);
    var isPhoneNumberValid = userPhoneNumber ? isValidPhoneNumber : true;
    if (!userPhoneNumber && _validationFields.default !== null && _validationFields.default !== void 0 && (_validationFields$fie5 = _validationFields.default.fields) !== null && _validationFields$fie5 !== void 0 && (_validationFields$fie6 = _validationFields$fie5.checkout) !== null && _validationFields$fie6 !== void 0 && (_validationFields$fie7 = _validationFields$fie6.cellphone) !== null && _validationFields$fie7 !== void 0 && _validationFields$fie7.enabled && _validationFields.default !== null && _validationFields.default !== void 0 && (_validationFields$fie8 = _validationFields.default.fields) !== null && _validationFields$fie8 !== void 0 && (_validationFields$fie9 = _validationFields$fie8.checkout) !== null && _validationFields$fie9 !== void 0 && (_validationFields$fie10 = _validationFields$fie9.cellphone) !== null && _validationFields$fie10 !== void 0 && _validationFields$fie10.required) {
      setAlertState({
        open: true,
        content: [t('VALIDATION_ERROR_MOBILE_PHONE_REQUIRED', 'The field Phone Number is required.')]
      });
      return;
    }
    if (!isPhoneNumberValid && userPhoneNumber) {
      if (user !== null && user !== void 0 && user.country_phone_code) {
        setAlertState({
          open: true,
          content: [t('INVALID_ERROR_PHONE_NUMBER', 'The Phone Number field is invalid')]
        });
        return;
      }
      setAlertState({
        open: true,
        content: [t('INVALID_ERROR_COUNTRY_CODE_PHONE_NUMBER', 'The country code of the phone number is invalid')]
      });
      return;
    }
    if (Object.keys(formState.changes).length > 0 && isPhoneNumberValid) {
      var changes = null;
      if (user !== null && user !== void 0 && user.cellphone && !userPhoneNumber) {
        changes = {
          country_phone_code: '',
          cellphone: ''
        };
      }
      if (isCustomerMode) {
        localStorage.setItem('user', JSON.stringify(_objectSpread(_objectSpread({}, user), formState.changes)));
        formState.changes = {};
        toggleIsEdit && toggleIsEdit();
        setUpdatingUser && setUpdatingUser(false);
      }
    }
  };
  var handleChangePhoneNumber = function handleChangePhoneNumber(number, isValid) {
    setUserPhoneNumber(number);
    var phoneNumberParser = null;
    var phoneNumber = {
      country_phone_code: {
        name: 'country_phone_code',
        value: ''
      },
      cellphone: {
        name: 'cellphone',
        value: ''
      }
    };
    if (isValid) {
      phoneNumberParser = (0, _libphonenumberJs.default)(number);
    }
    if (phoneNumberParser) {
      phoneNumber = {
        country_phone_code: {
          name: 'country_phone_code',
          value: phoneNumberParser.countryCallingCode
        },
        cellphone: {
          name: 'cellphone',
          value: phoneNumberParser.nationalNumber
        }
      };
    }
    handleChangeInput(phoneNumber, true);
  };
  var handleChangeInputName = function handleChangeInputName(e) {
    setUpdatingUser && setUpdatingUser(true);
    handleChangeInput && handleChangeInput({
      target: {
        name: 'name',
        value: e.target.value
      }
    });
    formMethods.setValue('name', e.target.value);
    nameInput.current.value = e.target.value;
    var userName = e.target.value;
    localStorage.setItem('user', JSON.stringify(_objectSpread(_objectSpread({}, user), {}, {
      name: userName
    })));
    setUpdatingUser && setUpdatingUser(false);
  };
  var handleChangeInputEmail = function handleChangeInputEmail(e) {
    setUpdatingUser && setUpdatingUser(true);
    handleChangeInput && handleChangeInput({
      target: {
        name: 'email',
        value: e.target.value.toLowerCase().replace(/[&,()%";:ç?<>{}\\[\]\s]/g, '')
      }
    });
    formMethods.setValue('email', e.target.value.toLowerCase().replace(/[&,()%";:ç?<>{}\\[\]\s]/g, ''));
    emailInput.current.value = e.target.value.toLowerCase().replace(/[&,()%";:ç?<>{}\\[\]\s]/g, '');
    var userEmail = e.target.value;
    localStorage.setItem('user', JSON.stringify(_objectSpread(_objectSpread({}, user), {}, {
      email: userEmail
    })));
    setUpdatingUser && setUpdatingUser(false);
  };
  (0, _react.useEffect)(function () {
    if (Object.keys(formMethods.errors).length > 0) {
      var content = Object.values(formMethods.errors).map(function (error) {
        return error.message;
      });
      if (!isValidPhoneNumber && userPhoneNumber) {
        content.push(t('INVALID_ERROR_PHONE_NUMBER', 'The Phone Number field is invalid.'));
      }
      setAlertState({
        open: true,
        content: content
      });
    }
  }, [formMethods.errors]);
  (0, _react.useEffect)(function () {
    if (formState) {
      var _formState$result;
      if (!(formState !== null && formState !== void 0 && formState.loading) && formState !== null && formState !== void 0 && (_formState$result = formState.result) !== null && _formState$result !== void 0 && _formState$result.error) {
        var _formState$result2;
        setAlertState({
          open: true,
          content: ((_formState$result2 = formState.result) === null || _formState$result2 === void 0 ? void 0 : _formState$result2.result) || [t('ERROR', 'Error')]
        });
      }
    }
  }, [formState === null || formState === void 0 ? void 0 : formState.loading]);
  (0, _react.useEffect)(function () {
    if (formState) {
      if (!isEdit && onCloseProfile) {
        onCloseProfile();
      }
      if ((user || !isEdit) && !(formState !== null && formState !== void 0 && formState.loading)) {
        setUserCellPhone();
        if (!isEdit && !(formState !== null && formState !== void 0 && formState.loading)) {
          cleanFormState && cleanFormState({
            changes: {}
          });
          setUserCellPhone(true);
        }
      }
    }
  }, [user, isEdit]);
  (0, _react.useEffect)(function () {
    if (formState) {
      if (!_validationFields.default.loading && emailInput.current) {
        var _formState$result3, _formState$result4, _formState$result4$re, _ref, _formState$changes$em, _formState$changes5;
        formMethods.setValue('email', formState !== null && formState !== void 0 && (_formState$result3 = formState.result) !== null && _formState$result3 !== void 0 && _formState$result3.result ? formState === null || formState === void 0 ? void 0 : (_formState$result4 = formState.result) === null || _formState$result4 === void 0 ? void 0 : (_formState$result4$re = _formState$result4.result) === null || _formState$result4$re === void 0 ? void 0 : _formState$result4$re.email : (_ref = (_formState$changes$em = formState === null || formState === void 0 ? void 0 : (_formState$changes5 = formState.changes) === null || _formState$changes5 === void 0 ? void 0 : _formState$changes5.email) !== null && _formState$changes$em !== void 0 ? _formState$changes$em : user && (user === null || user === void 0 ? void 0 : user.email)) !== null && _ref !== void 0 ? _ref : '');
      }
    }
  }, [_validationFields.default, emailInput.current]);
  (0, _react.useEffect)(function () {
    if (formState) {
      if (!_validationFields.default.loading && nameInput.current) {
        var _formState$result5, _formState$result6, _formState$result6$re, _ref2, _formState$changes$na, _formState$changes6;
        formMethods.setValue('name', formState !== null && formState !== void 0 && (_formState$result5 = formState.result) !== null && _formState$result5 !== void 0 && _formState$result5.result ? formState === null || formState === void 0 ? void 0 : (_formState$result6 = formState.result) === null || _formState$result6 === void 0 ? void 0 : (_formState$result6$re = _formState$result6.result) === null || _formState$result6$re === void 0 ? void 0 : _formState$result6$re.name : (_ref2 = (_formState$changes$na = formState === null || formState === void 0 ? void 0 : (_formState$changes6 = formState.changes) === null || _formState$changes6 === void 0 ? void 0 : _formState$changes6.name) !== null && _formState$changes$na !== void 0 ? _formState$changes$na : user && (user === null || user === void 0 ? void 0 : user.name)) !== null && _ref2 !== void 0 ? _ref2 : '');
      }
    }
  }, [_validationFields.default, nameInput.current]);
  (0, _react.useEffect)(function () {
    formMethods.register('email', {
      required: (0, _utils.isRequiredField)('email') ? t('VALIDATION_ERROR_EMAIL_REQUIRED', 'The field Email is required').replace('_attribute_', t('EMAIL', 'Email')) : null,
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: t('INVALID_ERROR_EMAIL', 'Invalid email address').replace('_attribute_', t('EMAIL', 'Email'))
      }
    });
  }, [formMethods]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, (_props$beforeElements = props.beforeElements) === null || _props$beforeElements === void 0 ? void 0 : _props$beforeElements.map(function (BeforeElement, i) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: i
    }, BeforeElement);
  }), (_props$beforeComponen = props.beforeComponents) === null || _props$beforeComponen === void 0 ? void 0 : _props$beforeComponen.map(function (BeforeComponent, i) {
    return /*#__PURE__*/_react.default.createElement(BeforeComponent, _extends({
      key: i
    }, props));
  }), /*#__PURE__*/_react.default.createElement(_styles.FormInput, {
    onSubmit: formMethods.handleSubmit(onSubmit),
    isCheckout: isCheckout
  }, /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, (_props$beforeMidEleme = props.beforeMidElements) === null || _props$beforeMidEleme === void 0 ? void 0 : _props$beforeMidEleme.map(function (BeforeMidElements, i) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: i
    }, BeforeMidElements);
  }), (_props$beforeMidCompo = props.beforeMidComponents) === null || _props$beforeMidCompo === void 0 ? void 0 : _props$beforeMidCompo.map(function (BeforeMidComponents, i) {
    return /*#__PURE__*/_react.default.createElement(BeforeMidComponents, _extends({
      key: i
    }, props));
  }), (0, _utils.sortInputFields)({
    values: _validationFields.default === null || _validationFields.default === void 0 ? void 0 : (_validationFields$fie11 = _validationFields.default.fields) === null || _validationFields$fie11 === void 0 ? void 0 : _validationFields$fie11.checkout
  }).filter(function (field) {
    return !isCheckout ? field.code == 'name' : field;
  }).map(function (field) {
    var _formState$result7, _formState$result8, _ref3, _formState$changes$fi, _formState$result9, _formState$result10, _ref4, _formState$changes$fi2, _formState$result11, _formState$result12, _ref5, _formState$changes$fi3;
    return _utils.showField && (0, _utils.showField)(field.code) && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: field.id
    }, field.code != 'email' && field.code == 'name' && /*#__PURE__*/_react.default.createElement(_Inputs.Input, {
      key: field.id,
      type: field.type,
      name: field.code,
      className: "form",
      disabled: !isEdit,
      placeholder: t('ENTER_YOUR_NAME_HERE', 'Enter your name here'),
      defaultValue: formState !== null && formState !== void 0 && (_formState$result7 = formState.result) !== null && _formState$result7 !== void 0 && _formState$result7.result ? formState === null || formState === void 0 ? void 0 : (_formState$result8 = formState.result) === null || _formState$result8 === void 0 ? void 0 : _formState$result8.result[field.code] : (_ref3 = (_formState$changes$fi = formState === null || formState === void 0 ? void 0 : formState.changes[field.code]) !== null && _formState$changes$fi !== void 0 ? _formState$changes$fi : user && user[field.code]) !== null && _ref3 !== void 0 ? _ref3 : '',
      onChange: handleChangeInputName,
      ref: function ref(e) {
        nameInput.current = e;
      },
      autoComplete: "off"
    }), field.code === 'email' && field.code != 'name' && /*#__PURE__*/_react.default.createElement(_Inputs.Input, {
      key: field.id,
      type: field.type,
      name: field.code,
      className: "form",
      disabled: !isEdit,
      placeholder: t(field.code.toUpperCase(), field === null || field === void 0 ? void 0 : field.name),
      defaultValue: formState !== null && formState !== void 0 && (_formState$result9 = formState.result) !== null && _formState$result9 !== void 0 && _formState$result9.result ? formState === null || formState === void 0 ? void 0 : (_formState$result10 = formState.result) === null || _formState$result10 === void 0 ? void 0 : _formState$result10.result[field.code] : (_ref4 = (_formState$changes$fi2 = formState === null || formState === void 0 ? void 0 : formState.changes[field.code]) !== null && _formState$changes$fi2 !== void 0 ? _formState$changes$fi2 : user && user[field.code]) !== null && _ref4 !== void 0 ? _ref4 : '',
      onChange: handleChangeInputEmail,
      ref: function ref(e) {
        emailInput.current = e;
      },
      autoComplete: "off"
    }), field.code != 'name' && field.code != 'email' && /*#__PURE__*/_react.default.createElement(_Inputs.Input, {
      key: field.id,
      type: field.type,
      name: field.code,
      className: "form",
      disabled: !isEdit,
      placeholder: t(field.code.toUpperCase(), field === null || field === void 0 ? void 0 : field.name),
      defaultValue: formState !== null && formState !== void 0 && (_formState$result11 = formState.result) !== null && _formState$result11 !== void 0 && _formState$result11.result ? formState === null || formState === void 0 ? void 0 : (_formState$result12 = formState.result) === null || _formState$result12 === void 0 ? void 0 : _formState$result12.result[field.code] : (_ref5 = (_formState$changes$fi3 = formState === null || formState === void 0 ? void 0 : formState.changes[field.code]) !== null && _formState$changes$fi3 !== void 0 ? _formState$changes$fi3 : user && user[field.code]) !== null && _ref5 !== void 0 ? _ref5 : '',
      onChange: handleChangeInput,
      ref: formMethods.register({
        required: (0, _utils.isRequiredField)(field.code) ? t("VALIDATION_ERROR_".concat(field.code.toUpperCase(), "_REQUIRED"), "".concat(field === null || field === void 0 ? void 0 : field.name, " is required")).replace('_attribute_', t(field === null || field === void 0 ? void 0 : field.name, field.code)) : null
      }),
      autoComplete: "off"
    }));
  }), isCheckout && !!showInputPhoneNumber && /*#__PURE__*/_react.default.createElement(_InputPhoneNumber.InputPhoneNumber, {
    user: user,
    value: userPhoneNumber,
    setValue: handleChangePhoneNumber,
    handleIsValid: setIsValidPhoneNumber,
    disabled: !isEdit
  }), (_props$afterMidElemen = props.afterMidElements) === null || _props$afterMidElemen === void 0 ? void 0 : _props$afterMidElemen.map(function (MidElement, i) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: i
    }, MidElement);
  }), (_props$afterMidCompon = props.afterMidComponents) === null || _props$afterMidCompon === void 0 ? void 0 : _props$afterMidCompon.map(function (MidComponent, i) {
    return /*#__PURE__*/_react.default.createElement(MidComponent, _extends({
      key: i
    }, props));
  }), /*#__PURE__*/_react.default.createElement(_styles.ActionsForm, null, onCancel && /*#__PURE__*/_react.default.createElement(_Buttons.Button, {
    outline: true,
    type: "button",
    onClick: function onClick() {
      return onCancel(false);
    },
    disabled: formState.loading
  }, t('CANCEL', 'Cancel')), (formState && Object.keys(formState === null || formState === void 0 ? void 0 : formState.changes).length > 0 && isEdit || (formState === null || formState === void 0 ? void 0 : formState.loading)) && /*#__PURE__*/_react.default.createElement(_Buttons.Button, {
    id: "form-btn",
    color: "primary",
    type: "submit",
    disabled: formState.loading
  }, formState.loading ? t('UPDATING', 'Updating...') : t('UPDATE', 'Update'))))), /*#__PURE__*/_react.default.createElement(_orderingUi.Alert, {
    title: t('PROFILE', 'Profile'),
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
  }), (_props$afterComponent = props.afterComponents) === null || _props$afterComponent === void 0 ? void 0 : _props$afterComponent.map(function (AfterComponent, i) {
    return /*#__PURE__*/_react.default.createElement(AfterComponent, _extends({
      key: i
    }, props));
  }), (_props$afterElements = props.afterElements) === null || _props$afterElements === void 0 ? void 0 : _props$afterElements.map(function (AfterElement, i) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: i
    }, AfterElement);
  }));
};
exports.UserFormDetailsUI = UserFormDetailsUI;