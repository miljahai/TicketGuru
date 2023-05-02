"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridColumnMenuComponents = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _Divider = _interopRequireDefault(require("@mui/material/Divider"));
var _useGridPrivateApiContext = require("../../utils/useGridPrivateApiContext");
const _excluded = ["displayOrder"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const camelize = pascalCase => {
  const camelCase = pascalCase.split('');
  camelCase[0] = camelCase[0].toLowerCase();
  return camelCase.join('');
};
const useGridColumnMenuComponents = props => {
  const apiRef = (0, _useGridPrivateApiContext.useGridPrivateApiContext)();
  const {
    defaultComponents,
    defaultComponentsProps,
    components = {},
    componentsProps = {},
    hideMenu,
    colDef,
    addDividers = true
  } = props;
  const processedComponents = React.useMemo(() => (0, _extends2.default)({}, defaultComponents, components), [defaultComponents, components]);
  const processedComponentsProps = React.useMemo(() => {
    if (!componentsProps || Object.keys(componentsProps).length === 0) {
      return defaultComponentsProps;
    }
    const mergedProps = (0, _extends2.default)({}, componentsProps);
    Object.entries(defaultComponentsProps).forEach(([key, currentComponentProps]) => {
      mergedProps[key] = (0, _extends2.default)({}, currentComponentProps, componentsProps[key] || {});
    });
    return mergedProps;
  }, [defaultComponentsProps, componentsProps]);
  const defaultItems = apiRef.current.unstable_applyPipeProcessors('columnMenu', [], props.colDef);
  const userItems = React.useMemo(() => {
    const defaultComponentKeys = Object.keys(defaultComponents);
    return Object.keys(components).filter(key => !defaultComponentKeys.includes(key));
  }, [components, defaultComponents]);
  return React.useMemo(() => {
    const uniqueItems = Array.from(new Set([...defaultItems, ...userItems]));
    const cleansedItems = uniqueItems.filter(key => processedComponents[key] != null);
    const sorted = cleansedItems.sort((a, b) => {
      const leftItemProps = processedComponentsProps[camelize(a)];
      const rightItemProps = processedComponentsProps[camelize(b)];
      const leftDisplayOrder = Number.isFinite(leftItemProps?.displayOrder) ? leftItemProps.displayOrder : 100;
      const rightDisplayOrder = Number.isFinite(rightItemProps?.displayOrder) ? rightItemProps.displayOrder : 100;
      return leftDisplayOrder - rightDisplayOrder;
    });
    return sorted.reduce((acc, key, index) => {
      let itemProps = {
        colDef,
        onClick: hideMenu
      };
      const processedComponentProps = processedComponentsProps[camelize(key)];
      if (processedComponentProps) {
        const customProps = (0, _objectWithoutPropertiesLoose2.default)(processedComponentProps, _excluded);
        itemProps = (0, _extends2.default)({}, itemProps, customProps);
      }
      return addDividers && index !== sorted.length - 1 ? [...acc, [processedComponents[key], itemProps], [_Divider.default, {}]] : [...acc, [processedComponents[key], itemProps]];
    }, []);
  }, [addDividers, colDef, defaultItems, hideMenu, processedComponents, processedComponentsProps, userItems]);
};
exports.useGridColumnMenuComponents = useGridColumnMenuComponents;