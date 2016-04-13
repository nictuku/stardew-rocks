import React, {PropTypes} from 'react';
import _ from 'lodash';
import color from 'color';
import {connect} from 'react-redux';
import Lightbox from 'react-image-lightbox';
import LinearProgress from 'material-ui/lib/linear-progress';

import * as farmActions from '../actions/farmActions';
import * as lightBoxActions from '../actions/farmLightBoxActions';
import * as globalActions from '../actions/globalActions';

import colors from '../colors';

import FarmMeta from './FarmMeta';

class Farm extends React.Component {
  constructor (props) {
    super(props);
    /* eslint-disable no-magic-numbers */
    this.setLightBoxSources = _.debounce(this.props.setLightBoxSources, 1000, {
      leading: true, trailing: false
    });
    this.changeSeason = _.debounce(this.props.changeSeason, 300, {
      leading: true, trailing: false
    });
    /* eslint-enable */
  }

  static propTypes = {
    routeParams: PropTypes.object.isRequired,
    lightBox: PropTypes.object.isRequired,
    nextSrc: PropTypes.func.isRequired,
    prevSrc: PropTypes.func.isRequired,
    farm: PropTypes.object.isRequired,
    getFarm: PropTypes.func.isRequired,
    openLightBox: PropTypes.func.isRequired,
    closeLightBox: PropTypes.func.isRequired,
    setLightBoxSources: PropTypes.func.isRequired,
    clearFarm: PropTypes.func.isRequired,
    changeSeason: PropTypes.func.isRequired,
    changeSeasonDefault: PropTypes.func.isRequired
  };

  static contextTypes = {
    season: PropTypes.string,
    muiTheme: PropTypes.object
  };

  componentDidMount () {
    this.props.getFarm(this.props.routeParams.id);
  }

  componentWillUnmount () {
    this.props.clearFarm();
    this.props.changeSeasonDefault();
  }

  styles () {
    /* eslint-disable no-magic-numbers */
    return {
      farm: {
        display: "flex",
        flexDirection: "column",
        flex: '1',
        backgroundColor: color(colors[this.context.season].color1).darken(0.5).rgbString()
      },
      card: {
        display: "flex",
        flexDirection: "column",
        flex: '1',
        border: '201px solid #FFFF',
        borderImage: 'url("content/page.png") 201 224 52 270 stretch'
      },
      cardMedia: {
        flex: '1',
        position: 'relative',
        display: 'none',
        flexDirection: 'row',
        margin: '1rem'
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
    /* eslint-enable */
  }

  componentWillReceiveProps (nextProps) {
    if (!_.isEqual(nextProps.farm.sources, this.props.farm.sources)) {
      this.setLightBoxSources(nextProps.farm.sources);
      if (_.has(nextProps.farm, "CurrentSeason")) {
        this.changeSeason(nextProps.farm.CurrentSeason);
      }
    }
  }

  render () {
    return (
      <div style={this.styles().farm}>
        {_.has(this.props.farm, 'Farmer') ?
          <div style={this.styles().farm}>
            <div style={this.styles().card}>
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
          </div>
      : <LinearProgress mode="indeterminate" />}
      </div>
    );
  }
}

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
    },
    changeSeason (season) {
      dispatch(globalActions.changeSeason(season));
    },
    changeSeasonDefault () {
      dispatch(globalActions.changeSeasonDefault());
    }
  })
)(Farm);
