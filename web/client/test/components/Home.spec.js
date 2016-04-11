/* eslint-disable no-magic-numbers */
import React from 'react';
import {mount} from 'enzyme';
import chai, {expect} from 'chai';

chai.use(require('sinon-chai'));
chai.use(require('chai-enzyme')());

import context from '../mocks/mockContext';
import mockFarms from '../mocks/mockFarms';
import mockProps from '../mocks/mockProps';
import {initialState} from '../../src/reducers/farms';
import {component as Home} from '../../src/components/Home';

describe('Home', function () {
  const propShape = {
    number: [
      'pages',
      'farmsPerPage'
    ],
    array: [
      'farms'
    ],
    func: [
      'getFarms',
      'resetFarmsAmount',
      'searchFarms',
      'onChangeFilter',
      'getMoreFarms'
    ]
  };

  const options = {context};

  let props;

  before('mock inconsequential', function () {
    props = mockProps.generateProps(propShape);
  });

  it('fetches farms on start', function () {
    const getFarmsSpy = sinon.spy();
    const farms = mockFarms.generateFarms(initialState.farmsPerPage);
    const wrapper = mount(
      <Home {...props} {...initialState} getFarms={getFarmsSpy} />
    , options);

    expect(getFarmsSpy).to.have.been.calledOnce;
    expect(wrapper).to.not.have.descendants('.farm-card');
    wrapper.setProps({farms});
    expect(wrapper).to.have.exactly(initialState.farmsPerPage)
      .descendants('.farm-card');
  });

  it(`shows ${initialState.farmsPerPage} recent farms`, function () {
    const farms = mockFarms.generateFarms(initialState.farmsPerPage + 10);
    const wrapper = mount(
      <Home {...props} {...initialState} farms={farms} />
    , options);

    expect(wrapper).to.have.exactly(initialState.farmsPerPage)
      .descendants('.farm-card');
  });

  it('shows no results with no farms', function () {
    const wrapper = mount(
      <Home {...props} {...initialState} />
    , options);

    expect(wrapper).to.not.have.descendants('.farm-card');
    expect(wrapper).to.have.exactly(1).descendants('.home-error-no-farms');
  });

  // it('loads more farms when the users scrolls down', function () {
  //   const getMoreFarmsSpy = sinon.spy();
  //   const farms = mockFarms.generateFarms(initialState.farmsPerPage * 2);
  //   const wrapper = mount(
  //     <Home {...props} {...initialState} farms={farms} getMoreFarms={getMoreFarmsSpy} />
  //   );
  //
  //   expect(getMoreFarmsSpy).to.not.have.been.called;
  //   expect(wrapper).to.have.exactly(initialState.farmsPerPage)
  //     .descendants('.farm-card');
  //   wrapper.find('.home-farm-list').simulate('scroll', {deltaY: 1000000});
  //   expect(getMoreFarmsSpy).to.have.been.calledOnce;
  //   wrapper.setProps({pages: ++initialState.pages});
  //   expect(wrapper).to.have.exactly(initialState.farmsPerPage * 2)
  //     .descendants('.farm-card');
  // });
});
