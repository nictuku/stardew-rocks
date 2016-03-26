import React from 'react';
import ReactCSS from 'reactcss';
import {connect} from 'react-redux';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardMedia from 'material-ui/lib/card/card-media';
import CardActions from 'material-ui/lib/card/card-actions';
import FlatButton from 'material-ui/lib/flat-button';
import Lightbox from 'react-image-lightbox';

import farms from '../reducers/farms';
import * as lightBoxActions from '../actions/farmLightBoxActions';

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
          flexDirection: "column",
          flex: '1'
        },
        cardMedia: {
          flex: '1',
          position: 'relative',
          display: 'flex',
          flexDirection: 'row',
          marginBottom: '1rem',
          backgroundColor: this.context.muiTheme.palette.accent3Color
        },
        image: {
          position: 'absolute',
          maxHeight: '100%',
          maxWidth: '100%',
          left: '0',
          right: '0',
          margin: '0 auto'
        }
      }
    }
  };

  componentWillReceiveProps (nextProps) {
    if (!_.isEmpty(nextProps.farm.data) && _.isEmpty(this.props.farm.data)) {
      _.invoke(nextProps, 'setLightBoxSources', nextProps.farm.sources);
    }
  };

  render () {
    const farm = _.get(this.props.farm, 'data', null);
    return (
      <div style={this.styles().farm}>
        <CardTitle
          title={farm.Name}
          subtitle={`by ${farm.Farmer}`}
        />
        <div style={this.styles().cardMedia} onClick={this.props.openLightBox}>
          <img src={farm.Thumbnail} style={this.styles().image}/>
        </div>
        {this.props.lightBox.isOpen ?
          <Lightbox
            mainSrc={this.props.lightBox.mainSrc}
            nextSrc={this.props.lightBox.nextSrc}
            prevSrc={this.props.lightBox.prevSrc}
            onMoveNextRequest={this.props.nextSrc}
            onMovePrevRequest={this.props.prevSrc}
            onCloseRequest={this.props.closeLightBox}
            animationDisabled={true}
          />
        : null}
      </div>
    );
  };
};

Farm.contextTypes = {
  muiTheme: React.PropTypes.object
};

Farm.propTypes = {
  farm: React.PropTypes.shape({
    data: React.PropTypes.object.isRequired
  }).isRequired,
  getFarm: React.PropTypes.func.isRequired
};

export default connect(
  state => ({
    farm: {
      ...state.farm,
      sources: _.map(state.farm.data.History, image => `/screenshot/${state.farm.data.ID}/${image}.png`)
    },
    lightBox: state.farmLightBox
  }),
  dispatch => ({
    getFarm (id) {
      dispatch(farms.actions.farm({id}));
    },
    nextSrc () {
      dispatch(lightBoxActions.nextSrc());
    },
    prevSrc () {
      dispatch(lightBoxActions.prevSrc());
    },
    openLightBox () {
      dispatch(lightBoxActions.open());
    },
    closeLightBox () {
      dispatch(lightBoxActions.close());
    },
    setLightBoxSources (sources) {
      dispatch(lightBoxActions.setSources(sources));
    }
  })
)(Farm);
