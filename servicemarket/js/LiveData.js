class LiveData {
  constructor() {
    this.valueInternal = undefined;

    this.listeners = [];
  }

  get value() {
    return this.valueInternal;
  }

  set value(newValue) {
    this.valueInternal = newValue;

    for(let listener of this.listeners) {
      listener(newValue);
    }
  }

  registerListener(func) {
    this.listeners.push(func);
  }
}
