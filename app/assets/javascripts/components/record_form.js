import CCO from 'change-case-object';

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
      <form className='form-inline' onSubmit={this.handleSubmit.bind(this)}>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            placeholder='Start time'
            name='startTime'
            value={this.state.startTime}
            onChange={this.handleChange.bind(this)} />
        </div>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            placeholder='End time'
            name='endTime'
            value={this.state.endTime}
            onChange={this.handleChange.bind(this)} />
        </div>
        <button type='submit' className='btn btn-primary' disabled={!this.valid()}>
          Create record
        </button>
      </form>
    );
  }
}
