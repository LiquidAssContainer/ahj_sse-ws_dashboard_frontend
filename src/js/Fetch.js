export default class Fetch {
  constructor(url) {
    this.url = url;
  }

  async createRequest(url, options) {
    return await fetch(`${this.url}${url}`, options);
  }

  sendUser(user) {
    this.user = user;
    return this.createRequest('/users', {
      method: 'POST',
      body: JSON.stringify({ user }),
    });
  }

  getInstances() {
    return this.createRequest('/instances', {
      method: 'GET',
    });
  }

  createInstance() {
    return this.createRequest('/instances', {
      method: 'POST',
      body: JSON.stringify({ user: this.user }),
    });
  }

  removeInstance(id) {
    return this.createRequest(`/instances/${id}/${this.user}`, {
      method: 'DELETE',
      // body: JSON.stringify({ user: this.user }),
    });
  }

  runInstance(id) {
    return this.createRequest(`/instances/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ action: 'run', user: this.user }),
    });
  }

  stopInstance(id) {
    return this.createRequest(`/instances/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ action: 'stop', user: this.user }),
    });
  }
}
