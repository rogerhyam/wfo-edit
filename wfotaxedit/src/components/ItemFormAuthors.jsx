
import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import ItemFormAuthorsText from "./ItemFormAuthorsText";


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
                    <p>FIXME: Parse string and list actual author links here.</p>
                </Card.Body>
            </Card>
        );
    }

}
export default ItemFormAuthors