/**
 * @file experiences.js
 * Exports reducers pertaining to experience state.
 */

import { EXPERIENCES_FETCH_FOR_USER, EXPERIENCES_CREATE } from '../constants';

/**
 * Default experience state.
 */
const defaultState = {
  loading: false,
  error: null,
  items: []
};

/**
 * Contains reducers for each experience-related state action.
 *
 * @param {object} state - Current state object.
 * @param {object} action - Object containing a payload from a reducable action.
 *
 * @returns {object} - New state object with modifications detailed in action.
 */
export default function experiences(state = defaultState, action) {
  switch (action.type) {
    /**
     * Reducer that handles experience fetch success actions.
     */
    case `${EXPERIENCES_FETCH_FOR_USER}_SUCCESS`: {
      return {
        loading: false,
        error: null,
        items: action.payload
      };
    }

    /**
     * Reducer that handles experience fetch loading actions.
     */
    case `${EXPERIENCES_FETCH_FOR_USER}_LOADING`: {
      return {
        loading: true,
        error: null,
        items: []
      };
    }

    /**
     * Reducer that handles experience fetch failure actions.
     */
    case `${EXPERIENCES_FETCH_FOR_USER}_FAIL`: {
      return {
        loading: false,
        error: action.payload.error,
        items: []
      };
    }

    /**
     * Reducer that handles experience create success actions.
     */
    case `${EXPERIENCES_CREATE}_SUCCESS`: {
      return {
        loading: false,
        error: null,
        items: [...state.items, action.payload]
      };
    }

    /**
     * Reducer that handles experience create loading actions.
     */
    case `${EXPERIENCES_CREATE}_LOADING`: {
      return {
        loading: true,
        error: null,
        items: [...state.items]
      };
    }

    /**
     * Reducer that handles experience create failure actions.
     */
    case `${EXPERIENCES_CREATE}_FAIL`: {
      return {
        loading: false,
        error: action.payload.error,
        items: [...state.items]
      };
    }
    default:
      return state;
  }
}
