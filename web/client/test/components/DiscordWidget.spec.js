/* eslint-disable no-magic-numbers, camelcase */
import React from 'react';
import _ from 'lodash';
import {mount} from 'enzyme';
import chai, {expect} from 'chai';
import faker from 'faker';

chai.use(require('sinon-chai'));
chai.use(require('chai-enzyme')());

import options from '../mocks/mockOptions';
import {component as DiscordWidget} from '../../src/components/DiscordWidget';

const randomUser = (isIdle) => ({
  avatar: null,
  avatar_url: "https://cdn.discordapp.com/embed/avatars/0.png",
  discriminator: faker.random.uuid(),
  id: faker.random.uuid(),
  status: !isIdle ? 'online' : 'idle',
  username: faker.internet.userName()
});

describe('DiscordWidget', function () {
  let discord;

  beforeEach(function () {
    discord = {
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
  });

  it('shows a list of online users', function () {
    const wrapper = mount(
      <DiscordWidget discord={discord} update={() => {}} />
    , options);

    expect(wrapper).to.have.exactly(2).descendants('.discord-user');
  });

  it ('updates on start', function () {
    const updateSpy = sinon.spy();
    mount(
      <DiscordWidget discord={discord} update={updateSpy} />
    , options);

    expect(updateSpy).to.have.been.calledOnce;
  });

  it('updates when update btn is clicked', function () {
    const updateSpy = sinon.spy(() => discord.members.push(randomUser()));
    const wrapper = mount(
      <DiscordWidget discord={discord} update={updateSpy} />
    , options);

    wrapper.find('.discord-refresh').simulate('click');
    expect(updateSpy).to.have.been.calledTwice;
    wrapper.setProps({discord});
    expect(wrapper).to.have.exactly(4).descendants('.discord-user');
  });

  it('only shows online users', function () {
    _.times(2, () => discord.members.push(randomUser(true)));
    const wrapper = mount(
      <DiscordWidget discord={discord} update={() => {}} />
    , options);

    expect(discord.members).to.have.length(4);
    expect(wrapper).to.have.exactly(2).descendants('.discord-user');
  });

  it('shows a message on no users', function () {
    discord.members = [];
    const wrapper = mount(
      <DiscordWidget discord={discord} update={() => {}} />
    , options);

    expect(wrapper).to.not.have.descendants('.discord-user');
    expect(wrapper).to.have.exactly(1).descendants('.discord-error-users');
  });

  it('shows a error message when discord api fails', function () {
    const wrapper = mount(
      <DiscordWidget discord={{}} update={() => {}} />
    , options);

    expect(wrapper).to.have.exactly(1).descendants('.discord-error');
  });
});
