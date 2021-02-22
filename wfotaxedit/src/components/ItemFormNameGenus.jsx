import React, { Component } from "react";
import Form from "react-bootstrap/Form";


class ItemFormNameGenus extends Component {

    acceptableRanks = ["species", "subspecies", "variety", "form"];

    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {

        const { rank, genus, setGenus } = this.props;

        // we render nothing if this is not an acceptable rank
        if (this.acceptableRanks.indexOf(rank) === -1) return "";

        return (
            <Form.Group controlId="genus">
                <Form.Label>Genus</Form.Label>
                <Form.Control type="text" placeholder="Genus part of name" value={genus} onChange={(e) => setGenus(e.target.value)} />
                <Form.Text className="text-muted">Species must have a genus name.</Form.Text>
            </Form.Group>
        );

    }

}
export default ItemFormNameGenus;