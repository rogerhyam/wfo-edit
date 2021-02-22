
import React, { Component } from "react";
import Form from "react-bootstrap/Form";

class ItemFormAuthorsText extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        const { authorsText, setAuthorsText } = this.props;

        return (
            <Form.Group controlId="authorText">
                <Form.Label>Author Text</Form.Label>
                <Form.Control type="text" placeholder="Authors of this name" value={authorsText} onChange={(e) => setAuthorsText(e.target.value)} />
                <Form.Text className="text-muted">The standard author text abbreviating well known authors.</Form.Text>
            </Form.Group>
        );
    }

}
export default ItemFormAuthorsText