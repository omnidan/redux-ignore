import isFunction from 'lodash/lang/isFunction'

function createActionHandler (ignore) {
  // redux-ignore higher order reducer
  return function handleAction (reducer, actions = []) {
    const predicate = isFunction(actions)
        ? actions
        : (action) => actions.indexOf(action.type) >= 0

    return (state, action) => {
      if (predicate(action)) {
        return ignore ? state : reducer(state, action)
      }

      return ignore ? reducer(state, action) : state
    }
  }
}

export const ignoreActions = createActionHandler(true)
export const includeActions = createActionHandler(false)

export default ignoreActions
// /redux-ignore

