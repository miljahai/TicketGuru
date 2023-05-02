import * as React from 'react';
import { GridColumnMenuRootProps } from './columnMenuInterfaces';
import { GridColDef } from '../../../models/colDef/gridColDef';
interface UseGridColumnMenuComponentsProps extends GridColumnMenuRootProps {
    colDef: GridColDef;
    hideMenu: (event: React.SyntheticEvent) => void;
    addDividers?: boolean;
}
type UseGridColumnMenuComponentsResponse = Array<[
    React.JSXElementConstructor<any>,
    {
        [key: string]: any;
    }
]>;
declare const useGridColumnMenuComponents: (props: UseGridColumnMenuComponentsProps) => UseGridColumnMenuComponentsResponse;
export { useGridColumnMenuComponents };
