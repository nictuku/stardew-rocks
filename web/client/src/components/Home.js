import React, {PropTypes} from 'react';
import Radium from 'radium';
import _ from 'lodash';
import {connect} from 'react-redux';
import Waypoint from 'react-waypoint';
import Paper from 'material-ui/lib/paper';
import color from 'color';

import colors from '../colors';
import SearchBar from './SearchBar';
import FarmCard from './FarmCard';
import {changeFilter} from '../actions/farmFilterActions';
import * as farmsActions from '../actions/farmsActions';

@Radium
class Home extends React.Component {
  static propTypes = {
    farms: PropTypes.array.isRequired,
    filter: PropTypes.number,
    filters: PropTypes.array,
    pages: PropTypes.number.isRequired,
    farmsPerPage: PropTypes.number.isRequired,
    getFarms: PropTypes.func.isRequired,
    resetFarmsAmount: PropTypes.func.isRequired,
    searchFarms: PropTypes.func.isRequired,
    onChangeFilter: PropTypes.func.isRequired,
    getMoreFarms: PropTypes.func.isRequired
  }

  static contextTypes = {
    season: PropTypes.string
  };

  componentDidMount () {
    this.props.getFarms();
  }

  componentWillUnmount () {
    this.props.resetFarmsAmount();
  }

  styles () {
    /* eslint-disable no-magic-numbers */
    return {
      home: {
        flex: '1',
        display: 'flex',
        flexDirection: 'column'
      },
      listWrapper: {
        overflowY: 'auto',
        overflowX: 'hidden',
        flex: '1',
        position: 'relative',
        backgroundColor: color(colors[this.context.season].color1).darken(0.5).rgbString()
      },
      list: {
        position: 'absolute',
        paddingTop: '1rem',
        bottom: '0',
        left: '0',
        right: '0',
        top: '0',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
      },
      panel: {
        width: '100%',
        padding: '1rem 2rem',
        height: '3rem'
      },
      unlimitedWrapper: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }
    };
    /* eslint-enable */
  }

  render () {
    return (
      <div style={this.styles().home}>
        <SearchBar
          getFarms={this.props.getFarms}
          searchFarms={this.props.searchFarms}
          filter={this.props.filter}
          filters={this.props.filters}
          changeFilter={this.props.onChangeFilter}
        />
        <div style={this.styles().listWrapper}>
          <div style={this.styles().list} className="home-farm-list">
            {!_.isEmpty(this.props.farms)
              ? _(this.props.farms)
                .take(this.props.pages * this.props.farmsPerPage)
                .map(farm => (
                  <FarmCard farm={farm} key={farm.ID} />
                ))
                .thru(farms => (
                  <div style={this.styles().unlimitedWrapper}>
                    {farms}
                    <Waypoint onEnter={this.props.getMoreFarms} />
                  </div>
                ))
                .value()
              : (
                <Paper
                  className="home-error-no-farms"
                  style={this.styles().panel}
                >
                  No results found
                </Paper>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export const component = Home;

export default connect(
  state => ({
    farms: state.farms.farms,
    query: state.farms.query,
    filter: state.farmFilter.filter,
    filters: state.farmFilter.filters,
    pages: state.farms.pages,
    farmsPerPage: state.farms.farmsPerPage
  }),
  dispatch => ({
    onChangeFilter (event, index, value) {
      dispatch(changeFilter(event, index, value));
    },
    getFarms () {
      dispatch(farmsActions.getFarms());
    },
    searchFarms (query) {
      dispatch(farmsActions.searchFarms(query));
    },
    getMoreFarms () {
      dispatch(farmsActions.increaseAmount());
    },
    resetFarmsAmount () {
      dispatch(farmsActions.resetAmount());
    }
  })
)(Home);
