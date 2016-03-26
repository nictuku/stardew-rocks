import React from 'react';
import ReactCSS from 'reactcss';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import * as _ from 'lodash';

import SearchBar from './SearchBar';
import farms from '../reducers/farms';

class Home extends ReactCSS.Component {
  constructor (props) {
    super(props);
  };

  componentDidMount() {
    this.props.dispatch(farms.actions.farms.sync());
  };

  classes () {
    return {
      default: {
        title: {
          fontFamily: 'Roboto'
        },
        subTitle: {
          fontFamily: 'Roboto'
        }
      }
    };
  };

  render () {
    return (
      <div>
        <SearchBar />
        <GridList cellHeight={284}>
          {_.get(this.props.farms.data, 'data', []).map(farm => (
            <Link to={`/${farm.ID}`} key={farm.ID}>
              <GridTile
                title={<span style={this.styles().title}>{farm.Name}</span>}
                subtitle={<span style={this.styles().subTitle}>by {farm.Farmer}</span>}
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
  }).isRequired
}

export default connect(state => ({
  farms: state.farms
}))(Home);
