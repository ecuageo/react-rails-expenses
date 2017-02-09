import React from 'react';

export default class AmountBox extends React.Component {
  render() {
    return (
      <div className={`card card-outline-${this.props.type} d-flex justify-content-center align-items-center h-100`}>
        <div className="panel-heading">{this.props.title}</div>
        <div className={`panel-body h1 text-${this.props.type}`}>{this.props.amount}</div>
      </div>
    );
  }
}
