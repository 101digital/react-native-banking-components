import {
  defaultsDeep as _defaultsDeep,
  isEmpty as _isEmpty,
  uniqBy as _uniqBy,
  ValueIteratee,
  List,
  groupBy as _groupBy,
  Dictionary,
  chain as _chain,
  orderBy as _orderBy,
  PrimitiveChain,
  CollectionChain,
  FunctionChain,
  ObjectChain,
  StringChain,
} from 'lodash';

export const defaultsDeep = (object: any, ...source: any[]) =>
  _defaultsDeep(object, source);

export const isEmpty = (object: Object) => _isEmpty(object);

export const isNotEmpty = (object: Object) => !_isEmpty(object);

export const uniqBy = <T>(
  array: List<T> | null | undefined,
  iteratee: ValueIteratee<T>
): T[] => _uniqBy(array, iteratee);

export const getUrlParameter = (url: string, name: string) => {
  name = name.replace(/\\[[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&#]' + name + '=([^&#]*)');
  var results = regex.exec(url);
  return results === null
    ? ''
    : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

export const groupBy = <T>(
  collection: List<T> | null | undefined,
  iteratee?: ValueIteratee<T>
): Dictionary<T[]> => _groupBy(collection, iteratee);

export const chain = <TrapAny extends { __lodashAnyHack: any }>(
  value: TrapAny
): CollectionChain<any> &
  FunctionChain<any> &
  ObjectChain<any> &
  PrimitiveChain<any> &
  StringChain => _chain(value);
