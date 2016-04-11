import React, {PropTypes} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import Lightbox from 'react-image-lightbox';
import LinearProgress from 'material-ui/lib/linear-progress';

import * as farmActions from '../actions/farmActions';
import * as lightBoxActions from '../actions/farmLightBoxActions';

import FarmMeta from './FarmMeta';

class Farm extends React.Component {
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

  styles () {
    return {
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
        backgroundColor: this.context.muiTheme.rawTheme.palette.accent3Color,
        position: 'absolute',
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',
        textAlign: 'center',
        cursor: 'pointer'
      },
      image: {
        maxHeight: '100%',
        maxWidth: '100%',
        backgroundImage: 'url("content/logo.svg")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
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
            <FarmMeta farm={this.props.farm} />
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
  muiTheme: PropTypes.object
};

Farm.propTypes = {
  routeParams: PropTypes.object.isRequired,
  lightBox: PropTypes.object.isRequired,
  nextSrc: PropTypes.func.isRequired,
  prevSrc: PropTypes.func.isRequired,
  farm: PropTypes.object.isRequired,
  getFarm: PropTypes.func.isRequired,
  openLightBox: PropTypes.func.isRequired,
  closeLightBox: PropTypes.func.isRequired,
  setLightBoxSources: PropTypes.func.isRequired,
  clearFarm: PropTypes.func.isRequired
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
