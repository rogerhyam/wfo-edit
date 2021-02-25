import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import SearchItemDialogue from "./SearchItemDialogue";
import ItemLabel from "./ItemLabel";


class LinkItem extends Component {

    constructor(props) {
        super(props);
        this.state = { show: false };
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    handleShow = () => {
        this.setState({ show: true });
    }

    handleItemPicked = (itemData) => {
        if (itemData) this.props.setPickedItem(itemData);
        this.handleClose();
    }

    getItemLabel = () => {

        if (this.props.itemData) {
            return <a href={"#" + this.props.itemData.wfo_id}><ItemLabel itemData={this.props.itemData} includeAuthors={true} includeStatus={true} /></a >;
        } else {
            return "Not set";
        }

    }

    render() {

        const { title, itemData, requireStatus } = this.props;

        return (
            <ListGroup.Item >
                <div style={{ width: "80%", float: "left", verticalAlign: "middle" }}>
                    <strong>{title}:</strong>{' '}{this.getItemLabel()}
                </div>
                <div style={{ width: "15%", float: "right", textAlign: "right" }}>
                    <Button variant="secondary" onClick={this.handleShow}>Set</Button>
                </div>
                <SearchItemDialogue
                    requireStatus={requireStatus}
                    setPickedItem={this.handleItemPicked}
                    itemData={itemData}
                    title={title}
                    show={this.state.show}
                />
            </ListGroup.Item>
        );
    }

}
export default LinkItem