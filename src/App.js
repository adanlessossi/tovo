import React, { Component, Fragment  } from 'react';
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "aws-amplify";
import Routes from "./routes/Routes";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  
    this.setState({ isAuthenticating: false });
  }
  
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = async event => {
    await Auth.signOut();
  
    this.userHasAuthenticated(false);
    this.props.history.push("/login");
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (
      !this.state.isAuthenticating &&
      <div className="App container">
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Ardoino 88</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Nav>
            <LinkContainer to="/description">
              <NavItem>Nützliche Infos</NavItem>
            </LinkContainer>
            <LinkContainer to="/gallerie">
              <NavItem>Fotogallerie</NavItem>
            </LinkContainer>
            <LinkContainer to="/comment">
              <NavItem>Gästebuch</NavItem>
            </LinkContainer>
          </Nav>
          <Navbar.Collapse>
            <Nav pullRight>
              {this.state.isAuthenticated
                ? <Fragment>
                    <LinkContainer to="/calendar">
                      <NavItem>Kalendar</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/">
                      <NavItem onClick={this.handleLogout}>Logout</NavItem>
                    </LinkContainer>
                  </Fragment>                
                : <Fragment>
                    <LinkContainer to="/signup">
                      <NavItem>Registrieren</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/login">
                      <NavItem>Login</NavItem>
                    </LinkContainer>
                  </Fragment>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default App;
