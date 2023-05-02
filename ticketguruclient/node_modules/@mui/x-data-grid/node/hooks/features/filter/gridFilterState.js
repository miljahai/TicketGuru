"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultGridFilterModel = void 0;
var _gridFilterItem = require("../../../models/gridFilterItem");
const getDefaultGridFilterModel = () => ({
  items: [],
  logicOperator: _gridFilterItem.GridLogicOperator.And,
  quickFilterValues: [],
  quickFilterLogicOperator: _gridFilterItem.GridLogicOperator.And
});
exports.getDefaultGridFilterModel = getDefaultGridFilterModel;