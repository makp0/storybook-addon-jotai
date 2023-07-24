"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userAtom = exports.createInitialValues = exports.PARAM_KEY = exports.PANEL_ID = exports.EVENTS = exports.ADDON_ID = void 0;

var _jotai = require("jotai");

var ADDON_ID = "storybook/jotai-addon";
exports.ADDON_ID = ADDON_ID;
var PANEL_ID = "".concat(ADDON_ID, "/panel");
exports.PANEL_ID = PANEL_ID;
var PARAM_KEY = "jotai";
exports.PARAM_KEY = PARAM_KEY;
var EVENTS = {
  ATOMS_CHANGED: "".concat(ADDON_ID, "/atom_changed"),
  RENDERED: "".concat(ADDON_ID, "/rendered")
};
exports.EVENTS = EVENTS;

var createInitialValues = function createInitialValues() {
  var initialValues = [];

  var get = function get() {
    return initialValues;
  };

  var set = function set(anAtom, value) {
    initialValues.push([anAtom, value]);
  };

  return {
    get: get,
    set: set
  };
}; // FOr the tests as we need something shared


exports.createInitialValues = createInitialValues;
var userAtom = (0, _jotai.atom)(null);
exports.userAtom = userAtom;