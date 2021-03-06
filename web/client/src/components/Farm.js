import React, {PropTypes} from 'react';
import Radium from 'radium';
import _ from 'lodash';
import {connect} from 'react-redux';
import LinearProgress from 'material-ui/lib/linear-progress';

import * as farmActions from '../actions/farmActions';
import * as globalActions from '../actions/globalActions';

import colors from '../colors';

import FarmMeta from './FarmMeta';
import FarmSlider from './FarmSlider';

@Radium
class Farm extends React.Component {
  constructor (props) {
    super(props);
    /* eslint-disable no-magic-numbers */
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
    clearFarm: PropTypes.func.isRequired,
    changeSeason: PropTypes.func.isRequired,
    changeSeasonDefault: PropTypes.func.isRequired,
    isMobile: PropTypes.bool.isRequired
  };

  static contextTypes = {
    season: PropTypes.string,
    muiTheme: PropTypes.object,
    isMobile: PropTypes.bool
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
        display: 'flex',
        justifyContent: 'center',
        flex: '1',
        overflowX: 'hidden'
      },
      content: {
        display: 'flex',
        flexDirection: "column",
        flex: '1',
        maxWidth: '1000px',
        position: 'relative'
      },
      card: {
        margin: '2.5rem 1rem 1rem 1rem',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      },
      cardMobile: {
        margin: 'initial',
        order: 2,
        display: 'initial'
      },
      pageBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderImageSource: 'url("content/page.png")',
        borderImageSlice: '197 224 52 270 fill',
        borderImageRepeat: 'stretch',
        borderStyle: 'solid',
        borderWidth: '197px 224px 52px 270px'
      },
      pageBackgroundMobile: {
        left: '-3rem',
        right: '-3rem'
      },
      pageContent: {
        display: 'flex',
        zIndex: '1',
        position: 'relative'
      },
      imageWrapper: {
        position: 'absolute',
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',
        textAlign: 'center',
        cursor: 'pointer'
      },
      nameWrapper: {
        position: 'absolute',
        display: 'flex',
        top: '1rem',
        left: '2rem',
        padding: '.5rem 4rem .75rem 4rem'
      },
      nameWrapperMobile: {
        position: 'relative',
        padding: '2rem 3.5rem',
        top: 'initial',
        left: 'initial',
        alignSelf: 'center',
        margin: '1rem'
      },
      nameBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderImageSource: 'url("content/name.png")',
        borderImageSlice: '12 52 28 52 fill',
        borderImageRepeat: 'round',
        borderStyle: 'solid',
        borderWidth: '12px 52px 28px 52px'
      },
      name: {
        flex: '1',
        zIndex: 1,
        fontSize: '2rem',
        color: colors.dkBrown,
        fontFamily: 'Roboto Slab',
        alignSelf: 'center'
      },
      nameMobile: {
        fontSize: '1.5rem'
      },
      meta: {
        width: '20%'
      },
      metaMobile: {
        width: 'initial'
      },
      slider: {
        position: 'absolute',
        top: '3rem',
        right: 0,
        bottom: '1rem',
        width: '65%',
        zIndex: 2,
        margin: '3rem'
      },
      sliderMobile: {
        position: 'relative',
        order: 1,
        width: 'initial',
        top: 'initial',
        right: 'initial',
        margin: '1rem 1rem 0 1rem'
      }
    };
    /* eslint-enable */
  }

  componentWillReceiveProps (nextProps) {
    if (!_.isEqual(nextProps.farm.CurrentSeason, this.props.farm.CurrentSeason)) {
      this.changeSeason(nextProps.farm.CurrentSeason);
    }
  }

  render () {
    return (
      <div style={this.styles().farm}>
        {_.has(this.props.farm, 'Farmer') ?
          <div style={this.styles().content}>
            <div
              style={[
                this.styles().card,
                this.props.isMobile && this.styles().cardMobile
              ]}
            >
              <div
                style={[
                  this.styles().pageBackground,
                  this.props.isMobile && this.styles().pageBackgroundMobile
                ]}
              ></div>
              <div style={this.styles().pageContent}>
                <FarmMeta farm={this.props.farm}
                  style={[
                    this.styles().meta,
                    this.props.isMobile && this.styles().metaMobile
                  ]}
                />
              </div>
            </div>
            <div
              style={[
                this.styles().nameWrapper,
                this.props.isMobile && this.styles().nameWrapperMobile
              ]}
            >
              <div style={this.styles().nameBackground}></div>
              <div
                style={[
                  this.styles().name,
                  this.props.isMobile && this.styles().nameMobile
                ]}
              >{this.props.farm.Name}</div>
            </div>
            <FarmSlider farm={this.props.farm}
              lightBox={this.props.lightBox}
              nextSrc={this.props.nextSrc}
              prevSrc={this.props.prevSrc}
              openLightBox={this.props.openLightBox}
              closeLightBox={this.props.closeLightBox}
              isMobile={this.props.isMobile}
              style={[
                this.styles().slider,
                this.props.isMobile && this.styles().sliderMobile
              ]}
            />
          </div>
      : <LinearProgress mode="indeterminate" />}
      </div>
    );
  }
}

export default connect(
  state => {
    const {farm, nextSrc, mainSrc, prevSrc, sources, isOpen, index, currentDate} = state.farm;
    return {
      farm,
      lightBox: {
        mainSrc,
        nextSrc,
        prevSrc,
        sources,
        isOpen,
        index,
        currentDate
      }
    };
  },
  dispatch => ({
    getFarm (id) {
      dispatch(farmActions.getFarm(id));
    },
    clearFarm () {
      dispatch(farmActions.clearFarm());
    },
    nextSrc () {
      dispatch(farmActions.nextSrc());
    },
    prevSrc () {
      dispatch(farmActions.prevSrc());
    },
    openLightBox () {
      dispatch(farmActions.open());
    },
    closeLightBox () {
      dispatch(farmActions.close());
    },
    changeSeason (season) {
      dispatch(globalActions.changeSeason(season));
    },
    changeSeasonDefault () {
      dispatch(globalActions.changeSeasonDefault());
    }
  })
)(Farm);
