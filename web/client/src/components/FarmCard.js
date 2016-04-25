import React, {PropTypes} from 'react';
import {FormattedMessage} from 'react-intl';
import Radium from 'radium';
import _ from 'lodash';
import {Link} from 'react-router';

import colors from '../colors';

@Radium
class FarmCard extends React.Component {
  static propTypes = {
    farm: PropTypes.object.isRequired
  };

  styles () {
    return {
      link: {
        overflow: 'hidden',
        textDecoration: 'none',
        color: colors.dkBrown,
        fontWeight: '500',
        fontFamily: 'Roboto Slab'
      },
      card: {
        display: 'inline-block',
        margin: '.5rem',
        zIndex: 'initial',
        borderRadius: '5px',
        border: `solid 2px ${colors.brown}`,
        backgroundColor: colors.tan,
        overflow: 'hidden',
        maxHeight: '370px',
        boxShadow: '0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)',
        ':hover': {
          boxShadow: '0 8px 17px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)'
        }
      },
      image: {
        height: '284px',
        width: '350px',
        backgroundImage: 'url("content/logo.svg")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      },
      meta: {
        borderTop: `solid 2px ${colors.brown}`,
        padding: '1rem'
      },
      title: {
        fontSize: '1.5rem',
        fontWeight: 'normal'
      }
    };
  }

  render () {
    const thumb = _.split(this.props.farm.Thumbnail, '.');
    /* eslint-disable no-magic-numbers */
    return (
      <div
        style={this.styles().card}
        className="farm-card"
      >
        <Link to={`/${this.props.farm.ID}`} key={this.props.farm.ID} style={this.styles().link}>
          <div style={this.styles().image}>
            <img src={`${thumb[0]}w350.${thumb[1]}`} />
          </div>
          <div style={this.styles().meta}>
            <div style={this.styles().title}>{this.props.farm.Name}</div>
            <div>
              <FormattedMessage
                id="farmCard.farmer"
                description="the farmer of the farm"
                defaultMessage="by {farmer}"
                values={{
                  farmer: this.props.farm.Farmer
                }}
              />
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default FarmCard;
