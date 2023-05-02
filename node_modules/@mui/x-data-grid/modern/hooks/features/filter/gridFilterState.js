import { GridLogicOperator } from '../../../models/gridFilterItem';
export const getDefaultGridFilterModel = () => ({
  items: [],
  logicOperator: GridLogicOperator.And,
  quickFilterValues: [],
  quickFilterLogicOperator: GridLogicOperator.And
});