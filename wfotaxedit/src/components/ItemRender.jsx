import React, { Component } from "react";
import Card from "react-bootstrap/Card";

class ItemRender extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { item } = this.props;

    // don't display if we don't have an item.
    if (!item) return '';

    return (
      <Card style={{ marginTop: "1em" }}>
        <Card.Body>
          <h2>{item.name}</h2>
          <p>{item.wfoId}</p>
        </Card.Body>
      </Card>
    );
  }
}
export default ItemRender;