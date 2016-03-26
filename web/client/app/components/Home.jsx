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
      }
    };
  };

  render () {
    return (
      <div>
        <SearchBar filter={this.props.filter} filters={this.props.filters}
          changeFilter={this.props.onChangeFilter}
        />
        <GridList cellHeight={284}>
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
