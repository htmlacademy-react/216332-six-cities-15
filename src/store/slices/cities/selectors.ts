import {NameSpace} from '../../../const';
import {State} from '../../../types/state';
import {City} from '../../../types/city';

export const getCities = (state: State): City[] => state[NameSpace.City].cities;
export const getCitiesNames = (state: State): string[] => state[NameSpace.City].cities.map((city) => city.name);
export const getActiveCity = (state: State): string => state[NameSpace.City].activeCity;
export const getCurrentCity = (state: State): City | undefined =>
  state[NameSpace.City].cities.find((city) =>
    city.name === getActiveCity(state)
  );
