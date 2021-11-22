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
<<<<<<< HEAD
                <Button variant="outline-success" onClick={this.handleShow} disabled={this.props.disabled} >Search</Button>
=======
                <Button variant="outline-success" onClick={this.handleShow} >Search</Button>
>>>>>>> ec37c1a271fdb4e7e52703ce44d2e509035fa5ae
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