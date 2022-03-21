import Base from './Base'

export default class Auth extends Base {

  login = async (data) => {
    return this.sendRequest({
      path: `/api/v2/auth/login`,
      method: 'POST',
      data,
    });
  };

  profile = async () => {
    return this.sendRequest({
      path: `/api/v2/auth/profile`,
      method: 'GET'
    });
  };

}
