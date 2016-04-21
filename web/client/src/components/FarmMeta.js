import React, {PropTypes} from 'react';
import Radium, {Style} from 'radium';
import {FormattedMessage} from 'react-intl';
import _ from 'lodash';
import moment from 'moment';
import 'moment-duration-format';
import numeral from 'numeral';

import colors from '../colors';

class FarmMeta extends React.Component {
  static propTypes = {
    farm: PropTypes.object.isRequired,
    style: PropTypes.object
  };

  render () {
    return (
      <div className="farm-meta" style={this.props.style}>
        <Style
          scopeSelector=".farm-meta"
          rules={{
            padding: '3rem',
            '.group': {
            },
            '.item': {
              display: 'inline-block',
              textAlign: 'left',
              color: colors.dkBrown,
              fontSize: '1.25rem',
              fontWeight: '500',
              paddingTop: '.25rem',
              paddingBottom: '.25rem',
              marginRight: '1rem'
            },
            '.item:last-child': {
              paddingBottom: '1rem'
            },
            '.item:first-child': {
              paddingTop: '1rem'
            },
            '.label': {
              color: colors.leather,
              fontSize: '1rem'
            }
          }}
        />
        <div className="group">
          <div className="item">
            <div className="label">Farmer</div>
            {this.props.farm.Farmer}
          </div>
        </div>
        <div className="group">
          <div className="item">
            <div className="label">
              <FormattedMessage
                id="farm.wealth"
                description="wealth label"
                defaultMessage="Wealth"
              />
            </div>
            {numeral(this.props.farm.Player.Money).format('0,0')}G
          </div>
          <div className="item">
            <div className="label">
              <FormattedMessage
                id="farm.totalEarnings"
                description="total earnings label"
                defaultMessage="Total Earnings"
              />
            </div>
            {numeral(this.props.farm.Player.TotalMoneyEarned).format('0,0')}G
          </div>
        </div>
        <div className="group">
          <div className="item">
            <div className="label">
              <FormattedMessage
                id="farm.lastSave"
                description="last save label"
                defaultMessage="Last Save"
              />
            </div>
            {moment.unix(this.props.farm.LastSave).fromNow()}
          </div>
          <div className="item">
            <div className="label">
              <FormattedMessage
                id="farm.timePlayed"
                description="time played label"
                defaultMessage="Time Played"
              />
            </div>
            {moment.duration(this.props.farm.Player.MillisecondsPlayed).format('H [hrs] m [mins]')}
          </div>
        </div>
      </div>
    );
  }
}

export default Radium(FarmMeta);
