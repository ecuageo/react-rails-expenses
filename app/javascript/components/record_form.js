import React from 'react';
import CCO from 'change-case-object';

export default class RecordForm extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      amount: '',
      description: ''
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
    return !!this.state.amount;
  }

  render() {
    return (
      <div className="container-fluid bg-faded">
        <form className='form-inline pt-3 pb-3' onSubmit={this.handleSubmit.bind(this)}>
          <input
            type='text'
            className='form-control mb-2 mr-sm-2 mb-sm-0'
            placeholder='Amount'
            name='amount'
            value={this.state.amount}
            onChange={this.handleChange.bind(this)} />
          <input
            type='text'
            className='form-control mb-2 mr-sm-2 mb-sm-0'
            placeholder='Description'
            name='description'
            value={this.state.description}
            onChange={this.handleChange.bind(this)} />
          <button type='submit' className='btn btn-primary' disabled={!this.valid()}>
            Create record
          </button>
        </form>
      </div>
    );
  }
}
