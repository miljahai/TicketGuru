import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["defaultComponents", "defaultComponentsProps", "components", "componentsProps"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { useGridColumnMenuComponents } from '../../../hooks/features/columnMenu/useGridColumnMenuComponents';
import { GridColumnMenuContainer } from './GridColumnMenuContainer';
import { GridColumnMenuColumnsItem } from './menuItems/GridColumnMenuColumnsItem';
import { GridColumnMenuFilterItem } from './menuItems/GridColumnMenuFilterItem';
import { GridColumnMenuSortItem } from './menuItems/GridColumnMenuSortItem';
import { jsx as _jsx } from "react/jsx-runtime";
export var GRID_COLUMN_MENU_COMPONENTS = {
  ColumnMenuSortItem: GridColumnMenuSortItem,
  ColumnMenuFilterItem: GridColumnMenuFilterItem,
  ColumnMenuColumnsItem: GridColumnMenuColumnsItem
};
export var GRID_COLUMN_MENU_COMPONENTS_PROPS = {
  columnMenuSortItem: {
    displayOrder: 10
  },
  columnMenuFilterItem: {
    displayOrder: 20
  },
  columnMenuColumnsItem: {
    displayOrder: 30
  }
};
var GridGenericColumnMenu = /*#__PURE__*/React.forwardRef(function GridGenericColumnMenu(props, ref) {
  var defaultComponents = props.defaultComponents,
    defaultComponentsProps = props.defaultComponentsProps,
    components = props.components,
    componentsProps = props.componentsProps,
    other = _objectWithoutProperties(props, _excluded);
  var orderedComponents = useGridColumnMenuComponents(_extends({}, other, {
    defaultComponents: defaultComponents,
    defaultComponentsProps: defaultComponentsProps,
    components: components,
    componentsProps: componentsProps
  }));
  return /*#__PURE__*/_jsx(GridColumnMenuContainer, _extends({
    ref: ref
  }, other, {
    children: orderedComponents.map(function (_ref, index) {
      var _ref2 = _slicedToArray(_ref, 2),
        Component = _ref2[0],
        componentProps = _ref2[1];
      return /*#__PURE__*/_jsx(Component, _extends({}, componentProps), index);
    })
  }));
});
var GridColumnMenu = /*#__PURE__*/React.forwardRef(function GridColumnMenu(props, ref) {
  return /*#__PURE__*/_jsx(GridGenericColumnMenu, _extends({}, props, {
    ref: ref,
    defaultComponents: GRID_COLUMN_MENU_COMPONENTS,
    defaultComponentsProps: GRID_COLUMN_MENU_COMPONENTS_PROPS
  }));
});
process.env.NODE_ENV !== "production" ? GridColumnMenu.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  colDef: PropTypes.object.isRequired,
  /**
   * `components` could be used to add new and (or) override default column menu items
   * If you register a nee component you must pass it's `displayOrder` in `componentsProps`
   * or it will be placed in the end of the list
   */
  components: PropTypes.object,
  /**
   * Could be used to pass new props or override props specific to a column menu component
   * e.g. `displayOrder`
   */
  componentsProps: PropTypes.object,
  hideMenu: PropTypes.func.isRequired,
  id: PropTypes.string,
  labelledby: PropTypes.string,
  open: PropTypes.bool.isRequired
} : void 0;
export { GridColumnMenu, GridGenericColumnMenu };