const isFunction = (obj) => {
  return !!(obj && obj.constructor && obj.call && obj.apply)
}

const createActionHandler = (ignore) => {
  // redux-ignore higher order reducer
  const handleAction = (reducer, actions = []) => {
    const set = Array.isArray(actions) ? new Set(actions) : undefined
    const predicate = isFunction(actions)
      ? actions
      : (action) => set.has(action.type)

    const initialState = reducer(undefined, {})

    return (state = initialState, action) => {
      if (predicate(action)) {
        return ignore ? state : reducer(state, action)
      }
      return ignore ? reducer(state, action) : state
    }
  }
  return handleAction
}

export const ignoreActions = createActionHandler(true)
export const filterActions = createActionHandler(false)

export default ignoreActions
// /redux-ignore
