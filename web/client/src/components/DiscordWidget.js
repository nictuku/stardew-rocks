import React from 'react';
import ReactCSS from 'reactcss';
import {connect} from 'react-redux';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import IconButton from 'material-ui/lib/icon-button';


import {updateDiscord} from '../actions/discordActions';

class DiscordWidget extends ReactCSS.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.update();
  }

  classes () {
    return {
      default:  {
        toolbar: {
          backgroundColor: '#7289DA',
          color: '#ffffff'
        },
        icon: {
          height: '40px',
          width: '40px',
          margin: 'auto',
          marginLeft: '1rem',
          marginRight: '1rem'
        },
        white: {
          color: '#ffffff'
        },
        iconGroup: {
          marginRight: '1rem'
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
      }
    };
  }

  render () {
    return (
      <div>
        <Toolbar style={this.styles().toolbar} noGutter>
          <ToolbarGroup>
            <object style={this.styles().icon} type="image/svg+xml" data="content/discord.svg" />
            <ToolbarTitle text="Discord" style={this.styles().white} />
          </ToolbarGroup>
          <ToolbarGroup float="right" style={this.styles().iconGroup}>
            <IconButton iconClassName="material-icons"
              style={this.styles().iconButon}
              onClick={this.props.updateDiscord}
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
          {_.get(this.props.discord, 'members', []).map(member => (
            <ListItem key={member.id}
              leftAvatar={
                <Avatar src={member.avatar_url} />
              }
            >
              {member.username}
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

DiscordWidget.propTypes = {
  discord: React.PropTypes.shape({
    members: React.PropTypes.array.isRequired
  }).isRequired,
  update: React.PropTypes.func
};

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
