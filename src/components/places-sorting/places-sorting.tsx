import PlacesOptions from '../places-options/places-options';
import {useEffect, useState} from 'react';

type PlacesSortingProps = {
  active: string;
  onChangeSort: (val: string) => void;
}

export default function PlacesSorting({active, onChangeSort}: PlacesSortingProps) {
  const [visible, setVisible] = useState(false);

  const toggleVisibleHandler = () => {
    setVisible((prev) => !prev);
  };

  useEffect(() => {
    const onEscKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape' && visible) {
        evt.preventDefault();
        toggleVisibleHandler();
      }
    };

    document.addEventListener('keydown', onEscKeyDown);

    return () => {
      document.removeEventListener('keydown', onEscKeyDown);
    };
  }, [visible]);

  return (
    <form
      className="places__sorting"
      action="src/components/places-sorting/places-sorting#"
      method="get"
    >
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={toggleVisibleHandler}>
        {active}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <PlacesOptions
        onChangeSort={onChangeSort}
        onToggleVisible={toggleVisibleHandler}
        active={active}
        visible={visible}
      />
    </form>
  );
}
