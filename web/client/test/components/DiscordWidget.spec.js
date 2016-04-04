/* eslint-disable no-magic-numbers */

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
  let React, ReactDOM, TestUtils, DiscordWidget, discordWidget, discordWidgetNode;

  before(function (done) {
    Promise.all([
      System.import('react').then(module => React = module),
      System.import('react-dom').then(module => ReactDOM = module),
      System.import('react-addons-test-utils').then(module => TestUtils = module),
      System.import('src/components/DiscordWidget').then(module => DiscordWidget = module.component)
    ]).then(() => {
      discordWidget = TestUtils.renderIntoDocument(
        <DiscordWidget discord={discord} update={() => {}} />
      );
      discordWidgetNode = ReactDOM.findDOMNode(discordWidget);
      done();
    });
  });

  it('exists', function () {
    expect(discordWidgetNode).to.exist;
  });

  it('shows a list of online users', function () {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(discordWidget, 'discord-user'))
      .to.have.length(2);
  });
});
