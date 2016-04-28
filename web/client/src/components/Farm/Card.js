import React, {PropTypes} from 'react';
import Radium from 'radium';

@Radium
class Card extends React.Component {
  static propTypes = {
    isMobile: PropTypes.bool.isRequired,
    children: PropTypes.element,
    style: PropTypes.object
  };

  styles () {
    return {
      card: {
        margin: '2.5rem 1rem 1rem 1rem',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        padding: '3rem'
      },
      cardMobile: {
        margin: 'initial',
        display: 'block'
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
        flex: '1',
        display: 'flex',
        position: 'relative',
        flexDirection: 'column'
      },
      pageContentMobile: {
      }
    };
  }

  render () {
    return (
      <div style={[
        this.styles().card,
        this.props.isMobile && this.styles().cardMobile,
        this.props.style
      ]}>
        <div style={[
          this.styles().pageBackground,
          this.props.isMobile && this.styles().pageBackgroundMobile
        ]}></div>
        <div style={[
          this.styles().pageContent,
          this.props.isMobile && this.styles().pageContentMobile
        ]}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Card;
