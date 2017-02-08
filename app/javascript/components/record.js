import React from 'react';
import CCO from 'change-case-object';

export default class Record extends React.Component {

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
    let data = CCO.snake({
      startTime: ReactDOM.findDOMNode(this.refs.startTime).value,
      endTime: ReactDOM.findDOMNode(this.refs.endTime).value,
    });
    $.ajax({
      method: 'PUT',
      url: `/records/${ this.props.record.id }`,
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
        <td>{this.props.record.startTime}</td>
        <td>{this.props.record.endTime}</td>
        <td>
          <button className='btn btn-outline-primary' onClick={this.handleToggle.bind(this)}>Edit</button>
          <button className='btn btn-danger' onClick={this.handleDelete.bind(this)}>Delete</button>
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
            defaultValue={this.props.record.startTime} ref='startTime' />
        </td>
        <td>
          <input
            className='form-control' type='text'
            defaultValue={this.props.record.endTime} ref='endTime' />
        </td>
        <td>
          <button className='btn btn-outline-primary' onClick={this.handleEdit.bind(this)}>Update</button>
          <button className='btn btn-danger' onClick={this.handleToggle.bind(this)}>Cancel</button>
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
