class EventBus {
  events: object;
  constructor() {
    this.events = {};
  }
  on(event, handler:Function) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(handler);
  }
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach((handler) => {
        handler(data);
      });
    }
  }
  off(event, handler:Function) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((h) => h !== handler);
    }
  }
  remove(event) {
    delete this.events[event];
  }
}
export {
  EventBus,
} 