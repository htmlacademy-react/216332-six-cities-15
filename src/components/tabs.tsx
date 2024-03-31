import {NavLink} from 'react-router-dom';
import {City} from '../types/city';
import classNames from 'classnames';
import {CitiesType} from '../const';

type TabsProps = {
  cities: City[];
  city: City | undefined;
  onSelectedCity: (name: CitiesType) => void;
}

export default function Tabs({cities, city, onSelectedCity}: TabsProps) {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((currentCity: City) => (
            <li className="locations__item" key={currentCity.name}>
              <NavLink
                className={classNames({
                  'locations__item-link': true,
                  'tabs__item': true,
                  'tabs__item--active': currentCity.name === city?.name
                })}
                to="#"
                onClick={() => onSelectedCity(currentCity.name)}
              >
                <span>{currentCity.name}</span>
              </NavLink>
            </li>
          )
          )}
        </ul>
      </section>
    </div>
  );
}
