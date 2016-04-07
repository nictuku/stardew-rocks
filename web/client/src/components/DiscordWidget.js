import React from 'react';
import Radium from 'radium';
import _ from 'lodash';
import {connect} from 'react-redux';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import IconButton from 'material-ui/lib/icon-button';

import {updateDiscord} from '../actions/discordActions';

@Radium
class DiscordWidget extends React.Component {
  static propTypes = {
    discord: React.PropTypes.object.isRequired,
    update: React.PropTypes.func
  };

  componentDidMount () {
    this.props.update();
  }

  styles () {
    return {
      toolbar: {
        display: 'flex',
        backgroundColor: '#7289DA',
        padding: '0 1rem',
        color: '#ffffff',
        justifyContent: 'space-between'
      },
      toolbarGroup: {
        alignItems: 'center',
        display: 'flex'
      },
      icon: {
        height: '40px',
        width: '40px',
        marginRight: '1rem'
      },
      white: {
        color: '#ffffff'
      },
      iconButtonLink: {
        margin: 'auto'
      },
      iconButon: {
        margin: 'auto'
      },
      iconButtonIcon: {
        color: '#ffffff'
      }
    };
  }

  render () {
    let listContent;
    if (_.has(this.props.discord, 'members')) {
      listContent = _(this.props.discord.members)
        .filter({status: 'online'})
        .map(member => (
          <ListItem key={member.id}
            className="discord-user"
            leftAvatar={
              <Avatar src={member.avatar_url} />
            }
          >
            {member.username}
          </ListItem>
        ))
        .thru(members => {
          return !_.isEmpty(members) ? members
            : (
              <ListItem className="discord-error-users">
                No users online
              </ListItem>
            );
        })
        .value();
    } else {
      listContent = (
        <ListItem className="discord-error">
          Couldn't fetch discord info
        </ListItem>
      );
    }

    return (
      <div>
        <Toolbar style={this.styles().toolbar} noGutter>
          <ToolbarGroup style={this.styles().toolbarGroup}>
            <object style={this.styles().icon} type="image/svg+xml" data="content/discord.svg" />
            <ToolbarTitle text="Discord" style={this.styles().white} />
          </ToolbarGroup>
          <ToolbarGroup
            style={this.styles().toolbarGroup}
          >
            <IconButton iconClassName="material-icons"
              className="discord-refresh"
              style={this.styles().iconButon}
              onClick={this.props.update}
              iconStyle={this.styles().iconButtonIcon}>refresh</IconButton>
            <a href={this.props.discord.instant_invite}
              target="_blank"
              style={this.styles().iconButtonLink}>
              <IconButton iconClassName="material-icons"
                iconStyle={this.styles().iconButtonIcon}>launch</IconButton>
            </a>
          </ToolbarGroup>
        </Toolbar>
        <List>
          {listContent}
        </List>
      </div>
    );
  }
}

export const component = DiscordWidget;

export default connect(
  state => ({
    discord: state.discord.discord
  }),
  dispatch => ({
    update: () => {
      dispatch(updateDiscord());
    }
  })
)(DiscordWidget);
