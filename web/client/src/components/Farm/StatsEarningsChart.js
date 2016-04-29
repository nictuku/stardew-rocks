/* eslint-disable no-magic-numbers */
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import Radium, {Style} from 'radium';
import _ from 'lodash';
import moment from 'moment';
import d3 from 'd3';
import numeral from 'numeral';

import colors from '../../colors';
import {FarmDate} from '../../services/farm';
import ChartAxis from './ChartAxis';
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
    tooltip: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      object: PropTypes.object.isRequired
    }).isRequired,
    isHover: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired,
    setData: PropTypes.func.isRequired,
    mouseOut: PropTypes.func.isRequired,
    mouseOver: PropTypes.func.isRequired,
    setTooltip: PropTypes.func.isRequired,
    height: PropTypes.number,
    width: PropTypes.number,
    changeSize: PropTypes.func.isRequired
  };

  componentWillMount () {
    this.updateSize = _.debounce(_.bind(this.updateSize, this), 300);
    this.props.setData(_(this.props.farm.History)
      .map(history => ({
        id: moment.unix(history.Ts).toDate(),
        totalEarned: history.Player.TotalMoneyEarned,
        wealth: history.Player.Money,
        date: new FarmDate(history.Player.DateStringForSaveGame)
      }))
      .value()
    );
    window.addEventListener("resize", this.updateSize);
  }

  componentWillUnmount () {
    window.removeEventListener("resize", this.updateSize);
  }

  componentDidMount () {
    this.updateSize();
  }

  updateSize () {
    const node = ReactDOM.findDOMNode(this),
        w = node.parentNode.offsetWidth,
        h = node.parentNode.offsetHeight;

    this.props.changeSize({
      width: w,
      height: h
    });
  }

  styles () {
    return {
      wrapper: {
        position: 'absolute',
        left: 0,
        right: 0
      },
      chart: {
        backgroundColor: colors.dkBrown
      },
      lineGroup: {
      },
      line: {
        fill: 'none',
        stroke: colors.leather,
        strokeWidth: '5px'
      },
      tooltipGroup: {
        display: 'none'
      },
      tooltipGroupIsHover: {
        display: 'initial'
      },
      tooltipText: {
        fill: colors.parchment
      },
      reticle: {
        fill: colors.leather,
        stroke: colors.parchment,
        strokeWidth: '2px'
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
        margin = {top: 20, right: 60, bottom: 30, left: 90};

    const width = w - margin.left - margin.right,
        height = h - margin.top - margin.bottom,
        x = d3.scale.linear()
          .range([0, width]).domain(d3.extent(earnings, d => d.date)),
        y = d3.scale.linear()
          .range([height, 0]).domain([0, d3.max(earnings, d => d.totalEarned)]);

    const line = d3.svg.line()
      .x(d => x(d.date))
      .y(d => y(d.totalEarned));

    const yAxis = d3.svg.axis()
      .scale(y)
      .ticks(5)
      .tickFormat(d => numeral(d).format('0,0') + 'G')
      .orient('left');

    const xAxis = d3.svg.axis()
      .scale(x)
      .orient('bottom')
      .ticks(5);

    const yGrid = d3.svg.axis()
      .scale(y)
      .orient('left')
      .ticks(5)
      .tickSize(-width, 0, 0)
      .tickFormat('');

    return (
      <div style={this.styles().wrapper} className="earnings-chart">
        <Style
          scopeSelector=".earnings-chart"
          rules={{
            '.axis': {
              fill: colors.parchment
            },
            '.axis line, .axis path': {
              fill: 'none'
            },
            '.grid line': {
              stroke: colors.brown
            }
          }}
        />
        {this.props.width ?
        <svg
          style={this.styles().chart}
          width={w}
          height={h}
        >
          <g transform={`translate(${margin.left}, ${margin.top})`}
            style={this.styles().lineGroup}
          >
            <ChartAxis
              className="axis"
              axisFunc={yAxis}
            />
            <ChartAxis
              className="axis"
              style={this.styles().xAxis}
              axisFunc={xAxis}
              label={{
                text: 'days',
                props: {
                  x: width + 50,
                  y: 20,
                  style: {
                    textAnchor: 'end'
                  }
                }
              }}
              transform={`translate(0, ${height})`}
            />
            <ChartAxis
              className="grid"
              axisFunc={yGrid}
            />
            <path style={this.styles().line}
              d={line(earnings)}
              strokeLinecap="round"
            />
            <g
              style={[
                this.styles().tooltipGroup,
                this.props.isHover && this.styles().tooltipGroupIsHover
              ]}
              transform={`translate(${this.props.tooltip.x}, ${this.props.tooltip.y})`}
            >
              <circle
                style={this.styles().reticle}
                r="5"
              />
              <g
                style={this.styles().tooltipText}
                transform={`translate(15, 0)`}
              >
                <text>
                  {numeral(_.get(this.props.tooltip.object, 'totalEarned', 0)).format('0,0') + 'G'}
                </text>
                <text dy="15">
                  {_.get(this.props.tooltip.object, 'date.string', '')}
                </text>
              </g>
            </g>
            <rect
              width={width}
              height={height}
              style={this.styles().overlay}
              onMouseMove={e => {
                const bounds = e.target.getBoundingClientRect(),
                    mouseLocation = {
                      x: e.clientX - bounds.left,
                      y: e.clientY - bounds.top
                    },
                    x0 = x.invert(mouseLocation.x),
                    bisectDate = d3.bisector(d => d.date, 1).left,
                    i = bisectDate(earnings, x0, 1),
                    d0 = earnings[i - 1],
                    d1 = earnings[i],
                    d = x0 - d0.date > d1.date - x0 ? d1 : d0;
                this.props.setTooltip({
                  x: x(d.date),
                  y: y(d.totalEarned),
                  object: d
                });
              }}
              onMouseOut={this.props.mouseOut}
              onMouseOver={this.props.mouseOver}
            />
          </g>
        </svg>
        : null}
      </div>
    );
  }
}

export const component = StatsEarningsChart;

export default connect(
  ({chart}) => ({
    data: chart.data,
    isHover: chart.isHover,
    tooltip: chart.tooltip,
    height: chart.size.height,
    width: chart.size.width
  }),
  dispatch => ({
    mouseOver: () => dispatch(chartActions.mouseOver()),
    mouseOut: () => dispatch(chartActions.mouseOut()),
    setTooltip: (tooltip) => dispatch(chartActions.setTooltip(tooltip)),
    setData: (data) => dispatch(chartActions.setData(data)),
    changeSize: (size) => dispatch(chartActions.changeSize(size))
  })
)(StatsEarningsChart);
