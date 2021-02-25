
import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import LinkItem from "./LinkItem";

class ItemFormAuthorsText extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    getSuggestedTerms = () => {

        const item = this.props.item;

        if (!item) return "";

        let suggest = item.getName();

        // add the bit between the brackets
        const parts = /\((.*)\)/.exec(item.getAuthorsText());
        if (parts && parts[1]) {
            suggest += " " + parts[1];
        }

        return suggest;

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