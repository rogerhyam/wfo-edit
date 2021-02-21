import React, { Component } from "react";

class ItemLabel extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        const { itemData, contractGenus, includeAuthors } = this.props;

        let label;

        let genus = itemData.genus;
        if (genus && contractGenus) {
            genus = genus.substr(0, 1);
            genus += '.'
        }

        let authorship = '';
        if (includeAuthors) {
            authorship = " " + itemData.author_text;
        }

        switch (itemData.rank) {
            // binomials
            case 'species':
                label = <span className="wfo-name wfo-species"><i>{genus} {itemData.name}</i>{authorship}</span>;
                break;

            // trinomials
            case 'subspecies':
                label = <span className="wfo-name wfo-subspecies" ><i>{genus} {itemData.specificEpithet}</i> subsp. <i>{itemData.name}</i>{authorship}</span>;
                break;

            case 'variety':
                label = <span className="wfo-name wfo-variety" ><i>{genus} {itemData.specificEpithet}</i> var. <i>{itemData.name}</i>{authorship}</span>;
                break;

            case 'form':
                label = <span className="wfo-name wfo-form" ><i>{genus} {itemData.specificEpithet}</i> f. <i>{itemData.name}</i>{authorship}</span>;
                break;

            case 'genus':
                label = <span className="wfo-name wfo-genus" ><i>{itemData.name}</i>{authorship}</span>;
                break;

            // mononomials
            default:
                label = <span className="wfo-name wfo-mono" >{itemData.name}{authorship}</span>;
                break;
        }

        return label;


    }

}
export default ItemLabel;