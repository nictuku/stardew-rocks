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
import FarmSlider from './FarmSlider';

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
        flex: '1'
      },
      content: {
        display: 'flex',
        flexDirection: "column",
        flex: '1'
      },
      card: {
        margin: '2.5rem 1rem 1rem 1rem',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
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
        borderWidth: '197px 224px 52px 270px'
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
        top: '-1.75rem',
        left: '1rem',
        padding: '.5rem 4rem .75rem 4rem'
      },
      nameBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderImageSource: 'url("content/name.png")',
        borderImageSlice: '12 52 28 52 fill',
        borderImageRepeat: 'stretch',
        borderWidth: '12px 52px 28px 52px'
      },
      name: {
        flex: '1',
        zIndex: 1,
        fontSize: '2rem',
        color: colors.dkBrown,
        fontFamily: 'Roboto Slab'
      },
      meta: {
        width: '20%'
      },
      slider: {
        position: 'absolute',
        top: '3rem',
        right: 0,
        bottom: '1rem',
        width: '65%',
        zIndex: 2
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
          <div style={this.styles().content}>
            <div style={this.styles().card}>
              <div style={this.styles().pageBackground}></div>
              <div style={this.styles().pageContent}>
                <FarmMeta farm={this.props.farm} style={this.styles().meta} />
              </div>
              <div style={this.styles().nameWrapper}>
                <div style={this.styles().nameBackground}></div>
                <div style={this.styles().name}>{this.props.farm.Name}</div>
              </div>
            </div>
            <FarmSlider farm={this.props.farm} style={this.styles().slider} />
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
