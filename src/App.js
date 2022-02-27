import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PageContainer from './components/PageContainer/PageContainer';

function App() {
  return (
    <div className="App">
      <Header/>
      <PageContainer/>
      <Footer/>
    </div>
  );
}

export default App;
