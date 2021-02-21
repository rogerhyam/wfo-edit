import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

class Synonyms extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    renderSynonyms = (synonyms, navigateToItem) => {
        if (synonyms && synonyms.length > 0) {
            return synonyms.map((syn) => (
                <ListGroup.Item action key={syn.wfo_id} onClick={(e) => { e.preventDefault(); navigateToItem(syn.wfo_id); }} >
                    {syn.name}
                </ListGroup.Item>
            ));
        } else {
            return (<ListGroup.Item>No synonyms</ListGroup.Item>);
        }
    }

    render() {
        const { synonyms, navigateToItem } = this.props;
        return (
            <Card style={{ marginTop: "1em" }}>
                <Card.Header>Synonyms</Card.Header>
                <Card.Body>
                    <ListGroup>
                        {this.renderSynonyms(synonyms, navigateToItem)}
                    </ListGroup>
                </Card.Body>
            </Card>
        );
    }
}
export default Synonyms;