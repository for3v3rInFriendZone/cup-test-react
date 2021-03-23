import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, HashRouter as Router, Switch, Redirect } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import Home from "./components/Home";
import Login from './components/auth/Login';
import NotFound from "./components/NotFound";
import {logout} from './services/auth';
import Takmicenja from './components/Takmicenja';

class App extends React.Component {
  render() {
    
    const jwt = window.localStorage['jwt'];

    if(jwt) {
      return (
        <div>
          <Router>
            <Navbar expand bg="dark" variant="dark">
              <Navbar.Brand as={Link} to="/">
                  CUP
              </Navbar.Brand>
              <Nav>
                <Nav.Link as={Link} to="/takmicenja">
                  Takmicenja
                </Nav.Link>
                <Button onClick={()=>logout()}>Logout</Button>
              </Nav>
            </Navbar>
            <Container style={{paddingTop:"25px"}}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" render={()=><Redirect to="/" />} />
                <Route exact path="/takmicenja" component={Takmicenja} />
                {/* <Route exact path="/movies/add" component={AddMovie} />
                <Route exact path="/movies/edit/:id" component={EditMovie} />
                <Route exact path="/projections" component={Projections} />
                <Route exact path="/projections/add" component={AddProjection} /> */}
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Router>
        </div>
      );
    }else{
      return (
        <Container>
          <Router>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route render={()=><Redirect to="/login" />} />
            </Switch>
          </Router>
        </Container>
      );
    }

    
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
