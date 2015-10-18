import isFunction from 'lodash/lang/isFunction'

// redux-ignore higher order reducer
export default function ignoreActions (reducer, actions = []) {
  let ignorePredicate = isFunction(actions)
    ? actions
    : (action) => actions.indexOf(action.type) >= 0

  return (state, action) => {
    if (!ignorePredicate(action)) {
      return reducer(state, action)
    }

    return state
  }
}
// /redux-ignore
