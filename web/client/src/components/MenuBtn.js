import React, {PropTypes} from 'react';
import Radium, {Style} from 'radium';
import classNames from 'classnames';

import colors from '../colors';

@Radium
class MenuBtn extends React.Component {
  static propTypes = {
    isArrow: PropTypes.bool.isRequired
  };

  render () {
    return (
      <div>
        <Style
          rules={{
            '.menu-icon': {
              width: '24px',
              height: '24px',
              position: 'relative'
            },
            '.menu-icon span, .menu-icon': {
              transition: 'all 500ms ease'
            },
            '.menu-icon span': {
              backgroundColor: colors.maroon,
              display: 'block',
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%'
            },
            '.hamburger span, .arrow span': {
              height: '3px',
              transform: 'translateY(10px)'
            },
            '.hamburger .second': {
              transform: 'translateY(2px)'
            },
            '.hamburger .third': {
              transform: 'translateY(18px)'
            },
            '.arrow': {
              transform: 'rotate(180deg) translateX(-1px)'
            },
            '.arrow .second, .arrow .third': {
              transform: 'rotate(-45deg) translateY(19px)',
              width: '13px'
            },
            '.arrow .second': {
              transform: 'rotate(45deg) translateY(-5px) translateX(14px)'
            }
          }}
        />
        <div
          className={classNames({
            'menu-icon': true,
            'hamburger': !this.props.isArrow,
            'arrow': this.props.isArrow
          })}
        >
          <span className="first"></span>
          <span className="second"></span>
          <span className="third"></span>
        </div>
      </div>
    );
  }
}

export default MenuBtn;
