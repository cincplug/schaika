import React, { Component } from "react";

class Notation extends Component {
  constructor(props) {
    super(props);
    this.updateNotation = this.updateNotation.bind(this);
  }

  updateNotation() {
    this.props.updateNotation(this.props.notation);
  }

  render() {
    var className =
      "label notation notation-" + this.props.isMatching.toString();
    return (
      <span className={className} onClick={this.updateNotation}>
        {this.props.notation}
      </span>
    );
  }
}

export default Notation;
