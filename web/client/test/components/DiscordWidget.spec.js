import { expect } from 'chai';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import System from 'systemjs';
import '../../config.js';

describe('Discord Drawer Widget', () => {
  let myModule,
      component,
      detachedComp;

  before(() => {
    return System.import('reactcss')
      .then(() => System.import('../../src/components/DiscordWidget'))
      .then((module) => myModule = module);
  });
  it('displays online users on discord', () => {
    detachedComp = TestUtils.renderIntoDocument(
      <myModule discord={{}} />
    );
    component = TestUtils.findRenderedComponentWithType(detachedComp, myModule);
    expect(component).to.exist();
  });
});
