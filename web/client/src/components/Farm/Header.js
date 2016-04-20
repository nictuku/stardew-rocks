import React, {PropTypes} from 'react';
import Radium from 'radium';

import colors from '../../colors';

@Radium
class Header extends React.Component {
  static propTypes = {
    isMobile: PropTypes.bool.isRequired,
    farm: PropTypes.object.isRequired
  };

  styles () {
    return {
      headerWrapper: {
        zIndex: '1',
        position: 'absolute',
        top: '1rem',
        left: '2rem',
        right: '2rem'
      },
      headerWrapperMobile: {
        top: 'initial',
        left: 'initial',
        right: 'initial',
        alignSelf: 'center',
        margin: '1rem',
        position: 'relative'
      },
      nameWrapper: {
        position: 'relative',
        display: 'inline-flex',
        padding: '.5rem 4rem .75rem 4rem'
      },
      nameWrapperMobile: {
        padding: '1rem 3.5rem'
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
      tab: {
        padding: '1rem',
        backgroundColor: colors.dkBrown,
        color: colors.leather,
        marginLeft: '1rem',
        marginRight: '1rem',
        float: 'right'
      }
    };
  }

  render () {
    return (
      <div style={[
        this.styles().headerWrapper,
        this.props.isMobile && this.styles().headerWrapperMobile
      ]}>
        <div style={[
          this.styles().nameWrapper,
          this.props.isMobile && this.styles().nameWrapperMobile
        ]}>
          <div style={this.styles().nameBackground}></div>
          <div style={[
            this.styles().name,
            this.props.isMobile && this.styles().nameMobile
          ]}>{this.props.farm.Name}</div>
        </div>
        <span style={this.styles().tab}>STATS</span>
      </div>
    );
  }
}

export default Header;
