import {
  defaultsDeep as _defaultsDeep,
  isEmpty as _isEmpty,
  uniqBy as _uniqBy,
  ValueIteratee,
  List,
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
