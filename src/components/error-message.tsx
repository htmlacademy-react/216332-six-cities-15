import {useAppSelector} from '../hooks';

function ErrorMessage() {
  const error = useAppSelector((state) => state.error);

  return (error)
    ? <div>{error}</div>
    : null;

}

export default ErrorMessage;
