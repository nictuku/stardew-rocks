import React, {PropTypes} from 'react';
import Radium from 'radium';
import _ from 'lodash';
import {connect} from 'react-redux';
import LinearProgress from 'material-ui/lib/linear-progress';

import * as farmActions from '../../actions/farmActions';
import * as globalActions from '../../actions/globalActions';

import colors from '../../colors';

import Summary from './Summary';
import Header from './Header';

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
            <Header
              isMobile={this.props.isMobile}
              farm={this.props.farm}
            />
            <Summary
              isMobile={this.props.isMobile}
              farm={this.props.farm}
              lightBox={this.props.lightBox}
              nextSrc={this.props.nextSrc}
              prevSrc={this.props.prevSrc}
              openLightBox={this.props.openLightBox}
              closeLightBox={this.props.closeLightBox}
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
