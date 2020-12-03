import React, { Component } from "react";

class Arrow extends Component {
  updateProperty() {
    if (
      (this.props.action === "increase" &&
        this.props.value < this.props.limit) ||
      (this.props.action === "decrease" && this.props.value > this.props.limit)
    ) {
      this.props.updateProperty(this.props.property, this.props.action);
    }
  }

  render() {
    return (
      <span
        className={"arrow " + this.props.action}
        onClick={() => this.updateProperty()}
      >
        <svg width="30" height="30" viewBox="0 0 30 30" version="1.1">
          <g>
            <path d="M 0 0 L 30 15 L 0 30 Z"></path>
          </g>
        </svg>
      </span>
    );
  }
}

export default Arrow;
