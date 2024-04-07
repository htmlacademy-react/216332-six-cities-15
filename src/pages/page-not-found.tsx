import {Link} from 'react-router-dom';
import HelmetComponent from '../components/helmet-component/helmet-component';

const variants = {
  page: {text: 'Page Not Found', o: '🤓'},
  offer: {text: 'We have no offers with what ID', o: '😖'}
};

type PageNotFoundProps = {
  type: keyof typeof variants;
}

function PageNotFound({type}: PageNotFoundProps) {
  return (
    <div className="container">
      <HelmetComponent title='6 cities: 404 Not Found' description='6 cities: 404 Not Found'/>
      <h1>{`4${variants[type].o}4`}</h1>
      <h1>{`Ooooops! ${variants[type].text}`}</h1>
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
}

PageNotFound.defaultProps = {
  type: 'offer',
};

export default PageNotFound;
