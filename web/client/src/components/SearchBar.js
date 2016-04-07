import React from 'react';
import Radium from 'radium';
import _ from 'lodash';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import TextField from 'material-ui/lib/text-field';
import FontIcon from 'material-ui/lib/font-icon';

@Radium
class SearchBar extends React.Component {
  static propTypes = {
    getFarms: React.PropTypes.func.isRequired,
    searchFarms: React.PropTypes.func.isRequired,
    changeFilter: React.PropTypes.func,
    filter: React.PropTypes.number.isRequired,
    filters: React.PropTypes.array.isRequired
  };

  constructor (props) {
    super(props);
    this.searchFarms = _.debounce((event, query) => {
      if (!_.isEmpty(query)) {
        this.props.searchFarms(query);
      } else {
        this.props.getFarms();
      }
    }, 500); // eslint-disable-line no-magic-numbers
  }

  styles () {
    return {
      toolbar: {
        display: 'flex'
      },
      group: {
        display: 'flex',
        flex: '1',
        margin: '0 2rem'
      },
      icon: {
        paddingLeft: 'initial'
      },
      input: {
        flex: '1'
      }
    };
  }

  render () {
    return (
      <Toolbar noGutter style={this.styles().toolbar}>
        <ToolbarGroup style={this.styles().group}>
          <FontIcon style={this.styles().icon}
            className="material-icons"
          >
            search
          </FontIcon>
          <TextField style={this.styles().input}
            hintText="Search for farms or farmers"
            onChange={this.searchFarms}
          />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

export default SearchBar;
