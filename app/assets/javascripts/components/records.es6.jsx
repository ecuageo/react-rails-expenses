class Records extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = { records: this.props.data };
    this.defaultProps = { records: [] };
  }

  addRecord(record) {
    let records = React.addons.update(this.state.records, { $push: [record] });
    this.setState({ records });
  }

  deleteRecord(record) {
    index = this.state.records.indexOf(record);
    records = React.addons.update(this.state.records, { $splice: [[index, 1]] });
    this.replaceState({ records });
  }

  updateRecord(record, data) {
    index = this.state.records.indexOf(record);
    records = React.addons.update(this.state.records, { $splice: [[index, 1, data]] });
    this.replaceState({ records });
  }

  credits() {
    credits = this.state.records.filter((val) => val.amount >= 0)
    return credits.reduce((prev, curr) => prev + parseFloat(curr.amount), 0)
  }

  debits() {
    debits = this.state.records.filter((val) => val.amount < 0)
    return debits.reduce((prev, curr) => prev + parseFloat(curr.amount), 0)
  }

  balance() {
    return this.debits() + this.credits()
  }
  render() {
    return (
      <div className='records'>
        <h2 className='title'>Records</h2>
        <div className='row'>
          <AmountBox type='success' amount={this.credits()} text='Credit' />
          <AmountBox type='danger' amount={this.debits()} text='Debit' />
          <AmountBox type='info' amount={this.balance()} text='Balance' />
        </div>
        <RecordForm handleNewRecord={this.addRecord} />
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.records.map((record) =>
              <Record
                key={record.id}
                record={record}
                handleDeleteRecord={this.deleteRecord}
                handleEditRecord={this.updateRecord} />
            )}
          </tbody>
        </table>
      </div>
    )
  }
}
