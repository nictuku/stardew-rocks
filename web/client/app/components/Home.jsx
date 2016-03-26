import React from 'react';
import ReactCSS from 'reactcss';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import * as _ from 'lodash';

import SearchBar from './SearchBar';
import {changeFilter} from '../actions/farmFilterActions';
import farms from '../reducers/farms';

class Home extends ReactCSS.Component {
  constructor (props) {
    super(props);
  };

  componentDidMount() {
    this.props.getFarms();
  };

  classes () {
    return {
      default: {
        home: {
          flex: '1',
          display: 'flex',
          flexDirection: 'column'
        },
        list: {
          minHeight: 'min-content',
          overflowY: 'auto',
          overflowX: 'hidden',
          flex: '1',
          position: 'relative'
        },
        gridList: {
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          top: '0'
        }
      }
    };
  };

  render () {
    return (
      <div style={this.styles().home}>
        <SearchBar filter={this.props.filter} filters={this.props.filters}
          changeFilter={this.props.onChangeFilter}
        />
        <div style={this.styles().list}>
          <GridList cellHeight={284} style={this.styles().gridList}>
            {_.get(this.props.farms.data, 'data', []).map(farm => (
              <Link to={`/${farm.ID}`} key={farm.ID}>
                <GridTile
                  title={farm.Name}
                  subtitle={`by ${farm.Farmer}`}
                >
                  <img src={`${farm.Thumbnail}?w=350`} />
                </GridTile>
              </Link>
            ))}
          </GridList>
        </div>
      </div>
    );
  }
};

Home.propTypes = {
  farms: React.PropTypes.shape({
    data: React.PropTypes.shape({
      data: React.PropTypes.array
    }).isRequired
  }).isRequired,
  filter: React.PropTypes.number.isRequired,
  filters: React.PropTypes.array.isRequired
}

export default connect(
  state => ({
    farms: state.farms,
    filter: state.farmFilter.filter,
    filters: state.farmFilter.filters
  }),
  dispatch => ({
    onChangeFilter (event, index, value) {
      dispatch(changeFilter(event, index, value));
    },
    getFarms () {
      dispatch(farms.actions.farms.sync());
    }
  })
)(Home);
