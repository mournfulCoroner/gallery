import './App.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PageContainer from './routes/PageContainer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  auth } from './bll/reducers/reducerUser';
import Popup from './components/Popup/Popup';

const App = () => {
  const dispath = useDispatch()
  const popupDisplay = useSelector((state) => state.reducerCategory.popupDisplay);
  
  useEffect(() => {
    if (localStorage.getItem("authorization")) {
      dispath(auth())
    }
  }, [])

  return (
    <div className="App">
      <Header />
      <PageContainer />
      <Footer />
      {popupDisplay && <Popup/>}
    </div>
  );
}


export default App;
