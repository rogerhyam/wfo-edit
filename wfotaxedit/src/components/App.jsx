import '../App.css';
import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
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
    this.state = { page: "item-form", item: null };

    window.onhashchange = () => {
      let newHash = window.location.hash.substr(1);
      console.log(newHash);

      let pattern = /^wfo-[0-9]{10}$/;

      if (pattern.test(newHash)) {

        // the hash is a wfo id so we navigate to that item
        // if it is not the current one
        if (!this.state.item || newHash !== this.state.item.wfoId) {
          this.navigateToItem(newHash);
        }

      } else {
        // the hash is not a wfo id so assume it is a page
        this.setState({ 'page': newHash });
      }


    }
  }

  componentDidMount() {
    // FIXME: Shouldn't hard code.
    this.setState({
      'item': new Item("wfo-9499999999", this.itemHasChanged),
      'user': new User(this.userHasChanged)
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
    console.log(this.state.user);
  }

  itemHasChanged = () => {
    this.setState({ 'item': this.state.item });
    console.log(this.state.item);
  }

  navigateToItem = (itemId) => {
    this.setState({ 'page': "item-form", 'item': new Item(itemId, this.itemHasChanged) });
    window.location.hash = itemId;
  }

  getPage = () => {

    let page = null;
    switch (this.state.page) {
      case "item-form":
        page = <PageItem item={this.state.item} navigateToItem={this.navigateToItem} />;
        break;

      default:
        page = <PageHome user={this.state.user} />;
        break;
    }

    return page;

  }

  render() {
    return (
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">WFO Classification Editor</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#wfo-9499999999">Classification</Nav.Link>
              <Nav.Link href="#Help">People</Nav.Link>
              <Nav.Link href="#Help">Help</Nav.Link>
            </Nav>
            <SearchButton navigateToItem={this.navigateToItem} />
          </Navbar.Collapse>
        </Navbar>
        {this.getPage()}
      </div>
    );
  }
}

export default App;
