/// <reference types="react" />
import { GridPanelWrapperProps } from './GridPanelWrapper';
import type { GridColDef } from '../../models/colDef/gridColDef';
export interface GridColumnsPanelProps extends GridPanelWrapperProps {
    sort?: 'asc' | 'desc';
    searchPredicate?: (column: GridColDef, searchValue: string) => boolean;
    autoFocusSearchField?: boolean;
    disableHideAllButton?: boolean;
    disableShowAllButton?: boolean;
}
declare function GridColumnsPanel(props: GridColumnsPanelProps): JSX.Element;
declare namespace GridColumnsPanel {
    var propTypes: any;
}
export { GridColumnsPanel };
