import React from "react";
import { themes, convert } from "@storybook/theming";
import { TabsState } from "@storybook/components";
export var PanelContent = function PanelContent(_ref) {
  var initialValues = _ref.initialValues,
      currentValues = _ref.currentValues;
  return /*#__PURE__*/React.createElement(TabsState, {
    initial: "initialValues",
    backgroundColor: convert(themes.normal).background.hoverable
  }, /*#__PURE__*/React.createElement("div", {
    id: "initialValues",
    title: "Initial Values",
    color: convert(themes.normal).color.purple
  }, /*#__PURE__*/React.createElement("pre", null, JSON.stringify(initialValues, null, 2))), /*#__PURE__*/React.createElement("div", {
    id: "currentValues",
    title: "Current Values",
    color: convert(themes.normal).color.green
  }, /*#__PURE__*/React.createElement("pre", null, JSON.stringify(currentValues, null, 2))));
};