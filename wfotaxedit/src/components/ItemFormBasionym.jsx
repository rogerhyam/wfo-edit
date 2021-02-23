
import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import LinkItem from "./LinkItem";

class ItemFormAuthorsText extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        const { item } = this.props;

        return (
            <Card style={{ marginTop: "1em" }}>
                <Card.Header>Basionym</Card.Header>
                <Card.Body>
                    <ListGroup>
                        <LinkItem
                            show={true}
                            title="Basionym"
                            setPickedItem={item.setBasionymData}
                            itemData={item.getBasionymData()}
                            requireStatus={[]}
                        />
                    </ListGroup>
                </Card.Body>
            </Card>
        );
    }

}
export default ItemFormAuthorsText