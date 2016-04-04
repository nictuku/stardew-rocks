'use strict';

jest.unmock('../../src/components/DiscordWidget');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import DiscordWidget from '../../src/components/DiscordWidget';

/* eslint-disable camelcase */
const discord = {
  name: 'Stardew Farm',
  instant_invite: 'https://discordapp.com/invite/0tpEyZrnOVRT42Uo',
  members: [{
    avatar: "709b19a43a760e23f06294caaa150bf1",
    avatar_url: "https://cdn.discordapp.com/avatars/139107857235705857/709b19a43a760e23f06294caaa150bf1.jpg",
    discriminator: "1482",
    id: "139107857235705857",
    status: "online",
    username: "gumbyscout (Mitchel)"
  }, {
    avatar: null,
    avatar_url: "https://cdn.discordapp.com/embed/avatars/0.png",
    discriminator: "5145",
    id: "164555874717794305",
    status: "online",
    username: "stardew.bot"
  }]
};
/* eslint-enable */

describe('DiscordWidget', () => {
  it('is visible', () => {
    const discordWidget = TestUtils.renderIntoDocument(
      <DiscordWidget discord={discord} />
    );

    const discordWidgetNode = ReactDOM.findDOMNode(discordWidget);

    expect(discordWidgetNode).toExist();
  });
});
