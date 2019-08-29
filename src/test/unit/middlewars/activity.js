const assert = require('assert');
const sinon = require('sinon');
const chai = require('chai');
const jwt = require('jsonwebtoken');
const { expect } = require('chai');

const activityMiddleware = require('../../../middelware/activity');

const User = require('../../../models/user');

describe('Activity middleware', () => {
  let req, res, next, jwtVerifySpy;

  const updateUserSpy = sinon.spy(User, 'update');

  beforeEach(() => {
    req = {
      //body: {},
      session: {},
      headers: {},
    };
    res = {};
    next = function () {};
    jwtVerifySpy = sinon.spy(jwt, 'verify');
  });

  afterEach(() => {
    jwtVerifySpy.restore();
  });

  it('should verify token if token passed', function() {
    req.body = { token: 'some token' };
    activityMiddleware(req, res, next);
    assert(jwtVerifySpy.called);
  });

  it('should not verify token if no token', function() {
    activityMiddleware(req, res, next);
    expect(jwtVerifySpy.called).to.be.false;
  });

  it('should not update user if userId is in session', function() {
    activityMiddleware(req, res, next).then(res => {
      expect(updateUserSpy.called).to.be.false;
    });
  });

});
