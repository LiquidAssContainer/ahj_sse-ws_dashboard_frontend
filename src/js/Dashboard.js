import SSE from './SSE';
import Fetch from './Fetch';
import DashboardRender from './DashboardRender';

export default class Dashboard {
  constructor(url) {
    this.url = url;
    this.user = 'admin';
    this.fetch = new Fetch(url);
    this.render = new DashboardRender();
  }

  init() {
    this.subscribeToEventSource();
    this.appendInstances();
    this.registerEvents();
  }

  async appendInstances() {
    const response = await this.fetch.getInstances();
    if (response.ok) {
      const instances = await response.json();
      for (const item of instances) {
        this.render.appendInstance(item.id, item.state);
      }
    } else {
      console.log(response.status);
    }
  }

  async subscribeToEventSource() {
    const response = await this.fetch.sendUser(this.user);
    if (response.ok) {
      const urlSSE = `${this.url}/sse/${this.user}`;
      this.sse = new SSE(urlSSE, this);
    }
  }

  eventHandler(e) {
    const { server, status } = JSON.parse(e.data);
    if (status && status === 'changing') {
      const instance = document.querySelector(`[data-id="${server}"]`);
      this.disableInstanceBtns(instance);
    }
    this.render.appendRecord(e);

    switch (e.type) {
      case 'received':
        if (status) this.changeInstanceStatus(server, status);
        break;
      case 'created':
        this.render.appendInstance(server, status);
        break;
      case 'started':
        this.changeInstanceStatus(server, 'running');
        break;
      case 'stopped':
        this.changeInstanceStatus(server, 'stopped');
        break;
      case 'removed':
        const instanceToRemove = document.querySelector(
          `[data-id="${server}"]`,
        );
        instanceToRemove.remove();
    }
  }

  changeInstanceStatus(serverId, status) {
    // да, сплошные костыли
    const instance = document.querySelector(`[data-id="${serverId}"]`);
    const [statusElem] = instance.getElementsByClassName(
      'instance_status_name',
    );

    statusElem.classList.remove(
      'status_stopped',
      'status_running',
      'status_changing',
    );
    statusElem.classList.add(`status_${status}`);
    statusElem.textContent = status;

    if (status !== 'changing') {
      const btn = instance.querySelector('.instance_btn:first-of-type');
      btn.className = `instance_btn instance_${
        status === 'running' ? 'stop' : 'run'
      }-btn`;
      this.enableInstanceBtns(instance);
    }
  }

  disableInstanceBtns(instance) {
    const btns = instance.getElementsByClassName('instance_btn');
    btns.forEach((btn) => {
      btn.disabled = true;
    });
  }

  enableInstanceBtns(instance) {
    const btns = instance.getElementsByClassName('instance_btn');
    btns.forEach((btn) => {
      btn.disabled = false;
    });
  }

  registerEvents() {
    const [createBtn] = document.getElementsByClassName('instances_create-btn');
    createBtn.addEventListener('click', () => this.fetch.createInstance());

    document.addEventListener('click', ({ target }) => {
      const instance = target.closest('.instance');
      if (!instance) return;

      const instanceId = instance.dataset.id;
      if (target.classList.contains('instance_remove-btn')) {
        this.fetch.removeInstance(instanceId);
      }
      if (target.classList.contains('instance_run-btn')) {
        this.fetch.runInstance(instanceId);
      }
      if (target.classList.contains('instance_stop-btn')) {
        this.fetch.stopInstance(instanceId);
      }
    });
  }
}
