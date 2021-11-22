import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

class OrcidCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orcidButtonOn: false,
            orcidButtonStyle: this.orcidButtonStyle
        };
    }

    orcidButtonStyle = {
        border: "1px solid #D3D3D3",
        padding: "0.3em",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "1px 1px 3px #999",
        cursor: "pointer",
        color: "#999",
        fontWeight: "bold",
        fontSize: "0.8em",
        lineHeight: "24px",
        verticalAlign: "middle"
    }

    orcidButtonHoverStyle = {
        border: "1px solid #338caf",
        color: "#338caf"
    }

    orcidButtonImageStyle = {
        display: "block",
        margin: "0 .5em 0 0",
        padding: "0",
        float: "left"
    }

    orcidLinkImageStyle = {
        margin: "0.1em .5em 0.1em 0.1em",
        padding: "0"
    }

    orcidButtonToggle = e => {
        if (this.state.orcidButtonOn) {
            this.setState({
                orcidButtonOn: false,
                orcidButtonStyle: this.orcidButtonStyle
            });
        } else {
            this.setState({
                orcidButtonOn: true,
                orcidButtonStyle: { ...this.orcidButtonStyle, ...this.orcidButtonHoverStyle }
            });
        }

    }

    login = e => {
        window.open(
            this.props.user.data.orcid_login_uri,
            "_blank",
            "toolbar=no, scrollbars=yes, width=500, height=600, top=100, left=500"
        );
    }

    logout = e => {
        this.props.user.logout();
    }

    render() {
        return this.props.user.isLoggedIn() ? this.getSignOutCard() : this.getSignInCard();
    }

    getSignOutCard() {
        return (
            <Card>
                <Card.Header> <img
                    style={this.orcidButtonImageStyle}
                    id="orcid-id-icon"
                    src="https://orcid.org/sites/default/files/images/orcid_24x24.png"
                    width="24" height="24" alt="ORCID iD icon"
                /> Authenticated</Card.Header>
                <Card.Body>
                    <Card.Title>{this.props.user.user_name}</Card.Title>
                    <Card.Text>

                        <span
                            style={{ ...this.state.orcidButtonStyle, padding: '0.5em' }}
                            onMouseOver={this.orcidButtonToggle}
                            onMouseOut={this.orcidButtonToggle}>
                            <a
                                style={{ color: '#338caf' }}
                                href={'https://orcid.org/' + this.props.user.orcid}>
                                <img
                                    style={this.orcidLinkImageStyle}
                                    id="orcid-id-icon"
                                    src="https://orcid.org/sites/default/files/images/orcid_24x24.png"
                                    width="24" height="24" alt="ORCID iD icon"
                                />
                        https://orcid.org/{this.props.user.getOrcidId()}</a>
                        </span>
                    </Card.Text>
                    <Card.Text>Hi, {this.props.user.getUserName()}, you are signed in with the ORCID iD above. If this isn't you please sign out now.</Card.Text>
                    <Card.Text>To get started click 'Classification' or 'Search' in the menu bar.</Card.Text>
                    <Card.Text><Button onClick={this.logout} variant="secondary" >Sign Out</Button></Card.Text>
                </Card.Body>
            </Card >
        );
    }

    getSignInCard() {

        return (
            <Card>
                <Card.Header> <img
                    style={this.orcidButtonImageStyle}
                    id="orcid-id-icon"
                    src="https://orcid.org/sites/default/files/images/orcid_24x24.png"
                    width="24" height="24" alt="ORCID iD icon"
                /> Authentication</Card.Header>
                <Card.Body>
<<<<<<< HEAD
                    <Card.Body>
                        <Card.Title>ORCID Sign In Required</Card.Title>
                        <Card.Text>
                            This is the classification editor for the <a href="http://www.worldfloraonline.org/" target="wfo">World Flora Online</a>.
                            It is used by specialists to maintain the global consensus taxonomy of worlds plants.
                        </Card.Text>
                        <Card.Text>
                            Access to the editor tool is granted to botanists based on their area of expertise.
                            If you have agreed to work on a group please log in using the button below.
=======
                    <Card.Title>ORCID Sign In Required</Card.Title>
                    <Card.Body>
                        <Card.Text>
                            This is the classification editor for the World Flora Online.
                            It is used by specialists to maintain a global consensus taxonomy of the worlds plants.
                        </Card.Text>
                        <Card.Text>
                            Access to the editor tool is granted to experts based on their area of knowledge.
                            If you have been given a group to work on please log in using the button below.
                        </Card.Text>
                        <Card.Text>
                            <strong>Access to data is free and open under FAIR data sharing principles.</strong>
>>>>>>> ec37c1a271fdb4e7e52703ce44d2e509035fa5ae
                        </Card.Text>
                        <Card.Text>
                            <Button
                                style={this.state.orcidButtonStyle}
                                onMouseOver={this.orcidButtonToggle}
                                onMouseOut={this.orcidButtonToggle}
                                id="connect-orcid-button"
                                onClick={this.login}>
                                <img
                                    style={this.orcidButtonImageStyle}
                                    id="orcid-id-icon"
                                    src="https://orcid.org/sites/default/files/images/orcid_24x24.png"
                                    width="24" height="24" alt="ORCID iD icon"
                                />
                                Register or Connect your ORCID iD
                        </Button>
                        </Card.Text>
                        <Card.Text>The button also enables the creation of a free ORCID iD if you don't have one already.</Card.Text>
<<<<<<< HEAD
                        <Card.Title>
                            The Data Is Open
                        </Card.Title>
                        <Card.Text>
                            Access to the data is free and open under FAIR principles. FIXME: Details of access to backbones. Regular working snapshots?
                        </Card.Text>

=======
>>>>>>> ec37c1a271fdb4e7e52703ce44d2e509035fa5ae
                    </Card.Body>

                </Card.Body>
                {/*
            <Card.Footer className="text-muted">2 days ago</Card.Footer>
            */}
            </Card>
        );


    }

}

export default OrcidCard;



