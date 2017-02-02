import { amountFormat } from '../utils';

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
    let data = {
      startTime: ReactDOM.findDOMNode(this.refs.startTime).value,
      endTime: ReactDOM.findDOMNode(this.refs.endTime).value,
    };
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
          <a className='btn btn-default' onClick={this.handleToggle.bind(this)}>Edit</a>
          <a className='btn btn-danger' onClick={this.handleDelete.bind(this)}>Delete</a>
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
          <a className='btn btn-default' onClick={this.handleEdit.bind(this)}>Update</a>
          <a className='btn btn-danger' onClick={this.handleToggle.bind(this)}>Cancel</a>
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
