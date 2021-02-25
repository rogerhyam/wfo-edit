
import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import ItemFormNameRank from "./ItemFormNameRank";
import ItemFormNameGenus from "./ItemFormNameGenus";
import ItemFormNameSpecificEpithet from "./ItemFormNameSpecificEpithet";
import ItemFormNameName from "./ItemFormNameName";

class ItemFormName extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        const { item } = this.props;

        return (
            <Card style={{ marginTop: "1em" }}>
                <Card.Header>Name Composition</Card.Header>
                <Card.Body>
                    <ItemFormNameRank ranks={item.ranks} rank={item.getRank()} setRank={item.setRank} />
                    <ItemFormNameName name={item.getName()} setName={item.setName} />
                    <ItemFormNameSpecificEpithet rank={item.getRank()} specificEpithet={item.getSpecificEpithet()} setSpecificEpithet={item.setSpecificEpithet} />
                    <ItemFormNameGenus rank={item.getRank()} genus={item.getGenus()} setGenus={item.setGenus} />
                </Card.Body>
            </Card>
        );
    }

}
export default ItemFormName