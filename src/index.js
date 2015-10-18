// redux-ignore higher order reducer
export default function ignoreActions (reducer, actions = []) {
  return (state, action) => {
    if (actions.indexOf(action.type) >= 0) return state
    else return reducer(state, action)
  }
}
// /redux-ignore
