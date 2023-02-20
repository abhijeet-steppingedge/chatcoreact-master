"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HelmetTags = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactHelmet = require("react-helmet");
var _helmetdata = _interopRequireDefault(require("../../helmetdata.json"));
var _config = _interopRequireDefault(require("../../config.json"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var HelmetTags = function HelmetTags(props) {
  var page = props.page;
  var metaTag = page ? _helmetdata.default[page] : _helmetdata.default.app;
  return (
    /*#__PURE__*/
    // <Helmet titleTemplate={!page ? '' : `${settings.app_name} - %s`}>
    _react.default.createElement(_reactHelmet.Helmet, {
      titleTemplate: "%s ".concat(' - By ' + _config.default.app_name)
    }, /*#__PURE__*/_react.default.createElement("title", null, props.helmetTitle || metaTag.title), /*#__PURE__*/_react.default.createElement("meta", {
      name: "description",
      content: props.description || metaTag.description
    }), /*#__PURE__*/_react.default.createElement("meta", {
      name: "keywords",
      content: props.keywords || metaTag.keywords
    }), props.robots ? /*#__PURE__*/_react.default.createElement("meta", {
      name: "robots",
      content: props.robots
    }) : metaTag.robots && /*#__PURE__*/_react.default.createElement("meta", {
      name: "robots",
      content: metaTag.robots
    }), props.canonicalUrl ? /*#__PURE__*/_react.default.createElement("link", {
      rel: "canonical",
      href: props.canonicalUrl
    }) : metaTag.canonicalUrl && /*#__PURE__*/_react.default.createElement("link", {
      rel: "canonical",
      href: metaTag.canonicalUrl
    }))
  );
};
exports.HelmetTags = HelmetTags;