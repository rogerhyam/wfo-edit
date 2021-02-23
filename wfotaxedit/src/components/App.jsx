import '../App.css';
import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ChildTaxa from "./ChildTaxa";
import Synonyms from "./Synonyms";
import TaxonPath from "./TaxonPath";
import ItemRender from "./ItemRender";
import Item from "./Item";
import ItemForm from "./ItemForm";
import SearchButton from "./SearchButton";

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    window.onhashchange = () => {
      let newHash = window.location.hash.substr(1);
      console.log(newHash);
      if (!this.state.item || newHash !== this.state.item.wfoId) {
        this.navigateToItem(newHash);
      }
    }
  }

  componentDidMount() {
    this.setState({ 'item': new Item(null, this.itemHasChanged) });
  }

  getWfoId() {
    if (this.state.item) {
      return this.state.item.wfoId
    } else {
      return null;
    }
  }

  itemHasChanged = () => {
    this.setState({ 'item': this.state.item });
    console.log(this.state.item);
  }

  navigateToItem = (itemId) => {
    this.setState({ 'item': new Item(itemId, this.itemHasChanged) });
    window.location.hash = itemId;
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
              <Nav.Link href="#link">Classification</Nav.Link>
              <Nav.Link href="#link">Logout</Nav.Link>
            </Nav>
            <SearchButton navigateToItem={this.navigateToItem} />
          </Navbar.Collapse>
        </Navbar>

        <Container fluid>
          <Row>
            <Col>
              <TaxonPath ancestors={this.state.item ? this.state.item.ancestors : null} navigateToItem={this.navigateToItem} />
              <ItemRender item={this.state.item} />
            </Col>
          </Row>
          <Row>
            <Col>
              <ItemForm item={this.state.item}></ItemForm>
            </Col>
            <Col xs={4}>
              <ChildTaxa children={this.state.item ? this.state.item.children : null} navigateToItem={this.navigateToItem} />
              <Synonyms synonyms={this.state.item ? this.state.item.synonyms : null} navigateToItem={this.navigateToItem} />
            </Col>
          </Row>
        </Container>




      </div>
    );
  }
}

export default App;
