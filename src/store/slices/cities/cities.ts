import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CitiesType, NameSpace} from '../../../const';
import {City} from '../../../types/city';
import {CITIES} from '../../../const';

export type CityData = {
  cities: City[];
  activeCity: string;
};

const initialState: CityData = {
  cities: CITIES,
  activeCity: CitiesType.Paris,
};

const citiesData = createSlice({
  name: NameSpace.City,
  initialState,
  reducers: {
    setCity (state: CityData, action: PayloadAction<string>) {
      state.activeCity = action.payload;
    },
  },
});

export const { setCity } = citiesData.actions;
export {citiesData};
