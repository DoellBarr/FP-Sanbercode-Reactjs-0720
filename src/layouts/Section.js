import React, {useContext} from "react"
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Home from "../pages/Home"
import About from "../pages/About"
import Movie from "../pages/Movie"
import Game from "../pages/Game"
import Movies from "../pages/Movies"
import Games from "../pages/Games"
import Login from "../pages/Login"
import Register from "../pages/Register"
import ChangePassword from "../pages/ChangePassword"
import MovieReview from "../pages/MovieReview"
import {UserContext} from "../context/UserContext"


const Section = () =>{

  const [user] = useContext(UserContext);

  const PrivateRoute = ({user, ...props }) => {
    if (user) {
      return <Route {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };

  const LoginRoute = ({user, ...props }) =>
  user ? <Redirect to="/" /> : <Route {...props} />;



  return(
    <section>
      <Switch>
        <Route exact path="/" user={user} component={Home}/>
        <Route exact path="/about" user={user} component={About}/>
        <Route exact path="/movie" user={user} component={Movie}/>
        <Route exact path="/game" user={user} component={Game}/>
        <Route exact path='/movie_review' user={user} component={MovieReview}/>
        <Route exact path='/register' user={user} component={Register}/>
        <LoginRoute exact path="/login" user={user} component={Login}/>
        <PrivateRoute exact path="/change_password" user={user} component={ChangePassword}/>
        <PrivateRoute exact path="/movies" user={user} component={Movies}/>
        <PrivateRoute exact path="/games" user={user} component={Games}/>
      </Switch>
    </section>
  )
}

export default Section
