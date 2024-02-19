import Header from './header';
import {ReactNode} from 'react';

type TContainer = {
  children: ReactNode;
  extraClass: string;
}

export default function Container({children, extraClass}: TContainer) {
  return (
    <div className='page page--gray page--main'>
      <Header/>
      <main className={`page__main ${extraClass}`}>
        {children}
      </main>
    </div>
  )
}
