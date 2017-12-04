declare module "redux-ignore" {

  import { Reducer, Action } from "redux";

  export type Predicate = (action: Action) => boolean;

  export function predicate(action: Action): boolean;
  export function filterActions<S>(reducer: Reducer<S>, actions: Predicate | string[]): Reducer<S>;
  export function ignoreActions<S>(reducer: Reducer<S>, actions: Predicate | string[]): Reducer<S>;
  export function isFunction(actions: Predicate | string[]): boolean;

}