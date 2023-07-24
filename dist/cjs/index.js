"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withJotai = exports["default"] = void 0;

var _constants = require("./constants");

var _react = _interopRequireWildcard(require("react"));

var _jotai = require("jotai");

var _utils = require("jotai/utils");

var _addons = require("@storybook/addons");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}

var Wrapper = function Wrapper(_ref) {
  var atoms = _ref.atoms,
      children = _ref.children;

  var channel = _addons.addons.getChannel();

  var useAtoms = {};
  Object.entries(atoms).forEach(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        key = _ref3[0],
        value = _ref3[1];

    useAtoms[key] = (0, _utils.useAtomValue)(value);
  });
  var atomValues = Object.values(atoms);
  (0, _react.useEffect)(function () {
    channel.emit(_constants.EVENTS.ATOMS_CHANGED, useAtoms);
  }, [atoms, useAtoms, atomValues]);
  return children;
};

var withJotai = (0, _addons.makeDecorator)({
  name: 'withJotai',
  parameterName: 'jotai',
  skipIfNoParametersOrOptions: false,
  // Needs to be false so values get cleared
  wrapper: function wrapper(storyFn, context, _ref4) {
    var parameters = _ref4.parameters;

    var channel = _addons.addons.getChannel();

    if (!parameters) {
      channel.emit(_constants.EVENTS.RENDERED, {
        note: 'withJotai decorator not used'
      });
      return storyFn(context);
    }

    var _createInitialValues = (0, _constants.createInitialValues)(),
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
    channel.emit(_constants.EVENTS.RENDERED, values);
    return /*#__PURE__*/_react["default"].createElement(_jotai.Provider, {
      initialValues: get()
    }, /*#__PURE__*/_react["default"].createElement(Wrapper, {
      atoms: atoms
    }, storyFn(context)));
  }
});
exports.withJotai = withJotai;
var _default = withJotai;
exports["default"] = _default;