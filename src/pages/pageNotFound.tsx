import {Link} from 'react-router-dom';

function PageNotFound() {
  return (
    <div className="container">
      <h1>404. Page not found</h1>
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
}

export default PageNotFound;
