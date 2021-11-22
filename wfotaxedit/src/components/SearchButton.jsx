import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import SearchItemDialogue from "./SearchItemDialogue";

class SearchButton extends Component {

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
        if (itemData) this.props.navigateToItem(itemData.wfo_id);
        this.handleClose();
    }

    render() {

        return (
            <>
                <Button variant="outline-success" onClick={this.handleShow} disabled={this.props.disabled} >Search</Button>
                <SearchItemDialogue
                    requireStatus={[]}
                    setPickedItem={this.handleItemPicked}
                    title="Search"
                    show={this.state.show} />
            </>

        );
    }

}
export default SearchButton