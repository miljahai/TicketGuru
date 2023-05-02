import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["displayOrder"];
import * as React from 'react';
import Divider from '@mui/material/Divider';
import { useGridPrivateApiContext } from '../../utils/useGridPrivateApiContext';
var camelize = function camelize(pascalCase) {
  var camelCase = pascalCase.split('');
  camelCase[0] = camelCase[0].toLowerCase();
  return camelCase.join('');
};
var useGridColumnMenuComponents = function useGridColumnMenuComponents(props) {
  var apiRef = useGridPrivateApiContext();
  var defaultComponents = props.defaultComponents,
    defaultComponentsProps = props.defaultComponentsProps,
    _props$components = props.components,
    components = _props$components === void 0 ? {} : _props$components,
    _props$componentsProp = props.componentsProps,
    componentsProps = _props$componentsProp === void 0 ? {} : _props$componentsProp,
    hideMenu = props.hideMenu,
    colDef = props.colDef,
    _props$addDividers = props.addDividers,
    addDividers = _props$addDividers === void 0 ? true : _props$addDividers;
  var processedComponents = React.useMemo(function () {
    return _extends({}, defaultComponents, components);
  }, [defaultComponents, components]);
  var processedComponentsProps = React.useMemo(function () {
    if (!componentsProps || Object.keys(componentsProps).length === 0) {
      return defaultComponentsProps;
    }
    var mergedProps = _extends({}, componentsProps);
    Object.entries(defaultComponentsProps).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        currentComponentProps = _ref2[1];
      mergedProps[key] = _extends({}, currentComponentProps, componentsProps[key] || {});
    });
    return mergedProps;
  }, [defaultComponentsProps, componentsProps]);
  var defaultItems = apiRef.current.unstable_applyPipeProcessors('columnMenu', [], props.colDef);
  var userItems = React.useMemo(function () {
    var defaultComponentKeys = Object.keys(defaultComponents);
    return Object.keys(components).filter(function (key) {
      return !defaultComponentKeys.includes(key);
    });
  }, [components, defaultComponents]);
  return React.useMemo(function () {
    var uniqueItems = Array.from(new Set([].concat(_toConsumableArray(defaultItems), _toConsumableArray(userItems))));
    var cleansedItems = uniqueItems.filter(function (key) {
      return processedComponents[key] != null;
    });
    var sorted = cleansedItems.sort(function (a, b) {
      var leftItemProps = processedComponentsProps[camelize(a)];
      var rightItemProps = processedComponentsProps[camelize(b)];
      var leftDisplayOrder = Number.isFinite(leftItemProps == null ? void 0 : leftItemProps.displayOrder) ? leftItemProps.displayOrder : 100;
      var rightDisplayOrder = Number.isFinite(rightItemProps == null ? void 0 : rightItemProps.displayOrder) ? rightItemProps.displayOrder : 100;
      return leftDisplayOrder - rightDisplayOrder;
    });
    return sorted.reduce(function (acc, key, index) {
      var itemProps = {
        colDef: colDef,
        onClick: hideMenu
      };
      var processedComponentProps = processedComponentsProps[camelize(key)];
      if (processedComponentProps) {
        var displayOrder = processedComponentProps.displayOrder,
          customProps = _objectWithoutProperties(processedComponentProps, _excluded);
        itemProps = _extends({}, itemProps, customProps);
      }
      return addDividers && index !== sorted.length - 1 ? [].concat(_toConsumableArray(acc), [[processedComponents[key], itemProps], [Divider, {}]]) : [].concat(_toConsumableArray(acc), [[processedComponents[key], itemProps]]);
    }, []);
  }, [addDividers, colDef, defaultItems, hideMenu, processedComponents, processedComponentsProps, userItems]);
};
export { useGridColumnMenuComponents };