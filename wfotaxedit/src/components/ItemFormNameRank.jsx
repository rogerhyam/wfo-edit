import React, { Component } from "react";
import Form from "react-bootstrap/Form";


class ItemFormNameRank extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    renderRanks = () => {
        const options = [];
        for (const rank in this.props.ranks) {
            options.push(
                <option value={rank} key={rank} >{this.props.ranks[rank]}</option>
            );
        }
        return options;
    }

    render() {
        const { rank, setRank } = this.props;
        return (
            <Form.Group controlId="rank">
                <Form.Label>Rank</Form.Label>
                <Form.Control as="select" value={rank} onChange={(e) => setRank(e.target.value)}>
                    {this.renderRanks()}
                </Form.Control>
            </Form.Group>
        );
    }

}
export default ItemFormNameRank;