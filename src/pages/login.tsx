import Container from '../components/container';
import {useRef, useMemo, FormEvent} from 'react';
import {useAppDispatch} from '../hooks';
import {useAppSelector} from '../hooks';
import {loginAction} from '../store/thunks/user';
import {getCitiesNames} from '../store/slices/cities/selectors';
import {getRandomCity} from '../helpers/getRandomCity';
import {setCity} from '../store/slices/cities/cities';
import {Link} from 'react-router-dom';
import HelmetComponent from '../components/helmet-component';

export default function Login() {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const citiesNames = useAppSelector(getCitiesNames);
  const randomCity = useMemo(() => getRandomCity(citiesNames), []);

  const dispatch = useAppDispatch();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      dispatch(loginAction({
        login: loginRef.current?.value,
        password: passwordRef.current?.value
      }));
    }
  };

  const randomCityHandler = (city: string) => {
    dispatch(setCity(city));
  };

  return (
    <Container extraClass="page--gray page--login" classMain="page__main--login">
      <HelmetComponent
        title='6 cities: authorization'
        description='This page is the authentication gateway, allowing users to log in and access the features.'
      />
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input
                ref={loginRef}
                className="login__input form__input"
                type="email"
                name="email"
                placeholder="Email"
              />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input
                ref={passwordRef}
                className="login__input form__input"
                type="password"
                name="password"
                placeholder="Password"
              />
            </div>
            <button className="login__submit form__submit button" type="submit">Sign in</button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <Link
              className="locations__item-link"
              to="/"
              onClick={() => randomCityHandler(randomCity)}
            >
              <span>{randomCity}</span>
            </Link>
          </div>
        </section>
      </div>
    </Container>
  );
}
