import './App.css';
import Nav from './components/nav/nav';
import Pages from './components/pages/pages';
// import CountriesProvider  from "./context/countriesContext";
import Back from './components/Back/Back'
import LoginProvider from './context/authContext';
function App() {
  return (
    <>
    <Back></Back>
    <div className="App">
      
      <Nav/>
     {/* <CountriesProvider> */}
      <LoginProvider>
     <Pages/>

      </LoginProvider>
 
     {/* </CountriesProvider> */}
    </div>
    </>
  );
}

export default App;
