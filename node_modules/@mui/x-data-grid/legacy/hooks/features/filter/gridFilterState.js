import { GridLogicOperator } from '../../../models/gridFilterItem';
export var getDefaultGridFilterModel = function getDefaultGridFilterModel() {
  return {
    items: [],
    logicOperator: GridLogicOperator.And,
    quickFilterValues: [],
    quickFilterLogicOperator: GridLogicOperator.And
  };
};