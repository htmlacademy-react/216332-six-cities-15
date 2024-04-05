import {Offer} from '../types/offer';

type FilteredDataType = {
  city: string;
  offers: Offer[];
};

export const preparedFavoriteData = (data: Offer[]): FilteredDataType[] | [] => {
  const map = new Map<string, Offer[]>();
  const res: FilteredDataType[] = [];
  data.forEach((el, i, arr) => {
    map.set(el.city.name, [...(map.get(el.city.name) || []), ...[arr[i]]]);
  });

  map.forEach((value, key) => {
    res.push({city: key, offers: value});
  });

  return res;
};
