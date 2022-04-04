import './App.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PageContainer from './routes/PageContainer';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { login } from './bll/reducers/reducerUser';

const App = (props) => {
  const login = props.login;
  
  
  useEffect(async () => {
    if (localStorage.getItem("authorization")) {
      login(localStorage.getItem("authorization"), localStorage.getItem("password"))
    }
    headerPadding();
    // let responce = await fetch("/api/registration", {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json;charset=utf-8'
    //   },
    //   body: JSON.stringify({
    //     nickname: "Admin",
    //     password: "password"
    //   })
    // })

    // console.log("ping", responce); 
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


export default connect(null, {
  login
})(App);
