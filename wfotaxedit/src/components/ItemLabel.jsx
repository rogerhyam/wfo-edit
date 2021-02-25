import React, { Component } from "react";
import Badge from "react-bootstrap/Badge";

class ItemLabel extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        const { itemData, contractGenus, includeAuthors, includeStatus, includeSynonymBadge, includeEditable } = this.props;

        if (!itemData) return "";

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

        const badgeStyle = {
            fontSize: "80%",
            verticalAlign: "super"
        };

        let synonymBadge = "";
        if (includeSynonymBadge && itemData.status === "synonym") {
            synonymBadge = <span style={badgeStyle} >{' '}<Badge pill variant="info">Syn</Badge></span>;
        }

        let statusBadge = "";
        if (includeStatus) {
            switch (itemData.status) {
                case "accepted":
                    statusBadge = <span style={badgeStyle} >{' '}< Badge pill variant="success" >A</Badge ></span>;
                    break;
                case "synonym":
                    statusBadge = <span style={badgeStyle} >{' '}< Badge pill variant="info" >S</Badge ></span>;
                    break;
                case "unchecked":
                    statusBadge = <span style={badgeStyle} >{' '}<Badge pill variant="warning">U</Badge></span>;
                    break;
                case "ambiguous":
                    statusBadge = <span style={badgeStyle} >{' '}<Badge pill variant="danger">A</Badge></span>;
                    break;
                default:
                    break;
            }
        }

        let editBadge = "";
        if (includeEditable) {
            if (itemData.can_edit) {
                editBadge = <span style={badgeStyle} >{' '}<Badge pill variant="secondary">E</Badge></span>;
            }
        }

        switch (itemData.rank) {
            // binomials
            case 'species':
                label = <span className="wfo-name wfo-species"><i>{genus} {itemData.name}</i>{authorship}{synonymBadge}{statusBadge}{editBadge}</span>;
                break;

            // trinomials
            case 'subspecies':
                label = <span className="wfo-name wfo-subspecies" ><i>{genus} {itemData.species}</i> subsp. <i>{itemData.name}</i>{authorship}{synonymBadge}{statusBadge}{editBadge}</span>;
                break;

            case 'variety':
                label = <span className="wfo-name wfo-variety" ><i>{genus} {itemData.species}</i> var. <i>{itemData.name}</i>{authorship}{synonymBadge}{statusBadge}{editBadge}</span>;
                break;

            case 'form':
                label = <span className="wfo-name wfo-form" ><i>{genus} {itemData.species}</i> f. <i>{itemData.name}</i>{authorship}{synonymBadge}{statusBadge}{editBadge}</span>;
                break;

            case 'genus':
                label = <span className="wfo-name wfo-genus" ><i>{itemData.name}</i>{authorship}{synonymBadge}{statusBadge}{editBadge}</span>;
                break;

            // mononomials
            default:
                label = <span className="wfo-name wfo-mono" >{itemData.name}{authorship}{statusBadge}{editBadge}</span>;
                break;
        }

        return label;


    }

}
export default ItemLabel;