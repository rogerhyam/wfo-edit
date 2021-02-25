import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import ItemLabel from "./ItemLabel";


class SearchItemDialogue extends Component {

    constructor(props) {
        super(props);
        this.state = { show: false, results: [] };
    }

    handleSearchTermChange = (e) => {
        console.log(e.target.value);

        let terms = e.target.value;

        // do nothing till we have enough data
        if (terms.length < 4) return;

        let statuses = "";
        if (this.props.requireStatus) {
            statuses = "&status=" + this.props.requireStatus.join(',')
        }

        fetch('search.php?terms=' + terms + statuses)
            .then(response => response.json())
            .then(data => {
                this.setState({ results: data });
            }
            );

    }

    handleItemSelect = (itemData) => {
        this.props.setPickedItem(itemData);
    }

    // closing is run by containing component through 
    // props so we have to return null to trigger it
    // gives support for clicking the x and on background
    handleClose = () => {
        this.props.setPickedItem(null);
    }

    getOptions = () => {

        let options = [];

        if (this.state.results.length > 0) {
            this.state.results.map((i) => {
                return options.push(
                    <ListGroup.Item key={i.wfo_id} action onClick={() => this.handleItemSelect(i)} ><ItemLabel itemData={i} includeStatus={true} includeAuthors={true} /></ListGroup.Item>
                )

            }
            );
        } else {
            options.push(<ListGroup.Item key="1" variant="dark" >Search Tips</ListGroup.Item>);
            options.push(<ListGroup.Item key="2" >"exact phrase"</ListGroup.Item>);
            options.push(<ListGroup.Item key="3" >beginni*</ListGroup.Item>);
            options.push(<ListGroup.Item key="4" >+obligatory</ListGroup.Item>);
            options.push(<ListGroup.Item key="5" >-verboten</ListGroup.Item>);
        }

        return options;

    }

    render() {

        return (
            <Modal
                show={this.props.show}
                onHide={this.handleClose}
                centered
                dialogClassName="wfo-link-item"
                className="wfo-item-label"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="search">
                            <Form.Control
                                type="text"
                                placeholder="Type the name or WFO ID"
                                onChange={this.handleSearchTermChange}
                            />
                        </Form.Group>
                        <ListGroup >
                            {this.getOptions()}
                        </ListGroup>
                    </Form>
                </Modal.Body>

            </Modal>
        );
    }

}
export default SearchItemDialogue