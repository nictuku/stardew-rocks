import React from 'react';
import ReactCSS from 'reactcss';
import {Link} from 'react-router';
import {connect} from 'react-redux';
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
          maxWidth: '100%'
        },
        cell: {
          height: '284px',
          width: '350px'
        },
        panel: {
          width: '100%',
          padding: '1rem 2rem',
          height: '3rem'
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
        <div style={this.styles().listWrapper}>
          <div style={this.styles().list}>
            {!_.isEmpty(this.props.farms)
              ? this.props.farms.map(farm => (
                <Card style={this.styles().card} key={farm.ID}>
                  <Link to={`/${farm.ID}`} key={farm.ID} style={this.styles().link}>
                    <CardMedia style={this.styles().cell}
                      overlay={<CardTitle title={farm.Name} subtitle={`by ${farm.Farmer}`} />}
                    >
                      <img src={`${farm.Thumbnail}?w=350`} />
                    </CardMedia>
                  </Link>
                </Card>
              ))
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
};

Home.propTypes = {
  farms: React.PropTypes.array.isRequired,
  filter: React.PropTypes.number.isRequired,
  filters: React.PropTypes.array.isRequired
}

export default connect(
  state => ({
    farms: state.farms.farms,
    filter: state.farmFilter.filter,
    filters: state.farmFilter.filters
  }),
  dispatch => ({
    onChangeFilter (event, index, value) {
      dispatch(changeFilter(event, index, value));
    },
    getFarms () {
      dispatch(farmActions.getFarms());
    }
  })
)(Home);
