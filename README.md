# redux-ginore

_higher-order reducer to ignore redux actions_


## Installation

```
npm install --save redux-ignore
```

## Ignoring actions

`redux-ignore` is a reducer enhancer (higher-order reducer), it provides the
`ignoreActions` function, which takes an existing reducer and an array of
actions to be ignored.

Firstly, import `redux-ignore`:

```js
// Redux utility functions
import { combineReducers } from 'redux';
// Redux Undo store enhancer
import ignoreActions from 'redux-ignore';
```

Then, add `ignoreActions` to your reducer(s) like this:

```js
combineReducers({
  counter: ignoreActions(counter, [INCREMENT_COUNTER])
})
```

Now you won't be able to increment the counter anymore, because the
`INCREMENT_COUNTER` action is ignored.


## What is this magic? How does it work?

Have a read of the [Implementing Undo History recipe](https://rackt.github.io/redux/docs/recipes/ImplementingUndoHistory.html)
in the Redux documents, which explains in detail how higher-order reducers work.


## License

MIT, see `LICENSE.md` for more information.
