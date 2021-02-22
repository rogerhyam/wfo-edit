import React, { Component } from "react";
import Form from "react-bootstrap/Form";


class ItemFormNameRank extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { rank, setRank } = this.props;
        return (
            <Form.Group controlId="rank">
                <Form.Label>Rank</Form.Label>
                <Form.Control as="select" value={rank} onChange={(e) => setRank(e.target.value)}>
                    <option value="order" >Order</option>
                    <option value="family" >Family</option>
                    <option value="genus" >Genus</option>
                    <option value="species" >Species</option>
                    <option value="subspecies" >Subspecies</option>
                    <option value="variety" >Variety</option>
                </Form.Control>
            </Form.Group>
        );
    }

}
export default ItemFormNameRank;