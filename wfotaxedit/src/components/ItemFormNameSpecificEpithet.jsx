import React, { Component } from "react";
import Form from "react-bootstrap/Form";


class ItemFormNameSpecificEpithet extends Component {

    acceptableRanks = ["subspecies", "variety", "form"];

    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {

        const { rank, specificEpithet, setSpecificEpithet } = this.props;

        // we render nothing if this is not an acceptable rank
        if (this.acceptableRanks.indexOf(rank) === -1) return "";

        return (
            <Form.Group controlId="specificEpithet">
                <Form.Label>Specific Epithet</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Specific epithet part of the composite name"
                    value={specificEpithet}
                    onChange={(e) => setSpecificEpithet(e.target.value)} />
                <Form.Text className="text-muted">Subspecific names (trinomials) must specify a species epithet.</Form.Text>
            </Form.Group>
        );

    }

}
export default ItemFormNameSpecificEpithet;