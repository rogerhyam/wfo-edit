import '../App.css';
import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ChildTaxa from "./ChildTaxa";
import Synonyms from "./Synonyms";
import TaxonPath from "./TaxonPath";
import ItemRender from "./ItemRender";
import Item from "./Item";

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
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
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
              <Form>

                <Card style={{ marginTop: "1em" }}>
                  <Card.Header>Name</Card.Header>
                  <Card.Body>



                    <Form.Group controlId="rank">
                      <Form.Label>Rank</Form.Label>
                      <Form.Control as="select">
                        <option>Order</option>
                        <option>Family</option>
                        <option>Genus</option>
                        <option>Species</option>
                        <option>Subspecies</option>
                        <option>Variety</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="genus">
                      <Form.Label>Genus</Form.Label>
                      <Form.Control type="text" placeholder="Genus part of name" />
                      <Form.Text className="text-muted">
                        Species must have a genus name.
          </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="specificEpithet">
                      <Form.Label>Specific Epithet</Form.Label>
                      <Form.Control type="text" placeholder="Specific epithet part of name" />
                      <Form.Text className="text-muted">
                        Subspecific names (trinomials) must have a specific epithet
          </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="name">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="text" placeholder="The name" />
                      <Form.Text className="text-muted">
                        Species must have a genus name.
          </Form.Text>
                    </Form.Group>



                  </Card.Body>
                </Card>

                <Card style={{ marginTop: "1em" }}>
                  <Card.Header>Author(s)</Card.Header>
                  <Card.Body>

                    <Form.Group controlId="authorString">
                      <Form.Label>Author String</Form.Label>
                      <Form.Control type="email" placeholder="Standard author string" />
                      <Form.Text className="text-muted">
                        The standard author string abbreviating well known authors.
          </Form.Text>
                    </Form.Group>

                    <ul>
                      <li>Author 1</li>
                      <li>Author 2</li>
                      <li>Author 3</li>
                      <li>Author 4</li>
                    </ul>

                  </Card.Body>
                </Card>

                <Card style={{ marginTop: "1em" }}>
                  <Card.Header>Protologue</Card.Header>
                  <Card.Body>

                    <Form.Group controlId="protologueString">
                      <Form.Label>Citation</Form.Label>
                      <Form.Control type="email" placeholder="Standard abbreviated citation of the protologue" />
                      <Form.Text className="text-muted">
                        The standard abbreviated citation of the protologue.
          </Form.Text>
                    </Form.Group>

                    <a href="dsffdsdsaf">Publication Link</a>

                  </Card.Body>
                </Card>

                <Card style={{ marginTop: "1em" }}>
                  <Card.Header>Basionym</Card.Header>
                  <Card.Body>

                    <Form.Group controlId="lookupBasionym">
                      <Form.Label>Link Basionym</Form.Label>
                      <Form.Control type="text" placeholder="Start typing basionym" />
                      <Form.Text className="text-muted">
                        If this is a comb nov of a name you can link to the basionym.
          </Form.Text>
                    </Form.Group>

                    <a href="dsffdsdsaf">Basionym Link</a>

                  </Card.Body>
                </Card>


                <Card style={{ marginTop: "1em" }}>
                  <Card.Header>Taxonomy</Card.Header>
                  <Card.Body>

                    <Form.Group controlId="rank">
                      <Form.Label>Taxonomic Status</Form.Label>
                      <Form.Control as="select">
                        <option>Accepted Taxon</option>
                        <option>Synonym</option>
                        <option>Unchecked</option>
                        <option>Ambiguous</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="lookupParent">
                      <Form.Label>Link Parent</Form.Label>
                      <Form.Control type="text" placeholder="Start typing parent" />
                      <Form.Text className="text-muted">
                        Create a link to the parent
          </Form.Text>
                    </Form.Group>

                    <a href="dsffdsdsaf">Parent Link</a>

                    <Form.Group controlId="lookupParent">
                      <Form.Label>Link to Accepted</Form.Label>
                      <Form.Control type="text" placeholder="Start typing parent" />
                      <Form.Text className="text-muted">
                        Create a link to the parent
          </Form.Text>
                    </Form.Group>

                    <a href="dsffdsdsaf">Accepted Link</a>

                  </Card.Body>
                </Card>


                <Card style={{ marginTop: "1em" }}>
                  <Card.Header>Commit</Card.Header>
                  <Card.Body>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Editorial Comments</Form.Label>
                      <Form.Control as="textarea" rows={3} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                      Save
        </Button>

                  </Card.Body>
                </Card>



                <Card style={{ marginTop: "1em" }}>
                  <Card.Header>Previous Versions</Card.Header>
                  <Card.Body>
                    <ul>
                      <li>sdsafds</li>
                      <li>sdsafds</li>
                    </ul>

                  </Card.Body>
                </Card>

              </Form>
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
