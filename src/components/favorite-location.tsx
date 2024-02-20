import {ReactNode} from 'react';

type TFavoriteLocation = {
  children: ReactNode;
  location: string;
}

export default function FavoriteLocation({children, location}: TFavoriteLocation) {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{location}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">{children}</div>
    </li>
  );
}
