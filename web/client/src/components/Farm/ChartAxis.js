import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';

class ChartAxis extends React.Component {
  static propTypes = {
    axisFunc: PropTypes.func.isRequired,
    label: PropTypes.shape({
      text: PropTypes.string.isRequired,
      props: PropTypes.object.isRequired
    })
  };

  componentDidMount () {
    this.renderAxis();
  }

  componentDidUpdate () {
    this.renderAxis();
  }

  renderAxis () {
    d3.select(ReactDOM.findDOMNode(this))
      .call(this.props.axisFunc);
  }

  render () {
    return (
      <g {...this.props}>
        {this.props.label ?
        <text {...this.props.label.props}>{this.props.label.text}</text>
        : null}
      </g>
    );
  }
}

export default ChartAxis;
