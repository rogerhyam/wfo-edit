import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import ItemLabel from "./ItemLabel";


class LinkItemDialogue extends Component {

    constructor(props) {
        super(props);
        this.state = { show: false, results: [] };
    }

    handleClose = () => {
        this.setState({ show: false, results: [] });
    }

    handleShow = () => {
        this.setState({ show: true, results: [] });
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
        this.handleClose();
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

        //{ this.state.results.map(itemData => { key: itemData.wfo_id, value: itemData.wfo_id, label: > </option >) }
        return options;

    }

    getItemLabel = () => {

        if (this.props.itemData) {
            return <a href={"#" + this.props.itemData.wfo_id}><ItemLabel itemData={this.props.itemData} includeAuthors={true} /></a >;
        } else {
            return "Not set";
        }

    }

    render() {

        const { title, show } = this.props;

        if (!show) return "";

        return (
            <>

                <ListGroup.Item >
                    <div style={{ width: "80%", float: "left", verticalAlign: "middle" }}>
                        <strong>{title}:</strong>{' '}{this.getItemLabel()}
                    </div>
                    <div style={{ width: "15%", float: "right", textAlign: "right" }}>
                        <Button variant="secondary" onClick={this.handleShow}>Set</Button>
                    </div>
                </ListGroup.Item>

                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    centered
                    dialogClassName="wfo-link-item"
                    className="wfo-item-label"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="search">
                                <Form.Control type="text" placeholder="Type the name or WFO ID" onChange={this.handleSearchTermChange} />
                            </Form.Group>

                            <ListGroup >
                                {this.getOptions()}
                            </ListGroup>
                        </Form>
                    </Modal.Body>

                </Modal>

            </>
        );
    }

}
export default LinkItemDialogue