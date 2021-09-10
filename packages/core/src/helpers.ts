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
  CollectionChain,
  FunctionChain,
  ListIteratee,
  Many,
  StringNullableChain,
} from 'lodash';

export const defaultsDeep = (object: any, ...source: any[]) =>
  _defaultsDeep(object, source);

export const isEmpty = (object?: Object) => _isEmpty(object);

export const isNotEmpty = (object?: Object) => !_isEmpty(object);

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

export const chain1 = (value: string | null | undefined): StringNullableChain =>
  _chain(value);

export const chain2 = <T extends (...args: any[]) => any>(
  value: T
): FunctionChain<T> => _chain(value);

export const chain3 = <T = any>(
  value: List<T> | null | undefined
): CollectionChain<T> => _chain(value);

export const orderBy = <T>(
  collection: List<T> | null | undefined,
  iteratees?: Many<ListIteratee<T>>,
  orders?: Many<boolean | 'asc' | 'desc'>
): T[] => _orderBy(collection, iteratees, orders);
