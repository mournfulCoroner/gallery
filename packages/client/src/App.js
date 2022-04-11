import './App.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PageContainer from './routes/PageContainer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {  auth } from './bll/reducers/reducerUser';

const App = () => {
  const dispath = useDispatch()
  
  useEffect(async () => {
    if (localStorage.getItem("authorization")) {
      dispath(auth())
    }
  }, [])

  useEffect(() => {
    headerPadding();
  }, [])

  const headerPadding = () => {
    let h = document.querySelector('header').offsetHeight;
    document.querySelector('.page-container').style.paddingTop = (h + 40) + 'px'
  }
  return (
    <div className="App">
      <Header />
      <PageContainer />
      <Footer />
    </div>
  );
}


export default App;
