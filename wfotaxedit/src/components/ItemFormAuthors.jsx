
import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import ItemFormAuthorsText from "./ItemFormAuthorsText";
<<<<<<< HEAD
import ItemFormAuthorsLookup from "./ItemFormAuthorsLookup";
=======
>>>>>>> ec37c1a271fdb4e7e52703ce44d2e509035fa5ae


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
<<<<<<< HEAD
                    <ItemFormAuthorsLookup authorsText={item.getAuthorsText()} />
=======
                    <p>FIXME: Parse string and list actual author links here.</p>
>>>>>>> ec37c1a271fdb4e7e52703ce44d2e509035fa5ae
                </Card.Body>
            </Card>
        );
    }

}
export default ItemFormAuthors