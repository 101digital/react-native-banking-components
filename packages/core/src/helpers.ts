import {
  defaultsDeep as _defaultsDeep,
  isEmpty as _isEmpty,
  uniqBy as _uniqBy,
  List,
  groupBy as _groupBy,
  chain as _chain,
  orderBy as _orderBy,
  CollectionChain,
  FunctionChain,
  StringNullableChain,
} from 'lodash';

export const defaultsDeep = _defaultsDeep;

export const isEmpty = _isEmpty;

export const isNotEmpty = (object?: Object) => !_isEmpty(object);

export const uniqBy = _uniqBy;

export const getUrlParameter = (url: string, name: string) => {
  name = name.replace(/\\[[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&#]' + name + '=([^&#]*)');
  var results = regex.exec(url);
  return results === null
    ? ''
    : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

export const groupBy = _groupBy;

export const chain1 = (value: string | null | undefined): StringNullableChain =>
  _chain(value);

export const chain2 = <T extends (...args: any[]) => any>(
  value: T
): FunctionChain<T> => _chain(value);

export const chain3 = <T = any>(
  value: List<T> | null | undefined
): CollectionChain<T> => _chain(value);

export const orderBy = _orderBy;
