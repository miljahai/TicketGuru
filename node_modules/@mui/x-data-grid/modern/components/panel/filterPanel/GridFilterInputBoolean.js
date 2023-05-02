import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["item", "applyValue", "apiRef", "focusElementRef"];
import * as React from 'react';
import { useGridRootProps } from '../../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function GridFilterInputBoolean(props) {
  const {
      item,
      applyValue,
      apiRef,
      focusElementRef
    } = props,
    others = _objectWithoutPropertiesLoose(props, _excluded);
  const [filterValueState, setFilterValueState] = React.useState(item.value || '');
  const rootProps = useGridRootProps();
  const baseSelectProps = rootProps.slotProps?.baseSelect || {};
  const isSelectNative = baseSelectProps.native ?? true;
  const baseSelectOptionProps = rootProps.slotProps?.baseSelectOption || {};
  const onFilterChange = React.useCallback(event => {
    const value = event.target.value;
    setFilterValueState(value);
    applyValue(_extends({}, item, {
      value
    }));
  }, [applyValue, item]);
  React.useEffect(() => {
    setFilterValueState(item.value || '');
  }, [item.value]);
  return /*#__PURE__*/_jsxs(rootProps.slots.baseTextField, _extends({
    // TODO: use baseSelect slot
    label: apiRef.current.getLocaleText('filterPanelInputLabel'),
    value: filterValueState,
    onChange: onFilterChange,
    select: true,
    variant: "standard",
    SelectProps: _extends({
      native: isSelectNative,
      displayEmpty: true
    }, rootProps.slotProps?.baseSelect),
    InputLabelProps: {
      shrink: true
    },
    inputRef: focusElementRef
  }, others, rootProps.slotProps?.baseTextField, {
    children: [/*#__PURE__*/_jsx(rootProps.slots.baseSelectOption, _extends({}, baseSelectOptionProps, {
      native: isSelectNative,
      value: "",
      children: apiRef.current.getLocaleText('filterValueAny')
    })), /*#__PURE__*/_jsx(rootProps.slots.baseSelectOption, _extends({}, baseSelectOptionProps, {
      native: isSelectNative,
      value: "true",
      children: apiRef.current.getLocaleText('filterValueTrue')
    })), /*#__PURE__*/_jsx(rootProps.slots.baseSelectOption, _extends({}, baseSelectOptionProps, {
      native: isSelectNative,
      value: "false",
      children: apiRef.current.getLocaleText('filterValueFalse')
    }))]
  }));
}