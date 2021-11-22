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
<<<<<<< HEAD
                        <AssignmentsCard
                            assignments={this.props.user.getAssignments()}
                            show={this.props.user.isLoggedIn()}
                        />
=======
                        <AssignmentsCard assignments={this.props.user.getAssignments()} />
>>>>>>> ec37c1a271fdb4e7e52703ce44d2e509035fa5ae
                    </Col>
                </Row>
            </Container>
        );


    }


}
export default PageHome