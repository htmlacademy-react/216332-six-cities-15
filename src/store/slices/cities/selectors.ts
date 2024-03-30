import {CitiesType, NameSpace} from '../../../const';
import {State} from '../../../types/state';
import {City} from '../../../types/city';

export const getCities = (state: State): City[] => state[NameSpace.City].cities;
export const getActiveCity = (state: State): CitiesType => state[NameSpace.City].activeCity;
