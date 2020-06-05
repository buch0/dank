'use strict';

class AtmosTokyo {
  constructor(taskData) {
    this.taskData = taskData;
  }

  async source() {
    console.log(this.taskData);
    var response = await util.request({
      url: 'https://www.atmos-tokyo.com/',
      method: 'GET',
      headers: {
        'Accept-Encoding': 'gzip, deflate',
      },
      data: '',
    });
    return response.body;
  }
}
export default AtmosTokyo;