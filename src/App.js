import './App.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PageContainer from './components/PageContainer/PageContainer';
import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    let h = document.querySelector('header').offsetHeight;
    document.querySelector('.page-container').style.paddingTop = (h + 40) + 'px'
  }, [])
  return (
    <div className="App">
      <Header/>
      <PageContainer/>
      <Footer/>
    </div>
  );
}

export default App;
