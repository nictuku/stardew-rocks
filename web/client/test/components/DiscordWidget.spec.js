/* eslint-disable no-magic-numbers */
import React from 'react';
import {mount} from 'enzyme';
import chai, {expect} from 'chai';
const sinon = require('sinon');
import sinonChai from 'sinon-chai';
import chaiEnzyme from 'chai-enzyme';

chai.use(sinonChai);
chai.use(chaiEnzyme());

import {component} from '../../src/components/DiscordWidget';
const DiscordWidget = component;

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
const update = () => {
  discord.members.push({
    avatar: null,
    avatar_url: "https://cdn.discordapp.com/embed/avatars/0.png",
    discriminator: "9999",
    id: "00000000000000000",
    status: "online",
    username: "new user"
  });
};
/* eslint-enable */

describe('DiscordWidget', function () {
  it('shows a list of online users', function () {
    const wrapper = mount(
      <DiscordWidget discord={discord} update={() => {}} />
    );
    expect(wrapper).to.have.exactly(2).descendants('.discord-user');
  });

  it('updates when update btn is clicked', function () {
    const updateSpy = sinon.spy(update);
    const wrapper = mount(
      <DiscordWidget discord={discord} update={updateSpy} />
    );
    wrapper.find('.discord-refresh').simulate('click');
    expect(updateSpy).to.have.been.calledOnce;
    wrapper.setProps({discord});
    expect(wrapper).to.have.exactly(3).descendants('.discord-user');
  });
});
