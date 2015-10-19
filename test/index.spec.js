import assert from 'assert'
import {ignoreActions, includeActions} from '../src/index'

describe('ignoreActions()', () => {
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

  it('should ignore actions with specified types in array', () => {
    let ignoringReducer = ignoreActions(reducer, ['BAR'])
    let action = { type: 'BAR' }

    assert.equal(
      ignoringReducer('testing', action),
      'testing')
  })

  it('should not ignore actions that do not have types in array', () => {
    let ignoringReducer = ignoreActions(reducer, ['BAR'])
    let action = { type: 'FOO' }

    assert.equal(
      ignoringReducer('testing', action),
      'foo-state')
  })

  it('should allow all actions when no action types array is specified', () => {
    let ignoringReducer = ignoreActions(reducer)
    let action = { type: 'BAZ' }

    assert.equal(
      ignoringReducer('testing', action),
      'default-state')
  })

  it('should work with a predicate function for actions', () => {
    let ignoringReducer = ignoreActions(reducer, (a) => a.invalid)
    let action = { type: 'BAR', invalid: true }

    assert.equal(
      ignoringReducer('testing', action),
      'testing')
  })
})

describe('includeActions()', () => {
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

  it('should include actions with specified types in array', () => {
    let includingReducer = includeActions(reducer, ['BAR'])
    let action = { type: 'BAR' }

    assert.equal(
      includingReducer('testing', action),
      'bar-state')
  })

  it('should exclude actions that do not have types in array', () => {
    let includingReducer = includeActions(reducer, ['BAR'])
    let action = { type: 'FOO' }

    assert.equal(
      includingReducer('testing', action),
      'testing')
  })

  it('should exclude all actions when no action types array is specified', () => {
    let includingReducer = includeActions(reducer)
    let action = { type: 'BAZ' }

    assert.equal(
      includingReducer('testing', action),
      'testing')
  })

  it('should work with a predicate function for actions', () => {
    let includingReducer = includeActions(reducer, (a) => a.valid)
    let action = { type: 'BAR', valid: true }

    assert.equal(
      includingReducer('testing', action),
      'bar-state')
  })
})
