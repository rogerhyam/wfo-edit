
import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class ItemFormCommit extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        const { item } = this.props;

        return (
            <Card style={{ marginTop: "1em" }}>
                <Card.Header>Commit</Card.Header>
                <Card.Body>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Editorial Comments</Form.Label>
                        <Form.Control as="textarea" rows={3} value={item.getComment()} onChange={(e) => item.setComment(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={() => alert('banana')}>Save</Button>
                </Card.Body>
            </Card>
        );
    }

}
export default ItemFormCommit