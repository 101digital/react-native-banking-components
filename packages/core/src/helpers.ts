import { defaultsDeep as _defaultsDeep, isEmpty as _isEmpty } from 'lodash';

export const defaultsDeep = (obj1: Object, obj2: Object) => _defaultsDeep(obj1, obj2);

export const isEmpty = (object: Object) => _isEmpty(object);

export const isNotEmpty = (object: Object) => !_isEmpty(object);
