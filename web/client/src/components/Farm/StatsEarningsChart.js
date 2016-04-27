/* eslint-disable no-magic-numbers */
import React, {PropTypes} from 'react';
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
    mouseMove: PropTypes.func.isRequired
  };

  componentWillMount () {
    this.props.setData(_(this.props.farm.History)
      .map(history => ({
        id: moment.unix(history.Ts).toDate(),
        totalEarned: history.Player.TotalMoneyEarned,
        wealth: history.Player.Money,
        date: new FarmDate(history.Player.DateStringForSaveGame)
      }))
      .value()
    );
  }

  styles () {
    return {
      chart: {
        backgroundColor: colors.dkBrown
      },
      lineGroup: {
      },
      line: {
        fill: 'none',
        stroke: colors.leather,
        strokeWidth: '.5rem'
      },
      tooltipGroup: {
        display: 'none'
      },
      tooltipGroupIsHover: {
        display: 'initial'
      },
      reticle: {
        fill: colors.parchment
      }
    };
  }

  render () {
    const earnings = this.props.data;

    const
        w = 800,
        h = 500,
        margin = 10,
        width = w - margin * 2,
        height = h - margin * 2,
        x = d3.scale.linear()
          .range([0, width]).domain(d3.extent(earnings, d => d.date)),
        y = d3.scale.linear()
          .range([height, 0]).domain([0, d3.max(earnings, d => d.totalEarned)]);

    const line = d3.svg.line()
      .x(d => x(d.date))
      .y(d => y(d.totalEarned));


    return (
      <svg
        style={this.styles().chart}
        width={w}
        height={h}
        onMouseMove={e => this.props.mouseMove(e.clientX, e.clientY)}
        onMouseOut={this.props.mouseOut}
        onMouseOver={this.props.mouseOver}
      >
        <g transform={`translate(${margin}, ${margin})`}
          style={this.styles().lineGroup}
        >
          <path style={this.styles().line}
            d={line(earnings)}
            strokeLinecap="round"
          />
        </g>
        <g style={[
          this.styles().tooltipGroup,
          this.props.isHover && this.styles().tooltipGroupIsHover
        ]}>
          <circle
            style={this.styles().reticle}
            r="10"
            transform={`translate(${this.props.mouseLocation.x}, ${this.props.mouseLocation.y})`}
          />
        </g>
      </svg>
    );
  }
}

export const component = StatsEarningsChart;

export default connect(
  ({chart}) => ({
    data: chart.data,
    isHover: chart.isHover,
    mouseLocation: chart.mouseLocation
  }),
  dispatch => ({
    mouseOver: () => dispatch(chartActions.mouseOver()),
    mouseOut: () => dispatch(chartActions.mouseOut()),
    mouseMove: (x, y) => dispatch(chartActions.mouseMove(x, y)),
    setData: (data) => dispatch(chartActions.setData(data))
  })
)(StatsEarningsChart);
