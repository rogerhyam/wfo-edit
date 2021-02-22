
import React, { Component } from "react";
import Form from "react-bootstrap/Form";

class ItemFormProtologueText extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        const { protologueText, setProtologueText } = this.props;

        return (
            <Form.Group controlId="protologueString">
                <Form.Label>Micro Citation</Form.Label>
                <Form.Control type="text" placeholder="Standard abbreviated citation of the protologue" value={protologueText} onChange={(e) => setProtologueText(e.target.value)} />
                <Form.Text className="text-muted">The micro citation for the protologue.</Form.Text>
            </Form.Group>
        );
    }

}
export default ItemFormProtologueText