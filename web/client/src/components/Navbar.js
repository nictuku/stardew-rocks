import React from 'react';
import Radium from 'radium';
import IconButton from 'material-ui/lib/icon-button';
import color from 'color';

// Radium stuff
var Link = require('react-router').Link;
Link = Radium(Link);

import colors from '../colors';

@Radium
class Navbar extends React.Component {
  static propTypes = {
    isMobile: React.PropTypes.bool.isRequired,
    toggleDrawer: React.PropTypes.func.isRequired,
    drawerIsDocked: React.PropTypes.bool.isRequired
  };

  styles () {
    return {
      toolbar: {
        background: `linear-gradient(${colors.maroon}, ${colors.orange}, ${colors.yellow})`,
        display: 'flex',
        position: 'relative'
      },
      logo: {
        height: '40px',
        paddingTop: '.5rem',
        paddingBottom: '.5rem'
      },
      brand: {
        cursor: "pointer",
        display: 'flex'
      },
      brandDrawerIsDocked: {
        marginLeft: '1rem'
      },
      title: {
        display: 'inline-block'
      },
      group: {
        whiteSpace: 'nowrap',
        display: 'flex',
        zIndex: '1',
        alignItems: 'center'
      },
      iconButton: {
        margin: 'auto'
      },
      icon: {
        color: colors.maroon
      },
      svgIcon: {
        height: '20px',
        width: '20px',
        fill: colors.yellow,
        pointerEvents: 'none'
      },
      leftCloud: {
        position: 'absolute',
        bottom: '0',
        left: '0'
      },
      rightCloud: {
        position: 'absolute',
        bottom: '0',
        right: '0'
      },
      btnGroup: {
        flex: '1',
        justifyContent: 'flex-end',
        marginRight: '.5rem'
      },
      btn: {
        cursor: 'pointer',
        textDecoration: 'none',
        color: colors.yellow,
        padding: '.25rem .75rem .25rem .5rem',
        display: 'flex',
        alignItems: 'center',
        marginLeft: '.5rem',
        marginRight: '.5rem',
        backgroundColor: 'initial',
        fontSize: '1rem',
        border: 'initial'
      },
      clientBtn: {
        border: `solid 1px ${colors.yellow}`,
        borderRadius: '5px',
        backgroundColor: color(colors.maroon).clearer(.3).rgbString() // eslint-disable-line no-magic-numbers
      }
    };
  }

  render () {
    return (
      <div style={this.styles().toolbar}>
        <img style={this.styles().leftCloud} src="content/cloudl.png" />
        <div style={this.styles().group}>
          {!this.props.drawerIsDocked ?
            <IconButton
              onClick={this.props.toggleDrawer}
              style={this.styles().iconButton}
              iconClassName="material-icons" iconStyle={this.styles().icon}
            >menu</IconButton>
          : null}
          <Link to="/"
            style={[
              this.styles().brand,
              this.props.drawerIsDocked && this.styles().brandDrawerIsDocked
            ]}
          >
            <img src="content/logo.png" style={this.styles().logo} />
          </Link>
        </div>
        {!this.props.isMobile ?
          <div
            style={[
              this.styles().group,
              this.styles().btnGroup
            ]}
          >
            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
              <input type="hidden" name="cmd" value="_s-xclick" />
              <input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----
              " />
              <button style={this.styles().btn} type="submit">
                <svg style={this.styles().svgIcon}>
                  <use xlinkHref="content/paypal.svg#paypal" />
                </svg>
                &nbsp;Support Us
              </button>
            </form>
            <a style={[this.styles().btn, this.styles().clientBtn]}>
              <i className="material-icons">file_download</i>
              &nbsp;Get the Client
            </a>
          </div>
        : null }
        <img style={this.styles().rightCloud} src="content/cloudr.png"/>
      </div>
    );
  }
}

export default Navbar;
