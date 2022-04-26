import Base from './Base'

export default class Messages extends Base {

  getMessages = async () => {
    return this.sendRequest({
      path: `/api/v2/messages`,
      method: 'GET'
    });
  };

  getMessageInformation = async (id) => {
    return this.sendRequest({
      path: `/api/v2/messages/${id}`,
      method: 'GET'
    });
  };

  read = async (id) => {
    return this.sendRequest({
      path: `/api/v2/messages/${id}/read`,
      method: 'POST'
    }); 

  }

}
