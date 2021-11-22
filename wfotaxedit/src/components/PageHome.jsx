import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OrcidCard from "./OrcidCard";
import AssignmentsCard from "./AssignmentsCard";


class PageHome extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return (
            <Container style={{ marginTop: "2em" }}>
                <Row>
                    <Col>
                        <OrcidCard user={this.props.user} />
                        <AssignmentsCard
                            assignments={this.props.user.getAssignments()}
                            show={this.props.user.isLoggedIn()}
                        />
                    </Col>
                </Row>
            </Container>
        );


    }


}
export default PageHome