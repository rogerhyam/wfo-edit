import React, { Component } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import ItemLabel from "./ItemLabel";


class TaxonPath extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderPath = (ancestors, navigateToItem) => {

        if (ancestors && ancestors.length > 0) {
            return ancestors.map((ancestor) => (
                <Breadcrumb.Item key={ancestor.wfo_id} href="#" onClick={(e) => { e.preventDefault(); navigateToItem(ancestor.wfo_id); }} >
                    <ItemLabel itemData={ancestor} contractGenus={true} ></ItemLabel>
                </Breadcrumb.Item>
            ));
        } else {
            return <Breadcrumb.Item>No Trail</Breadcrumb.Item>
        }

    }

    render() {

        const { ancestors, navigateToItem } = this.props;

        if (!ancestors) return "";

        return (<Breadcrumb style={{ marginTop: "1em" }} >
            {this.renderPath(ancestors, navigateToItem)}
        </Breadcrumb>);

    }
}
export default TaxonPath;