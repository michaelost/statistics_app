const assert = require('assert');
const sinon = require('sinon');
const chai = require('chai');

const activityMiddleware = require('../../../middelware/activity');

describe('Activity middleware', () => {
  it('should be a function', function() {
    assert.isFunction(activityMiddleware);
  });
});
