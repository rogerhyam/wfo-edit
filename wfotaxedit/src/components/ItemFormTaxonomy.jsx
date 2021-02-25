
import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import ItemFormTaxonomyStatus from "./ItemFormTaxonomyStatus";
import ListGroup from "react-bootstrap/ListGroup";
import LinkItem from "./LinkItem";

class ItemFormTaxonomy extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        const { item } = this.props;

        let title = "Parent Taxon";
        if (item.status === "synonym") title = "Accepted Taxon";

        return (
            <Card style={{ marginTop: "1em" }}>
                <Card.Header>Taxonomy</Card.Header>
                <Card.Body>
                    <ItemFormTaxonomyStatus status={item.getStatus()} setStatus={item.setStatus} />
                    <ListGroup>
                        <LinkItem
                            show={true}
                            title={title}
                            setPickedItem={item.setParentData}
                            itemData={item.getParentData()}
                            requireStatus={["accepted", "ambiguous"]}
                        />
                    </ListGroup>
                </Card.Body>
            </Card>

        );
    }

}
export default ItemFormTaxonomy