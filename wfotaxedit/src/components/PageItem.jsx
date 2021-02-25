import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ChildTaxa from "./ChildTaxa";
import Synonyms from "./Synonyms";
import TaxonPath from "./TaxonPath";
import ItemRender from "./ItemRender";
import ItemForm from "./ItemForm";

class PageItem extends Component {

    constructor(props) {
        super(props);
        this.state = { show: false };
    }

    render() {

        const { item, navigateToItem } = this.props;

        return (
            <Container fluid>
                <Row>
                    <Col>
                        <TaxonPath ancestors={item ? item.ancestors : null} navigateToItem={navigateToItem} />
                        <ItemRender item={item} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ItemForm item={item}></ItemForm>
                    </Col>
                    <Col xs={4}>
                        <ChildTaxa children={item ? item.children : null} navigateToItem={navigateToItem} />
                        <Synonyms synonyms={item ? item.synonyms : null} navigateToItem={navigateToItem} />
                    </Col>
                </Row>
            </Container>
        );


    }


}
export default PageItem