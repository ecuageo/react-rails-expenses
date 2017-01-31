class Record extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      edit: false
    }
  }

  handleToggle(e) {
    e.preventDefault();
    this.setState({ edit: !this.state.edit });
  }

  handleDelete(e) {
    e.preventDefault();
    $.ajax({
      method: 'DELETE',
      url: `/records/${ this.props.record.id }`,
      dataType: 'JSON',
      success: () => {
        this.props.handleDeleteRecord(this.props.record)
      }
    });
  }

  handleEdit(e) {
    e.preventDefault();
    data = {
      title: ReactDOM.findDOMNode(this.refs.title).value,
      date: ReactDOM.findDOMNode(this.refs.date).value,
      amount: ReactDOM.findDOMNode(this.refs.amount).value
    };
    $.ajax({
      method: 'PUT',
      url: "/records/#{ this.props.record.id }",
      dataType: 'JSON',
      data: { record: data },
      success: (data) => {
        this.setState({ edit: false });
        this.props.handleEditRecord(this.props.record, data);
      }
    });
  }

  recordRow() {
    return (
      <tr>
        <td>{this.props.record.date}</td>
        <td>{this.props.record.title}</td>
        <td>{amountFormat(this.props.record.amount)}</td>
        <td>
          <a className='btn btn-default' onClick={this.handleToggle}>Edit</a>
          <a className='btn btn-danger' onClick={this.handleDelete}>Delete</a>
        </td>
      </tr>
    )
  }
  recordForm() {
    return (
      <tr>
        <td>
          <input
            className='form-control' type='text'
            defaultValue={this.props.record.date} ref='date' />
        </td>
        <td>
          <input
            className='form-control' type='text'
            defaultValue={this.props.record.title} ref='title' />
        </td>
        <td>
          <input
            className='form-control' type='number'
            defaultValue={this.props.record.amount} ref='amount' />
        </td>
        <td>
          <a className='btn btn-default' onClick={this.handleEdit}>Update</a>
          <a className='btn btn-danger' onClick={this.handleToggle}>Cancel</a>
        </td>
      </tr>
    )
  }

  render() {
    if (this.state.edit) {
      return this.recordForm();
    } else {
      return this.recordRow();
    }
  }
}
