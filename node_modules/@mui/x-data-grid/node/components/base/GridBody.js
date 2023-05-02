"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridBody = GridBody;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _useGridPrivateApiContext = require("../../hooks/utils/useGridPrivateApiContext");
var _useGridSelector = require("../../hooks/utils/useGridSelector");
var _GridMainContainer = require("../containers/GridMainContainer");
var _GridAutoSizer = require("../GridAutoSizer");
var _useGridRootProps = require("../../hooks/utils/useGridRootProps");
var _gridColumnsSelector = require("../../hooks/features/columns/gridColumnsSelector");
var _gridFilterSelector = require("../../hooks/features/filter/gridFilterSelector");
var _gridSortingSelector = require("../../hooks/features/sorting/gridSortingSelector");
var _gridFocusStateSelector = require("../../hooks/features/focus/gridFocusStateSelector");
var _densitySelector = require("../../hooks/features/density/densitySelector");
var _gridColumnGroupsSelector = require("../../hooks/features/columnGrouping/gridColumnGroupsSelector");
var _columnMenuSelector = require("../../hooks/features/columnMenu/columnMenuSelector");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function GridBody(props) {
  const {
    children,
    VirtualScrollerComponent,
    ColumnHeadersProps
  } = props;
  const apiRef = (0, _useGridPrivateApiContext.useGridPrivateApiContext)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const visibleColumns = (0, _useGridSelector.useGridSelector)(apiRef, _gridColumnsSelector.gridVisibleColumnDefinitionsSelector);
  const filterColumnLookup = (0, _useGridSelector.useGridSelector)(apiRef, _gridFilterSelector.gridFilterActiveItemsLookupSelector);
  const sortColumnLookup = (0, _useGridSelector.useGridSelector)(apiRef, _gridSortingSelector.gridSortColumnLookupSelector);
  const columnPositions = (0, _useGridSelector.useGridSelector)(apiRef, _gridColumnsSelector.gridColumnPositionsSelector);
  const columnHeaderTabIndexState = (0, _useGridSelector.useGridSelector)(apiRef, _gridFocusStateSelector.gridTabIndexColumnHeaderSelector);
  const cellTabIndexState = (0, _useGridSelector.useGridSelector)(apiRef, _gridFocusStateSelector.gridTabIndexCellSelector);
  const columnGroupHeaderTabIndexState = (0, _useGridSelector.useGridSelector)(apiRef, _gridFocusStateSelector.unstable_gridTabIndexColumnGroupHeaderSelector);
  const columnHeaderFocus = (0, _useGridSelector.useGridSelector)(apiRef, _gridFocusStateSelector.gridFocusColumnHeaderSelector);
  const columnGroupHeaderFocus = (0, _useGridSelector.useGridSelector)(apiRef, _gridFocusStateSelector.unstable_gridFocusColumnGroupHeaderSelector);
  const densityFactor = (0, _useGridSelector.useGridSelector)(apiRef, _densitySelector.gridDensityFactorSelector);
  const headerGroupingMaxDepth = (0, _useGridSelector.useGridSelector)(apiRef, _gridColumnGroupsSelector.gridColumnGroupsHeaderMaxDepthSelector);
  const columnMenuState = (0, _useGridSelector.useGridSelector)(apiRef, _columnMenuSelector.gridColumnMenuSelector);
  const columnVisibility = (0, _useGridSelector.useGridSelector)(apiRef, _gridColumnsSelector.gridColumnVisibilityModelSelector);
  const columnGroupsHeaderStructure = (0, _useGridSelector.useGridSelector)(apiRef, _gridColumnGroupsSelector.gridColumnGroupsHeaderStructureSelector);
  const hasOtherElementInTabSequence = !(columnGroupHeaderTabIndexState === null && columnHeaderTabIndexState === null && cellTabIndexState === null);
  const [isVirtualizationDisabled, setIsVirtualizationDisabled] = React.useState(rootProps.disableVirtualization);
  const disableVirtualization = React.useCallback(() => {
    setIsVirtualizationDisabled(true);
  }, []);
  const enableVirtualization = React.useCallback(() => {
    setIsVirtualizationDisabled(false);
  }, []);
  React.useEffect(() => {
    setIsVirtualizationDisabled(rootProps.disableVirtualization);
  }, [rootProps.disableVirtualization]);

  // The `useGridApiMethod` hook can't be used here, because it only installs the
  // method if it doesn't exist yet. Once installed, it's never updated again.
  // This break the methods above, since their closure comes from the first time
  // they were installed. Which means that calling `setIsVirtualizationDisabled`
  // will trigger a re-render, but it won't update the state. That can be solved
  // by migrating the virtualization status to the global state.
  apiRef.current.unstable_disableVirtualization = disableVirtualization;
  apiRef.current.unstable_enableVirtualization = enableVirtualization;
  const columnHeadersRef = React.useRef(null);
  const columnsContainerRef = React.useRef(null);
  const virtualScrollerRef = React.useRef(null);
  apiRef.current.register('private', {
    columnHeadersContainerElementRef: columnsContainerRef,
    columnHeadersElementRef: columnHeadersRef,
    virtualScrollerRef
  });
  const handleResize = React.useCallback(size => {
    apiRef.current.publishEvent('resize', size);
  }, [apiRef]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_GridMainContainer.GridMainContainer, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.columnHeaders, (0, _extends2.default)({
      ref: columnsContainerRef,
      innerRef: columnHeadersRef,
      visibleColumns: visibleColumns,
      filterColumnLookup: filterColumnLookup,
      sortColumnLookup: sortColumnLookup,
      columnPositions: columnPositions,
      columnHeaderTabIndexState: columnHeaderTabIndexState,
      columnGroupHeaderTabIndexState: columnGroupHeaderTabIndexState,
      columnHeaderFocus: columnHeaderFocus,
      columnGroupHeaderFocus: columnGroupHeaderFocus,
      densityFactor: densityFactor,
      headerGroupingMaxDepth: headerGroupingMaxDepth,
      columnMenuState: columnMenuState,
      columnVisibility: columnVisibility,
      columnGroupsHeaderStructure: columnGroupsHeaderStructure,
      hasOtherElementInTabSequence: hasOtherElementInTabSequence
    }, ColumnHeadersProps)), /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridAutoSizer.GridAutoSizer, {
      nonce: rootProps.nonce,
      disableHeight: rootProps.autoHeight,
      onResize: handleResize,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(VirtualScrollerComponent, {
        ref: virtualScrollerRef,
        disableVirtualization: isVirtualizationDisabled
      })
    }), children]
  });
}
process.env.NODE_ENV !== "production" ? GridBody.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  children: _propTypes.default.node,
  ColumnHeadersProps: _propTypes.default.object,
  VirtualScrollerComponent: _propTypes.default.elementType.isRequired
} : void 0;