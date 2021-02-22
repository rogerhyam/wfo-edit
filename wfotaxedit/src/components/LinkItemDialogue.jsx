import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class LinkItemDialogue extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    handleShow = () => {
        this.setState({ show: true });
    }
    render() {

        const { item } = this.props;

        return (
            <>
                <Button variant="primary" onClick={this.handleShow}>Link</Button>

                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    centered
                    dialogClassName="wfo-link-item"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Link Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="Type the name or WFO ID" />
                            </Form.Group>

                            <Form.Control as="select" htmlSize={10} custom>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                        <Button variant="primary" onClick={this.handleClose}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>

            </>
        );
    }

}
export default LinkItemDialogue