# redux-ignore

_higher-order reducer to ignore redux actions_


## Installation

```
npm install --save redux-ignore
```


## API

```js
import ignoreActions from 'redux-ignore';

// Ignore actions from an array of actions
export default ignoreActions(reducer, [ARRAY_OF_ACTIONS])

// Ignore actions from a predicate function
export default ignoreActions(reducer, (action) => !action.valid);
```


## Ignoring actions

`redux-ignore` is a reducer enhancer (higher-order reducer), it provides the
`ignoreActions` function, which takes an existing reducer and either:

- An array of actions to be ignored, or...
- A predicate function for filtering out actions.

Firstly, import `redux-ignore`:

```js
// Redux utility functions
import { combineReducers } from 'redux';
// redux-ignore higher-order reducer
import ignoreActions from 'redux-ignore';
```

Then, add `ignoreActions` to your reducer(s) like this:

```js
// Using an array of action types to ignore
combineReducers({
  counter: ignoreActions(counter, [INCREMENT_COUNTER])
});

// Using a predicate function to filter out actions
combineReducers({
  counter: ignoreActions(counter, (action) => action.type === INCREMENT_COUNTER)
});
```

## What is this magic? How does it work?

Have a read of the [Implementing Undo History recipe](https://rackt.github.io/redux/docs/recipes/ImplementingUndoHistory.html)
in the Redux documents, which explains in detail how higher-order reducers work.


## License

MIT, see `LICENSE.md` for more information.
