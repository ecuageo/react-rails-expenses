import TestComponent from './test_component';
import {map} from 'lodash';

console.log(map([1, 2, 3], n => n * 3));

$(document).on('turbolinks:load', () => {
  ReactDOM.render(React.createElement(TestComponent), document.getElementById('reactTest'))
});
