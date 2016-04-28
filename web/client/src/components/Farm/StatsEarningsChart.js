/* eslint-disable no-magic-numbers */
import $ from 'jquery';
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import Radium from 'radium';
import _ from 'lodash';
import moment from 'moment';
import d3 from 'd3';

import colors from '../../colors';
import {FarmDate} from '../../services/farm';
import * as chartActions from '../../actions/chartActions';

@Radium
class StatsEarningsChart extends React.Component {
  static propTypes = {
    farm: PropTypes.shape({
      History: PropTypes.arrayOf(PropTypes.shape({
        Player: PropTypes.shape({
          TotalMoneyEarned: PropTypes.number.isRequired,
          Money: PropTypes.number.isRequired,
          DateStringForSaveGame: PropTypes.string.isRequired
        }).isRequired,
        Ts: PropTypes.number.isRequired
      })).isRequired
    }).isRequired,
    mouseLocation: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }).isRequired,
    isHover: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired,
    setData: PropTypes.func.isRequired,
    mouseOut: PropTypes.func.isRequired,
    mouseOver: PropTypes.func.isRequired,
    mouseMove: PropTypes.func.isRequired,
    height: PropTypes.number,
    width: PropTypes.number,
    changeSize: PropTypes.func.isRequired
  };

  componentWillMount () {
    this.updateSize = _.bind(this.updateSize, this);
    this.props.setData(_(this.props.farm.History)
      .map(history => ({
        id: moment.unix(history.Ts).toDate(),
        totalEarned: history.Player.TotalMoneyEarned,
        wealth: history.Player.Money,
        date: new FarmDate(history.Player.DateStringForSaveGame)
      }))
      .value()
    );
    $(window).on("resize", this.updateSize);
  }

  componentWillUnmount () {
    $(window).off("resize", this.updateSize);
  }

  componentDidMount () {
    this.updateSize();
  }

  updateSize () {
    let node = ReactDOM.findDOMNode(this),
        parentWidth = $(node).width();

    console.log("width", parentWidth);

    this.props.changeSize(parentWidth, 300);
  }

  styles () {
    return {
      wrapper: {
        flex: '1',
        backgroundColor: colors.dkBrown
      },
      chart: {
      },
      lineGroup: {
      },
      line: {
        fill: 'none',
        stroke: colors.leather,
        strokeWidth: '10px'
      },
      tooltipGroup: {
        display: 'none'
      },
      tooltipGroupIsHover: {
        display: 'initial'
      },
      reticle: {
        fill: colors.parchment
      },
      overlay: {
        fill: 'none',
        pointerEvents: 'all'
      }
    };
  }

  render () {
    const earnings = this.props.data,
        w = this.props.width,
        h = this.props.height,
        margin = 10;

    const width = w - margin * 2,
        height = h - margin * 2,
        x = d3.scale.linear()
          .range([0, width]).domain(d3.extent(earnings, d => d.date)),
        y = d3.scale.linear()
          .range([height, 0]).domain([0, d3.max(earnings, d => d.totalEarned)]);

    const line = d3.svg.line()
      .x(d => x(d.date))
      .y(d => y(d.totalEarned));


    return (
      <div style={this.styles().wrapper}>
        <svg
          style={this.styles().chart}
          width={w}
          height={h}
        >
          <g transform={`translate(${margin}, ${margin})`}
            style={this.styles().lineGroup}
          >
            <path style={this.styles().line}
              d={line(earnings)}
              strokeLinecap="round"
            />
          </g>
          <g
            style={[
              this.styles().tooltipGroup,
              this.props.isHover && this.styles().tooltipGroupIsHover
            ]}
            transform={`translate(${this.props.mouseLocation.x}, ${this.props.mouseLocation.y + 15})`}
          >
            <circle
              style={this.styles().reticle}
              r="10"
            />
          </g>
          <rect
            width={w}
            height={h}
            style={this.styles().overlay}
            onMouseMove={e => {
              const bounds = e.target.getBoundingClientRect(),
                  mouseLocation = {
                    x: e.clientX - bounds.left,
                    y: e.clientY - bounds.top
                  },
                  x0 = x.invert(mouseLocation.x),
                  bisectDate = d3.bisector(d => d.date, 1).left,
                  i = bisectDate(earnings, x0) - 1;
              this.props.mouseMove({
                x: x(earnings[i].date),
                y: y(earnings[i].totalEarned)
              });
            }}
            onMouseOut={this.props.mouseOut}
            onMouseOver={this.props.mouseOver}
          />
        </svg>
      </div>
    );
  }
}

export const component = StatsEarningsChart;

export default connect(
  ({chart}) => ({
    data: chart.data,
    isHover: chart.isHover,
    mouseLocation: chart.mouseLocation,
    height: chart.size.y,
    width: chart.size.x
  }),
  dispatch => ({
    mouseOver: () => dispatch(chartActions.mouseOver()),
    mouseOut: () => dispatch(chartActions.mouseOut()),
    mouseMove: (coords) => dispatch(chartActions.mouseMove(coords)),
    setData: (data) => dispatch(chartActions.setData(data)),
    changeSize: (x, y) => dispatch(chartActions.changeSize({x, y}))
  })
)(StatsEarningsChart);
