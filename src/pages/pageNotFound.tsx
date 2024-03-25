import {Link} from 'react-router-dom';

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
