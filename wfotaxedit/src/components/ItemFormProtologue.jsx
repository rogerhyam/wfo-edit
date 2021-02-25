
import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import ItemFormProtologueText from "./ItemFormProtologueText"


class ItemFormProtologue extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        const { item } = this.props;

        return (
            <Card style={{ marginTop: "1em" }}>
                <Card.Header>Protologue</Card.Header>
                <Card.Body>
                    <ItemFormProtologueText protologueText={item.getProtologueText()} setProtologueText={item.setProtologueText} />
                    <p>FIXME: Link to publication</p>
                </Card.Body>
            </Card>
        );
    }

}
export default ItemFormProtologue