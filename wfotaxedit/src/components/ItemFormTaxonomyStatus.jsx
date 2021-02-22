import React, { Component } from "react";
import Form from "react-bootstrap/Form";


class ItemFormTaxonomyStatus extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        const { status, setStatus } = this.props;



        return (
            <Form.Group controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="unchecked" >Unchecked</option>
                    <option value="accepted" >Accepted Taxon</option>
                    <option value="synonym" >Synonym</option>
                    <option value="ambiguous" >Ambiguous</option>
                </Form.Control>
            </Form.Group>
        );
    }

}
export default ItemFormTaxonomyStatus;