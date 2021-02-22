import React, { Component } from "react";
import Form from "react-bootstrap/Form";


class ItemFormNameName extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {

        const { name, setName } = this.props;

        return (
            <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="The main name component" value={name} onChange={(e) => setName(e.target.value)} />
                <Form.Text className="text-muted">The primary name part.</Form.Text>
            </Form.Group>
        );

    }

}
export default ItemFormNameName;