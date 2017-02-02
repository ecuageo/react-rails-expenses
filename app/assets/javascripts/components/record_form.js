import CCO from 'change-case-object';
import DatePicker from 'react-datepicker';

export default class RecordForm extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      startTime: '',
      endTime: ''
    };
  }

  handleChange(e) {
    this.state[e.target.name] = e.target.value;
    this.setState(this.state);
  }

  handleSubmit(e) {
    e.preventDefault();
    $.post('', { record: CCO.snake(this.state) }, (data) => {
      this.props.handleNewRecord(data)
      this.setState(this.state)
    }, 'JSON');
  }

  valid() {
    return !!this.state.startTime;
  }

  render() {
    return (
      <div className="container-fluid bg-faded">
        <form className='form-inline pt-3 pb-3' onSubmit={this.handleSubmit.bind(this)}>
          <input
            type='datetime-local'
            className='form-control mb-2 mr-sm-2 mb-sm-0'
            placeholder='Start time'
            name='startTime'
            value={this.state.startTime}
            onChange={this.handleChange.bind(this)} />
          <input
            type='datetime-local'
            className='form-control mb-2 mr-sm-2 mb-sm-0'
            placeholder='End time'
            name='endTime'
            value={this.state.endTime}
            onChange={this.handleChange.bind(this)} />
          <button type='submit' className='btn btn-primary' disabled={!this.valid()}>
            Create record
          </button>
        </form>
      </div>
    );
  }
}
