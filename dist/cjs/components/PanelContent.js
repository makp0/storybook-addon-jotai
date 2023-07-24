"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelContent = void 0;

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

var _components = require("@storybook/components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PanelContent = function PanelContent(_ref) {
  var initialValues = _ref.initialValues,
      currentValues = _ref.currentValues;
  return /*#__PURE__*/_react["default"].createElement(_components.TabsState, {
    initial: "initialValues",
    backgroundColor: (0, _theming.convert)(_theming.themes.normal).background.hoverable
  }, /*#__PURE__*/_react["default"].createElement("div", {
    id: "initialValues",
    title: "Initial Values",
    color: (0, _theming.convert)(_theming.themes.normal).color.purple
  }, /*#__PURE__*/_react["default"].createElement("pre", null, JSON.stringify(initialValues, null, 2))), /*#__PURE__*/_react["default"].createElement("div", {
    id: "currentValues",
    title: "Current Values",
    color: (0, _theming.convert)(_theming.themes.normal).color.green
  }, /*#__PURE__*/_react["default"].createElement("pre", null, JSON.stringify(currentValues, null, 2))));
};

exports.PanelContent = PanelContent;