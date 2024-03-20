import {SORT_OPTIONS} from '../const';
import classNames from 'classnames';

type PlacesOptionsProps = {
  active: string;
  visible: boolean;
  onToggleVisible: () => void;
  onChangeSort: (val: string) => void;
}

export default function PlacesOptions({onChangeSort, onToggleVisible, active, visible}: PlacesOptionsProps) {
  return (
    <ul
      className={classNames({
        'places__options': true,
        'places__options--custom': true,
        'places__options--opened': visible,
        'places__options--closed': !visible,
      })}
    >
      {Object.values(SORT_OPTIONS).map((el) => (
        <li
          key={el}
          className={classNames({
            'places__option': true,
            'places__option--active': active === el,
          })}
          tabIndex={0}
          onClick={() => {
            onChangeSort(el);
            onToggleVisible();
          }}
        >
          {el}
        </li>
      ))}
    </ul>
  );
}
