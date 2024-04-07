import Header from '../header/header';
import {ReactNode} from 'react';
import Footer from '../footer/footer';

type TContainer = {
  children: ReactNode;
  extraClass?: string;
  classMain?: string;
  hasFooter?: boolean;
}


export default function Container({children, extraClass, classMain, hasFooter}: TContainer) {
  return (
    <div className={`page ${extraClass ? extraClass : ''}`}>
      <Header/>
      <main className={`page__main ${classMain ? classMain : ''}`}>
        {children}
      </main>
      {hasFooter && <Footer/>}
    </div>
  );
}
