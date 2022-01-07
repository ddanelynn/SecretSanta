import "./App.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import  SignInPage  from "./components/SignInPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignUpPage } from "./components/SignUpPage";
import { HomePage } from "./components/HomePage";
import { EventCreationPage } from "./components/EventCreationPage";
import { BirthdayEventCreationPage } from "./components/BirthdayEventCreationPage";
import ProfilePage from "./components/ProfilePage";
import reducers from "./constants/Reducers";
//import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const store = createStore(reducers);
  return (
    <>
     <Provider store={store}>
      <Router>
          {/* <Navbar /> */}
          <Routes>
          <Route path="/" exact element={<BirthdayEventCreationPage/>} />
          <Route path="/sign-up" exact element={<SignUpPage/>} />
          <Route path="/home" exact element={<HomePage/>} />
          <Route path="/profile" exact element={<ProfilePage/>} />
          {/* <Route path='/services' exact component={Services} />
          <Route path='/sign-up' exact component={SignUp} />
          <Route path='/products' exact component={Products} /> */}
          </Routes>
      </Router>
      </Provider>
    </>
  );
}

export default App;
