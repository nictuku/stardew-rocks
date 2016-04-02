import React from 'react';
import ReactCSS from 'reactcss';
import _ from 'lodash';
import {connect} from 'react-redux';
import CardTitle from 'material-ui/lib/card/card-title';
import Lightbox from 'react-image-lightbox';
import LinearProgress from 'material-ui/lib/linear-progress';

import * as farmActions from '../actions/farmActions';
import * as lightBoxActions from '../actions/farmLightBoxActions';

class Farm extends ReactCSS.Component {
  constructor (props) {
    super(props);
    this.setLightBoxSources = _.debounce(this.props.setLightBoxSources, 1000, { // eslint-disable-line no-magic-numbers
      leading: true, trailing: false
    });
  }

  componentDidMount () {
    this.props.getFarm(this.props.routeParams.id);
  }

  componentWillUnmount () {
    this.props.clearFarm();
  }

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
          marginBottom: '1rem'
        },
        imageWrapper: {
          backgroundColor: this.context.muiTheme.palette.accent3Color,
          position: 'absolute',
          left: '0',
          right: '0',
          top: '0',
          bottom: '0',
          textAlign: 'center'
        },
        image: {
          maxHeight: '100%',
          maxWidth: '100%'
        }
      }
    };
  }

  componentWillReceiveProps (nextProps) {
    if (!_.isEqual(nextProps.farm.sources, this.props.farm.sources)) {
      this.setLightBoxSources(nextProps.farm.sources);
    }
  }

  render () {
    return (
      <div style={this.styles().farm}>
        {_.has(this.props.farm, 'Farmer') ?
          <div style={this.styles().farm}>
            <CardTitle
              title={this.props.farm.Name}
              subtitle={`by ${this.props.farm.Farmer}`}
            />
            <div style={this.styles().cardMedia} onClick={this.props.openLightBox}>
              <div style={this.styles().imageWrapper}>
                <img src={this.props.farm.Thumbnail} style={this.styles().image}/>
              </div>
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
      : <LinearProgress mode="indeterminate" />}
      </div>
    );
  }
}

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
    clearFarm () {
      dispatch(farmActions.clearFarm());
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
