import "./App.css";
import Nav from "./components/nav/nav";
import Pages from "./components/pages/pages";
import Back from "./components/Back/Back";
import LoginProvider from "./context/authContext";
import Footer from "./components/footer/footer";
function App() {
  return (
    <>
      <Back></Back>
      <div className="App">
        <Nav />
        <LoginProvider>
          <Pages />
        </LoginProvider>
      </div>
      <Footer/>
    </>
  );
}

export default App;
