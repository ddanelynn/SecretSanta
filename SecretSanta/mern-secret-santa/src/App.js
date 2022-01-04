import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import  SignInPage  from "./components/SignInPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignUpPage } from "./components/SignUpPage";
import { HomePage } from "./components/HomePage";

function App() {
  return (
    <>
      <Router>
          {/* <Navbar /> */}
          <Routes>
          <Route path="/" exact element={<SignInPage/>} />
          <Route path="/sign-up" exact element={<SignUpPage/>} />
          <Route path="/home" exact element={<HomePage/>} />
          {/* <Route path='/services' exact component={Services} />
          <Route path='/sign-up' exact component={SignUp} />
          <Route path='/products' exact component={Products} /> */}
          </Routes>
      </Router>
    </>
  );
}

export default App;
