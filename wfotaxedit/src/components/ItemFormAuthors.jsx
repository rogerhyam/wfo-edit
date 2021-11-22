
import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import ItemFormAuthorsText from "./ItemFormAuthorsText";
import ItemFormAuthorsLookup from "./ItemFormAuthorsLookup";


class ItemFormAuthors extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        const { item } = this.props;

        return (
            <Card style={{ marginTop: "1em" }}>
                <Card.Header>Author(s)</Card.Header>
                <Card.Body>
                    <ItemFormAuthorsText authorsText={item.getAuthorsText()} setAuthorsText={item.setAuthorsText} />
                    <ItemFormAuthorsLookup authorsText={item.getAuthorsText()} />
                </Card.Body>
            </Card>
        );
    }

}
export default ItemFormAuthors