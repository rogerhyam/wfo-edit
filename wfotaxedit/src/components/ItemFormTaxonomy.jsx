
import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import ItemFormTaxonomyStatus from "./ItemFormTaxonomyStatus";

class ItemFormTaxonomy extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        const { item } = this.props;

        return (
            <Card style={{ marginTop: "1em" }}>
                <Card.Header>Taxonomy</Card.Header>
                <Card.Body>
                    <ItemFormTaxonomyStatus status={item.getStatus()} setStatus={item.setStatus} />


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

        );
    }

}
export default ItemFormTaxonomy