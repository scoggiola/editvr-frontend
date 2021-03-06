/**
 * @file user.test.js
 * Contains tests for user.js.
 */

import { testSaga } from 'redux-saga-test-plan';
import {
  showLoading,
  hideLoading,
  resetLoading
} from 'react-redux-loading-bar';

import {
  userLogIn,
  userLogOut,
  userRegister,
  userResetPassword,
  userSetRole
} from './user';
import {
  getAccessToken,
  getCsrfToken,
  registerUserAccount,
  resetUserPassword
} from '../lib/api';
import {
  USER_REGISTER,
  USER_RESET_PASSWORD,
  USER_LOG_IN,
  USER_LOG_OUT,
  USER_SET_ROLE,
  USER_ROLE_EDITOR
} from '../constants';

describe('actions->user', () => {
  it('user->userLogIn()', () => {
    const username = 'test';
    const password = 'test';
    const created = Date.now();
    testSaga(userLogIn, { username, password, created })
      .next()
      .put(resetLoading())
      .next()
      .put(showLoading())
      .next()
      .put({
        type: `${USER_LOG_IN}_LOADING`
      })
      .next()
      .call(getAccessToken, username, password)
      .next()
      .call(getCsrfToken, undefined)
      .next()
      .put({
        type: `${USER_LOG_IN}_SUCCESS`,
        payload: {
          created,
          username,
          accessToken: undefined,
          refreshToken: undefined,
          csrfToken: undefined,
          expiresIn: undefined,
          role: USER_ROLE_EDITOR
        }
      })
      .next()
      // Next is executed twice here to step over the execution of an optional
      // successHandler method that this implementation doesn't utilize.
      .next()
      .put(hideLoading())
      .next()
      .isDone();
  });

  it('user->userLogOut()', () => {
    testSaga(userLogOut)
      .next()
      .put({
        type: `${USER_LOG_OUT}_SUCCESS`
      })
      .next()
      .isDone();
  });

  it('user->userRegister()', () => {
    const username = 'Bender';
    const email = 'bender@moms-robots.com';
    const password = 'shutupbabyiknowit';
    testSaga(userRegister, { username, email, password })
      .next()
      .put(resetLoading())
      .next()
      .put(showLoading())
      .next()
      .put({
        type: `${USER_REGISTER}_LOADING`
      })
      .next()
      .call(registerUserAccount, username, email, password)
      .next()
      .put({
        type: `${USER_REGISTER}_SUCCESS`,
        payload: {
          username,
          email
        }
      })
      .next()
      // Next is executed twice here to step over the execution of an optional
      // successHandler method.
      .next()
      .put(hideLoading())
      .next()
      .isDone();
  });

  it('user->userResetPassword()', () => {
    const email = 'bender@moms-robots.com';
    testSaga(userResetPassword, { email })
      .next()
      .put(resetLoading())
      .next()
      .put(showLoading())
      .next()
      .put({
        type: `${USER_RESET_PASSWORD}_LOADING`
      })
      .next()
      .call(resetUserPassword, email)
      .next()
      .put({
        type: `${USER_RESET_PASSWORD}_SUCCESS`,
        payload: {
          email
        }
      })
      .next()
      // Next is executed twice here to step over the execution of an optional
      // successHandler method.
      .next()
      .put(hideLoading())
      .next()
      .isDone();
  });

  it('user->userSetRole()', () => {
    testSaga(userSetRole, USER_ROLE_EDITOR)
      .next()
      .put({
        type: `${USER_SET_ROLE}_SUCCESS`,
        payload: {
          role: USER_ROLE_EDITOR
        }
      })
      .next()
      .isDone();
  });
});
