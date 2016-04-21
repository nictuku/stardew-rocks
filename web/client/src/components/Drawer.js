import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import _ from 'lodash';
import color from 'color';
import Sidebar from 'react-sidebar';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FontIcon from 'material-ui/lib/font-icon';

import DiscordWidget from './DiscordWidget';
import colors from '../colors';

class Drawer extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    isDocked: PropTypes.bool.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
    children: PropTypes.array,
    isMobile: PropTypes.bool.isRequired
  };

  static contextTypes = {
    season: PropTypes.string
  };

  styles () {
    /* eslint-disable no-magic-numbers */
    return {
      link: {
        textDecoration: 'none'
      },
      toolbar:  {
        display: 'flex',
        padding: '0 1rem',
        justifyContent: 'space-between'
      },
      toolbarGroup: {
        alignItems: 'center',
        display: 'flex'
      },
      iconButton: {
        margin: 'auto'
      },
      iconButtonIcon: {
        color: `#ffffff`
      },
      drawer: {
        backgroundColor: '#ffffff',
        zIndex: '10',
        borderRight: `1px solid ${colors[this.context.season].color1}`
      },
      content: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: color(colors[this.context.season].color1).darken(0.5).rgbString()
      },
      badButton: {
        padding: 'initial',
        border: 'initial',
        backgroundColor: 'initial',
        textAlign: 'left',
        width: '100%'
      },
      overlay: {
        zIndex: '9'
      },
      white: {
        color: `#ffffff`
      },
      icon:  {
        fill: 'rgb(117, 117, 117)'
      },
      root: {
        top: '57px'
      }
    };
    /* eslint-enable */
  }

  render () {
    return (
      <Sidebar
        styles={{
          root: this.styles().root,
          overlay: _.assign(this.styles().root, this.styles().overlay),
          sidebar: this.styles().drawer,
          content: this.styles().content,
          dragHandle: this.styles().root
        }}
        sidebar={
          <div>
            {this.props.isMobile ?
              <div>
                <Menu>
                  <MenuItem primaryText="Download Client"
                    href="https://github.com/nictuku/stardew-rocks"
                    leftIcon={<FontIcon className="material-icons">file_download</FontIcon>}
                  />
                  <Link to="about" style={this.styles().link} onClick={this.props.toggleDrawer}>
                    <MenuItem
                      primaryText="About/FAQ"
                      leftIcon={
                        <FontIcon className="material-icons">question_answer</FontIcon>
                      }
                    />
                  </Link>
                  <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                    <input type="hidden" name="cmd" value="_s-xclick" />
                    <input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----
                    " />
                    <button type="submit" style={this.styles().badButton}>
                      <MenuItem primaryText="Donate"
                        leftIcon={
                          <svg style={this.styles().icon}>
                            <use xlinkHref="content/paypal.svg#paypal" />
                          </svg>
                        }
                      />
                    </button>
                  </form>
                </Menu>
              </div>
            : null }
            <DiscordWidget />
          </div>
        }
        open={this.props.isOpen}
        docked={this.props.isDocked}
        onSetOpen={this.props.toggleDrawer}
      >
        {this.props.children}
      </Sidebar>
    );
  }
}

export default Drawer;
