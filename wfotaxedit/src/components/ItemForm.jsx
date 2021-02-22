
import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ItemFormName from "./ItemFormName";
import ItemFormAuthors from "./ItemFormAuthors";
import ItemFormProtologue from "./ItemFormProtologue";
import ItemFormTaxonomy from "./ItemFormTaxonomy";
import LinkItemDialogue from "./LinkItemDialogue";

class ItemForm extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        // go no further without an item
        if (!this.props.item) return "";

        return (
            <Form>

                <ItemFormName item={this.props.item} />
                <ItemFormAuthors item={this.props.item} />
                <ItemFormProtologue item={this.props.item} />

                <Card style={{ marginTop: "1em" }}>
                    <Card.Header>Basionym</Card.Header>
                    <Card.Body>
                        <a href="dsffdsdsaf">Fixme: Link to Basionym</a>
                        <LinkItemDialogue />
                    </Card.Body>
                </Card>

                <ItemFormTaxonomy item={this.props.item} />

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

        );
    }




}
export default ItemForm;


