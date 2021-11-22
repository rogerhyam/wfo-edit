import '../App.css';
import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Item from "./Item";
import User from "./User";
import SearchButton from "./SearchButton";
import PageItem from "./PageItem";
import PageHome from "./PageHome";

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
//import '../darkly.bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "item-form",
      item: null,
      user: null
    };

    window.onhashchange = () => {

      let newHash = window.location.hash.substr(1);

      console.log(newHash);

      let pattern = /^wfo-[0-9]{10}$/;

      if (pattern.test(newHash)) {
        this.navigateToItem(newHash);
      } else {
        // the hash is not a wfo id so assume it is a page
        this.setState({ 'page': newHash });
      }


    }
  }

  componentDidMount() {
    this.setState({
      item: new Item("wfo-9499999999", this.itemHasChanged), // we always have an item
      user: new User(this.userHasChanged), // we always have a user
      page: "home"
    });
  }

  getWfoId() {
    if (this.state.item) {
      return this.state.item.wfoId
    } else {
      return null;
    }
  }

  userHasChanged = () => {
    this.setState({ 'user': this.state.user });
    console.log(this.state);
  }

  itemHasChanged = () => {
    this.setState({ 'item': this.state.item });
    //console.log(this.state);
  }

  navigateToItem = (itemId) => {
    console.log(this.state);
    this.setState({ 'page': "item-form", 'item': new Item(itemId, this.itemHasChanged) });
    window.location.hash = itemId;
    console.log(this.state);
  }

  getPage = () => {

    let page = null;

    const dataPage = <Container style={{ marginTop: "2em" }}><h2>Data Access!</h2><p>Download the latest working snapshot? Links to WFO and API.</p></Container>

    // brute force lock to home page or data page if not logged in
    if (!this.state.user.isLoggedIn()) {
      if (this.state.page === "data") {
        return dataPage;
      } else {
        return page = <PageHome user={this.state.user} />;
      }

    }

    // switch on state
    switch (this.state.page) {

      case "home":
        page = <PageHome user={this.state.user} />;
        break;

      case "item-form":
        page = <PageItem item={this.state.item} navigateToItem={this.navigateToItem} />;
        break;

      case "editors":
        page = <Container style={{ marginTop: "2em" }}><h2>Editors!</h2><p>A table of editors and their assignments?</p></Container>;
        break;

      case "data":
        page = dataPage;
        break;

      case "help":
        page = <Container style={{ marginTop: "2em" }}><h2>Help!</h2><p>Frequently asked questions by editors.</p></Container>;
        break;

      default:
        page = <PageHome user={this.state.user} />;
        break;
    }

    return page;

  }

  render() {

    // we don't render anything unless there is a user object
    if (!this.state.user) return "";

    return (
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">WFO Classification Editor</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto" >
              <Nav.Link href="#home" >Home</Nav.Link>
              <Nav.Link href="#wfo-9499999999" disabled={!this.state.user.isLoggedIn()} >Classification</Nav.Link>
              <Nav.Link href="#editors" disabled={!this.state.user.isLoggedIn()} >Editors</Nav.Link>
              <Nav.Link href="#data" >Data</Nav.Link>
              <Nav.Link href="#help" disabled={!this.state.user.isLoggedIn()} >Help</Nav.Link>
            </Nav>
            <SearchButton navigateToItem={this.navigateToItem} disabled={!this.state.user.isLoggedIn()} />
          </Navbar.Collapse>
        </Navbar>
        {this.getPage()}
      </div>
    );
  }
}

export default App;
