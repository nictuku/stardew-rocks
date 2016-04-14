import React, {PropTypes} from 'react';
import Radium from 'radium';

import colors from '../colors';

@Radium
class FarmSlider extends React.Component {
  static propTypes = {
    farm: PropTypes.object.isRequired,
    style: PropTypes.object
  };

  styles () {
    return {
      slider: {
        padding: '3rem',
        textAlign: 'center'
      },
      image: {
        borderRadius: '5px',
        overflow: 'hidden',
        border: `1px solid ${colors.brown}`,
        maxHeight: '100%',
        maxWidth: '100%',
        backgroundImage: 'url("content/logo.svg")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      },
      controls: {
        display: 'flex',
        marginBottom: '1rem'
      },
      farmDate: {
        flex: '1',
        textAlign: 'center',
        alignSelf: 'center',
        color: colors.dkBrown,
        fontSize: '1.25rem',
        fontWeight: '500'
      },
      btn: {
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        color: colors.leather,
        padding: '.25rem .5rem',
        border: `1px solid ${colors.leather}`,
        borderRadius: '5px',
        ':hover': {
          backgroundColor: colors.leather,
          color: colors.parchment
        }
      }
    };
  }

  render () {
    return (
      <div style={[this.props.style, this.styles().slider]}>
        <div style={this.styles().controls}>
          <div style={this.styles().btn} key="slider-past">
            <i className="material-icons">fast_rewind</i>
            &nbsp;Past
          </div>
          <div style={this.styles().farmDate}>
            {this.props.farm.Player.DateStringForSaveGame}
          </div>
          <div style={this.styles().btn} key="slider-future">
            Future&nbsp;
            <i className="material-icons">fast_forward</i>
          </div>
        </div>
        <img style={this.styles().image} src={this.props.farm.Thumbnail} />
      </div>
    );
  }
}

export default FarmSlider;
