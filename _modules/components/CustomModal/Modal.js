"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
require("./Modal.css");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function Modal(_ref) {
  var setOpenModal = _ref.setOpenModal,
    children = _ref.children;
  return /*#__PURE__*/_react.default.createElement("div", {
    id: "myModal",
    className: "modal"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/_react.default.createElement("span", {
    onClick: function onClick() {
      setOpenModal(false);
      try {
        document.getElementById('cat-container').style.zIndex = "10";
        document.getElementById('search-bar-id').style.zIndex = "10";
        document.getElementById('search-bar-id').style.position = "inherit";
      } catch (error) {
        console.log('error', error);
      }
    },
    className: "close"
  }, "\xD7"), children));
}
var _default = Modal;
exports.default = _default;