
import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

class ItemFormCommit extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    handleSave = (e) => {
        e.preventDefault();
        this.setState({ showSpinner: true });
        if (this.props.item.save()) {
            window.scrollTo(0, 0);
            // FIXME - SAVE Confirmation
        } else {
            // FIXME - ERROR Confirmations
        }

    }

    renderSaveButton = () => {

        if (this.props.item.saving) {
            return (
                <Button variant="primary" type="submit" onClick={this.handleSave} disabled>
                    Save
                    {' '}
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                </Button>
            );
        } else {
            return (
                <Button variant="primary" type="submit" onClick={this.handleSave}>
                    Save
                </Button>);
        }
    }

    renderReadOnlyButton = () => {

        return (
            <Button variant="danger" type="submit" disabled >
                Read Only
            </Button>
        );

    }

    renderButton = () => {
        if (this.props.item.isEditable()) {
            return this.renderSaveButton();
        } else {
            return this.renderReadOnlyButton();
        }
    }

    render() {

        const { item } = this.props;

        return (
            <Card style={{ marginTop: "1em" }}>
                <Card.Header>Commit</Card.Header>
                <Card.Body>
                    <Form.Group controlId="comments">
                        <Form.Label>Editorial Comments</Form.Label>
                        <Form.Control as="textarea" rows={3} value={item.getComment()} onChange={(e) => item.setComment(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="submit-button" style={{ textAlign: "right" }}>
                        {this.renderButton()}
                    </Form.Group>
                </Card.Body>
            </Card>
        );
    }

}
export default ItemFormCommit