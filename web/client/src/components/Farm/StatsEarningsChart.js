/* eslint-disable no-magic-numbers */
import React, {PropTypes} from 'react';
import {Style} from 'radium';
import _ from 'lodash';
import moment from 'moment';
import d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom';

import {FarmDate} from '../../services/farm';

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
        date: new FarmDate(history.Player.DateStringForSaveGame)
      }))
      .value();

    const node = ReactFauxDOM.createElement('svg'),
        margin = {top: 20, right: 20, bottom: 120, left: 70},
        width = 800 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,
        x = d3.scale.linear()
          .range([0, width]).domain(d3.extent(earnings, d => d.date)),
        y = d3.scale.linear()
          .range([height, 0]).domain([0, d3.max(earnings, d => d.totalEarned)]);

    // make the container
    let svg = d3.select(node)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // draw the dates axis
    svg.append('g')
      .attr("class", "x axis")
      .attr('transform', `translate(0, ${height})`)
      .call(d3.svg.axis()
        .scale(x)
        .tickFormat(FarmDate.daysToString)
        .orient('bottom')
      )
      .selectAll('text')
      .attr('x', 10)
      .attr('transform', 'rotate(90)')
      .attr('dy', '-.25em')
      .style("text-anchor", "start");

    // draw the earnings axis
    svg.append('g')
      .attr("class", "y axis")
      .call(d3.svg.axis().scale(y).orient('left'));

    // draw the lines
    svg.append('path')
      .datum(earnings)
      .attr("class", "line")
      .attr('d', d3.svg.line()
        .x(d => x(d.date))
        .y(d => y(d.totalEarned))
      );

    return (
      <div className="earnings-chart">
        <Style
          scopeSelector=".earnings-chart"
          rules= {{
            '.axis path, .axis line': {
              fill: 'none',
              stroke: '#000',
              shapeRendering: 'crispEdges'
            },
            '.x.axis path': {
              display: 'none'
            },
            '.line': {
              fill: 'none',
              stroke: 'steelblue',
              strokeWidth: '1.5px'
            },
            '.overlay': {
              fill: 'none',
              pointerEvents: 'all'
            },
            '.focus circle': {
              fill: 'none',
              stroke: 'steelblue'
            }
          }}
        />
        {node.toReact()}
      </div>
    );
  }
}

export default StatsEarningsChart;
