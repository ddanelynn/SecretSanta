import "./App.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import  SignInPage  from "./components/SignInPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignUpPage } from "./components/SignUpPage";
import { HomePage } from "./components/HomePage";
import { EventCreationPage } from "./components/EventCreationPage";
import BirthdayEventCreationPage from "./components/BirthdayEventCreationPage";
import SecretSantaEventCreationPage from "./components/SecretSantaEventCreationPage";
import ProfilePage from "./components/ProfilePage";
import reducers from "./constants/Reducers";
import WishlistPage from "./components/WishlistPage";
import PrivateRoute from "./components/PrivateRoute";
import LogoutComponent from "./components/LogoutComponent";
//import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const store = createStore(reducers);
  return (
    <>
     <Provider store={store}>
      <Router>
          {/* <Navbar /> */}
          <Routes>
          <Route path="/create/secret-santa" exact element={<PrivateRoute/>}>
            <Route exact path="/create/secret-santa" element={<SecretSantaEventCreationPage/>}/>
          </Route>
          <Route path="/" exact element={<SignInPage/>} />
          <Route path="/events" exact element={<PrivateRoute/>}>
            <Route path="/events" exact element={<EventCreationPage/>} />
          </Route>
          <Route path="/sign-up" exact element={<SignUpPage/>} />
          <Route path="/logout" exact element={<LogoutComponent/>} />
          <Route path="/home" exact element={<PrivateRoute/>}>
            <Route path="/home" exact element={<HomePage/>} />
          </Route>
          <Route path="/profile" exact element={<PrivateRoute/>}>
            <Route path="/profile" exact element={<ProfilePage/>} />
          </Route>
          <Route path="/wishlist" exact element={<PrivateRoute/>}>
            <Route path="/wishlist" exact element={<WishlistPage/>} />
          </Route>
          <Route path="/create/birthday" exact element={<PrivateRoute/>}>
            <Route path="/create/birthday" exact element={<BirthdayEventCreationPage/>} />
          </Route>
          </Routes>
      </Router>
      </Provider>
    </>
  );
}

export default App;
