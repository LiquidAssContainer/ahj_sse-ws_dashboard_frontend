export default class DashboardRender {
  constructor() {
    [this.instances] = document.getElementsByClassName('instance_list');
    [this.worklog] = document.getElementsByClassName('worklog-record_list');
  }

  appendInstance(server, status) {
    const instance = `
    <div class="instance" data-id="${server}">
      <div class="instance_id">${server}</div>
      <div class="instance_status">
        <span class="instance_label">Status:</span>
        <span class="instance_status_name status_${status}">${status}</span>
      </div>
      <div class="instance_actions">
        <span class="instance_label">Actions:</span>
        <button class="instance_btn instance_${
          status === 'running' ? 'stop' : 'run'
        }-btn"></button>
        <button class="instance_btn instance_remove-btn"></button>
      </div>
    </div>`;

    this.instances.insertAdjacentHTML('beforeend', instance);
  }

  appendRecord(evt) {
    const { info, server, date } = JSON.parse(evt.data);
    const description = evt.type === 'received' ? `Received "${info}"` : info;
    const record = `
    <div class="worklog-record">
      <div class="worklog-record_date">${this.getFormattedDate(date)}</div>
      <div class="worklog-record_content">
        <p class="worklog-record_content_paragraph">Server: ${server}</p>
        <p class="worklog-record_content_paragraph">INFO: ${description}</p>
      </div>
    </div>`;

    this.worklog.insertAdjacentHTML('beforeend', record);
  }

  getFormattedDate(dateNumber) {
    const date = new Date(dateNumber);
    const twoDigits = (number) => (number < 10 ? `0${number}` : number);

    const day = twoDigits(date.getDate());
    const month = twoDigits(date.getMonth() + 1);
    const year = date.getFullYear().toString().substr(2, 2);
    const DMY = `${day}.${month}.${year}`;

    const hours = twoDigits(date.getHours());
    const minutes = twoDigits(date.getMinutes());
    const seconds = twoDigits(date.getSeconds());
    const time = `${hours}:${minutes}:${seconds}`;

    return `${time} ${DMY}`;
  }
}
