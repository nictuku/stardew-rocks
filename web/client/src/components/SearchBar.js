import React, {PropTypes} from 'react';
import Radium, {Style} from 'radium';
import _ from 'lodash';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';

import colors from '../colors';

@Radium
class SearchBar extends React.Component {
  static propTypes = {
    getFarms: PropTypes.func.isRequired,
    searchFarms: PropTypes.func.isRequired,
    changeFilter: PropTypes.func,
    filter: PropTypes.number,
    filters: PropTypes.array
  };

  static contextTypes = {
    season: PropTypes.string
  };

  constructor (props) {
    super(props);
    this.searchFarms  = _.debounce(query => {
      if (!_.isEmpty(query)) {
        this.props.searchFarms(query);
      } else {
        this.props.getFarms();
      }
    }, 500); // eslint-disable-line no-magic-numbers
    this.query = event => {
      const query = event.target.value;
      this.searchFarms(query);
    };
  }

  styles () {
    return {
      toolbar: {
        display: 'flex',
        borderBottom: `1px solid ${colors[this.context.season].color1}`,
        backgroundColor: colors.tan
      },
      group: {
        display: 'flex',
        flex: '1',
        margin: '0 2rem'
      },
      icon: {
        paddingLeft: 'initial',
        margin: 'auto',
        color: colors.dkBrown
      },
      input: {
        marginLeft: '.5rem',
        flex: '1',
        background: 'initial',
        border: 'initial',
        outline: 'none'
      },
      inputText: {
        fontFamily: 'Roboto Slab',
        color: colors.dkBrown,
        fontSize: '1rem'
      }
    };
  }

  render () {
    return (
      <Toolbar noGutter style={this.styles().toolbar} className="search">
        <Style scopeSelector=".search"
          rules={{
            '::-webkit-input-placeholder': this.styles().inputText,
            ':-moz-placeholder': this.styles().inputText,
            '::-moz-placeholder': this.styles().inputText,
            ':-ms-input-placeholder': this.styles().inputText
          }}
        />
        <ToolbarGroup style={this.styles().group}>
          <i
            style={this.styles().icon}
            className="material-icons"
          >search</i>
          <input type="test"
            style={[this.styles().input, this.styles().inputText]}
            className="search-input"
            placeholder="Search for farms or farmers..."
            onChange={this.query}
          />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

export default SearchBar;
