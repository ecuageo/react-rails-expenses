import React from 'react';
import CCO from 'change-case-object';
import { clone, findIndex, remove } from 'lodash';

import AmountBox from '../components/amount_box';
import RecordForm from '../components/record_form';
import Record from '../components/record';

export default class Records extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = { records: this.props.data };
    this.defaultProps = { records: [] };
  }

  addRecord(record) {
    let records = this.state.records.concat(record);
    this.setState({ records });
  }

  deleteRecord(record) {
    let records = clone(this.state.records);
    remove(records, el => el.id === record.id);
    this.setState({ records });
  }

  updateRecord(record, data) {
    let records = clone(this.state.records);
    let index = findIndex(records, el => el.id === record.id);
    records.splice(index, 1, data);
    this.setState({ records });
  }

  credits() {
    let credits = this.state.records.filter((val) => val.amount >= 0);
    return credits.reduce((prev, curr) => prev + parseFloat(curr.amount), 0)
  }

  debits() {
    let debits = this.state.records.filter((val) => val.amount < 0)
    return debits.reduce((prev, curr) => prev + parseFloat(curr.amount), 0)
  }

  balance() {
    return this.debits() + this.credits()
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="container-fluid">
          <h3>Expenses</h3>
        </div>
        <div className="container-fluid mt-1 mb-1">
          <div className="row" style={{ height: 150 }}>
            <div className="col p-0"><AmountBox type="success" title="Credits" amount={this.credits()} /></div>
            <div className="col pl-1 pr-1"><AmountBox type="danger" title="Debits" amount={this.debits()} /></div>
            <div className="col p-0"><AmountBox type="warning" title="Balance" amount={this.balance()} /></div>
          </div>
        </div>
        <RecordForm handleNewRecord={this.addRecord.bind(this)} />
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.records.map((record) =>
              <Record
                key={record.id}
                record={CCO.camel(record)} // TODO: camelize on backend
                handleDeleteRecord={this.deleteRecord.bind(this)}
                handleEditRecord={this.updateRecord.bind(this)} />
            )}
          </tbody>
        </table>
      </div>
    )
  }
}
