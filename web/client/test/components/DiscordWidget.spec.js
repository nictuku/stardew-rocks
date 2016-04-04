var System = require('jspm').Loader();
var expect = require('chai').expect;

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

describe('DiscordWidget', function () {
  let React, ReactDOM, TestUtils, DiscordWidget;
  before(function () {
    return Promise.all([
      System.import('react').then(module => React = module),
      System.import('react-dom').then(module => ReactDOM = module),
      System.import('react-addons-test-utils').then(module => TestUtils = module),
      System.import('src/components/DiscordWidget').then(module => DiscordWidget = module.component)
    ]);
  });
  it('is visible', function () {
    const discordWidget = TestUtils.renderIntoDocument(
      <DiscordWidget discord={discord} update={() => {}} />
    );

    const discordWidgetNode = ReactDOM.findDOMNode(discordWidget);

    expect(discordWidgetNode).to.exist;
  });
});
