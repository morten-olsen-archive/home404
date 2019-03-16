import State from './State';
import { EventEmitter } from 'events';

type WatcherCallback<T> = (value: T, lastValue: T | undefined, newState: State, oldState?: State) => void;

interface Watcher {
  selector: string[];
  callback: WatcherCallback<any>;
  lastValue: any;
}

class AutomationRule extends EventEmitter {
  private watchers: Watcher[] = [];
  private state?: State = undefined;

  dispatch(action: any | any[]) {
    this.emit('action', action);
  }

  getState() {
    return this.state ? this.state.extended : {} as any;
  }

  getValue<T>(selector: string[]) {
    return selector.reduce((current, key) => typeof current === 'undefined' ? undefined : current[key], this.state as any) as T;
  }

  updateState = (newState: State) => {
    const oldState = this.state;
    this.state = newState;
    this.watchers.forEach((watcher) => {
      const { selector, callback, lastValue } = watcher;
      const value = selector.reduce((current, key) => typeof current === 'undefined' ? undefined : current[key], newState.extended as any);
      if (value !== lastValue) {
        watcher.lastValue = value;
        callback(value, lastValue, newState, oldState);
      }
    });
  }

  addWatcher = <T>(selector: string[], callback: WatcherCallback<T>) => {
    this.watchers.push({
      selector,
      callback,
      lastValue: undefined,
    });
  }
}

export default AutomationRule;