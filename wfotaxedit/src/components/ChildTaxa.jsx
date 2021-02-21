import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ItemLabel from "./ItemLabel";

class ChildTaxa extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderChildren = (children, navigateToItem) => {
        if (children && children.length > 0) {
            return children.map((kid) => (
                <ListGroup.Item action key={kid.wfo_id} onClick={(e) => { e.preventDefault(); navigateToItem(kid.wfo_id); }} >
                    <ItemLabel itemData={kid} contractGenus={true} includeAuthors={true}></ItemLabel>
                </ListGroup.Item>
            ));
        } else {
            return (<ListGroup.Item>No sub-taxa</ListGroup.Item>);
        }


    }

    render() {

        const { children, navigateToItem } = this.props;


        return (
            <Card style={{ marginTop: "1em" }}>
                <Card.Header>Child Taxa</Card.Header>
                <Card.Body>
                    <ListGroup>
                        {this.renderChildren(children, navigateToItem)}
                    </ListGroup>
                </Card.Body>
            </Card>
        );
    }
}
export default ChildTaxa;