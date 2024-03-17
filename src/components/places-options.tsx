import {SORT_OPTIONS} from '../const';
import classNames from 'classnames';

type PlacesOptionsProps = {
  active: number;
  visible: boolean;
  onToggleVisible: () => void;
  onChangeSort: (val: number) => void;
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
      {SORT_OPTIONS.map((el, id) => (
        <li
          key={el}
          className={classNames({
            'places__option': true,
            'places__option--active': active === id,
          })}
          tabIndex={0}
          onClick={() => {
            onChangeSort(id);
            onToggleVisible();
          }}
        >
          {el}
        </li>
      ))}
    </ul>
  );
}
