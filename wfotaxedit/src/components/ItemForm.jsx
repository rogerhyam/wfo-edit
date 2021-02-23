
import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import ItemFormName from "./ItemFormName";
import ItemFormAuthors from "./ItemFormAuthors";
import ItemFormProtologue from "./ItemFormProtologue";
import ItemFormTaxonomy from "./ItemFormTaxonomy";
import ItemFormBasionym from "./ItemFormBasionym";
import ItemFormCommit from "./ItemFormCommit";

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
                <ItemFormBasionym item={this.props.item} />
                <ItemFormTaxonomy item={this.props.item} />
                <ItemFormCommit item={this.props.item} />

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


