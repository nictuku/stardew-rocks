import React from 'react';
import ReactCSS from 'reactcss';
import {connect} from 'react-redux';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardMedia from 'material-ui/lib/card/card-media';
import CardActions from 'material-ui/lib/card/card-actions';
import FlatButton from 'material-ui/lib/flat-button';

import farms from '../reducers/farms';

class Farm extends ReactCSS.Component {
  constructor (props) {
    super(props);
  };

  componentDidMount () {
    this.props.getFarm(this.props.routeParams.id);
  };

  classes () {
    return {
      default: {
        farm: {
          display: "flex",
          flexDirection: "column"
        },
        card: {
          display: "flex",
          flexDirection: "column",
          flex: "1"
        },
        cardMedia: {
          flex: "1"
        }
      }
    }
  };

  render () {
    const farm = _.get(this.props.farm, 'data', null);
    return (
      <div style={this.styles().farm}>
        <Card style={this.styles().card}>
          <CardTitle
            title={farm.Name}
            subtitle={`by ${farm.Farmer}`}
          />
          <CardMedia style={this.styles().cardMedia}>
            <img src={farm.Thumbnail} />
          </CardMedia>
        </Card>
      </div>
    );
  };
};

Farm.propTypes = {
  farm: React.PropTypes.shape({
    data: React.PropTypes.object.isRequired
  }).isRequired,
  getFarm: React.PropTypes.func.isRequired
};

export default connect(
  state => ({
    farm: state.farm
  }),
  dispatch => ({
    getFarm (id) {
      dispatch(farms.actions.farm({id}));
    }
  })
)(Farm);
