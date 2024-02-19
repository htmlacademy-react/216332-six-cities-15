import Header from './header';
import {ReactNode} from 'react';

type TContainer = {
  children: ReactNode;
  extraClass?: string;
  classMain?: string;
}

export default function Container({children, extraClass, classMain}: TContainer) {
  return (
    <div className={`page ${extraClass ? extraClass : ''}`}>
      <Header/>
      <main className={`page__main ${classMain ? classMain : ''}`}>
        {children}
      </main>
    </div>
  )
}
