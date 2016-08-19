function isFunction (obj) {
  return !!(obj && obj.constructor && obj.call && obj.apply)
}

function createActionHandler (ignore) {
  // redux-ignore higher order reducer
  return function handleAction (reducer, actions = []) {
    const predicate = isFunction(actions)
        ? actions
        : (action) => actions.indexOf(action.type) >= 0

    const initialState = reducer(undefined, {})

    return (state = initialState, action) => {
      if (predicate(action)) {
        return ignore ? state : reducer(state, action)
      }

      return ignore ? reducer(state, action) : state
    }
  }
}

export const ignoreActions = createActionHandler(true)
export const filterActions = createActionHandler(false)

export default ignoreActions
// /redux-ignore
