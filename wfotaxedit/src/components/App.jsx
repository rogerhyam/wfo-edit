import '../App.css';
import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
<<<<<<< HEAD
import Container from "react-bootstrap/Container";
=======
>>>>>>> ec37c1a271fdb4e7e52703ce44d2e509035fa5ae
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
<<<<<<< HEAD
    this.state = {
      page: "item-form",
      item: null,
      user: null
    };

    window.onhashchange = () => {

      let newHash = window.location.hash.substr(1);

=======
    this.state = { page: "item-form", item: null };

    window.onhashchange = () => {
      let newHash = window.location.hash.substr(1);
>>>>>>> ec37c1a271fdb4e7e52703ce44d2e509035fa5ae
      console.log(newHash);

      let pattern = /^wfo-[0-9]{10}$/;

      if (pattern.test(newHash)) {
<<<<<<< HEAD
        this.navigateToItem(newHash);
=======

        // the hash is a wfo id so we navigate to that item
        // if it is not the current one
        if (!this.state.item || newHash !== this.state.item.wfoId) {
          this.navigateToItem(newHash);
        }

>>>>>>> ec37c1a271fdb4e7e52703ce44d2e509035fa5ae
      } else {
        // the hash is not a wfo id so assume it is a page
        this.setState({ 'page': newHash });
      }


    }
  }

  componentDidMount() {
<<<<<<< HEAD
    this.setState({
      item: new Item("wfo-9499999999", this.itemHasChanged), // we always have an item
      user: new User(this.userHasChanged), // we always have a user
      page: "home"
=======
    // FIXME: Shouldn't hard code.
    this.setState({
      'item': new Item("wfo-9499999999", this.itemHasChanged),
      'user': new User(this.userHasChanged)
>>>>>>> ec37c1a271fdb4e7e52703ce44d2e509035fa5ae
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
<<<<<<< HEAD
    console.log(this.state);
=======
    console.log(this.state.user);
>>>>>>> ec37c1a271fdb4e7e52703ce44d2e509035fa5ae
  }

  itemHasChanged = () => {
    this.setState({ 'item': this.state.item });
<<<<<<< HEAD
    //console.log(this.state);
  }

  navigateToItem = (itemId) => {
    console.log(this.state);
    this.setState({ 'page': "item-form", 'item': new Item(itemId, this.itemHasChanged) });
    window.location.hash = itemId;
    console.log(this.state);
=======
    console.log(this.state.item);
  }

  navigateToItem = (itemId) => {
    this.setState({ 'page': "item-form", 'item': new Item(itemId, this.itemHasChanged) });
    window.location.hash = itemId;
>>>>>>> ec37c1a271fdb4e7e52703ce44d2e509035fa5ae
  }

  getPage = () => {

    let page = null;
<<<<<<< HEAD

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

=======
    switch (this.state.page) {
>>>>>>> ec37c1a271fdb4e7e52703ce44d2e509035fa5ae
      case "item-form":
        page = <PageItem item={this.state.item} navigateToItem={this.navigateToItem} />;
        break;

<<<<<<< HEAD
      case "editors":
        page = <Container style={{ marginTop: "2em" }}><h2>Editors!</h2><p>A table of editors and their assignments?</p></Container>;
        break;

      case "data":
        page = dataPage;
        break;

      case "help":
        page = <Container style={{ marginTop: "2em" }}><h2>Help!</h2><p>Frequently asked questions by editors.</p></Container>;
        break;

=======
>>>>>>> ec37c1a271fdb4e7e52703ce44d2e509035fa5ae
      default:
        page = <PageHome user={this.state.user} />;
        break;
    }

    return page;

  }

  render() {
<<<<<<< HEAD

    // we don't render anything unless there is a user object
    if (!this.state.user) return "";

=======
>>>>>>> ec37c1a271fdb4e7e52703ce44d2e509035fa5ae
    return (
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">WFO Classification Editor</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
<<<<<<< HEAD
            <Nav className="mr-auto" >
              <Nav.Link href="#home" >Home</Nav.Link>
              <Nav.Link href="#wfo-9499999999" disabled={!this.state.user.isLoggedIn()} >Classification</Nav.Link>
              <Nav.Link href="#editors" disabled={!this.state.user.isLoggedIn()} >Editors</Nav.Link>
              <Nav.Link href="#data" >Data</Nav.Link>
              <Nav.Link href="#help" disabled={!this.state.user.isLoggedIn()} >Help</Nav.Link>
            </Nav>
            <SearchButton navigateToItem={this.navigateToItem} disabled={!this.state.user.isLoggedIn()} />
=======
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#wfo-9499999999">Classification</Nav.Link>
              <Nav.Link href="#Help">People</Nav.Link>
              <Nav.Link href="#Help">Help</Nav.Link>
            </Nav>
            <SearchButton navigateToItem={this.navigateToItem} />
>>>>>>> ec37c1a271fdb4e7e52703ce44d2e509035fa5ae
          </Navbar.Collapse>
        </Navbar>
        {this.getPage()}
      </div>
    );
  }
}

export default App;
