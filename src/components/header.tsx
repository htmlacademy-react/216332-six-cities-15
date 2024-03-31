import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../hooks';
import {logoutAction} from '../store/thunks/user';
import {MouseEvent} from 'react';
import {useAppSelector} from '../hooks';
import {AppRoute, AuthorizationStatus} from '../const';
import {getAuthorizationStatus, getUserInfo} from '../store/slices/user/selectors';

type LogOutLinkProps = {
  handleLogout: (e: MouseEvent<HTMLAnchorElement>) => void;
}

type SignOutItemProps = {
  handleLogin: (e: MouseEvent<HTMLAnchorElement>) => void;
}

const LogOutLink = ({handleLogout}: LogOutLinkProps) => (
  <li className="header__nav-item">
    <a className="header__nav-link" href="#" onClick={handleLogout}>
      <span className="header__signout">Sign out</span>
    </a>
  </li>
);

const SignInItem = () => {
  const userInfo = useAppSelector(getUserInfo);
  return (
    <li className="header__nav-item user">
      <a className="header__nav-link header__nav-link--profile" href="#">
        <div className="header__avatar-wrapper user__avatar-wrapper">
        </div>
        <span className="header__user-name user__name">{userInfo?.email}</span>
        <span className="header__favorite-count">3</span>
      </a>
    </li>
  );
};

const SignOutItem = ({handleLogin}: SignOutItemProps) => (
  <li className="header__nav-item user">
    <a className="header__nav-link header__nav-link--profile" href="#" onClick={handleLogin}>
      <div className="header__avatar-wrapper user__avatar-wrapper">
      </div>
      <span className="header__login">Sign in</span>
    </a>
  </li>
);

export default function Header() {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();

  const handleLogout = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(logoutAction());
  };

  const handleLogin = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(`${AppRoute.Login}`);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to="/">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {
                authorizationStatus === AuthorizationStatus.Auth &&
                <>
                  <SignInItem />
                  <LogOutLink handleLogout={handleLogout}/>
                </>
              }
              {
                authorizationStatus !== AuthorizationStatus.Auth &&
                <SignOutItem handleLogin={handleLogin}/>
              }
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
