import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';

class ChartAxis extends React.Component {
  static propTypes = {
    axisFunc: PropTypes.func.isRequired
  };

  componentDidMount () {
    this.renderAxis();
  }

  componentDidUpdate () {
    this.renderAxis();
  }

  renderAxis () {
    const node = ReactDOM.findDOMNode(this);
    d3.select(node).call(this.props.axisFunc);
  }

  render () {
    return (
      <g {...this.props}></g>
    );
  }
}

export default ChartAxis;
