import Main from './pages/main';

export default function App() {
  return <Main cards={Array.from({length:5}, () => '')}/>;
}
