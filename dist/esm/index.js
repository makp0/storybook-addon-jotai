function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}

import { EVENTS, createInitialValues } from './constants';
import React, { useEffect } from 'react';
import { Provider } from "jotai";
import { useAtomValue } from "jotai/utils";
import { addons, makeDecorator } from '@storybook/addons';

var Wrapper = function Wrapper(_ref) {
  var atoms = _ref.atoms,
      children = _ref.children;
  var channel = addons.getChannel();
  var useAtoms = {};
  Object.entries(atoms).forEach(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        key = _ref3[0],
        value = _ref3[1];

    useAtoms[key] = useAtomValue(value);
  });
  var atomValues = Object.values(atoms);
  useEffect(function () {
    channel.emit(EVENTS.ATOMS_CHANGED, useAtoms);
  }, [atoms, useAtoms, atomValues]);
  return children;
};

export var withJotai = makeDecorator({
  name: 'withJotai',
  parameterName: 'jotai',
  skipIfNoParametersOrOptions: false,
  // Needs to be false so values get cleared
  wrapper: function wrapper(storyFn, context, _ref4) {
    var parameters = _ref4.parameters;
    var channel = addons.getChannel();

    if (!parameters) {
      channel.emit(EVENTS.RENDERED, {
        note: 'withJotai decorator not used'
      });
      return storyFn(context);
    }

    var _createInitialValues = createInitialValues(),
        get = _createInitialValues.get,
        set = _createInitialValues.set;

    var atoms = parameters.atoms,
        values = parameters.values;
    Object.entries(atoms).map(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
          key = _ref6[0],
          atom = _ref6[1];

      return set(atom, values[key]);
    });
    channel.emit(EVENTS.RENDERED, values);
    return /*#__PURE__*/React.createElement(Provider, {
      initialValues: get()
    }, /*#__PURE__*/React.createElement(Wrapper, {
      atoms: atoms
    }, storyFn(context)));
  }
});
export default withJotai;