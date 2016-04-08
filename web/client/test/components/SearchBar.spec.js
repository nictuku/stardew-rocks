/* eslint-disable no-magic-numbers */
import React from 'react';
import _ from 'lodash';
import {mount} from 'enzyme';
import chai, {expect} from 'chai';

chai.use(require('sinon-chai'));
chai.use(require('chai-enzyme')());

import SearchBar from '../../src/components/SearchBar';

describe('SearchBar', function () {
  it('searches when a query is entered', function () {
    const searchFarmsSpy = sinon.spy();
    const getFarmsSpy = sinon.spy();
    const wrapper = mount(
      <SearchBar searchFarms={searchFarmsSpy} getFarms={getFarmsSpy}/>
    );

    wrapper.find('.search-input').simulate('change', _.set({}, 'target.value', 'pomegranate'));

    expect(searchFarmsSpy).to.have.not.been.called;
    setTimeout(() => {
      expect(getFarmsSpy).to.have.not.been.called;
      expect(searchFarmsSpy).to.have.been.calledOnce;
    }, 500);
  });

  it('shows all farms when there is no query', function () {
    const searchFarmsSpy = sinon.spy();
    const getFarmsSpy = sinon.spy();
    const wrapper = mount(
      <SearchBar searchFarms={searchFarmsSpy} getFarms={getFarmsSpy}/>
    );

    expect(getFarmsSpy).to.have.not.been.called;
    wrapper.find('.search-input').simulate('change', _.set({}, 'target.value', ''));
    setTimeout(() => {
      expect(getFarmsSpy).to.have.been.calledOnce;
      expect(searchFarmsSpy).to.have.not.been.called;
    }, 500);
  });
});
