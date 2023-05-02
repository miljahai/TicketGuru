"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridFilterInputBoolean = GridFilterInputBoolean;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _useGridRootProps = require("../../../hooks/utils/useGridRootProps");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["item", "applyValue", "apiRef", "focusElementRef"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function GridFilterInputBoolean(props) {
  const {
      item,
      applyValue,
      apiRef,
      focusElementRef
    } = props,
    others = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const [filterValueState, setFilterValueState] = React.useState(item.value || '');
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const baseSelectProps = rootProps.slotProps?.baseSelect || {};
  const isSelectNative = baseSelectProps.native ?? true;
  const baseSelectOptionProps = rootProps.slotProps?.baseSelectOption || {};
  const onFilterChange = React.useCallback(event => {
    const value = event.target.value;
    setFilterValueState(value);
    applyValue((0, _extends2.default)({}, item, {
      value
    }));
  }, [applyValue, item]);
  React.useEffect(() => {
    setFilterValueState(item.value || '');
  }, [item.value]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(rootProps.slots.baseTextField, (0, _extends2.default)({
    // TODO: use baseSelect slot
    label: apiRef.current.getLocaleText('filterPanelInputLabel'),
    value: filterValueState,
    onChange: onFilterChange,
    select: true,
    variant: "standard",
    SelectProps: (0, _extends2.default)({
      native: isSelectNative,
      displayEmpty: true
    }, rootProps.slotProps?.baseSelect),
    InputLabelProps: {
      shrink: true
    },
    inputRef: focusElementRef
  }, others, rootProps.slotProps?.baseTextField, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.baseSelectOption, (0, _extends2.default)({}, baseSelectOptionProps, {
      native: isSelectNative,
      value: "",
      children: apiRef.current.getLocaleText('filterValueAny')
    })), /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.baseSelectOption, (0, _extends2.default)({}, baseSelectOptionProps, {
      native: isSelectNative,
      value: "true",
      children: apiRef.current.getLocaleText('filterValueTrue')
    })), /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.baseSelectOption, (0, _extends2.default)({}, baseSelectOptionProps, {
      native: isSelectNative,
      value: "false",
      children: apiRef.current.getLocaleText('filterValueFalse')
    }))]
  }));
}