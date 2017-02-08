import React from 'react';

export default class AmountBox extends React.Component {
  render() {
    return (
      <div className={`card card-outline-${this.props.type} text-center h-100`}>
        <div className="panel-heading">{this.props.text}</div>
        <div className="panel-body">{this.props.amount}</div>
      </div>
    );
  }
}
