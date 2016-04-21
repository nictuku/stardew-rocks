/* eslint-disable no-magic-numbers */
import React, {PropTypes} from 'react';
import {IntlProvider} from 'react-intl';
import _ from 'lodash';
import {mount} from 'enzyme';
import chai, {expect} from 'chai';

chai.use(require('sinon-chai'));
chai.use(require('chai-enzyme')());

import SearchBar from '../../src/components/SearchBar';
import optionsDefault from '../mocks/mockOptions';

describe('SearchBar', function () {
  let options = _.clone(optionsDefault, true);
  _.assign(options.context, (new IntlProvider({locale: 'en'}, {})).getChildContext());
  _.assign(options.childContextTypes, {season: PropTypes.string});

  it('searches when a query is entered', function () {
    const searchFarmsSpy = sinon.spy();
    const getFarmsSpy = sinon.spy();
    const wrapper = mount(
      <SearchBar searchFarms={searchFarmsSpy} getFarms={getFarmsSpy}/>
    , options);

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
    , options);

    expect(getFarmsSpy).to.have.not.been.called;
    wrapper.find('.search-input').simulate('change', _.set({}, 'target.value', ''));
    setTimeout(() => {
      expect(getFarmsSpy).to.have.been.calledOnce;
      expect(searchFarmsSpy).to.have.not.been.called;
    }, 500);
  });
});
