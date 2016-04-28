import React, {PropTypes} from 'react';
import Radium from 'radium';

import Card from './Card';
import SummaryMeta from './SummaryMeta';
import SummarySlider from './SummarySlider';

@Radium
class Summary extends React.Component {
  static propTypes = {
    isMobile: PropTypes.bool.isRequired,
    farm: PropTypes.object.isRequired,
    lightBox: PropTypes.object.isRequired,
    nextSrc: PropTypes.func.isRequired,
    prevSrc: PropTypes.func.isRequired,
    openLightBox: PropTypes.func.isRequired,
    closeLightBox: PropTypes.func.isRequired
  };

  styles () {
    return {
      summary: {
        display: 'flex',
        flexDirection: 'column'
      },
      meta: {
        width: '20%'
      },
      metaMobile: {
        width: 'initial'
      },
      metaWrapperMobile: {
        order: 2
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
  }

  render () {
    return (
      <div style={this.styles().summary}>
        <Card
          isMobile={this.props.isMobile}
          style={[
            this.props.isMobile && this.styles().metaWrapperMobile
          ]}
        >
          <SummaryMeta
            style={[
              this.styles().meta,
              this.props.isMobile && this.styles().metaMobile
            ]}
            farm={this.props.farm}
          />
        </Card>
        <SummarySlider
          farm={this.props.farm}
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
    );
  }
}

export default Summary;
