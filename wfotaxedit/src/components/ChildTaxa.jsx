import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ItemLabel from "./ItemLabel";
import Badge from "react-bootstrap/Badge";

class ChildTaxa extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderChildren = (children, navigateToItem) => {
        if (children && children.length > 0) {
            return children.map((kid) => (
                <ListGroup.Item
                    action
                    key={kid.wfo_id}
                    onClick={(e) => { e.preventDefault(); navigateToItem(kid.wfo_id); }}
                >
                    <ItemLabel itemData={kid} contractGenus={true} includeAuthors={true} includeStatus={true} includeEditable={kid.can_edit}></ItemLabel>
                </ListGroup.Item>
            ));
        } else {
            return (<ListGroup.Item>No sub-taxa</ListGroup.Item>);
        }
    }

    getCountBadge = () => {

        const badgeStyle = {
            fontSize: "80%",
            verticalAlign: "super"
        };

        if (!this.props.children) return "";

        return <span style={badgeStyle} >{' '}<Badge pill variant="secondary">{this.props.children.length.toLocaleString()}</Badge></span>;
    }

    render() {

        const { children, navigateToItem } = this.props;


        return (
            <Card className="wfo-child-list" style={{ marginTop: "1em" }}>
                <Card.Header>Child Taxa {this.getCountBadge()}</Card.Header>
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