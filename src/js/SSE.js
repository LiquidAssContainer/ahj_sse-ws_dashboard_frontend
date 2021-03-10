export default class SSE {
  constructor(url, dashboard) {
    this.dashboard = dashboard;
    this.eventSource = new EventSource(url);
    this.registerEvents();
  }

  registerEvents() {
    const eventTypes = ['received', 'created', 'started', 'stopped', 'removed'];
    for (const event of eventTypes) {
      this.eventSource.addEventListener(event, (e) => {
        this.dashboard.eventHandler(e);
      });
    }
  }
}
