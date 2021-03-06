import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";


class ItemRender extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { item } = this.props;

    // don't display if we don't have an item.
    if (!item || !item.data) {
      return (
        <Card style={{ marginTop: "1em" }}>
          <Card.Body>
            <Spinner animation="border" size="lg" />
          </Card.Body>
        </Card>
      );
    };

    let statusBadge = "";
    switch (item.getStatus()) {
      case "accepted":
        statusBadge = <Badge variant="success">Accepted Taxon</Badge>;
        break;
      case "synonym":
        statusBadge = <Badge variant="info">Synonymous Name</Badge>;
        break;
      case "unchecked":
        statusBadge = <Badge variant="warning">Unchecked</Badge>;
        break;
      case "ambiguous":
        statusBadge = <Badge variant="danger">Ambiguous</Badge>;
        break;
      default:
        break;
    }

    let ipniBadge = "";
    if (item.getIpniNameId()) {
      ipniBadge = <a target="ipni" href={`https://www.ipni.org/n/${item.getIpniNameId()}`}><Badge variant="secondary">IPNI:{item.getIpniNameId()}</Badge></a>;
    }

    let editableBadge = "";
    if (!item.isEditable()) {
      editableBadge = <Badge variant="danger">Read Only</Badge>
    }

    const authorStyle = {
      fontWeight: "normal"
    };

    let label = "";
    switch (item.getRank()) {
      // binomials
      case 'species':
        label = <span className="wfo-name wfo-species"><i>{item.getGenus()} {item.getName()}</i> <span style={authorStyle}>{item.getAuthorsText()}</span></span>;
        break;

      // trinomials
      case 'subspecies':
        label = <span className="wfo-name wfo-subspecies" ><i>{item.getGenus()} {item.getSpecificEpithet()}</i> subsp. <i>{item.getName()}</i> <span style={authorStyle}>{item.getAuthorsText()}</span></span>;
        break;

      case 'variety':
        label = <span className="wfo-name wfo-variety" ><i>{item.getGenus()} {item.getSpecificEpithet()}</i> var. <i>{item.getName()}</i> <span style={authorStyle}>{item.getAuthorsText()}</span></span>;
        break;

      case 'form':
        label = <span className="wfo-name wfo-form" ><i>{item.getGenus()} {item.getSpecificEpithet()}</i> f. <i>{item.getName()}</i> <span style={authorStyle}>{item.getAuthorsText()}</span></span>;
        break;

      case 'genus':
        label = <span className="wfo-name wfo-genus" ><i>{item.getName()}</i> <span style={authorStyle}>{item.getAuthorsText()}</span></span>;
        break;

      // mononomials
      default:
        label = <span className="wfo-name wfo-mono" >{item.getName()} <span style={authorStyle}>{item.getAuthorsText()}</span></span>;
        break;
    }

    return (
      <Card style={{ marginTop: "1em" }}>
        <Card.Body>
          <Card.Text>
            {statusBadge}
            {" "}
            <a target="wfo" href={`http://www.worldfloraonline.org/taxon/${item.wfoId}`}><Badge variant="secondary">{item.wfoId}</Badge></a>
            {" "}
            {ipniBadge}
            {" "}
            {editableBadge}
          </Card.Text>
          <Card.Text>
            <span style={{ fontSize: "2rem", fontWeight: "500" }} >{label}</span>
          </Card.Text>
          <Card.Text>
            {item.getProtologueText()}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}
export default ItemRender;