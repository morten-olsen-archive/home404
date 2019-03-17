import { Middleware } from 'redux';
import { Automation } from '@home/sdk';

const middleware = (rules: Automation[]): Middleware => (store) => (next) => {
  rules.forEach((rule) => {
    rule.on('action', (action) => {
      next(action);
    });
  });
  return (action) => {
    const result = next(action);
    Promise.resolve(result).then(() => {
      const state = store.getState();
      rules.forEach(rule => rule.updateState(state));
    });
    return result;
  }
}

export default middleware;