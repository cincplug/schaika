import React, { Component } from "react";
import Arrow from "./Arrow";

class Property extends Component {
  constructor(props) {
    super(props);
    this.updateProperty = this.updateProperty.bind(this);
  }

  updateProperty(property, action) {
    this.props.updateProperty(property, action);
  }

  render() {
    var className =
      "property " + this.props.property + (this.props.tekst ? " tekst" : "");
    var value = this.props.value;
    if (this.props.tekst) {
      value = this.props.tekst[this.props.value].substr(0, 3);
    }
    return (
      <div className={className}>
        <div className="property-name label">{this.props.trans.en}</div>
        <Arrow
          property={this.props.property}
          action="decrease"
          value={this.props.value}
          limit={this.props.limit.lower}
          updateProperty={this.updateProperty}
        />

        <span className="cifra">{value}</span>

        <Arrow
          property={this.props.property}
          action="increase"
          value={this.props.value}
          limit={this.props.limit.upper}
          updateProperty={this.updateProperty}
        />
      </div>
    );
  }
}

export default Property;
