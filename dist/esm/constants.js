import { atom } from "jotai";
export var ADDON_ID = "storybook/jotai-addon";
export var PANEL_ID = "".concat(ADDON_ID, "/panel");
export var PARAM_KEY = "jotai";
export var EVENTS = {
  ATOMS_CHANGED: "".concat(ADDON_ID, "/atom_changed"),
  RENDERED: "".concat(ADDON_ID, "/rendered")
};
export var createInitialValues = function createInitialValues() {
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

export var userAtom = atom(null);