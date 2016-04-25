/* eslint-disable no-magic-numbers */
import React, {PropTypes} from 'react';
import _ from 'lodash';
import moment from 'moment';
import d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom';

import {parseFarmDate} from '../../services/farm';

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
    }).isRequired
  };

  render () {
    const earnings = _(this.props.farm.History)
      .map(history => ({
        id: moment.unix(history.Ts).toDate(),
        totalEarned: history.Player.TotalMoneyEarned,
        wealth: history.Player.Money,
        date: parseFarmDate(history.Player.DateStringForSaveGame)
      }))
      .value();

    console.log("days", earnings.map(earning => earning.date));

    const node = ReactFauxDOM.createElement('svg'),
        margin = {top: 20, right: 20, bottom: 30, left: 70},
        width = 800 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,
        x = d3.time.scale().range([0, width]),
        y = d3.scale.linear().range([height, 0]);

    // make the container
    let svg = d3.select(node)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    x.domain(d3.extent(earnings, d => d.id));
    y.domain(d3.extent(earnings, d => d.totalEarned));

    // draw the dates axis
    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.svg.axis().scale(x).orient('bottom'));

    // draw the earnings axis
    svg.append('g')
      .call(d3.svg.axis().scale(y).orient('left'));

    // draw the lines
    svg.append('path')
      .datum(earnings)
      .attr('style', {
        fill: 'none',
        stroke: 'steelblue',
        strokeWidth: '.25rem'
      })
      .attr('d', d3.svg.line()
        .x(d => x(d.id))
        .y(d => y(d.totalEarned))
      );

    return node.toReact();
  }
}

export default StatsEarningsChart;
