import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ItemLabel from "./ItemLabel";

class AssignmentsCard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getAssignments = () => {

        const asses = [];
        if (this.props.assignments && this.props.assignments.length > 0) {

            this.props.assignments.map((ass) => {
                return asses.push(
                    <ListGroup.Item key={ass.wfo_id}>
                        <a href={"#" + ass.wfo_id}>
                            <ItemLabel itemData={ass} includeAuthors={true} includeStatus={true} />
                        </a>
                    </ListGroup.Item>
                )
            });

        } else {
            asses.push(<ListGroup.Item key="none">No Assignments</ListGroup.Item>);
        }
        return asses;

    }

    render() {
        return (
            <Card style={{ marginTop: "1em" }}>
                <Card.Header>Assignments</Card.Header>
                <Card.Body>
                    <ListGroup>
                        {this.getAssignments()}
                    </ListGroup>
                </Card.Body>
            </Card >);
    }

}
export default AssignmentsCard;



