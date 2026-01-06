import { createStore } from 'redux'

import { ignoreActions, filterActions } from '../src/index'

let reducer = (state, action) => {
  switch (action.type) {
    case 'FOO':
      return 'foo-state'
    case 'BAR':
      return 'bar-state'
    default:
      return 'default-state'
  }
}

describe('ignoreActions()', () => {
  it('should ignore actions with specified types in array', () => {
    let ignoringReducer = ignoreActions(reducer, ['BAR'])
    let action = { type: 'BAR' }

    expect(ignoringReducer('testing', action)).toEqual('testing')
  })

  it('should not ignore actions that do not have types in array', () => {
    let ignoringReducer = ignoreActions(reducer, ['BAR'])
    let action = { type: 'FOO' }

    expect(ignoringReducer('testing', action)).toEqual('foo-state')
  })

  it('should allow all actions when no action types array is specified', () => {
    let ignoringReducer = ignoreActions(reducer)
    let action = { type: 'BAZ' }

    expect(ignoringReducer('testing', action)).toEqual('default-state')
  })

  it('should work with a predicate function for actions', () => {
    let ignoringReducer = ignoreActions(reducer, (a) => a.invalid)
    let action = { type: 'BAR', invalid: true }

    expect(ignoringReducer('testing', action)).toEqual('testing')
  })
})

describe('filterActions()', () => {
  it('should include actions with specified types in array', () => {
    let filteringReducer = filterActions(reducer, ['BAR'])
    let action = { type: 'BAR' }

    expect(filteringReducer('testing', action)).toEqual('bar-state')
  })

  it('should exclude actions that do not have types in array', () => {
    let filteringReducer = filterActions(reducer, ['BAR'])
    let action = { type: 'FOO' }

    expect(filteringReducer('testing', action)).toEqual('testing')
  })

  it('should exclude all actions when no action types array is specified', () => {
    let filteringReducer = filterActions(reducer)
    let action = { type: 'BAZ' }

    expect(filteringReducer('testing', action)).toEqual('testing')
  })

  it('should work with a predicate function for actions', () => {
    let filteringReducer = filterActions(reducer, (a) => a.valid)
    let action = { type: 'BAR', valid: true }

    expect(filteringReducer('testing', action)).toEqual('bar-state')
  })

  it('should return an initial state when a redux store is created', () => {
    let filteringReducer = filterActions(reducer, ['BAR'])
    let store = createStore(filteringReducer)

    expect(store.getState()).toEqual(reducer(undefined, {}))
  })
})
