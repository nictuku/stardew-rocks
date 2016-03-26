import React from 'react';
import ReactCSS from 'reactcss';
import {connect} from 'react-redux';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardMedia from 'material-ui/lib/card/card-media';
import CardActions from 'material-ui/lib/card/card-actions';
import FlatButton from 'material-ui/lib/flat-button';
import Lightbox from 'react-image-lightbox';

import * as farmActions from '../actions/farmActions';
import * as lightBoxActions from '../actions/farmLightBoxActions';

class Farm extends ReactCSS.Component {
  constructor (props) {
    super(props);
    this.setLightBoxSources = _.debounce(this.props.setLightBoxSources, 1000, {
      leading: true, trailing: false
    });
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
    if (!_.isEqual(nextProps.farm.sources, this.props.farm.sources)) {
      this.setLightBoxSources(nextProps.farm.sources);
    }
  };

  render () {
    return (
      <div style={this.styles().farm}>
        <CardTitle
          title={this.props.farm.Name}
          subtitle={`by ${this.props.farm.Farmer}`}
        />
        <div style={this.styles().cardMedia} onClick={this.props.openLightBox}>
          <img src={this.props.farm.Thumbnail} style={this.styles().image}/>
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
  farm: React.PropTypes.object.isRequired,
  getFarm: React.PropTypes.func.isRequired
};

export default connect(
  state => ({
    farm: {
      ...state.farms.farm,
      sources: _.map(state.farms.farm.History, image => `/screenshot/${state.farms.farm.ID}/${image}.png`)
    },
    lightBox: state.farmLightBox
  }),
  dispatch => ({
    getFarm (id) {
      dispatch(farmActions.getFarm(id));
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
