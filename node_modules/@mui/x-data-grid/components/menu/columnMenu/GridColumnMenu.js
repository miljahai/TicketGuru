import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["defaultComponents", "defaultComponentsProps", "components", "componentsProps"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { useGridColumnMenuComponents } from '../../../hooks/features/columnMenu/useGridColumnMenuComponents';
import { GridColumnMenuContainer } from './GridColumnMenuContainer';
import { GridColumnMenuColumnsItem } from './menuItems/GridColumnMenuColumnsItem';
import { GridColumnMenuFilterItem } from './menuItems/GridColumnMenuFilterItem';
import { GridColumnMenuSortItem } from './menuItems/GridColumnMenuSortItem';
import { jsx as _jsx } from "react/jsx-runtime";
export const GRID_COLUMN_MENU_COMPONENTS = {
  ColumnMenuSortItem: GridColumnMenuSortItem,
  ColumnMenuFilterItem: GridColumnMenuFilterItem,
  ColumnMenuColumnsItem: GridColumnMenuColumnsItem
};
export const GRID_COLUMN_MENU_COMPONENTS_PROPS = {
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
const GridGenericColumnMenu = /*#__PURE__*/React.forwardRef(function GridGenericColumnMenu(props, ref) {
  const {
      defaultComponents,
      defaultComponentsProps,
      components,
      componentsProps
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const orderedComponents = useGridColumnMenuComponents(_extends({}, other, {
    defaultComponents,
    defaultComponentsProps,
    components,
    componentsProps
  }));
  return /*#__PURE__*/_jsx(GridColumnMenuContainer, _extends({
    ref: ref
  }, other, {
    children: orderedComponents.map(([Component, componentProps], index) => /*#__PURE__*/_jsx(Component, _extends({}, componentProps), index))
  }));
});
const GridColumnMenu = /*#__PURE__*/React.forwardRef(function GridColumnMenu(props, ref) {
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