import React, {PropTypes} from 'react';
import Radium from 'radium';
import Lightbox from 'react-image-lightbox';

import colors from '../colors';

@Radium
class FarmSlider extends React.Component {
  static propTypes = {
    farm: PropTypes.object.isRequired,
    style: PropTypes.object,
    isMobile: PropTypes.bool.isRequired,
    lightBox: PropTypes.shape({
      mainSrc: PropTypes.string.isRequired,
      nextSrc: PropTypes.string.isRequired,
      prevSrc: PropTypes.string.isRequired,
      sources: PropTypes.array.isRequired,
      isOpen: PropTypes.bool.isRequired,
      index: PropTypes.number.isRequired,
      currentDate: PropTypes.string.isRequired
    }).isRequired,
    nextSrc: PropTypes.func.isRequired,
    prevSrc: PropTypes.func.isRequired,
    openLightBox: PropTypes.func.isRequired,
    closeLightBox: PropTypes.func.isRequired
  };

  styles () {
    return {
      slider: {
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
        marginBottom: '1rem',
        justifyContent: 'space-between'
      },
      farmDate: {
        flex: '1',
        textAlign: 'center',
        alignSelf: 'center',
        color: colors.dkBrown,
        fontSize: '1.25rem',
        fontWeight: '500'
      },
      farmDateMobile: {
        color: colors.parchment
      },
      btn: {
        userSelect: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        color: colors.leather,
        padding: '.25rem .5rem',
        border: `1px solid ${colors.leather}`,
        borderRadius: '5px',
        transition: 'all 250ms ease',
        backgroundColor: colors.parchment,
        ':hover': {
          backgroundColor: colors.leather,
          color: colors.parchment
        }
      }
    };
  }

  render () {
    const farmDate = (
      <div
        style={[
          this.styles().farmDate,
          this.props.isMobile && this.styles().farmDateMobile
        ]}
      >
        {this.props.lightBox.currentDate}
      </div>
    );
    return (
      <div style={[this.props.style, this.styles().slider]}>
        <div style={this.styles().controls}>
          <div style={this.styles().btn} key="slider-past"
            onClick={this.props.prevSrc}
          >
            <i className="material-icons">fast_rewind</i>
            &nbsp;Past
          </div>
          {this.props.isMobile ? null : farmDate}
          <div style={this.styles().btn} key="slider-future"
            onClick={this.props.nextSrc}
          >
            Future&nbsp;
            <i className="material-icons">fast_forward</i>
          </div>
        </div>
        <img style={this.styles().image}
          src={this.props.lightBox.mainSrc}
          onClick={this.props.openLightBox}
        />
        {this.props.isMobile ? farmDate : null}
        {this.props.lightBox.isOpen ?
          <Lightbox
            mainSrc={this.props.lightBox.mainSrc}
            nextSrc={this.props.lightBox.nextSrc}
            prevSrc={this.props.lightBox.prevSrc}
            onCloseRequest={this.props.closeLightBox}
            onMovePrevRequest={this.props.nextSrc}
            onMoveNextRequest={this.props.prevSrc}
            imageTitle={this.props.lightBox.currentDate}
          />
        : null}
      </div>
    );
  }
}

export default FarmSlider;
