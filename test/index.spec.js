import assert from 'assert'
import ignoreActions from '../src/index'

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
