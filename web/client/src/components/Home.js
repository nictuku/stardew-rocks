import React from 'react';
import ReactCSS from 'reactcss';
import _ from 'lodash';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import Waypoint from 'react-waypoint';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import Paper from 'material-ui/lib/paper';

import SearchBar from './SearchBar';
import {changeFilter} from '../actions/farmFilterActions';
import * as farmActions from '../actions/farmActions';

class Home extends ReactCSS.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.getFarms();
  }

  componentWillUnmount () {
    this.props.resetFarmsAmount();
  }

  classes () {
    return {
      default: {
        home: {
          flex: '1',
          display: 'flex',
          flexDirection: 'column'
        },
        listWrapper: {
          overflowY: 'auto',
          overflowX: 'hidden',
          flex: '1',
          position: 'relative'
        },
        list: {
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          top: '0',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center'
        },
        link: {
          overflow: 'hidden'
        },
        card: {
          display: 'inline-block',
          margin: '.5rem',
          maxWidth: '100%',
          height: '284px'
        },
        cell: {
          height: '284px',
          width: '350px'
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
      }
    };
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
          <div style={this.styles().list}>
            {!_.isEmpty(this.props.farms)
              ? _(this.props.farms)
                .take(this.props.pages * this.props.farmsPerPage)
                .map(farm => {
                  const thumb = _.split(farm.Thumbnail, '.');
                  /* eslint-disable no-magic-numbers */
                  return (
                    <Card style={this.styles().card} key={farm.ID}>
                      <Link to={`/${farm.ID}`} key={farm.ID} style={this.styles().link}>
                        <CardMedia style={this.styles().cell}
                          overlay={<CardTitle title={farm.Name} subtitle={`by ${farm.Farmer}`} />}
                        >
                          <img src={`${thumb[0]}w350.${thumb[1]}`} />
                        </CardMedia>
                      </Link>
                    </Card>
                  );
                  /* eslint-enable */
                })
                .thru(farms => (
                  <div style={this.styles().unlimitedWrapper}>
                    {farms}
                    <Waypoint onEnter={this.props.getMoreFarms} />
                  </div>
                ))
                .value()
              : (
                <Paper style={this.styles().panel}>
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

Home.propTypes = {
  farms: React.PropTypes.array.isRequired,
  filter: React.PropTypes.number.isRequired,
  filters: React.PropTypes.array.isRequired
};

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
      dispatch(farmActions.getFarms());
    },
    searchFarms (query) {
      dispatch(farmActions.searchFarms(query));
    },
    getMoreFarms () {
      dispatch(farmActions.increaseAmount());
    },
    resetFarmsAmount () {
      dispatch(farmActions.resetAmount());
    }
  })
)(Home);
